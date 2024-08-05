const axios = require('axios');

const BASE_URL = 'https://example.com/weather';

async function cityWeather(city) {
    if (typeof city !== 'string') {
        throw new Error('not a string');
    }

    if (city.trim() === '') {
        throw new Error('string is empty');
    }

    const url = `${BASE_URL}?q=${city}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (response.status === 200) {
            return {
                temp: data.main.temp,
                feels_like: data.main.feels_like,
                temp_min: data.main.temp_min,
                temp_max: data.main.temp_max,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
            };
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error('city not found');
        } else {
            throw new Error('error fetching data');
        }
    }
}

// Example usage (uncomment to test):
// cityWeather('Bogota')
//     .then(data => console.log(data))
//     .catch(err => console.error(err.message));