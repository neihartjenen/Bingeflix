var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//define records
var userSchema= new Schema({
    //pass the object
    username: String,
    googleId: String,
})

var User = mongoose.model('user', userSchema);

module.exports = User;