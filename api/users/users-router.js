const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");
const only = require('../auth/check-role-middleware')

router.get("/", restricted, only('admin'), (req, res, next) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(next); 
});

module.exports = router;