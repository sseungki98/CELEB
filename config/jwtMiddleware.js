const jwt = require('jsonwebtoken');
const secret_config = require('./jwtSecretKey');

const jwtMiddleware = (req, res, next) => {
  const token = req.headers['token'] || req.query.token;

  if (!token) res.json({ message: 'token is empty', isSuccess: false });

  const p = new Promise((resolve, reject) => {
    jwt.verify(token, secret_config.jwtsecret, (err, verifiedToken) => {
      if (err) reject(err);
      resolve(verifiedToken);
    });
  });

  const onError = error => {
    res.json({ message: 'token verification error', isSuccess: false });
  };

  p.then(verifiedToken => {
    req.verifiedToken = verifiedToken;
    next();
  }).catch(onError);
};

module.exports = jwtMiddleware;
