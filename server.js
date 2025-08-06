const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('.'));

const apiKey = '9sOx2d1gWYZrKY0uD4hCbOMIQzLcL4KQ';
const baseUrl = 'https://api.apilayer.com/fixer/latest';

app.get('/api/forex-rates', async (req, res) => {
    try {
        const response = await fetch(`${baseUrl}`, {
            method: 'GET',
            headers: {
                'apikey': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('HTTP error. Status: ' + response.status);
        }

        const data = await response.json();
        
        if (!data.success) {
            throw new Error('Failed to fetch data. Error: ' + data.error.info);
        }

        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch forex rates' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});