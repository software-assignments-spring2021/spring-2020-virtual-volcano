// import and instantiate express
const express = require('express'); // CommonJS import style!
const app = express(); // instantiate an Express object
// we will put some server logic here later...
const bodyParser = require('body-parser');
const axios = require("axios");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3001");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
// app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));

//include at least one route
app.get("/", (req, res) => {
    res.send("Hello!");
    //res.render('index', {});
  });

//receive POST data from the client in homepage - first address and second address -- 
//receive lat and long 1/2 from homeform or string adresses from homeform 
//2nd requires backend webservices maps api 
app.post('/', (req, res) => {
    // now do something amazing with the data we received from the client
    const data = {
        status: 'amazing success!',
        message: 'congratulations on send us this data!',
        your_data: {
            userLocation: req.body.userLocation,
            otherLocation: req.body.otherLocation 
        }
    }
    // ... then send a response of some kind to client
    res.json(data);
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
    // ... then send a response of some kind to client
    res.json(data);
  });

// export the express app we created to make it available to other modules
module.exports = app;