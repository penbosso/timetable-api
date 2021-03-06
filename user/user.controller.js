import UserModel from './user.model';
import crypto from 'crypto';

/* eslint-disable import/ignore */
exports.insert = (req, res) => {
  UserModel.findByEmail(req.body.email)
  .exec()
  .then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: "email already exists"
      });
    } else {console.log(req.body.password);
      let salt = crypto.randomBytes(16).toString('base64');
      let hash = crypto.createHmac('sha512',salt)
                                       .update(req.body.password)
                                       .digest("base64");
      req.body.password = salt + "$" + hash;
      req.body.permissionLevel = 1;
      UserModel.createUser(req.body)
          .then((result) => {
              res.status(201).send({id: result._id});
            // this.getById(result._id);
          })
          .catch(function (err){
            res.status(404).send({message: err});
        });
    }
  });
};

exports.getById = (req, res) => {
  UserModel.findById(req.params.userId)
      .then((result) => {
          delete result.password;
          res.status(200).send(result);
  })
  .catch(function (err){
    res.status(404).send({message : err});
});
};

exports.patchById = (req, res) => {
  if (req.body.password){
      let salt = crypto.randomBytes(16).toString('base64');
      let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
      req.body.password = salt + "$" + hash;
  }
  UserModel.patchUser(req.params.userId, req.body).then((result) => {
          res.status(204).send({});
  })
  .catch(function (err){
    res.status(404).send({message : err});
});
};

exports.list = (req, res) => {
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
      if (req.query.page) {
          req.query.page = parseInt(req.query.page);
          page = Number.isInteger(req.query.page) ? req.query.page : 0;
      }
  }
  UserModel.list(limit, page).then((result) => {
    const returnResult = result.map((result) => {
      const newResult = result.toJSON();
      delete newResult.password
      newResult.links = {};
      newResult.links.self =`http://${req.headers.host}/users/${result._id}`;
      return newResult;});
      res.status(200).send(returnResult);
  })
};

exports.removeById = (req, res) => {
  UserModel.removeById(req.params.userId)
      .then((result)=>{
          res.status(204).send({});
      });
};

exports.makeEditor = (req, res) => {console.log(req.params.userId);
  return UserModel.updatePermision(req, res, 2);
}

exports.makeAdmin = (req, res) => {console.log(req.params.userId);
  return UserModel.updatePermision(req, res, 3);
}


