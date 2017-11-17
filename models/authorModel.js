var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true},
    family_name: {type: String, required: true}
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
return this.family_name + ', ' + this.first_name; })
.set(function(value) {
	var split = value.split(' ');
    this.first_name = split[0];
    this.family_name = split[1];
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);