
class Login {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async login(email, password) {
   
    return {email, password}
  }
}

module.exports = Login;
