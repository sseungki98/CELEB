'use strict';

const Host = require('../../models/seller/Host/Host');
const HostStorage = require('../../models/seller/Host/HostStorage');
const axios = require('axios');
const emt = require('elementTree');

const output = {
  login: (req, res) => {
    if (req.session.user) {
      res.send("<script>alert('이미 로그인되었습니다.'); location.href='/s';</script>");
    } else {
      res.render('seller/login');
    }
  },
  register: (req, res) => {
    res.render('seller/register');
  },
};

const process = {
  login: async (req, res) => {
    const host = new Host(req.body);
    const response = await host.login();

    if (response.success) {
      req.session.user = {
        id: response.id,
        storeId: req.body.storeId,
        storeName: response.storeName,
        authorized: true,
      };
    }
    return res.json(response);
  },
  logout: async (req, res) => {
    if (req.session.host) {
      req.session.destroy(function (err) {
        if (err) throw err;
        return res.redirect('/s/login');
      });
    } else {
      return res.redirect('/s/login');
    }
  },
  register: async (req, res) => {
    // if (!req.body.storeId) return res.json({ success: false, message: '스토어 ID을 입력해주세요.' });
    // if (!req.body.password) return res.json({ success: false, message: '비밀번호를 입력해주세요.' });
    // if (!req.body.checkpassword) return res.json({ success: false, message: '비밀번호를 확인해주세요.' });
    // if (req.body.password != req.body.checkpassword) return { success: false, message: '비밀번호 확인에 실패하였습니다.' };
    // if (!req.body.storeName) return res.json({ success: false, message: '스토어 이름을 입력해주세요.' });
    // if (!req.body.phoneNum) return res.json({ success: false, message: '스토어 연락처를 입력해주세요.' });
    // if (!req.body.licenseNum) return res.json({ success: false, message: '사업자 등록번호를 입력해주세요.' });
    // if (!req.body.categoryId) return res.json({ success: false, message: '스토어 유형을 선택해주세요.' });
    // if (!req.body.provinceId) return res.json({ success: false, message: '지역(도,시)을 선택해주세요.' });
    // if (!req.body.cityId) return res.json({ success: false, message: '지역(구)을 선택해주세요.' });
    // if (!req.body.detailAddress) return res.json({ success: false, message: '상세 주소를 입력해주세요.' });
    // if (!req.body.roadAddress) return res.json({ success: false, message: '도로명 주소를 입력해주세요.' });
    // if (!req.body.type) return res.json({ success: false, message: '스토어 배달 유형을 선택해주세요.' });
    const host = new Host(req.body);
    const s3ImageLocation = req.file.location;
    const response = await host.register(s3ImageLocation);
    return res.json(response);
  },
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
      const rgnoResult = await HostStorage.getLicenseNumberDuplication(rgno);
      if (rgnoResult.exist) return res.json({ success: false, message: '이미 등록된 사업자등록번호입니다.' });
      return res.json({ licenseNum: rgno, message: '사용 가능한 사업자등록번호입니다.' });
    } catch (err) {
      return res.json({ success: false, message: err });
    }
  },
  /*uploadImage: async (req, res) => {
    try {
      const uploadImageName = req.file.originalname;
      const s3ImageLocation = req.file.location;
      return res.json({ uploadImage: uploadImageName, s3ImageUrl: s3ImageLocation });
    } catch (err) {
      return res.json({ success: false, ErrorCode: err, message: '사진 업로드에 실패하였습니다.' });
    }
  },
  */
};

module.exports = {
  output,
  process,
};
