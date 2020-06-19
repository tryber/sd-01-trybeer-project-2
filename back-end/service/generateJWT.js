const jwt = require('jsonwebtoken');

const secret = 'trybeer';

module.exports = (name, email) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ name, email }, secret, jwtConfig);
  return token;
};
