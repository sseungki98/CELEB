const mysql = require('mysql2/promise');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
  host: 'database-1.cndywyl1g5hh.ap-northeast-2.rds.amazonaws.com',
  user: 'Admin_2U',
  port: '3306',
  password: 'celebtoyou',
  database: 'Database schema',
});

module.exports = {
  pool: pool,
};
