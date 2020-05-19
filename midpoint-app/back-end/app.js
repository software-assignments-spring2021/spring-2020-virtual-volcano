// import and instantiate express
const express = require('express'); // CommonJS import style!
const app = express(); // instantiate an Express object
// we will put some server logic here later...
const bodyParser = require('body-parser');
const axios = require("axios");
var http = require('http');
const mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
app.use(cookieParser());
const JWT = require('jsonwebtoken');
const JWT_SECRET = 'midpoint';
const jwtDecode = require('jwt-decode');

require('dotenv').config({ path: './.env' });
var dburi = process.env.uri

const MongoClient = require('mongodb').MongoClient;

signToken = (user_id) => {
    return JWT.sign({
        iss: 'Midpoint',
        sub: user_id,
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate + 2) // current time + 1 day
    }, JWT_SECRET)
}

const getCookie = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['access_token'];
    }
    return token;
}

var opts = {}
opts.jwtFromRequest = getCookie;
opts.secretOrKey = 'midpoint';

const cookieToID = req => {
    let token = getCookie(req);
    console.log(token);
    if(token === undefined){
        return; 
    }

    let decodedToken = jwtDecode(token);
    let userID = decodedToken.sub;

    return userID;
}

const port = process.env.PORT;
// require('./db.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Origin", "3000");
    // res.header("Access-Control-Allow-/Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.use(cookieParser());

var database;
var userModel;
var cur_data = [];

function connectDB() {

    const databaseURL = dburi
    // MongoClient.connect(uri, function (err, client) {
    //     if (err) {
    //         console.log('Error occured while connecting')
    //     }
    //     console.log('Connected via ATLAS');
    //     const collection = client.db('user')
    // })


    // var databaseURL = 'mongodb://localhost:27017/user'

    mongoose.Promise = global.Promise;
    mongoose.connect(databaseURL)

    database = mongoose.connection;
    database.on('open',
        function () {
            console.log('data base connected at' + databaseURL);

            userSchema = mongoose.Schema({
                id: {
                    type: String,
                    required: true
                },
                password: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                saved_location: {
                    type: [String],
                    required: true
                }
                // saved_address: {
                //     type: [String],
                //     required: false
                // }
            });
            console.log("userSchema defined");

            userModel = mongoose.model('users', userSchema);
            console.log('userModel defined')
        }
    );

    database.on('disconnected',
        function () {
            console.log("data base disconnected")
        }
    );

    database.on('error',
        console.error.bind(console, 'moongose connection error')
    )
}

// var authUser = function (db, id, password, callback) {
//     var users = db.db('user').collection('user');
//     var result = users.find({ "name": id, "password": password },
//         function (err, docs) {
//             if (err) {
//                 callback(err, null);
//                 return;
//             }
//             if (docs.length > 0) {
//                 console.log('find user [' + docs + ']');
//                 callback(null, docs);
//             }
//             else {
//                 console.log('cannot find')
//                 callback(null, null)
//             }
//         }
//     );
// };

var authUser = function (db, id, password, callback) {
    console.log('authuser: ' + id + ', ' + password);

    userModel.find({
        "id": id,
        "password": password
    }, function (err, results) {
        if (err) {
            callback(err, null);
            return;
        }

        console.dir(results);

        if (results.length > 0) {
            console.log('user found')
            console.log("this is the results");
            console.log(results);
            console.log("this is the result id");
            console.log(results[0]._id);
            callback(null, results);
            // console.log(callback)
            return results[0]._id;

        } else {
            console.log('no user found')
            callback(null, null)
            // console.log(callback)
            return;
        }
    })

};

var appServer = http.createServer(app);
appServer.listen(app.get('port'),
    function () {
        connectDB();
    }
)


var router = express.Router();

//test variable
let authorized = ''

router.route('/login').post(
    function (req, res) {
        console.log("in route login")
        var paramEmail = req.body.email || req.query.email;
        var paramPW = req.body.password || req.query.password;
        console.log('ID : ' + paramEmail + " PW : " + paramPW);
        console.log(database)
        var tokenID;
        if (database) {
            tokenID = authUser(database, paramEmail, paramPW,
                function (err, docs) {
                    if (database) {
                        if (err) {
                            console.log('error')
                            res.end();
                            return;
                        }
                        if (docs) {
                            // console.dir(docs);
                            console.log("these are the docs")
                            console.log(docs[0]._id);
                            var token1 = docs[0]._id;
                            console.log("this is the token")
                            console.log(tokenID);
                            // res.write('<h1>Logged</h1>')
                            const data = { paramEmail, paramPW, auth: 'yes' }
                            cur_data = data;
                            // res.write(paramEmail)
                            // res.write(paramPW)
                            authorized = 'yes'
                            // res.json(data)
                            ///generate a cookie! 
                            console.log("tokenID is ");
                            console.log(token1);
                            const token = signToken(token1);
                            console.log("this is the sign token")
                            console.log(token);
                            return res.cookie('access_token', token, {
                                httpOnly: true,
                            })
                                .status(200).json({ success: true });
                            // res.end();

                        }
                        else {
                            // res.write('<h1>no data</h1>')
                            const data = { paramEmail, paramPW, auth: 'no' }
                            authorized = 'no'
                            // res.json(data)
                            res.end();
                        }
                    }
                }
            )

        }
        else {
            console.log('DB not connected')
            res.end();
        }

    }
);

router.route('/signup').post(
    function (req, res) {
        console.log("in route signup");
        var paramEmail = req.body.email || req.query.email;
        var paramPW = req.body.password || req.query.password;
        var paramName = req.body.name || req.query.name;
        console.log('ID : ' + paramEmail + " PW : " + paramPW);
        var tokenID;


        if (database) {
            tokenID = signup(database, paramEmail, paramPW, paramName,
                function (err, result) {
                    if (err) {
                        console.log('error')
                        res.end();
                        return;
                    }
                    if (result) {
                        console.dir(result);
                        // res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
                        // res.write('<h1> name </h1>' + paramName)
                        res.end();
                    }
                    else {
                        console.log('error2')
                        res.end();
                    }
                }
            )
            const token = signToken(tokenID)
            // Send a cookie containing JWT
            return res.cookie('access_token', token, {
                httpOnly: true,
            })
                .status(200).json({ success: true });
        }
        else {
            console.log('DB not connected')
            res.end();
        }
    }
)

router.route('/result').post(
    function (req, res) {
        const address = req.body.address;
        console.log(address);
        const userID = cookieToID(req);
        userModel.findByIdAndUpdate(userID, { $push: { saved_location: address } })
            .then(doc => {
                if (doc.saved_location) {
                    console.log("these are all the adresses")
                    console.log(doc.saved_location);
                    res.end();
                } 
                console.log(doc.address);
            })
            .catch(err => {
                console.log("cannot post address")
                console.log(err);
                //   name = 'default'
            });
    }
)
// 

//         console.log("in the result page!!");
//         console.log(cur_data);
//         console.log(req.body);
//         if (cur_data != []) {
//             console.log("revising login info")
//             var paramEmail = cur_data.paramEmail;
//             var paramPW = cur_data.paramPW;
//             var paramAddress = req.body.address;
//         }

//         console.log('ID : ' + paramEmail + " PW : " + paramPW);

//         if (database) {
//             //the if statement should be checking if there is a cookie
//             if (cur_data != []) {
//                 save_result(database, paramEmail, paramPW, paramAddress,
//                     function (err, result) {
//                         if (err) {
//                             console.log('error')
//                             res.end();
//                             return;
//                         }
//                         if (result) {
//                             console.dir(result);
//                             res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
//                             res.end();
//                         }
//                         else {
//                             console.log('error2')
//                             res.end();
//                         }
//                     }
//                 )
//             }
//             else {
//                 console.log("Not logged in")
//             }
//         }
//         else {
//             console.log('DB not connected')
//             res.end();
//         }
//     }
// )

app.use('/', router);

var signup = function (db, id, password, name, callback) {
    console.log("signing up" + id)
    var users = userModel({ "id": id, "password": password, "name": name })

    users.save(
        function (err) {
            if (err) {
                callback(err, null);
                return;
            }
            console.log('user added');
            console.log('these are all of the users')
            console.log(users)
            console.log("this is before callback")
            callback(null, users);
        }
    )
    //return
    console.log("this is user id");
    console.log(users._id);
    return users._id

}

// connectDB();
// var random_instance = new userModel({ email: 'dasd@dasnd.com', password: 'dasd', name: 'dasdd' })


//include at least one route
app.get("/", (req, res) => {
    res.render('index', {});
});

//receive POST data from the client in homepage - first address and second address -- 
//receive lat and long 1/2 from homeform or string adresses from homeform 
//2nd requires backend webservices maps api 

//try to store midpoint
let midpoint = {
    lat: 0,
    lng: 0
};

let midpointPlace = {
    lat: 0,
    lng: 0
};

let midpointName = 'Midpoint location'
let midpointID = ''

//work with longitude and lat
app.post('/', (req, res) => {
    const your_data = {
        lat1: req.body.lat1,
        lng1: req.body.lng1,
        lat2: req.body.lat2,
        lng2: req.body.lng2
    }
    const response = algorithm(your_data);
    midpoint.lat = response.lat;
    midpoint.lng = response.lng;
    //in case a user does not pick a place in the area page
    midpointPlace.lat = response.lat;
    midpointPlace.lng = response.lng;
    console.log(req.body);
    console.log(your_data);
    console.log(response);
    console.log("Your midpoint is located at lat: " + midpoint.lat + " and lng: " + midpoint.lng + ".");
    // ... then send a response of some kind to client
    res.json(response);
});


app.post('/area', (req, res) => {
    const your_data = {
        latM: req.body.coords.lat,
        lngM: req.body.coords.lng,
        name: req.body.name,
        placeId: req.body.placeId
    }
    const response = {
        status: "success!",
        message: "sending us chosen midpoint and name, now storing",
        lat: parseFloat(your_data.latM),
        lng: parseFloat(your_data.lngM),
        name: JSON.stringify(your_data.name),
        placeId: your_data.placeId
    };
    midpointPlace.lat = response.lat;
    midpointPlace.lng = response.lng;
    midpointName = response.name;
    midpointID = response.placeId;
    console.log(req.body);
    console.log(your_data);
    console.log(response);
    console.log("Your midpoint place is located at lat: " + midpointPlace.lat + " and lng: " + midpointPlace.lng + ".");
    console.log("The name of your chosen place is " + midpointName);
    console.log("The place id of the chosen place is " + midpointID);
    // ... then send a response of some kind to client
    res.json(response);
});

app.get("/area", (req, res) => {
    console.log("Sending over the calculated midpoint and to the area page");
    console.log(midpoint);
    const data = {
        status: 'success!',
        message: 'congratulations receiving the midpoint! area page',
        your_data: midpoint
    }
    console.log(data);
    res.json(midpoint);
});

app.get("/result", (req, res) => {
    console.log("Sending over the chosen midpoint place to the result page");
    console.log(midpointPlace);
    console.log(midpointID);
    const data = {
        status: 'success!',
        message: 'congratulations receiving the midpoint place!',
        lat: midpointPlace.lat,
        lng: midpointPlace.lng,
        placeId: midpointID
    }
    console.log(data);
    // res.json(midpointPlace);
    res.json(data);
});

app.get("/name", (req, res) => {
    console.log("Sending over the chosen midpoint name to the result page");
    console.log(midpointName);
    const data = {
        status: 'success!',
        message: 'congratulations receiving the midpoint name!',
        your_data: midpointName
    }
    console.log(data);
    res.json(midpointName);
});

//acount info
app.get("/account", async (req, res) => {
    const userID = cookieToID(req);
    let name;
    console.log("in th account request!")
    await userModel.findById(userID)
        .then(doc => {
            if (doc.name) {
                console.log("this is the user name")
                console.log(doc.name);

                name = doc.name;
            }
            else {
                //
                console.log("cannot find user name")
                name = 'default'
            }
            //   name.push(userID);
        })
        .catch(err => {
            console.log("cannot read name")
            console.log(err);
            //   name = 'default'
        });
    res.json(name);
});

//check if user is logged
app.get("/loggedIn", (req, res) => {
    console.log("Send the cookie");
    const userID = cookieToID(req);
    let answer;
    if (userID === undefined){
        answer = 'no'
    }
    else{
        answer = 'yes'
    }
    console.log(answer);
    const data = {
        status: 'success!',
        message: 'congratulations on checking if user is logged in!',
        your_data: answer
    }
    console.log(data);
    res.json(answer);
});

//acount info
app.get("/location", async (req, res) => {
    const userID = cookieToID(req);
    let locations = [];
    console.log("in th account request!")
    await userModel.findById(userID)
        .then(doc => {
            if (doc.saved_location) {
                console.log("this is the locations")
                console.log(doc.saved_location);

                locations = doc.saved_location;
            }
            else {
                //
                console.log("cannot find locations")
                // name = 'default'
            }
            //   name.push(userID);
        })
        .catch(err => {
            console.log("cannot read name")
            console.log(err);
            //   name = 'default'
        });

    // console.log("Sending the user name to the account page");
    // console.log(name);
    // const data = {
    //     status: 'success!',
    //     message: 'congratulations receiving the user name!',
    //     your_data: name
    // }
    // console.log(data);
    res.json(locations);
});

app.get("/logOut", (req, res) => {
    res.clearCookie('access_token');
    console.log('Just logged user out');
    res.status(200).json({ success: true });
  });

app.get("/login", (req, res) => {
    console.log("Sending the authorization of the user");
    // console.log(midpointName);
    const data = {
        status: 'success!',
        message: 'congratulations receiving the authorization!',
        your_data: authorized
    }
    console.log(data);
    res.json(authorized)
})

//function algorithm(lat1, lng1, lat2, lng2){
function algorithm(data) {
    //should I return in json format or an array
    let lat1 = parseFloat(data.lat1);
    let lng1 = parseFloat(data.lng1);
    let lat2 = parseFloat(data.lat2);
    let lng2 = parseFloat(data.lng2);
    let lat3 = (lat1 + lat2) / 2;
    let lng3 = (lng1 + lng2) / 2;
    const responseData = {
        status: "success!",
        message: "sending us data, now performing calculation",
        lat: lat3,
        lng: lng3
    };
    return responseData;
}

// app.post('/', (req, res) => {
//     // now do something amazing with the data we received from the client
//     const data = {
//         status: 'amazing success!',
//         message: 'congratulations on send us this data!',
//         your_data: {
//             lat: req.body.lat,
//             lng: req.body.lng 
//         }
//     }
//     console.log(req.body);
//     // ... then send a response of some kind to client
//     res.json(data);
// });

// app.post("/login", (req, res) => {
//     const email = req.body.email
//     const password = req.body.password
//     console.log("Your email is ${email} and password is ${password}")
//         // ... then send a response of some kind to client
//         res.json(data);
//      res.send("We got your data!");
// });

// export the express app we created to make it available to other modules
module.exports = app;
