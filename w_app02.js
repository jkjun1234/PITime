let Weather = require('kma-js').Weather;
let kmaUtils = require('kma-js').Kma;

kmaUtils.convertBcode('37.49543016888596', '127.03781811461468')
    .then(data => console.log(data));
Weather.townWeather('37.49543016888596', '127.03781811461468').then(data => console.log(data));
