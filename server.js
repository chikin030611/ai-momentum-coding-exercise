const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); 
const dotenv = require('dotenv');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('.'));

dotenv.config()

// API configuration for Fixer.io forex rates service
const apiKey = process.env.API_KEY;
const baseUrl = process.env.BASE_URL;

/**
 * API endpoint to fetch forex rates from Fixer.io
 * GET /api/forex-rates
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get('/api/forex-rates', async (req, res) => {
    try {
        console.log("Fetching data...")

        // Make HTTP request to Fixer.io API
        const response = await fetch(`${baseUrl}`, {
            method: 'GET',
            headers: {
                'apikey': apiKey  // Include API key in headers for authentication
            }
        });

        // Check if the HTTP response is successful
        if (!response.ok) {
            throw new Error('HTTP error. Status: ' + response.status);
        }

        // Parse the JSON response from the API
        const data = await response.json();
        
        // Check if the API response indicates success
        if (!data.success) {
            throw new Error('Failed to fetch data. Error: ' + data.error.info);
        }

        // Send the forex data back to the client
        res.json(data);
        console.log('Data is successfully fetched!')
    } catch (error) {
        // Log the error and send a 500 status with error message
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch forex rates' });
    }
});

/**
 * Start the Express server
 * Listens on the specified port and logs the server URL
 */
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});