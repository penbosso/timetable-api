const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseInstanceSchema = new Schema(
  {
    venue: {type: String, required: true, max: 150},
    lecturer: {type: String, max: 255},
    group: {type: String, max:10},
    start_time: {type: Date, required: true},
    end_time: {type: Date, required: true},
    date_created: {type: Date, default: Date.now},
    course: {type: Schema.Types.ObjectId, ref: 'Course', required: true}
  }
);

//Export model
module.exports = mongoose.model('CourseInstance', CourseInstanceSchema);
