import Course from './course.model';
import CourseInstance from './courseInstance.model';


exports.schedule_get_all = (req, res, next) => {
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

exports.schedule_get_similar = (req, res, next) => {
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
