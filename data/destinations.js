const destinations = [

    {
        name: "Goa",
        state: "Goa",
        vibes: ["beach", "nightlife", "relaxation"],
        budget: "medium",
        weather: ["hot", "pleasant"],
        bestSeason: ["winter"],
        idealTripDays: 4,
        distance: 590,
        roadQuality: "excellent",
        safetyScore: 8.5,
        foodFamousFor: ["seafood", "bebinca"],
        tags: ["coastal", "scenic", "party"]
    },

    {
        name: "Gokarna",
        state: "Karnataka",
        vibes: ["beach", "peaceful", "nature"],
        budget: "medium",
        weather: ["hot"],
        bestSeason: ["winter"],
        idealTripDays: 3,
        distance: 700,
        roadQuality: "good",
        safetyScore: 8.2,
        foodFamousFor: ["seafood", "south indian"],
        tags: ["coastal", "quiet", "backpacking"]
    },

    {
        name: "Tarkarli",
        state: "Maharashtra",
        vibes: ["beach", "relaxation"],
        budget: "low",
        weather: ["hot"],
        bestSeason: ["winter"],
        idealTripDays: 3,
        distance: 520,
        roadQuality: "good",
        safetyScore: 8.0,
        foodFamousFor: ["malvani", "seafood"],
        tags: ["scuba", "coastal", "peaceful"]
    },

    {
        name: "Alibaug",
        state: "Maharashtra",
        vibes: ["beach", "weekend"],
        budget: "medium",
        weather: ["pleasant"],
        bestSeason: ["winter", "monsoon"],
        idealTripDays: 2,
        distance: 95,
        roadQuality: "excellent",
        safetyScore: 8.8,
        foodFamousFor: ["seafood", "kokani"],
        tags: ["quick-trip", "coastal"]
    },

    {
        name: "Pondicherry",
        state: "Tamil Nadu",
        vibes: ["beach", "cafes", "heritage"],
        budget: "medium",
        weather: ["hot"],
        bestSeason: ["winter"],
        idealTripDays: 4,
        distance: 1350,
        roadQuality: "good",
        safetyScore: 8.7,
        foodFamousFor: ["french cuisine", "seafood"],
        tags: ["colonial", "cafes", "coastal"]
    },

    {
        name: "Mahabaleshwar",
        state: "Maharashtra",
        vibes: ["mountains", "nature", "relaxation"],
        budget: "medium",
        weather: ["cold", "pleasant"],
        bestSeason: ["winter", "monsoon"],
        idealTripDays: 3,
        distance: 260,
        roadQuality: "excellent",
        safetyScore: 9.0,
        foodFamousFor: ["strawberries", "corn"],
        tags: ["hill-station", "scenic"]
    },

    {
        name: "Lonavala",
        state: "Maharashtra",
        vibes: ["nature", "weekend", "mountains"],
        budget: "low",
        weather: ["pleasant", "monsoon"],
        bestSeason: ["monsoon"],
        idealTripDays: 2,
        distance: 85,
        roadQuality: "excellent",
        safetyScore: 9.2,
        foodFamousFor: ["chikki", "vada pav"],
        tags: ["quick-trip", "hill-station"]
    },

    {
        name: "Munnar",
        state: "Kerala",
        vibes: ["nature", "mountains", "relaxation"],
        budget: "medium",
        weather: ["cold"],
        bestSeason: ["winter"],
        idealTripDays: 4,
        distance: 1450,
        roadQuality: "good",
        safetyScore: 8.9,
        foodFamousFor: ["kerala meals", "tea"],
        tags: ["tea-estates", "scenic"]
    },

    {
        name: "Coorg",
        state: "Karnataka",
        vibes: ["nature", "mountains"],
        budget: "medium",
        weather: ["pleasant"],
        bestSeason: ["winter"],
        idealTripDays: 4,
        distance: 980,
        roadQuality: "good",
        safetyScore: 8.7,
        foodFamousFor: ["coffee", "kodava cuisine"],
        tags: ["coffee", "waterfalls"]
    },

    {
        name: "Ooty",
        state: "Tamil Nadu",
        vibes: ["mountains", "nature"],
        budget: "medium",
        weather: ["cold"],
        bestSeason: ["winter"],
        idealTripDays: 4,
        distance: 1200,
        roadQuality: "good",
        safetyScore: 8.6,
        foodFamousFor: ["homemade chocolates", "tea"],
        tags: ["hill-station", "family"]
    },

    {
        name: "Jaipur",
        state: "Rajasthan",
        vibes: ["heritage", "luxury", "culture"],
        budget: "high",
        weather: ["hot"],
        bestSeason: ["winter"],
        idealTripDays: 4,
        distance: 1150,
        roadQuality: "excellent",
        safetyScore: 8.4,
        foodFamousFor: ["dal bati", "ghewar"],
        tags: ["forts", "palaces"]
    },

    {
        name: "Udaipur",
        state: "Rajasthan",
        vibes: ["heritage", "romantic"],
        budget: "high",
        weather: ["pleasant"],
        bestSeason: ["winter"],
        idealTripDays: 4,
        distance: 760,
        roadQuality: "excellent",
        safetyScore: 8.8,
        foodFamousFor: ["rajasthani thali"],
        tags: ["lakes", "luxury"]
    },

    {
        name: "Hampi",
        state: "Karnataka",
        vibes: ["heritage", "adventure"],
        budget: "low",
        weather: ["hot"],
        bestSeason: ["winter"],
        idealTripDays: 3,
        distance: 720,
        roadQuality: "average",
        safetyScore: 7.9,
        foodFamousFor: ["south indian"],
        tags: ["ruins", "history"]
    },

    {
        name: "Rishikesh",
        state: "Uttarakhand",
        vibes: ["spiritual", "adventure", "nature"],
        budget: "medium",
        weather: ["cold"],
        bestSeason: ["winter"],
        idealTripDays: 5,
        distance: 1700,
        roadQuality: "good",
        safetyScore: 8.3,
        foodFamousFor: ["north indian", "cafes"],
        tags: ["rafting", "yoga"]
    },

    {
        name: "Leh",
        state: "Ladakh",
        vibes: ["adventure", "mountains"],
        budget: "high",
        weather: ["cold"],
        bestSeason: ["summer"],
        idealTripDays: 7,
        distance: 2400,
        roadQuality: "challenging",
        safetyScore: 7.5,
        foodFamousFor: ["thukpa", "momos"],
        tags: ["biking", "high-altitude"]
    },

    {
        name: "Spiti Valley",
        state: "Himachal Pradesh",
        vibes: ["adventure", "mountains", "nature"],
        budget: "high",
        weather: ["cold"],
        bestSeason: ["summer"],
        idealTripDays: 8,
        distance: 2200,
        roadQuality: "challenging",
        safetyScore: 7.3,
        foodFamousFor: ["himachali food"],
        tags: ["remote", "roadtrip"]
    },

    {
        name: "Shillong",
        state: "Meghalaya",
        vibes: ["nature", "mountains"],
        budget: "medium",
        weather: ["pleasant"],
        bestSeason: ["monsoon"],
        idealTripDays: 5,
        distance: 2900,
        roadQuality: "good",
        safetyScore: 8.4,
        foodFamousFor: ["northeast cuisine"],
        tags: ["waterfalls", "greenery"]
    },

    {
        name: "Varanasi",
        state: "Uttar Pradesh",
        vibes: ["spiritual", "heritage"],
        budget: "low",
        weather: ["hot"],
        bestSeason: ["winter"],
        idealTripDays: 4,
        distance: 1500,
        roadQuality: "average",
        safetyScore: 7.8,
        foodFamousFor: ["kachori", "lassi"],
        tags: ["ghats", "temples"]
    },

    {
        name: "Andaman",
        state: "Andaman & Nicobar",
        vibes: ["beach", "adventure", "luxury"],
        budget: "high",
        weather: ["pleasant"],
        bestSeason: ["winter"],
        idealTripDays: 6,
        distance: 2500,
        roadQuality: "flight-required",
        safetyScore: 9.0,
        foodFamousFor: ["seafood"],
        tags: ["islands", "scuba"]
    },

    {
        name: "Wayanad",
        state: "Kerala",
        vibes: ["nature", "mountains"],
        budget: "medium",
        weather: ["pleasant"],
        bestSeason: ["monsoon"],
        idealTripDays: 4,
        distance: 1100,
        roadQuality: "good",
        safetyScore: 8.6,
        foodFamousFor: ["kerala cuisine"],
        tags: ["forest", "waterfalls"]
    }

];