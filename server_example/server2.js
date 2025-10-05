const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3000;

app.use(express.json());

const db = new sqlite3.Database('./tatapase.db', (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to the database.');
});

db.run(`CREATE TABLE IF NOT EXISTS users  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL, 
    email TEXT NOT NULL
)`);


// GET endpoint
app.get('/api/sensor', (req, res) => {
res.json({
temperature: 22.5,
humidity: 55,
status: "OK"
});
});

app.get('/api/sensor', (req, res) => {
    console.log("inget endpoint");
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
    }
    res.json({
        result: "get to the endpoint get"
    });
    });
});

app.post('/api/users' , (req, res) => {
    console.log("inpost endpoint")
    const { name, email } = req.body;
    db.run (`INSERT INTO users (name, email) VALUES (?, ?)`, [name, email], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            res.status(200).json({id: this.lastID, name, email});
            return;
        }
});


app.listen(port, () => {
console.log(`Server running at
http://localhost:${port}`);
});