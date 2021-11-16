const bcrypt = require('bcryptjs');
const tokenBuilder = require('./token-builder');
const router = require('express').Router();

const Users = require('../users/users-model.js');

router.post('/register', (req, res, next) => {
  let user = req.body;

  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash

  Users.add(user)
    .then(saved => {
      res.status(201).json({ message: `Great to have you, ${saved.username}` });
    })
    .catch(next);
});

router.post('/login', (req, res, next) => {
  let { username, password } = req.body;

  Users.findBy({ username }) 
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenBuilder(user) 
        res.status(200).json({
          message: `Welcome back ${user.username}!`, token
        });
      } else {
        next({ status: 401, message: 'Invalid Credentials' });
      }
    })
    .catch(next);
});

module.exports = router;