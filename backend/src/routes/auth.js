const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "proxima_secret_key";

console.log("🔥 AUTH ROUTE LOADED SUCCESSFULLY");
// ================= REGISTER =================

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth route working"
  });
});
router.post("/register", async (req, res) => {
  const {
    full_name,
    email,
    password,
    role,
    employee_number
  } = req.body;

  if (!full_name || !email || !password || !employee_number) {
    return res.status(400).json({
      message: "All required fields must be filled"
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      `INSERT INTO users 
      (full_name, email, password, role, employee_number) 
      VALUES (?, ?, ?, ?, ?)`,
      [
        full_name,
        email,
        hashedPassword,
        role || "Worker",
        employee_number
      ],
      (err) => {
        if (err) {
          return res.status(500).json({
            message: err.message
          });
        }

        res.status(201).json({
          success: true,
          message: "User registered successfully"
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ================= LOGIN =================

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      const user = results[0];

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return res.status(401).json({
          message: "Invalid password"
        });
      }

      const token = jwt.sign(
        {
          user_id: user.user_id,
          role: user.role
        },
        SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        success: true,
        token,
        user: {
          user_id: user.user_id,
          full_name: user.full_name,
          role: user.role,
          email: user.email
        }
      });
    }
  );
});

module.exports = router;