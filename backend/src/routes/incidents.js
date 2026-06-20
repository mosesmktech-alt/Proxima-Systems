const express = require("express");
const router = express.Router();
const db = require("../db");

console.log("🔥 INCIDENTS ROUTE LOADED");

// ===============================
// GET ALL INCIDENTS
// ===============================
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM incidents ORDER BY incident_id DESC",
    (err, results) => {
      if (err) {
        console.error("Error fetching incidents:", err);
        return res.status(500).json(err);
      }

      res.json(results);
    }
  );
});

// ===============================
// GET SINGLE INCIDENT
// ===============================
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM incidents WHERE incident_id = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        console.error("Error fetching incident:", err);
        return res.status(500).json(err);
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Incident not found"
        });
      }

      res.json(results[0]);
    }
  );
});

// ===============================
// CREATE INCIDENT
// ===============================
router.post("/", (req, res) => {
  const {
    reported_by,
    incident_type,
    description,
    location,
    incident_date,
    status,
    severity_level
  } = req.body;

  db.query(
    `INSERT INTO incidents 
    (reported_by, incident_type, description, location, incident_date, status, severity_level)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      reported_by,
      incident_type,
      description,
      location,
      incident_date,
      status || "Pending",
      severity_level || "Medium"
    ],
    (err, result) => {
      if (err) {
        console.error("Error creating incident:", err);
        return res.status(500).json(err);
      }

      res.status(201).json({
        success: true,
        message: "Incident created successfully",
        incident_id: result.insertId
      });
    }
  );
});

// ===============================
// UPDATE INCIDENT
// ===============================
router.put("/:id", (req, res) => {
  const {
    incident_type,
    description,
    location,
    status,
    severity_level
  } = req.body;

  db.query(
    `UPDATE incidents
     SET incident_type = ?, description = ?, location = ?, status = ?, severity_level = ?
     WHERE incident_id = ?`,
    [
      incident_type,
      description,
      location,
      status,
      severity_level,
      req.params.id
    ],
    (err) => {
      if (err) {
        console.error("Error updating incident:", err);
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Incident updated successfully"
      });
    }
  );
});

// ===============================
// DELETE INCIDENT
// ===============================
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM incidents WHERE incident_id = ?",
    [req.params.id],
    (err) => {
      if (err) {
        console.error("Error deleting incident:", err);
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Incident deleted successfully"
      });
    }
  );
});

// ===============================
// WORKFLOW: UPDATE STATUS
// Pending → Investigating → Resolved → Closed
// ===============================
router.put("/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    "Pending",
    "Investigating",
    "Resolved",
    "Closed"
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status value"
    });
  }

  db.query(
    "UPDATE incidents SET status = ? WHERE incident_id = ?",
    [status, id],
    (err) => {
      if (err) {
        console.error("Status update error:", err);
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: `Incident updated to ${status}`
      });
    }
  );
});

module.exports = router;