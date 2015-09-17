var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var userSchema = new db.Schema({
  username: String,
  password: String
});

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
};

userSchema.path('password').set(function(value) {
  return bcrypt.hashSync(value);
})

var User = db.model('User', userSchema);
module.exports = User;
