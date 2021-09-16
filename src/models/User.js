'user strict';
const UserStorage = require('./UserStorage');
const crypto = require('crypto');

class User {
  constructor(body) {
    this.body = body;
  }
  async login() {
    const client = this.body;
    try {
      const userInfo = await UserStorage.getUserInfo(client.id);
      const hashedPassword = await crypto.createHash('sha512').update(client.password).digest('hex'); //암호화된 비밀번호 확인
      console.log(userInfo);
      if (userInfo) {
        if (userInfo.id === client.id && userInfo.password === hashedPassword) {
          return { success: true, message: 'CELEB에 오신걸 환영합니다.' };
        }
        return { success: false, message: '비밀번호가 틀렸습니다.' };
      }
      return { success: false, message: '존재하지 않는 아이디입니다.' };
    } catch (err) {
      return { success: false, message: `${err}` };
    }
  }
  async signUp() {
    const client = this.body;
    try {
      const hashedPassword = await crypto.createHash('sha512').update(client.password).digest('hex'); //비밀번호 암호화
      const params = [client.email, hashedPassword, client.nickname, client.phoneNum, client.address];
      const userInfo = await UserStorage.postUserInfo(params);
      return { success: true, message: '회원가입이 완료되었습니다.' };
    } catch (err) {
      return { success: false, message: '회원가입에 실패하였습니다.' };
    }
  }
}

module.exports = User;
