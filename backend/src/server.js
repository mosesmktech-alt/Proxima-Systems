const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// API Test
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Proxima Systems Core API is operational"
    });
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/incidents", require("./routes/incidents"));
app.use("/api/faults", require("./routes/faults"));
app.use("/api/ppe", require("./routes/ppe"));
app.use("/api/analytics", require("./routes/analytics"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/departments", require("./routes/departments"));

app.get("/api/admin/users", (req, res) => {
  const db = require("./db");

  db.query(
    "SELECT user_id, full_name, employee_number, role, email, department FROM users",
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});
// Frontend
const frontendPath = path.join(__dirname, "../../frontend");
app.use(express.static(frontendPath));

// Home
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "home.html"));
});

// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`
====================================
🚀 PROXIMA SERVER RUNNING
🌍 http://localhost:${PORT}
====================================
`);
});