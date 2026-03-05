// db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'messages.db'); // database file in backend folder
const db = new sqlite3.Database(dbPath);

// Create table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT
    )
  `);

  // Insert "I love T.I.P" if table is empty
  db.get("SELECT COUNT(*) AS count FROM messages", (err, row) => {
    if (row.count === 0) {
      db.run(`INSERT INTO messages (content) VALUES (?)`, ["I love T.I.P"]);
    }
  });
});

module.exports = db;