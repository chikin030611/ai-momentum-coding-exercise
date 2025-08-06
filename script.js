async function fetchForexRates() {
    try {
        const apiUrl = 'http://localhost:3000';
        const response = await fetch(`${apiUrl}/api/forex-rates`);

        if (!response.ok) {
            throw new Error('HTTP error. Status: ' + response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

function processRates(data) {
    // Returns an array of objects: [{ currency, rate, adjustedRate }]
    if (!data || !data.rates) return [];
    const processed = [];
    Object.entries(data.rates).forEach(([currency, rate]) => {
        processed.push({
            currency: currency,
            rate: rate,
            adjustedRate: rate + 10.002
        });
    });
    return processed;
}

function isEven(value) {
    return value % 2 === 0;
}

function isHKD(currency) {
    return currency === 'HKD';
}

function renderForexRates(data) {
    const tbody = document.getElementById('forex-rates-body');
    tbody.innerHTML = '';

    
    Object.entries(data).forEach(([currency, rate]) => {
        const row = document.createElement('tr');

        const adjustedRate = rate + 10.0002

        row.innerHTML = `
            <td>${currency}</td>
            <td>${rate.toFixed(4)}</td>
            <td>${adjustedRate.toFixed(4)}</td>
        `;
        tbody.appendChild(row);
    });
}

async function init() {
    const data = await fetchForexRates();
    if (data && data.rates) {
        renderForexRates(data.rates);
    }
}

init();
