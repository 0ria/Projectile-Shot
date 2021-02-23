const EXPRESS = require('express');
const PATH = require('path');
const APP = EXPRESS();

//set the port
APP.set('port', 8080);

//tell express that we want to use the www folder
//for our static assets
APP.use(EXPRESS.static(PATH.join(__dirname, '../node_modules')));
APP.use(EXPRESS.static(PATH.join(__dirname, '../src')));
APP.use(EXPRESS.static(PATH.join(__dirname, '../test')));
APP.use(EXPRESS.static(PATH.join(__dirname, '../www')));
APP.use(EXPRESS.static(PATH.join(__dirname, '../img')));

// Listen for requests
const SERVER = APP.listen(APP.get('port'), '0.0.0.0', function () {
  console.log('The server is running on http://<your machine IP addr>:' + APP.get('port'));
});