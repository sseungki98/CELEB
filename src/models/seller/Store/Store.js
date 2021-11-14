'use strict';
const StoreStorage = require('./StoreStorage');
const crypto = require('crypto');
const axios = require('axios');
const emt = require('elementTree');

class Store {
  constructor(body) {
    this.body = body;
  }
  async updateStoreDetail(storeId, imageUrl) {
    const params = [
      this.body.name,
      this.body.phoneNum,
      this.body.info,
      this.body.openTime,
      this.body.provinceId,
      this.body.cityId,
      this.body.roadAddress,
      this.body.detailAddress,
      this.body.limit,
      this.body.type,
      imageUrl,
      this.body.notice,
      storeId,
    ];
    try {
      await StoreStorage.updateStoreDetail(params);
      return { success: true };
    } catch (err) {
      return { success: false, message: `${err}` };
    }
  }
  async login() {
    const store = this.body;
    try {
      const storeDetail = await StoreStorage.getStoreDetail(store.email);
      const hashedPassword = await crypto.createHash('sha512').update(store.password).digest('hex');
      if (storeDetail) {
        if (storeDetail.storeId === store.email && storeDetail.password === hashedPassword) {
          return { success: true, id: storeDetail.id, storeName: storeDetail.storeName, storeImage: storeDetail.imageUrl };
        }
        return { success: false, message: '비밀번호가 틀렸습니다.' };
      }
      return { success: false, message: '존재하지 않는 아이디입니다.' };
    } catch (err) {
      return { success: false, message: `${err}` };
    }
  }
  async register(imageUrl) {
    const store = this.body;
    try {
      const storeIdcheck = await StoreStorage.getStoreDetail(store.storeId);
      if (storeIdcheck) return { success: false, message: '중복된 ID입니다.' };
      const hashedPassword = await crypto.createHash('sha512').update(store.password).digest('hex'); //비밀번호 암호화
      const params = [
        store.storeId,
        hashedPassword,
        store.storeName,
        imageUrl,
        store.info,
        store.phoneNum,
        store.categoryId,
        store.provinceId,
        store.cityId,
        store.roadAddress,
        store.detailAddress,
        store.type,
        store.licenseNum,
        store.openTime,
        store.limit,
      ];
      await StoreStorage.registerStore(params);
      return { success: true, message: '스토어 회원가입이 완료되었습니다.' };
    } catch (err) {
      console.log(err);
      return { success: false, message: '스토어 회원가입에 실패하였습니다.' };
    }
  }
  async checkLicenseNumber() {
    const reg_no = this.body.licenseNum;
    const rgno = reg_no.replace(/-/g, '');
    const url = 'https://teht.hometax.go.kr/wqAction.do?actionId=ATTABZAA001R08&screenId=UTEABAAA13&popupYn=false&realScreenId=';
    const body =
      '<map id="ATTABZAA001R08"><pubcUserNo/><mobYn>N</mobYn><inqrTrgtClCd>1</inqrTrgtClCd><txprDscmNo>' +
      rgno +
      '</txprDscmNo><dongCode>35</dongCode><psbSearch>Y</psbSearch><map id="userReqInfoVO"/></map>';
    const result = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/xml; charset=UTF-8',
      },
    });
    const etree = emt.XML(result.data);
    const ms = etree.findtext('smpcBmanTrtCntn');
    if (ms == '등록되어 있지 않은 사업자등록번호 입니다. ')
      return { success: false, message: '국세청에 등록되지 않은 사업자등록번호입니다.' };

    const rgnoResult = await StoreStorage.getLicenseNumberDuplication(rgno);
    if (rgnoResult.exist) return { success: false, message: '이미 등록된 사업자등록번호입니다.' };

    return { success: false, licenseNum: rgno, message: '사용 가능한 사업자등록번호입니다.' };
  }
}

module.exports = Store;
