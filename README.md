# Safe trip Rio de Janeiro

Navigate Rio de Janeiro safely with real-time risk zones, safety alerts, and tourist information.

## Features

- 🗺️ Interactive Google Maps with risk zones (low, medium, high)
- 🚨 Real-time safety alerts
- 📍 Tourist spots with safety ratings
- 🌍 Multi-language support (Portuguese/English)
- 📱 Responsive design

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure Google Maps API:**
   - Get your API key at [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
   - Enable Maps JavaScript API
   - Create a `.env` file in the root:
   ```
   VITE_GOOGLE_MAPS_KEY=your_google_maps_api_key_here
   ```

3. **Run locally:**
```bash
npm run dev
```

## Environment Variables

Add `VITE_GOOGLE_MAPS_KEY` to your environment variables in Lovable project settings or create a `.env` file locally.

## Technologies

- React + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Google Maps API
- i18next (internationalization)

---

© 2025 Safe trip Rio de Janeiro
