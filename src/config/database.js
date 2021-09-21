const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'database-1.cndywyl1g5hh.ap-northeast-2.rds.amazonaws.com',
  user: 'Admin_2U',
  port: '3306',
  password: 'celebtoyou',
  database: 'CelebDB',
});

db.connect();

module.exports = db;
