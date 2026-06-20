const express = require("express");
const router = express.Router();
const db = require("../db");

console.log("✅ PPE Route Loaded");

// ================= GET ALL PPE =================

router.get("/", (req, res) => {

    db.query(
        "SELECT * FROM ppe ORDER BY ppe_id DESC",
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);

        }
    );

});

// ================= ADD PPE =================

router.post("/", (req, res) => {

    const {
        ppe_name,
        category,
        quantity_available,
        expiry_date
    } = req.body;

    db.query(
        `
        INSERT INTO ppe
        (
            ppe_name,
            category,
            quantity_available,
            expiry_date
        )
        VALUES (?, ?, ?, ?)
        `,
        [
            ppe_name,
            category,
            quantity_available,
            expiry_date
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                ppe_id: result.insertId
            });

        }
    );

});

// ================= DELETE PPE =================

router.delete("/:id", (req, res) => {

    db.query(
        "DELETE FROM ppe WHERE ppe_id=?",
        [req.params.id],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "PPE deleted"
            });

        }
    );

});

module.exports = router;