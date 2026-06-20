const express = require("express");
const router = express.Router();
const db = require("../db");

console.log("🔥 Departments Route Loaded");

// ================= TEST =================

router.get("/test/ping", (req, res) => {

    res.json({
        success: true,
        message: "Departments route working"
    });

});

// ================= GET ALL =================

router.get("/", (req, res) => {

    db.query(
        "SELECT * FROM departments ORDER BY department_name ASC",
        (err, results) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            res.json(results);

        }
    );

});

// ================= GET ONE =================

router.get("/:id", (req, res) => {

    db.query(
        "SELECT * FROM departments WHERE id=?",
        [req.params.id],
        (err, results) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (results.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Department not found"
                });

            }

            res.json(results[0]);

        }
    );

});

// ================= CREATE =================

router.post("/", (req, res) => {

    const {
        department_name,
        description
    } = req.body;

    db.query(
        "INSERT INTO departments (department_name, description) VALUES (?, ?)",
        [
            department_name,
            description
        ],
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            res.status(201).json({
                success: true,
                id: result.insertId
            });

        }
    );

});

// ================= UPDATE =================

router.put("/:id", (req, res) => {

    const {
        department_name,
        description
    } = req.body;

    db.query(
        "UPDATE departments SET department_name=?, description=? WHERE id=?",
        [
            department_name,
            description,
            req.params.id
        ],
        (err) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            res.json({
                success: true,
                message: "Department updated"
            });

        }
    );

});

// ================= DELETE =================

router.delete("/:id", (req, res) => {

    db.query(
        "DELETE FROM departments WHERE id=?",
        [req.params.id],
        (err) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            res.json({
                success: true,
                message: "Department deleted"
            });

        }
    );

});

module.exports = router;