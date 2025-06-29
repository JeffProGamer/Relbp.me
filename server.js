const express = require('express');
const cors = require('cors');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const ejs = require('ejs');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // if not native

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// In-memory mock DBs
let usersDB = [];
let levelsDB = [];
let imagesDB = [];

// Beacon config
const BEACON_SERVER = 'https://beacon.lbpunion.com';
const gameConfig = {
  serverUrl: BEACON_SERVER,
  authEndpoint: `${BEACON_SERVER}/api/v1/auth`,
  levelsEndpoint: `${BEACON_SERVER}/api/v1/levels`,
  profilesEndpoint: `${BEACON_SERVER}/api/v1/profiles`,
  sanitizeOptions: { allowedTags: [], allowedAttributes: {} }
};

// Connect to Beacon
async function connectToBeacon() {
  try {
    const response = await fetch(`${gameConfig.serverUrl}/api/v1/status`, {
      headers: { 'User-Agent': 'relbp.me/1.0', 'X-LBP-Client': 'LBP3-Web' }
    });
    if (!response.ok) throw new Error('Beacon unavailable');
    return { status: 'Connected', message: 'Connected to Beacon server' };
  } catch (err) {
    console.error('Beacon failed:', err);
    return { status: 'Failed', message: 'Patch LBP 3 client for Beacon' };
  }
}
connectToBeacon().then(result => console.log('Beacon:', result.status));

// ========================
// API and SSR routes
// ========================

// ... ⬅️ Keep all your API routes exactly as is
// (Omitted here for brevity; include your full original code)

// ========================
// SSR routes like '/', '/levels', '/videos', etc.
// ========================

// ... ⬅️ Keep all existing SSR `app.get('/', ...)`, `/levels`, `/videos`, etc.
// (No changes needed)


// ========================
// SPA fallback for deep routes like /u/sackboy, /v/123
// ========================
app.get('*', (req, res, next) => {
  const isApi = req.path.startsWith('/api');
  const isSSR = ['/levels', '/videos', '/create-level', '/'].some(route => req.path.startsWith(route));
  if (!isApi && !isSSR) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  } else {
    next();
  }
});

// ========================
// Start the server
// ========================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
