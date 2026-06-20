const express = require("express");

const router = express.Router();

const db = require("../db");


// ================= GET ALL FAULTS =================
router.get("/", (req, res) => {

  const sql = "SELECT * FROM faults";

  db.query(sql, (err, results) => {

    if(err){

      console.log("MYSQL ERROR:", err);

      return res.status(500).json({
        success:false,
        message:err.message
      });

    }

    res.json(results);

  });

});


// ================= ADD FAULT =================
router.post("/", (req, res) => {

  console.log("BODY:", req.body);

  const {
    reported_by,
    equipment_name,
    fault_type,
    fault_description,
    location,
    fault_date,
    severity,
    status,
    repair_date,
    technician_assigned,
    repair_cost
  } = req.body;

  const sql = `
    INSERT INTO faults
    (
      reported_by,
      equipment_name,
      fault_type,
      fault_description,
      location,
      fault_date,
      severity,
      status,
      repair_date,
      technician_assigned,
      repair_cost
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      reported_by,
      equipment_name,
      fault_type,
      fault_description,
      location,
      fault_date,
      severity,
      status,
      repair_date,
      technician_assigned,
      repair_cost
    ],
    (err, result) => {

      if(err){

        console.log("MYSQL ERROR:", err);

        return res.status(500).json({
          success:false,
          message:err.message
        });

      }

      console.log("INSERT SUCCESS");

      res.json({
        success:true,
        message:"Fault reported successfully"
      });

    }
  );

});


module.exports = router;