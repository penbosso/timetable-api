import Course from './course.model';
import CourseInstance from './courseInstance.model';


exports.schedule_get_all = (req, res) => {
  CourseInstance.find()
            .populate("course")
            .exec()
            .then(results => {
              res.status(200).json(results);
            })
            .catch(err => {
              res.status(500).json({
                error:err
              });
          });
};

exports.schedule_get_similar = (req, res) => {
  CourseInstance.find({course : req.params._id})
            .populate("course")
            .exec()
            .then(results => {
              res.status(200).json(results);
            })
            .catch(err => {
              res.status(500).json({
                error:err
              });
          });
};

exports.create_schedule = (req, res) => {
  const courseInstance = new CourseInstance(req.body);
  courseInstance.save();
  res.status(201).json(courseInstance);
}
