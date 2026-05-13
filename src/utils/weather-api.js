// All functions are pure functions

const weatherApi = {
    getLocalWeather: () => {
        // Fetches local weather data using the browser's Geolocation API and the free Open-Meteo API.
        // Returns a Promise resolving to an object matching the app's weather state shape.
        if (typeof navigator === 'undefined' || !navigator.geolocation) {
            return Promise.reject(new Error('Geolocation API not available'));
        }

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const altitudeMeters = position.coords.altitude;
                    const altitudeFeet = altitudeMeters !== null ? Math.round(altitudeMeters * 3.28084) : null;
                    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,wind_direction_10m&timezone=auto`;

                    fetch(url)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`Open-Meteo API returned status ${response.status}`);
                            }
                            return response.json();
                        })
                        .then((data) => {
                            const current = data.current;
                            const temperatureF = Math.round((current.temperature_2m * 9 / 5) + 32);
                            const pressureHg = Math.round(current.pressure_msl * 0.02953 * 100) / 100;
                            const humidity = current.relative_humidity_2m;
                            const windMph = Math.round(current.wind_speed_10m * 0.621371);
                            const windAngle = Math.abs(current.wind_direction_10m % 180 - 90);

                            resolve({
                                altitudeFeet: altitudeFeet, // null if GPS altitude unavailable
                                latitudeDegrees: lat,
                                temperatureDegreesFahrenheit: temperatureF,
                                barometricPressureInchesHg: pressureHg,
                                relativeHumidityPercent: humidity,
                                windVelocityMph: windMph,
                                windAngleDegrees: windAngle
                            });
                        })
                        .catch(reject);
                },
                (error) => {
                    reject(new Error(`Geolocation error: ${error.message}`));
                }
            );
        });
    }
}

export default weatherApi;
