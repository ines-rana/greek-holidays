const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var moment = require('moment');		// date manipulation library

express()
  //.use(express.static(path.join(__dirname, 'public')))
  //.set('views', path.join(__dirname, 'views'))
  //.set('view engine', 'ejs')
  .get('/', (req, res, next) => {
		// allow XHR calls (CORS)
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET');
	res.append('Access-Control-Allow-Headers', 'Content-Type');

	const now = moment.tz('Europe/Athens');
  	res.send('Hello World 5!\n' +
		now.format('') + '\n' +
		now.format('MMMM MM/DD/YYYY hh:mm:ss a') + '\n' +
		now.format('YYYY') + '\n'
        );
  })
  .listen(PORT  /*, () => console.log(`Listening on ${ PORT }`)*/)
