/**
 * Fetches forex rates from the local server API
 * @returns {Promise<Object|null>} - Promise that resolves to forex data or null if error
 */
async function fetchForexRates() {
    try {
        // API endpoint for forex rates
        const apiUrl = 'http://localhost:3000';
        const response = await fetch(`${apiUrl}/api/forex-rates`);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('HTTP error. Status: ' + response.status);
        }

        // Parse the JSON response
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

/**
 * Checks if a given value is an even number
 * @param {number} value - The number to check
 * @returns {boolean} - True if the number is even, false otherwise
 */
function isEven(value) {
    if (!Number.isInteger(value)) return false;
    return value % 2 === 0;
}

/**
 * Checks if the currency is HKD (Hong Kong Dollar)
 * @param {string} currency - The currency code to check
 * @returns {boolean} - True if the currency is HKD, false otherwise
 */
function isHKD(currency) {
    return currency === 'HKD';
}

/**
 * Renders forex rates data in the HTML table
 * @param {Object} data - Object containing currency codes as keys and rates as values
 */
function renderForexRates(data) {
    // Get the table body element and clear existing content
    const tbody = document.getElementById('forex-rates-body');
    tbody.innerHTML = '';

    // Iterate through each currency and its rate
    Object.entries(data).forEach(([currency, rate]) => {
        const row = document.createElement('tr');
        
        // Calculate adjusted rate by adding 10.0002 to the original rate
        const adjustedRate = rate + 10.0002;

        // Check conditions for applying red border styling
        const isEvenResult = isEven(rate) || isEven(adjustedRate)
        const isHKDCurrency = isHKD(currency);
        
        // Apply red border classes if any condition is met:
        // - Original rate or adjusted rate is even
        // - Currency is HKD
        if (isEvenResult || isHKDCurrency) {
            row.classList.add('border-danger', 'border-2');
        }

        // Create table row with currency, original rate, and adjusted rate
        row.innerHTML = `
            <td>${currency}</td>
            <td>${rate.toFixed(4)}</td>
            <td>${adjustedRate.toFixed(4)}</td>
            <td>${isEvenResult}</td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Initializes the application by fetching and displaying forex rates
 */
async function init() {
    // Fetch forex data from the API
    const data = await fetchForexRates();
    
    // If data is successfully retrieved and contains rates, render the table
    if (data && data.rates) {
        renderForexRates(data.rates);
    }
}

/**
 * Event listener for the even number checker functionality
 * Waits for DOM to be fully loaded before setting up event listeners
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements for the even number checker
    const checkButton = document.querySelector('button[type="button"]');
    const inputNumber = document.getElementById('input-number');
    const textResult = document.getElementById('text-result');
    
    // Add click event listener to the check button
    checkButton.addEventListener('click', function() {
        // Parse the input value as a float
        const value = parseFloat(inputNumber.value);
        var message = '';
    
        // Check if the value is an integer (required for even/odd check)
        if (Number.isInteger(value)) {
            // Use the isEven function to determine if the number is even
            const isEvenResult = isEven(value); 
            message = isEvenResult 
                ? `${value} is an even number.` 
                : `${value} is an odd number.`;
        } else {
            // Show error message for non-integer values
            message = 'This value is not an integer.'
        }
        
        // Display the result in the designated text element
        textResult.innerHTML = `
            ${message}
        `;
    });
});

// Start the application
init();
