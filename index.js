const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const moment = require('moment-timezone');	// date manipulation library

express()
  //.use(express.static(path.join(__dirname, 'public')))
  //.set('views', path.join(__dirname, 'views'))
  //.set('view engine', 'ejs')
  .get('/', (req, res, next) => {
	res.append('Content-Type', 'text/plain');
		// allow XHR calls (CORS)
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET');
	res.append('Access-Control-Allow-Headers', 'Content-Type');

	var now = moment().tz('Europe/Athens');
  	res.send('Hello World 5!\n' +
		now.format('') + '\n' +
		now.format('MMMM MM/DD/YYYY hh:mm:ss a') + '\n' +
		now.format('YYYY') + '\n'
        );
  })
  .listen(PORT  /*, () => console.log(`Listening on ${ PORT }`)*/)
