const conn = require('../connection');

class User {
  constructor(name, email, password, role) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  async login() {
    
    return { email: this.email, password: this.password };
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