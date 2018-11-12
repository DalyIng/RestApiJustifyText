import User from '../models/user';

/** Create a user in our DB */

function create(req, res, next) {
  User.create({
      email: req.body.email,
      password: req.body.password
    })
    .then((savedUser) => {
      return res.json(savedUser);
    }, (e) => next(e));
}


export default { create };