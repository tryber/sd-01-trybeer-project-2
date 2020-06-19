const jwt = require('jsonwebtoken');

const secret = 'trybeer';

module.exports = (email, role) => {
  const jwtConfig = {
    expiresIn: '1m',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ email, role }, secret, jwtConfig);
  return token;
};
