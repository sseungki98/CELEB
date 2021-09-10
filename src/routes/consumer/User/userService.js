const { pool } = require('../../../../config/database');

//User LogIn Function
exports.userLogin = async function (email, password) {
  const connection = await pool.getConnection(async conn => conn);
  connection.query('Update UserInfo Set isLogin=1 and Where email=? and password=?', [email, password], function (err, result) {
    if (err) throw error;
    connection.release();
    return result;
  });
};
exports.userLogin = async function (email) {};
