const conn = require('../connection');

async function userLogin(email, password) {
  const query = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`;
  return new Promise((resolve, reject) => {
    conn.query(query, (err, results) => {
      if (err) return reject(err);
      return resolve(results[0]);
    });
  });
};

module.exports = userLogin;
