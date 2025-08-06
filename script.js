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

function addValueToRates(data) {
    const processedData = data.rates;
    Object.keys(processedData).forEach(key => {
        processedData[key] += 10.002;
    });
    return processedData;
}

function isEven(value) {
    return value % 2 === 0;
}

function isHKD(currency) {
    return currency === 'HKD';
}

function renderForexRates(rates) {
    const tbody = document.getElementById('forex-rates-body');
    tbody.innerHTML = '';
    
    Object.entries(rates).forEach(([currency, rate]) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${currency}</td>
            <td>${rate.toFixed(4)}</td>
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
