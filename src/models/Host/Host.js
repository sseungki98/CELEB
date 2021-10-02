'use strict';
const HostStorage = require('./HostStorage');

class Host {
  constructor(body) {
    this.body = body;
  }
  async login() {
    const host = this.body;
    try {
      const hostInfo = await HostStorage.getHostInfo(host.email);
      const hashedPassword = await crypto.createHash('sha512').update(host.password).digest('hex');
      if (hostInfo) {
        if (hostInfo.email === host.email && hostInfo.password === hashedPassword) {
          return { success: true, id: hostInfo.id, name: hostInfo.name };
        }
        return { success: false, message: '비밀번호가 틀렸습니다.' };
      }
      return { success: false, message: '존재하지 않는 아이디입니다.' };
    } catch (err) {
      return { success: false, message: `${err}` };
    }
  }
}

module.exports = Host;
