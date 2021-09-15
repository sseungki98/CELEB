'use strict';

const User = require('../../models/User');

const output = {
  main: (req, res) => {
    res.render('consumer/main');
  },

  login: (req, res) => {
    res.render('consumer/login');
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
