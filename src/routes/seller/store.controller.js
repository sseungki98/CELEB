'use strict';

const Store = require('../../models/Store/Store');
const StoreStorage = require('../../models/Store/StoreStorage');
const axios = require('axios');
const emt = require('elementTree');

const output = {
  register: (req, res) => {
    res.render('seller/register');
  },
  licenseNum: (req, res) => {
    res.render('seller/licenseNum');
  },
};

const process = {
  licenseNum: async (req, res) => {
    const reg_no = req.body.licenseNum;
    const rgno = reg_no.replace(/-/g, '');

    const url = 'https://teht.hometax.go.kr/wqAction.do?actionId=ATTABZAA001R08&screenId=UTEABAAA13&popupYn=false&realScreenId=';
    const body =
      '<map id="ATTABZAA001R08"><pubcUserNo/><mobYn>N</mobYn><inqrTrgtClCd>1</inqrTrgtClCd><txprDscmNo>' +
      rgno +
      '</txprDscmNo><dongCode>35</dongCode><psbSearch>Y</psbSearch><map id="userReqInfoVO"/></map>';
    try {
      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/xml; charset=UTF-8',
        },
      });
      const etree = emt.XML(response.data);
      const ms = etree.findtext('smpcBmanTrtCntn');
      if (ms == '등록되어 있지 않은 사업자등록번호 입니다. ') {
        return res.json({ success: false, message: '국세청에 등록되지 않은 사업자등록번호입니다.' });
      }
      return res.json({ licenseNum: rgno, Message: ms });
    } catch (e) {
      console.log(e);
    }
  },
};

module.exports = {
  output,
  process,
};
