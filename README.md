# RoadWise 🚗

RoadWise is an intelligent road trip planning platform that combines route optimization, travel safety analysis, weather-aware insights, and smart halt recommendations using Google Maps APIs and real-time data integrations.

---

## Features

### Intelligent Route Planning
- Multi-route comparison
- Fastest, shortest, and cheapest route analysis
- Multi-stop trip support
- Dynamic route switching
- Route summary visualization

### Travel Safety Intelligence
- Driver fatigue break recommendations
- Weather-aware route alerts
- Fuel range warnings
- Overnight halt optimization

### Smart Recommendations
- Hotel recommendations near midpoint halt
- Restaurant suggestions along the route
- Smart destination recommendation engine

### Productivity Features
- Trip PDF export
- Cloud trip saving with Firebase
- Responsive mobile-first UI
- Dark themed interactive map experience

---

## Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

### APIs & Services
- Google Maps JavaScript API
- Google Directions API
- Google Places API
- OpenWeather API
- Firebase Firestore
- Firebase Authentication

### Libraries
- jsPDF

---

## Architecture

```text
User Input
   ↓
Google Directions API
   ↓
Route Processing Engine
   ↓
Break Point Extraction
   ↓
Geocoding + Weather Analysis
   ↓
Safety & Recommendation Engine
   ↓
UI Rendering + PDF Export