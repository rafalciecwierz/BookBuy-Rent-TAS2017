var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema(
  {
	name: {type: String, required: true}
  }
);

/*// Virtual for tag's URL
TagSchema
.virtual('url')
.get(function () {
  return '/catalog/tag/' + this._id;
});*/

module.exports = mongoose.model('Tag', TagSchema);