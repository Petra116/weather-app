const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

let inactivityTimer;

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Function to stop the server
const stopServer = () => {
    console.log('No activity for 30 seconds. Shutting down the server.');
    process.exit(0); // Exit the process
};

// Reset the inactivity timer
const resetInactivityTimer = () => {
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
    }
    inactivityTimer = setTimeout(stopServer, 30000);
};


// Weather route
app.post('/weather', async (req, res) => {
    const city = req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4b28de7dc0cd63fa450071809e1e8770&units=metric`;

    try {
        const response = await axios.get(url);
        const weatherData = response.data;
        res.json(weatherData);
    } catch (error) {
        res.status(404).send('City not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    resetInactivityTimer();
});