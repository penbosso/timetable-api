import Course from './course.model';


exports.course_get_all = (req, res) => {
  Course.find()
        .then(results => {
          res.status(200).json(results);
        })
        .catch(err => {
          res.status(500).json({
            message: "Something wrong while saving"
          });
      });
};


exports.course_get_one = (req, res) => {
 Course.findById(req.params.id)
      .then(course => {
          if(!course) {
              return res.status(404).send({
                  message: "course not found with id " + req.params.id
              });
          }
          res.send(course);
      })
      .catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "course not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Something wrong retrieving course with id " + req.params.id
          });
      });
};

exports.course_update = (req, res) => {

  if(!req.body) {
    return res.status(400).send({
        message: "course content can not be empty"
    });
}

Course.findByIdAndUpdate(req.params.id, {
    code: req.body.code,
    title: req.body.title,
    description: req.body.description,
    level: req.body.level,
    department: req.body.department,
    user: req.body.user
}, {new: true})
.then(course => {
    if(!course) {
        return res.status(404).send({
            message: "course not found with id " + req.params.id
        });
    }
    res.send(course);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "course not found with id " + req.params.id
        });
    }
    return res.status(500).send({
        message: "Error updating course with id " + req.params.id
    });
});
}

exports.course_delete = ( req, res) => {
  Course.findByIdAndRemove(req.params.id)
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Course not found with id " + req.params.id
            });
        }
        res.send({message: "Course deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Course not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete course with id " + req.params.id
        });
    });
}

exports.create_course = (req, res) => {
  if(!req.body) {
    return res.status(400).send({
        message: "Course content can not be empty"
    });
  }

  const course = new Course(req.body);

  if(Course.find({code: course.code })) {
    return res.status(403).send({
      message: "A Course with the same code already exist"
  });
  }

  course.save()
  .then(data => {
    res.status(201).json(data);
    })
  .catch(err => {
    res.status(500).send({
        message: err.message || "Something wrong while saving."
      });
    });
};

