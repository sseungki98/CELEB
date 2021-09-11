const { pool } = require('../../../../config/database');
const jwt = require('jsonwebtoken');
const secret_config = require('../../../config/jwtSecretKey');

//User LogIn Function
exports.userLogin = async function (emailAddress, password) {
  const connection = await pool.getConnection(async conn => conn);
  connection.query('Update UserInfo Set isLogin=1 and Where email=? and password=?', [emailAddress, password], function (err, result) {
    if (err) {
      connection.release();
      console.log(err);
      res.json({ message: 'LogIn Failure', isSuccess: false });
    }
    connection.release();
  });
  //토큰 생성
  let token = await jwt.sign(
    {
      email: emailAddress,
    },
    // 토큰 payload
    secret_config.jwtsecret, // 비밀키
    {
      expiresIn: '365d', //토큰 유효기간 365day
      subject: 'userInfo',
    },
  );
  res.json({ message: 'LogIn Success', email: emailAddress, jwt: token, isSuccess: true });
};

//User LogOut Function
exports.userLogout = async function (email) {
  const connection = await pool.getConnection(async conn => conn);
  connection.query('Update UserInfo Set isLogin=0 and Where email=?', email, function (err, result) {
    if (err) {
      connection.release();
      console.log(err);
      res.json({ message: 'LogOut Failure', isSuccess: false });
    }
    connection.release();
    res.json({ message: 'LogOut Success', isSuccess: true });
  });
};

//User SignUp Function
exports.userSignUp = async function (email, password, name, phoneNumber, address) {
  const connection = await pool.getConnection(async conn => conn);
  const params = [email, password, name, phoneNumber, address];
  connection.query('Insert Into UserInfo(email, password, name, phoneNumber, address) Values(?,?,?,?,?)', params, function (err, result) {
    if (err) {
      connection.release();
      console.log(err);
      res.json({ message: 'Sign-Up Failure', isSuccess: false });
    }
    connection.release();
    res.json({ message: 'Sign-Up Success', isSuccess: true });
  });
};
