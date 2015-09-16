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

// initialize: function(){
//   this.on('creating', this.hashPassword);
// },
// comparePassword: function(attemptedPassword, callback) {
//   bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//     callback(isMatch);
//   });
// },
// hashPassword: function(){
//   var cipher = Promise.promisify(bcrypt.hash);
//   return cipher(this.get('password'), null, null).bind(this)
//     .then(function(hash) {
//       this.set('password', hash);
//     });
// }
