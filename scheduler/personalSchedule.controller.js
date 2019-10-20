import PersonalSchedule from './personalSchedule.model';


exports.course_get_all = (req, res) => {
  PersonalSchedule.find()
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
 PersonalSchedule.findById(req.params.id)
      .then(personalSchedule => {
          if(!personalSchedule) {
              return res.status(404).send({
                  message: "personal schedule not found with id " + req.params.id
              });
          }
          res.send(personalSchedule);
      })
      .catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "personal Schedule not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Something wrong retrieving personal schedule with id " + req.params.id
          });
      });
};

exports.course_update = (req, res) => {

  if(!req.body.content) {
    return res.status(400).send({
        message: "personal schedule content can not be empty"
    });
}

PersonalSchedule.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    user: req.body.user
}, {new: true})
.then(personalSchedule => {
    if(!personalSchedule) {
        return res.status(404).send({
            message: "personal schedule not found with id " + req.params.id
        });
    }
    res.send(personalSchedule);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "personal schedule not found with id " + req.params.id
        });
    }
    return res.status(500).send({
        message: "Error updating personal schedule with id " + req.params.id
    });
});
}

exports.course_delete = ( req, res) => {
  PersonalSchedule.findByIdAndRemove(req.params.id)
    .then(personalSchedule => {
        if(!personalSchedule) {
            return res.status(404).send({
                message: "Personal schedule not found with id " + req.params.id
            });
        }
        res.send({message: "Personal schedule deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Personal schedule not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete personal schedule with id " + req.params.id
        });
    });
}

exports.create_course = (req, res) => {
  if(!req.body) {
    return res.status(400).send({
        message: "Personal schedule content can not be empty"
    });
  }

  const personalSchedule = new PersonalSchedule(req.body);
  personalSchedule.save()
  .then(data => {
    res.status(201).json(data);
    })
  .catch(err => {
    res.status(500).send({
        message: err.message || "Something wrong while saving."
      });
    });
};

