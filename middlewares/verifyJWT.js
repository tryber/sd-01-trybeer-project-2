const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const secret = 'trybeer';
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, secret);
    if (payload.data.email) return res.status(401).json({ message: 'Token inválido!' });
    req.user = payload;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}