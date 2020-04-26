var dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Token = new Schema({
	token: {type: String, required: true},
}, {
	_id: true
})

const User = new Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	tokens: [Token],
})

// Hash the password before you save the object
User.pre('save', async function (next) {
    const myUser = this
    if (myUser.isModified('password')) {
        myUser.password = await bcrypt.hash(myUser.password, 8)
    }
    next()
})

// Use JWT to sign the token, define key in .env file
User.methods.generateAuthToken = async function() {
    const myUser = this
    const token = jwt.sign({_id: myUser._id}, process.env.JWT_KEY)
    myUser.tokens = myUser.tokens.concat({token})
    await myUser.save()
    return token
}

// Search for a user with the username provided, return an err if credentials are invalid
User.statics.findByCredentials = async (username, password) => {
    const myUser = await User.findOne({ username } )
    if (!myUser) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, myUser.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return myUser
}







mongoose.model("User", User);
