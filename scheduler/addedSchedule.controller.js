import AddedSchedule from './addedSchedule.model';

exports.my_list = (req, res) => {
  AddedSchedule.find({user : "req.body.user_id"})
            .populate("schedule")
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

exports.get_one = (req, res) => {
  AddedSchedule.findById(req.params.id)
      .then(addedSchedule => {
          if(!addedSchedule) {
              return res.status(404).send({
                  message: "added schedule not found with id " + req.params.id
              });
          }
          res.send(addedSchedule);
      })
      .catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "added schedule not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Something wrong retrieving added schedule with id " + req.params.id
          });
      });
}

exports.delete = ( req, res) => {
  AddedSchedule.findByIdAndRemove(req.params.id)
    .then(addedSchedule => {
        if(!addedSchedule) {
            return res.status(404).send({
                message: "Added schedule not found with id " + req.params.id
            });
        }
        res.send({message: "Added schedule deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Added schedule not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not remove added schedule with id " + req.params.id
        });
    });
}


exports.create = (req, res) => {
  if(!req.body) {
    return res.status(400).send({
        message: "Schedule content can not be empty"
    });
  }
  const addedSchedule = new AddedSchedule(req.body);
  addedSchedule.save()
    .then(data => {
      res.status(201).json(data);
      })
    .catch(err => {
      res.status(500).send({
          message: err.message || "Something wrong while saving."
        });
    });
};
