'user strict';
const UserStorage = require('./UserStorage');

class User {
  constructor(body) {
    this.body = body;
  }
  async login() {
    const client = this.body;
    try {
      const userInfo = await UserStorage.getUserInfo(client.id);
      console.log(userInfo);
      if (userInfo) {
        if (userInfo.id === client.id && userInfo.password === client.password) {
          return { success: true };
        }
        return { success: false, message: '비밀번호가 틀렸습니다.' };
      }
      return { success: false, message: '존재하지 않는 아이디입니다.' };
    } catch (err) {
      return { success: false, message: `${err}` };
    }
  }
}

module.exports = User;
