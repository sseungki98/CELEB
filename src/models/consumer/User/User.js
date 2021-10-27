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
      const user = await UserStorage.getUserInfo(client.email);
      const hashedPassword = await crypto.createHash('sha512').update(client.password).digest('hex');
      if (user) {
        if (user.email === client.email && user.password === hashedPassword) {
          return { success: true, id: user.id, name: user.name };
        }
        return { success: false, message: '비밀번호가 틀렸습니다.' };
      }
      return { success: false, message: '존재하지 않는 아이디입니다.' };
    } catch (err) {
      return { success: false, message: `${err}` };
    }
  }
  async register() {
    const client = this.body;
    try {
      const emailcheck = await UserStorage.getUserDetail(client.email);
      if (emailcheck) return { success: false, message: '중복된 이메일입니다.' };
      if (client.password != client.checkpassword) return { success: false, message: '비밀번호 확인에 실패하였습니다.' };
      const hashedPassword = await crypto.createHash('sha512').update(client.password).digest('hex'); //비밀번호 암호화
      const params = [client.email, hashedPassword, client.name, client.phoneNum, client.address];
      await UserStorage.register(params);
      return { success: true, message: '회원가입이 완료되었습니다.' };
    } catch (err) {
      console.log(err);
      return { success: false, message: '회원가입에 실패하였습니다.' };
    }
  }
  async inquiry(id, storeId, productId, type, contents) {
    try {
      await UserStorage.postInquiry(id, storeId, productId, type, contents);
      return { success: true, message: '문의 게시가 완료되었습니다. ' };
    } catch (err) {
      console.log(err);
      return { success: false, message: '문의 게시에 실패하였습니다. ' };
    }
  }
}
module.exports = User;
