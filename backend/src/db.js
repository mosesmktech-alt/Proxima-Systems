const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "112020mk",
  database: "proxima_db"
});

console.log("✅ MySQL Pool Ready");

module.exports = db;