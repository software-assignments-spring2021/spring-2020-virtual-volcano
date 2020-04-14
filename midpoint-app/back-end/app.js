// import and instantiate express
const express = require('express'); // CommonJS import style!
const app = express(); // instantiate an Express object
// we will put some server logic here later...
const bodyParser = require('body-parser');
const axios = require("axios");
//const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// app.use(express.urlencoded({ extended: false }));

//include at least one route
app.get("/", (req, res) => {
    res.send("Hello!");
    //res.render('index', {});
  });

//receive POST data from the client in homepage - first address and second address -- 
//receive lat and long 1/2 from homeform or string adresses from homeform 
//2nd requires backend webservices maps api 

//try to store midpoint
let midpoint = {
    lat: 0,
    lng: 0
};

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
    console.log(req.body);
    console.log(your_data);
    console.log(response);
    console.log("Your midpoint is located at lat: " +midpoint.lat+" and lng: "+midpoint.lng+".");
    // ... then send a response of some kind to client
    res.json(response);
});

//get calculated midpoint
//may get undefined error if this is run before POST '/'
//POST sets this value
app.get("/area", (req, res) => {
    res.json(midpoint);
    console.log(res.data);
    console.log(midpoint);
});

//the login page is posting but we are not receiving 
app.post("/login", (req, res) => {
    const data = {
        status: 'amazing success!',
        message: 'congratulations on send us this data!',
        your_data: {
            email: req.body.email,
            password: req.body.password
        }
    }
    console.log(req.body);
    // ... then send a response of some kind to client
    res.json(data);
    res.sendStatus(200);
  });

//function algorithm(lat1, lng1, lat2, lng2){
function algorithm(data){
    //should I return in json format or an array
    let lat1 = parseFloat(data.lat1);
    let lng1 = parseFloat(data.lng1);
    let lat2 = parseFloat(data.lat2);
    let lng2 = parseFloat(data.lng2);
    let lat3 = (lat1+lat2)/2;
    let lng3 = (lng1+lng2)/2;
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
//     //const password = req.body.password
//     console.log("Your email is ${email} and password is ${password}")
//         // ... then send a response of some kind to client
//         res.json(data);
// });

//   app.post("/post-example", (req, res) => {
//     const name = req.body.your_name;
//     const email = req.body.your_email;
//     const agree = req.body.agree;
//     // now do something amazing with this data...
//     // ... then send a response of some kind
//     //res.json(data)
//     res.send("We got your data!");
//   });

// export the express app we created to make it available to other modules
module.exports = app;
