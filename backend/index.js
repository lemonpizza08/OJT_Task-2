const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // <--- CRITICAL: Opens the "package" from curl

const SUPABASE_URL = 'https://rmrosnfijznnhyfwqseb.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtcm9zbmZpanpubmh5Zndxc2ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NjYyNDEsImV4cCI6MjA4ODI0MjI0MX0.iCNrty08nfdPAT4hX5Mup3dwfIHRRUAfrVhguaDeIH0'; 

// 1. THE "READ" ROUTE
app.get('/api/message', async (req, res) => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/OJT%20Task%20%232?select=content`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });
  const data = await response.json();
  res.json(data[0]);
});

// 2. THE "EDIT" ROUTE (This matches your curl command)
app.patch('/api/update-message', async (req, res) => {
  try {
    const { updatedText } = req.body; 

    // This tells Supabase: "Find the row where id = 1 and change the content"
    const response = await fetch(`${SUPABASE_URL}/rest/v1/OJT%20Task%20%232?id=eq.1`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: updatedText })
    });

    console.log("Edit requested for:", updatedText);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});