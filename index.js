const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


const moment = require('moment-timezone');	// date manipulation library
      // moment.tz(..., String)     create a moment with a time zone
      // moment().tz(String)        convert the time zone of an existing moment
      // DD/MM/YYYY  D/M/Y          format date with/without zero-padding
      // HH:mm:ss                   format time with zero-padding

const grTZ = 'Europe/Athens';			// timezone in Greece


const vcal_header = (function () {/*  
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Office Holidays Ltd.//EN
X-WR-CALNAME:��������� ������
X-WR-CALDESC:�������� ������ ���� ������
REFRESH-INTERVAL;VALUE=DURATION:PT48H
X-PUBLISHED-TTL:PT48H
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-MS-OLK-FORCEINSPECTOROPEN:TRUE
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

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

	var now = moment().tz(grTZ);
	const thisYear=now.format('YYYY');

  	res.send(''
		+ now.format('') + '\n' 
		+ now.format('MMMM DD/MM/YYYY HH:mm:ss') + '\n'
		+ thisYear + '\n'
		+ req.query.from + '\n'
		+ req.query.to + '\n'
		+ moment.tz("2018-01-01 00:00:00",grTZ).format() + '\n'
		+ moment.tz("2018-01-01 00:00:00",grTZ).format('DD/MM/YYYY HH:mm:ss') + '\n'
		+ moment.tz("2018-01-01 00:00:00",grTZ).tz('UTC').format('DD/MM/YYYY HH:mm:ss') + '\n'

		+ moment.tz("2018-01-01 23:59:59",grTZ).format() + '\n'
		+ moment.tz("2018-01-01 23:59:59",grTZ).format('DD/MM/YYYY HH:mm:ss') + '\n'
		+ moment.tz("2018-01-01 23:59:59",grTZ).tz('UTC').format('DD/MM/YYYY HH:mm:ss') + '\n'

		+ vcal_header + '\n'
        );
  })
  .listen(PORT  /*, () => console.log(`Listening on ${ PORT }`)*/)
