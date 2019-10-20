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
  CourseInstance.findOne({_id : req.params._id})
            .populate("course")
            .exec()
            .then(instCourse => {
              CourseInstance.find({course : instCourse.course})
                .populate("course")
                .exec()
                .then(simCourses => {
                  res.status(200).json({
                    "instantCourse" : instCourse,
                    "similarCourses" : simCourses});
                })
            })
            .catch(err => {
              res.status(500).json({
                error:err
              });
          });
};

exports.schedule_get_one = (req, res) => {
  CourseInstance.findById(req.params.id)
      .then(courseInstance => {
          if(!courseInstance) {
              return res.status(404).send({
                  message: "courseInstance (schedule) not found with id " + req.params.id
              });
          }
          res.send(courseInstance);
      })
      .catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "courseInstance (schedule) not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Something wrong retrieving courseInstance (schedule) with id " + req.params.id
          });
      });
}

exports.schedule_update = (req, res) => {

  if(!req.body) {
    return res.status(400).send({
        message: "course content can not be empty"
      });
  }
  
  CourseInstance.findByIdAndUpdate(req.params.id, {
      venue: req.body.venue,
      lecturer: req.body.lecturer,
      group: req.body.group,
      day: req.body.day,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      course: req.body.course
    }, {new: true})
    .then(courseInstance => {
      if(!courseInstance) {
          return res.status(404).send({
              message: "courseInstance (schedule) not found with id " + req.params.id
          });
      }
      res.send(courseInstance);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "courseInstance(schedule) not found with id " + req.params.id
          });
      }
      return res.status(500).send({
      message: "Error updating schedule with id " + req.params.id
    });
  });
}

exports.schedule_delete = ( req, res) => {
  CourseInstance.findByIdAndRemove(req.params.id)
    .then(courseInstance => {
        if(!courseInstance) {
            return res.status(404).send({
                message: "CourseInstance not found with id " + req.params.id
            });
        }
        res.send({message: "CourseInstance deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "CourseInstance not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete courseInstance(schedule) with id " + req.params.id
        });
    });
}


exports.create_schedule = (req, res) => {
  if(!req.body) {
    return res.status(400).send({
        message: "Schedule content can not be empty"
    });
  }
  const courseInstance = new CourseInstance(req.body);
  courseInstance.save()
    .then(data => {
      res.status(201).json(data);
      })
    .catch(err => {
      res.status(500).send({
          message: err.message || "Something wrong while saving."
        });
      });
};
