// var dotenv = require('dotenv').config();
// var http = require('http');
// const mongoose = require('mongoose');
// require('./app.js')
// function connectDB() {
//     var databaseURL = 'mongodb://localhost:27017/user'

//     mongoose.Promise = global.Promise;
//     mongoose.connect(databaseURL);

//     database = mongoose.connection;
//     database.on('open',
//         function () {
//             console.log('data base connected at + databaseURL');

//             userSchema = mongoose.Schema({
//                 id: {
//                     type: String,
//                     required: true
//                 },
//                 passwords: {
//                     type: String,
//                     required: true
//                 },
//                 name: {
//                     type: String,
//                     required: true
//                 }
//             });
//             console.log("userSchema defined");

//             userModel = mongoose.model('users', userSchema);
//             console.log('userModel defined')
//         }
//     );

//     database('disconnected',
//         function () {
//             console.log("data base disconnected")
//         }
//     );

//     database.on('error',
//         console.error.bind(console, 'moongose connection error')
//     )
// }

// var authUser = function (db, id, password, callback) {
//     var users = db.db('user').collection('user');
//     var result = users.find({ "name": id, "password": password });
//     result.toArray(
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

// var appServer = http.createServer(app);
// appServer.listen(app.get('port'),
//     function () {
//         connectDB();
//     }
// )





// const Schema = mongoose.Schema;

// const Token = new Schema({
//     token: { type: String, required: true },
// }, {
//     _id: true
// })

// const User = new Schema({
//     username: { type: String, required: true },
//     password: { type: String, required: true },
//     tokens: [Token],
// })

// // Hash the password before you save the object
// User.pre('save', async function (next) {
//     const myUser = this
//     if (myUser.isModified('password')) {
//         myUser.password = await bcrypt.hash(myUser.password, 8)
//     }
//     next()
// })

// // Use JWT to sign the token, define key in .env file
// User.methods.generateAuthToken = async function () {
//     const myUser = this
//     const token = jwt.sign({ _id: myUser._id }, process.env.JWT_KEY)
//     myUser.tokens = myUser.tokens.concat({ token })
//     await myUser.save()
//     return token
// }

// // Search for a user with the username provided, return an err if credentials are invalid
// User.statics.findByCredentials = async (username, password) => {
//     const myUser = await User.findOne({ username })
//     if (!myUser) {
//         throw new Error({ error: 'Invalid login credentials' })
//     }
//     const isPasswordMatch = await bcrypt.compare(password, myUser.password)
//     if (!isPasswordMatch) {
//         throw new Error({ error: 'Invalid login credentials' })
//     }
//     return myUser
// }


// mongoose.model("userSchema", userSchema);
