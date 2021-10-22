'use strict';

const Store = require('../../models/seller/Store/Store');
const StoreStorage = require('../../models/seller/Store/StoreStorage');
const axios = require('axios');
const emt = require('elementTree');

const output = {
  register: (req, res) => {
    res.render('/s/register/');
  },
  licenseNum: (req, res) => {
    res.render('/s/register/licenseNum');
  },
  storePage: async (req, res) => {
    //TODO: code review
    if (req.session.user) {
      try {
        const storeId = req.body.id;
        const myStorePageDetail = await StoreStorage.getStoreDetailByStoreId(storeId);
        if (myStorePageDetail) {
          console.log(getStoreInfo);
          res.render('/s/storePage', { myStorePage: myStorePageDetail });
        } else {
          res.render('common/500error', { success: false, message: '잘못된 접근입니다. ' });
        }
      } catch (err) {
        res.render('common/500error', { success: false, message: err });
      }
    } else {
      res.render('/s/login', { success: false, message: '스토어 로그인이 되어있지 않습니다. ' });
    }
  },
};

const process = {
  licenseNum: async (req, res) => {
    try {
      const reg_no = req.body.licenseNum;
      const rgno = reg_no.replace(/-/g, '');
      const url = 'https://teht.hometax.go.kr/wqAction.do?actionId=ATTABZAA001R08&screenId=UTEABAAA13&popupYn=false&realScreenId=';
      const body =
        '<map id="ATTABZAA001R08"><pubcUserNo/><mobYn>N</mobYn><inqrTrgtClCd>1</inqrTrgtClCd><txprDscmNo>' +
        rgno +
        '</txprDscmNo><dongCode>35</dongCode><psbSearch>Y</psbSearch><map id="userReqInfoVO"/></map>';
      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/xml; charset=UTF-8',
        },
      });
      const etree = emt.XML(response.data);
      const ms = etree.findtext('smpcBmanTrtCntn');
      if (ms == '등록되어 있지 않은 사업자등록번호 입니다. ')
        return res.json({ success: false, message: '국세청에 등록되지 않은 사업자등록번호입니다.' });
      const rgnoResult = await StoreStorage.getLicenseNumberDuplication(rgno);
      if (rgnoResult.exist) return res.json({ success: false, message: '이미 등록된 사업자등록번호입니다.' });
      return res.json({ licenseNum: rgno, message: '사용 가능한 사업자등록번호입니다.' });
    } catch (err) {
      return res.json({ success: false, message: err });
    }
  },
  storePage: async (req, res) => {
    if (req.session.user) {
      try {
        const storeId = req.session.user.id;
        const storeDetail = await StoreStorage.getStoreDetailByStoreId(storeId);
        const name = req.body.name ? req.body.name : storeDetail.name;
        const phoneNum = req.body.phoneNum ? req.body.phoneNum : storeDetail.phoneNum;
        const info = req.body.info ? req.body.info : storeDetail.info;
        const openTime = req.body.openTime ? req.body.openTime : storeDetail.OperatingHour;
        const provinceId = req.body.provinceId ? req.body.provinceId : storeDetail.provinceId;
        const cityId = req.body.cityId ? req.body.cityId : storeDetail.cityId;
        const roadAddress = req.body.roadAddress ? req.body.roadAddress : storeDetail.roadAddress;
        const detailAddress = req.body.detailAddress ? req.body.detailAddress : storeDetail.detailAddress;
        const limit = req.body.limit ? req.body.limit : storeDetail.limit;
        const type = req.body.type ? req.body.type : storeDetail.type;
        const image = req.file ? req.file.location : storeDetail.Image;
        const notice = req.body.notice ? req.body.notice : storeDetail.notice;
        const params = [
          name,
          phoneNum,
          info,
          openTime,
          provinceId,
          cityId,
          roadAddress,
          detailAddress,
          limit,
          type,
          image,
          notice,
          storeId,
        ];
        if (storeDetail) {
          const updateStoreInfo = await StoreStorage.updateStorePageDetail(params);
          return res.json(updateStoreInfo);
        } else {
          return res.json({ success: false, message: '잘못된 접근입니다. ' });
        }
      } catch (err) {
        console.log(err);
        return res.json({ success: false, message: '잘못된 데이터를 입력하였습니다. ' });
      }
    } else {
      return res.json({ success: false, message: '로그인이 되어있지 않습니다.' });
    }
  },
};

module.exports = {
  output,
  process,
};
