const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addedScheduleSchema = new Schema(
  {
    schedule: {type: Schema.Types.ObjectId, ref: 'CourseInstance', required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
  }
);



//Export model
module.exports = mongoose.model('addedSchedule', addedScheduleSchema);
