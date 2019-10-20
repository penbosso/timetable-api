const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    code: {type: String, required: true, max: 100, unique: true},
    title: {type: String, required: true, max: 150},
    description: {type: String, max: 255},
    level: {type: String, max:10, required: true,},
    department: {type: String, required: true, max: 150},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
  }
);

// Virtual for author's URL
CourseSchema
.virtual('url')
.get(function () {
  return 'course/' + this._id;
});

//Export model
module.exports = mongoose.model('Course', CourseSchema);
