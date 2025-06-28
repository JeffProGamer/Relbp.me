// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // serve static files from /public folder

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
