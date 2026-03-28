# SmartCampus IoT Sensor Simulator

A real-time IoT sensor simulator web application that simulates water meters, energy meters, and occupancy sensors, sending telemetry data to ThingsBoard Cloud.

## Features

✨ **Interactive Sensor Simulation**
- Water Meter Simulator
- Energy Meter Simulator
- Occupancy Sensor Simulator
- Real-time data visualization

🌐 **ThingsBoard Integration**
- Direct integration with ThingsBoard Cloud
- Telemetry data streaming
- Device token management

🎨 **Modern UI**
- Dark theme with cyan/purple aesthetics
- Responsive design
- Interactive sliders and controls
- Live notifications

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Axios)
- **Backend**: Node.js, Express.js
- **Deployment**: Vercel
- **IoT Platform**: ThingsBoard Cloud

## Local Development

### Prerequisites
- Node.js 14+
- npm

### Setup

```bash
# Install dependencies
npm install

# Start the development server
npm run server

# Visit http://localhost:3000
```

### Desktop App (Electron)

```bash
# Run as desktop app
npm run electron

# Build Windows installer
npm run build
```

## API Endpoints

### POST /telemetry
Send sensor data to ThingsBoard

**Body:**
```json
{
  "deviceType": "Water meter",
  "payload": {
    "temperature": 25.5,
    "humidity": 60
  }
}
```

### GET /health
Health check endpoint

## Registered Devices

- 💧 Water meter: `Xa4zWzy71YsykLT6TadF`
- ⚡ Energy meter: `gJ1XrUj1hBzWcrzN1lbp`
- 👥 Occupancy sensor: `yQlWLS3iBRXxkREstrYV`

## Deployment

### Vercel Deployment

The app automatically deploys to Vercel when code is pushed to the `main` branch via GitHub Actions.

### Railway Alternative

```bash
# Create new Railway project from GitHub repo
# Railway will auto-detect Node.js and deploy
```

## Environment Variables

```env
PORT=3000
NODE_ENV=production
THINGSBOARD_HOST=https://thingsboard.cloud
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

ISC
