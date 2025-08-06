const apiKey = process.env.API_KEY;
const baseUrl = 'https://api.apilayer.com/fixer/latest';

async function fetchForexRates() {
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

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

function addValueToRates(data) {
    const processedData = data.rates;
    processedData.forEach(item => {
        item.rate += 10002;
    });
    return processedData;
}

function isEven(value) {
    return value % 2 === 0;
}

function isHKD(currency) {
    return currency === 'HKD';
}


init();
