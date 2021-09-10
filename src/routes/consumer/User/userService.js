const { pool } = require('../../../../config/database');

//User LogIn Function
exports.userLogin = async function (email, password) {
  const connection = await pool.getConnection(async conn => conn);
  connection.query('Update UserInfo Set isLogin=1 and Where email=? and password=?', [email, password], function (err, result) {
    if (err) {
      connection.release();
      console.log(err);
      res.json({ message: 'LogIn Failure' });
    }
    connection.release();
    res.json({ message: 'LogIn Success' });
  });
};

//User LogOut Function
exports.userLogout = async function (email) {
  const connection = await pool.getConnection(async conn => conn);
  connection.query('Update UserInfo Set isLogin=0 and Where email=?', email, function (err, result) {
    if (err) {
      connection.release();
      console.log(err);
      res.json({ message: 'LogOut Failure' });
    }
    connection.release();
    res.json({ message: 'LogOut Success' });
  });
};
