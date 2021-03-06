const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonalSchema = new Schema(
  {
    title: {type: String, required: true, max: 150},
    description: {type: String, max: 255},
    day: {type: String,required: true, max:10},
    start_time: {type: String, max:10, required: true},
    end_time: {type: String, max:10, required: true},
    date_created: {type: Date, default: Date.now},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
  }
);



//Export model
module.exports = mongoose.model('Personal', PersonalSchema);
