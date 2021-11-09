'use strict';

const Host = require('../../models/seller/Host/Host');
const HostStorage = require('../../models/seller/Host/HostStorage');
const axios = require('axios');
const emt = require('elementTree');

const output = {
  login: (req, res) => {
    if (req.session.store) {
      res.send("<script>alert('이미 로그인되었습니다.'); location.href='/s';</script>");
    } else {
      res.render('seller/login');
    }
  },
  register: (req, res) => {
    res.render('seller/register', { layout: 'seller/layout' });
  },
};

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
    return res.json(response);
  },
  logout: async (req, res) => {
    if (req.session.host) {
      req.session.destroy(function (err) {
        if (err) throw err;
        return res.redirect('/s/login', { layout: 'seller/layout' });
      });
    } else {
      return res.redirect('/s/login', { layout: 'seller/layout' });
    }
  },
  register: async (req, res) => {
    const host = new Host(req.body);
    const s3ImageLocation = req.file.location;
    const response = await host.register(s3ImageLocation);
    return res.json(response);
  },
  licenseNum: async (req, res) => {
    const host = new Host(req.body);
    const response = await host.checkLicenseNumber();

    return response;
  },
};

module.exports = {
  output,
  process,
};
