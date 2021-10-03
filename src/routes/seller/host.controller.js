'use strict';

const Host = require('../../models/Host/Host');
const HostStorage = require('../../models/Host/HostStorage');

const output = {};

const process = {
  login: async (req, res) => {
    const host = new Host(req.body);
    const response = await host.login();

    if (response.success) {
      req.session.host = {
        id: response.id,
        storeId: req.body.storeId,
        storeName: response.storeName,
        authorized: true,
      };
    }
    console.log(req.session.host);
    return res.json(response);
  },
  register: async (req, res) => {
    if (!req.body.storeId) return res.json({ success: false, message: '스토어 ID을 입력해주세요.' });
    if (!req.body.password) return res.json({ success: false, message: '비밀번호를 입력해주세요.' });
    if (!req.body.storeName) return res.json({ success: false, message: '스토어 이름을 입력해주세요.' });
    if (!req.body.phoneNum) return res.json({ success: false, message: '스토어 연락처를 입력해주세요.' });
    if (!req.body.licenseNum) return res.json({ success: false, message: '사업자 등록번호를 입력해주세요.' });
    if (!req.body.categoryId) return res.json({ success: false, message: '스토어 유형을 선택해주세요.' });
    if (!req.body.provinceId) return res.json({ success: false, message: '지역(도,시)을 선택해주세요.' });
    if (!req.body.cityId) return res.json({ success: false, message: '지역(구)을 선택해주세요.' });
    if (!req.body.detailAddress) return res.json({ success: false, message: '상세 주소를 입력해주세요.' });
    if (!req.body.roadAddress) return res.json({ success: false, message: '도로명 주소를 입력해주세요.' });
    if (!req.body.type) return res.json({ success: false, message: '스토어 배달 유형을 선택해주세요.' });
    const host = new Host(req.body);
    const response = await host.register();
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
