const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const moment = require('moment-timezone');	// date manipulation library

express()
  //.use(express.static(path.join(__dirname, 'public')))
  //.set('views', path.join(__dirname, 'views'))
  //.set('view engine', 'ejs')
  .get('/', (req, res, next) => {
	res.append('Content-Type', 'text/plain; charset=utf-8');
		// allow XHR calls (CORS)
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET');
	res.append('Access-Control-Allow-Headers', 'Content-Type');

	var now = moment().tz('Europe/Athens');
	const thisYear=now.format('YYYY');

  	res.send(''
		+ now.format('') + '\n' 
		+ now.format('MMMM MM/DD/YYYY hh:mm:ss a') + '\n'
		+ thisYear + '\n'
		+ req.query.from + '\n'
		+ req.query.to + '\n'
		+ moment("2018-01-01T000000").tz('Europe/Athens').format() + '\n'
		+ moment("2018-01-01T000000").tz('Europe/Athens').format('MM/DD/YYYY hh:mm:ss') + '\n'
        );
  })
  .listen(PORT  /*, () => console.log(`Listening on ${ PORT }`)*/)
