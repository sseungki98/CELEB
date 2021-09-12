const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'database-1.cndywyl1g5hh.ap-northeast-2.rds.amazonaws.com',
  user: 'Admin_2U',
  port: '3306',
  password: 'celebtoyou',
  database: 'celeb',
});

module.exports = {
  pool: pool,
};
