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
      const userInfo = await UserStorage.getUserInfo(client.email);
      const hashedPassword = await crypto.createHash('sha512').update(client.password).digest('hex');
      if (userInfo) {
        if (userInfo.email === client.email && userInfo.password === hashedPassword) {
          return { success: true, id: userInfo.id, name: userInfo.name };
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
      const emailcheck = await UserStorage.getUserInfo(client.email);
      if (emailcheck) return { success: false, message: '중복된 이메일입니다.' };
      if (client.password != client.checkpassowrd) return { success: false, message: '비밀번호 확인에 실패하였습니다.' };
      const hashedPassword = await crypto.createHash('sha512').update(client.password).digest('hex'); //비밀번호 암호화
      const params = [client.email, hashedPassword, client.name, client.phoneNum, client.address];
      await UserStorage.register(params);
      return { success: true, message: '회원가입이 완료되었습니다.' };
    } catch (err) {
      console.log(err);
      return { success: false, message: '회원가입에 실패하였습니다.' };
    }
  }
  async popularStore() {
    try {
      const popularStoreInfo = await UserStorage.getPopularStoreInfo();
      return popularStoreInfo;
    } catch (err) {
      return { success: false, message: '인기매장 조회에 실패하였습니다.' };
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
