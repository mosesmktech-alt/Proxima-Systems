const db = require("../db");
const bcrypt = require("bcryptjs");

console.log("🔧 Starting password migration...");

db.query("SELECT user_id, password FROM users", async (err, users) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  for (const user of users) {
    const password = user.password;

    // Skip already hashed passwords
    if (password.startsWith("$2a$")) {
      console.log(`✔ User ${user.user_id} already hashed`);
      continue;
    }

    // Convert plain password → bcrypt
    const hashed = await bcrypt.hash(password, 10);

    db.query(
      "UPDATE users SET password = ? WHERE user_id = ?",
      [hashed, user.user_id],
      (err2) => {
        if (err2) {
          console.error(`❌ Failed user ${user.user_id}`);
        } else {
          console.log(`✔ Fixed user ${user.user_id}`);
        }
      }
    );
  }

  console.log("🎉 Password migration complete!");
});