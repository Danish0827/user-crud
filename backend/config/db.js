const mysql = require('mysql2/promise'); // Import promise-based version

  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_management',
    waitForConnections: true
  });

module.exports = pool;
