
class Login {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async doLogin(user, password) {
   
    return {user, password}
  }
}

module.exports = Login;
