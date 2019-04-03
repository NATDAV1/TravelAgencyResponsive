const mongoose = require('mongoose');
const {pick} =require('lodash')
const UserSchema = new mongoose.Schema
// const (isEmail) = require('validator')
({
    //_id, MongoDB automatically adds an _id
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        // validate: {
        //     validator: (email => isEmail(email)),
        //     Message: '(VALUE) is not a valid email.'
        // }
        
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 8,
    }
},{
    strict: true
});

UserSchema.methods.toJSON = function () {
    const user = this; //'this' is a variable of UserSchema.
    return pick(user, ['_id', 'email']) //pick (lodash) allows you to find user by id and email.
 }
 //The Schema allows you to find a single user by email and password
 UserSchema.statics.findByCredentials = ({email, password}) => {
    return User.findOne({email, password})
 }
const User = mongoose.model('user', UserSchema);

module.exports = User;