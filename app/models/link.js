var db = require('../config');
var crypto = require('crypto');

var linkSchema = new db.Schema({
  url: String,
  img_url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number
});
linkSchema.path('url').set(function(value) {
  var shasum = crypto.createHash('sha1');
  shasum.update(value);
  this.code = shasum.digest('hex').slice(0, 5);
  return value;
});
var Link = db.model('Link', linkSchema);

module.exports = Link;
