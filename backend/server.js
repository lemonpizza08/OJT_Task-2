require('dotenv').config(); // This line tells Node to look for the .env file
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Pull the values from process.env
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const PORT = process.env.PORT || 3001;

// Log to verify it's working (Optional but helpful)
console.log("Supabase URL loaded:", SUPABASE_URL ? "YES" : "NO");

// --- 4. GET ROUTE (READING) ---
app.get('/messages', async (req, res) => {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/OJT%20Task%20%232?select=content`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        const data = await response.json();
        res.json(data); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 5. PATCH ROUTE (UPDATING) ---
app.patch('/api/update-message', async (req, res) => {
    try {
        const { updatedText } = req.body; 

        if (!updatedText) {
            return res.status(400).json({ error: "Text is required" });
        }

        const response = await fetch(`${SUPABASE_URL}/rest/v1/OJT%20Task%20%232?id=eq.1`, {
            method: 'PATCH',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({ content: updatedText })
        });

        const data = await response.json();
        console.log("Database updated successfully!");
        res.json({ success: true, newData: data[0] });

    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ error: "Update failed" });
    }
});

// --- 6. START SERVER ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test GET: http://localhost:${PORT}/messages`);
});