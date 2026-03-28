const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────
//  Device Token Registry
//  Map UI device names → ThingsBoard access tokens
// ─────────────────────────────────────────────
const DEVICE_TOKENS = {
  "Water meter":      "Xa4zWzy71YsykLT6TadF",
  "Energy meter":     "gJ1XrUj1hBzWcrzN1lbp",
  "Occupancy sensor": "yQlWLS3iBRXxkREstrYV"
};

const THINGSBOARD_HOST = "https://thingsboard.cloud";

// ─────────────────────────────────────────────
//  POST /telemetry
//  Body: { deviceType, payload }
// ─────────────────────────────────────────────
app.post('/telemetry', async (req, res) => {
  const { deviceType, payload } = req.body;

  if (!deviceType || !payload) {
    return res.status(400).json({
      success: false,
      error: "Missing deviceType or payload in request body."
    });
  }

  const token = DEVICE_TOKENS[deviceType];
  if (!token) {
    return res.status(400).json({
      success: false,
      error: `Unknown device type: "${deviceType}". Valid types: ${Object.keys(DEVICE_TOKENS).join(', ')}`
    });
  }

  const url = `${THINGSBOARD_HOST}/api/v1/${token}/telemetry`;

  try {
    console.log(`\n[->] Sending telemetry for "${deviceType}"`);
    console.log(`     URL    : ${url}`);
    console.log(`     Payload: ${JSON.stringify(payload)}`);

    const response = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 8000
    });

    console.log(`[OK] ThingsBoard responded: ${response.status}`);
    return res.json({ success: true, status: response.status });

  } catch (err) {
    const status  = err.response?.status;
    const message = err.response?.data || err.message;
    console.error(`[FAIL] ThingsBoard error ${status}:`, message);
    return res.status(500).json({
      success: false,
      error: `ThingsBoard responded with ${status || 'no response'}: ${JSON.stringify(message)}`
    });
  }
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', devices: Object.keys(DEVICE_TOKENS) });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('SmartCampus IoT Proxy running at http://localhost:' + PORT);
  console.log('Registered devices:');
  Object.entries(DEVICE_TOKENS).forEach(([name, token]) => {
    console.log(`  ${name} -> ${token}`);
  });
});