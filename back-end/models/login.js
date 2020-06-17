class Login {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async login() {
    return { email: this.email, password: this.password };
  }
}

module.exports = Login;
