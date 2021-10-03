'use strict';
const HostStorage = require('./HostStorage');

class Host {
  constructor(body) {
    this.body = body;
  }
  async login() {
    const host = this.body;
    try {
      const hostInfo = await HostStorage.getHostInfo(host.storeId);
      const hashedPassword = await crypto.createHash('sha512').update(host.password).digest('hex');
      if (hostInfo) {
        if (hostInfo.storeId === host.storeId && hostInfo.password === hashedPassword) {
          return { success: true, id: hostInfo.id, storeName: hostInfo.storeName };
        }
        return { success: false, message: '비밀번호가 틀렸습니다.' };
      }
      return { success: false, message: '존재하지 않는 아이디입니다.' };
    } catch (err) {
      return { success: false, message: `${err}` };
    }
  }
  async register() {
    const host = this.body;
    try {
      const storeIdcheck = await HostStorage.getHostInfo(host.storeId);
      if (storeIdcheck) return { success: false, message: '중복된 ID입니다.' };
      if (host.password != host.checkpassowrd) return { success: false, message: '비밀번호 확인에 실패하였습니다.' };
      const hashedPassword = await crypto.createHash('sha512').update(host.password).digest('hex'); //비밀번호 암호화
      const params = [
        host.storeId,
        hashedPassword,
        host.storeName,
        host.imageUrl,
        host.info,
        host.phoneNum,
        host.categoryId,
        host.provinceId,
        host.cityId,
        host.roadAddress,
        host.detailAddress,
        host.type,
        host.licenseNum,
        host.openTime,
        host.closeTime,
        host.limit,
      ];
      await HostStorage.postStoreInfo(params);
      return { success: true, message: '스토어 회원가입이 완료되었습니다.' };
    } catch (err) {
      console.log(err);
      return { success: false, message: '스토어 회원가입에 실패하였습니다.' };
    }
  }
}

module.exports = Host;
