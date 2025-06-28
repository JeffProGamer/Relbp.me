const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Optional: Basic API route
app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Handle SPA routing (e.g., /u/sackboy, /v/123)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
