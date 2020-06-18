const conn = require('../connection');

class User {
  constructor(name, email, password, role) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  async login() {
    const { email, password } = this;
    const query = `INSERT INTO user (email, password) VALUES ('${email}', '${password}')`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      });
    });
  }

  async createUser() {
    const { name, email, password, role } = this;
    const admin = role ? 1 : 0;
    const query = `INSERT INTO user (name, email, admin, password) VALUES ('${name}', '${email}', '${admin}', '${password}')`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, _results) => {
        if (err) return reject(err);
        return resolve(this);
      });
    });
  }
}

module.exports = User;
