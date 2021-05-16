const httpStatus = require('http-status');
const router = require('express').Router();
const { User } = require('../models');

router.get('/hello', (req, res) => {
  const message = 'Hello World!';
  res.status(httpStatus.OK).json({ message });
});

router.get('/users', async (req, res) => {
  const users = await User.findAll();

  res.status(httpStatus.OK).json({
    data: users,
  });
});

module.exports = router;
