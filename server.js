const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Weather route
app.post('/weather', async (req, res) => {
    const city = req.body.city;
    const apiKey = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
});