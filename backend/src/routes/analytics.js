const express = require("express");
const router = express.Router();
const db = require("../db");

console.log("📊 ANALYTICS ROUTE LOADED");

// ===============================
// INCIDENT STATS
// ===============================
router.get("/incidents", (req, res) => {
  const query = `
    SELECT 
      COUNT(*) AS total_incidents,

      SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pending,
      SUM(CASE WHEN status = 'Investigating' THEN 1 ELSE 0 END) AS investigating,
      SUM(CASE WHEN status = 'Resolved' THEN 1 ELSE 0 END) AS resolved,
      SUM(CASE WHEN status = 'Closed' THEN 1 ELSE 0 END) AS closed,

      SUM(CASE WHEN severity_level = 'High' OR severity_level = 'Critical' THEN 1 ELSE 0 END) AS high_risk

    FROM incidents
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json(results[0]);
  });
});

// ===============================
// USERS STATS
// ===============================
router.get("/users", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS total_users FROM users",
    (err, results) => {
      if (err) return res.status(500).json(err);

      res.json(results[0]);
    }
  );
});

module.exports = router;