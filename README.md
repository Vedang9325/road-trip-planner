# 🚗 RoadWise — Intelligent Road Trip Planning Platform

RoadWise is a smart road trip planning web application designed to help users plan long-distance journeys efficiently using real-time routing, fuel estimation, weather intelligence, halt recommendations, and route analytics.

Built with Google Maps APIs, Firebase, and JavaScript, the platform focuses on practical travel optimization and real-world usability.

---

# 🌐 Live Demo

```
https://road-tr.netlify.app
```

---

# ✨ Features

## 🗺 Smart Route Planning

* Multi-route comparison (fastest, shortest, cheapest)
* Real-time Google Maps route rendering
* Route switching with live visualization
* Multi-stop trip support
* Route summaries and highway information

---

## ⛽ Fuel & Budget Intelligence

* Fuel requirement estimation
* Trip fuel cost calculation
* Remaining budget tracking
* Vehicle mileage-based calculations
* Smart fuel refill alerts for long routes

---

## 🌙 Intelligent Overnight Halt Recommendations

* Distance-aware overnight halt detection
* Highway hotel discovery using Google Places API
* Hotel ratings and Google Maps navigation links
* Practical route-based halt recommendations

---

## ☕ Smart Break Planning

* Automatic fatigue-aware break suggestions
* Route checkpoint generation
* Suggested refreshment stop locations

---

## 🌦 Route Weather Intelligence

* Destination weather forecasting
* Route weather alerts
* Rain / fog / heat warnings
* Dynamic packing & safety checklist generation

---

## 🍴 Restaurant Discovery

* Automatic food stop recommendations
* Nearby restaurant discovery along route
* Google Maps navigation support

---

## 📍 Current Location Integration

* One-click current location autofill
* Browser geolocation integration
* Reverse geocoding support

---

## 🔐 Authentication & Privacy

* Firebase Google Authentication
* Cloud trip saving
* Privacy Mode (local-only session mode)
* Session-based trip management

---

## 📄 Additional Features

* Trip PDF export
* Shareable trip links
* Recent trip history
* Notes system
* Dynamic destination recommendation engine

---

# 🛠 Tech Stack

## Frontend

* HTML5
* CSS3
* Vanilla JavaScript

## APIs & Services

* Google Maps JavaScript API
* Google Directions API
* Google Places API
* Google Geocoding API
* OpenWeather API
* Firebase Authentication
* Firebase Firestore

## Deployment

* Netlify

---

# 🧠 Engineering Challenges Solved

## Intelligent Halt Recommendation System

Initially, overnight halts were generated using simple route midpoints, which produced impractical rural locations.

The system was redesigned to:

* analyze actual driven route distance
* generate route-aware halt checkpoints
* search hotels directly near the active route corridor
* prioritize practical highway-accessible stops

---

## Multi-Route Comparison Engine

Implemented route parsing and normalization using Google Directions API alternatives to compare:

* distance
* duration
* fuel usage
* estimated trip cost

---

## Dynamic Route Weather Monitoring

Built a checkpoint-based weather monitoring system that evaluates weather conditions across different segments of long-distance journeys.

---

## Shareable Trip Architecture

Implemented URL-based trip parameter encoding for generating shareable trip planning links.

---

# 🔒 Security Features

* Firebase Authentication integration
* Cloud trip ownership isolation
* Privacy Mode support
* API key restrictions
* Firebase security rule implementation
* Secure HTTPS deployment via Netlify

---

# 📸 Screenshots

Add screenshots here:

```
assets/screenshots/
```

Suggested screenshots:

* Homepage
* Route comparison cards
* Overnight halt recommendations
* Weather alerts
* Mobile UI
* Route map view

---

# 🚀 Future Improvements

* AI-based fatigue prediction
* Toll cost integration
* Live traffic intelligence
* Route risk scoring
* EV charging station support
* Voice-assisted trip planning
* Offline trip caching

---

# 🧪 Local Setup

```
git clone <repository-url>

cd roadwise

open index.html
```

---

# 👨‍💻 Author

```
Vedang Satardekar
B.Tech Computer Engineering
Minor in Cybersecurity
```

---

# 📌 Project Status

```
Actively developed and deployed.
```
