'user strict';
const UserStorage = require('./UserStorage');

class User {
  constructor(body) {
    this.body = body;
  }
  async login() {
    const client = this.body;
    try {
      const { id, password } = await UserStorage.getUserInfo(client.id);
      if (id) {
        if (id === client.id && password === client.password) {
          return { success: true };
        }
        return { success: false, message: '비밀번호가 틀렸습니다.' };
      }
      return { success: false, message: '존재하지 않는 아이디입니다.' };
    } catch (err) {
      return { success: false, message: err };
    }
  }
}

module.exports = User;
