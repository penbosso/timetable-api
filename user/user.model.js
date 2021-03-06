import mongoose from 'mongoose';

const Schema = mongoose.Schema;
/* eslint-disable import/default */

const userSchema = new Schema({
  otherName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {type: String, required: true},
  permissionLevel: Number
});

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
  virtuals: true
});

userSchema.findById = function (cb) {
  return this.model('User').find({id: this.id}, cb);
};

const User = mongoose.model('User', userSchema);


exports.findByEmail = (email) => {
  return User.find({email: email});
};
exports.findById = (id) => {
  return User.findById(id)
      .then((result) => {
          result = result.toJSON();
          delete result._id;
          delete result.__v;
          return result;
      })
      .catch(function (err){
        return err
    });
};

exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
      User.find()
          .limit(perPage)
          .skip(perPage * page)
          .exec(function (err, users) {
              if (err) {
                  reject(err);
              } else {
                  resolve(users);
              }
          })
  });
};

exports.patchUser = (id, userData) => {
  return new Promise((resolve, reject) => {
      User.findById(id, function (err, user) {
          if (err) reject(err);
          for (let i in userData) {
              user[i] = userData[i];
          }
          user.save(function (err, updatedUser) {
              if (err) return reject(err);
              resolve(updatedUser);
          });
      });
  })

};

exports.removeById = (userId) => {
  return new Promise((resolve, reject) => {
      User.remove({_id: userId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};

exports.updatePermision = (req, res, permission) => {
  User.findByIdAndUpdate(req.params.userId, {
    permissionLevel: permission
  }, {new: true})
  .then(userModel => {
    if(!userModel) {
      return res.status(404).send({
        message: "User not found with id " + req.params.id
      });
    }
    res.status(201).send({message: "Permission updated successful"});
  })
  .catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "courseInstance(schedule) not found with id " + req.params.id
        });
    }
    return res.status(500).send({
    message: "Error updating user with id " + req.params.id
  });

  });
}

//Export model
// module.exports = mongoose.model('User', userSchema);
