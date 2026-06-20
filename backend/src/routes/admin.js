const express = require("express");
const router = express.Router();
const db = require("../db");

console.log("🔥 ADMIN ROUTE LOADED");

// ===============================
// GET ADMIN DASHBOARD STATS
// ===============================
router.get("/stats", (req, res) => {
  const query = `
    SELECT 
      (SELECT COUNT(*) FROM users) AS total_users,
      (SELECT COUNT(*) FROM incidents) AS total_incidents,
      (SELECT COUNT(*) FROM incidents WHERE status = 'Pending') AS pending,
      (SELECT COUNT(*) FROM incidents WHERE status = 'Investigating') AS investigating,
      (SELECT COUNT(*) FROM incidents WHERE status = 'Resolved') AS resolved
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json(results[0]);
  });
});

module.exports = router;