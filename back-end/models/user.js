const conn = require('../connection');

class User {
  constructor(name, email, password, role) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  async login(email, password) {
    console.log(email, password)
    const query = `SELECT * FROM user WHERE email = "${email}" AND password = "${password}"`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      });
    });


  async createUser() {
    const { name, email, password, role } = this;
    console.log(role);
    const admin = role ? 1 : 0;
    const query = `INSERT INTO user (name, email, admin, password) VALUES ('${name}', '${email}', '${admin}', '${password}')`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, _results) => {
        if (err) return reject(err);
        return resolve({ name, email, password, role: admin });
      });
    });
  }

  static async validateEmail(email) {
    const query = `SELECT email FROM trybeer.user WHERE email = ${email};`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        console.log('o que tem alqui?', results[0]);
        return resolve(results[0]);
      });
    });
  }
}

module.exports = User;
