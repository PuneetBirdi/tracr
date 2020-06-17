const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get the token from the req header
  const token = req.header('x-auth-token');

  //check to make sure there is a token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorzation denied.' });
  }
  //verify the token
  try {
    //decode the token using jwt.verify, the token and the secret
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid.' });
  }
};
