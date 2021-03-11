const httpStatus = require('http-status');

const router = require('express').Router();

router.get('/hello', (req, res) => {
  const message = 'Hello World!';
  res.status(httpStatus.OK).json({ message });
});

module.exports = router;
