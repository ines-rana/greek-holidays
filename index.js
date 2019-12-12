// produce a list of official greek holidays in iCalendar (RFC 5545) format


const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


const moment = require('moment-timezone');	// date manipulation library
      // moment.tz(..., String)     create a moment with a time zone
      // moment().tz(String)        convert the time zone of an existing moment
      // DD/MM/YYYY  D/M/Y          format date with/without zero-padding
      // HH:mm:ss                   format time with zero-padding

const grTZ = 'Europe/Athens';			// timezone in Greece



/* https://tools.ietf.org/html/rfc5545

LOCATION;LANGUAGE=el:Ελλάς
       DTSTART;TZID=America/New_York:19980119T020000
       DTEND;TZID=America/New_York:19980119T030000

DTSTART;TZID=America/New_York:19970105T083000
RRULE:FREQ=YEARLY;INTERVAL=2;BYMONTH=1;BYDAY=SU;BYHOUR=8,9;
 BYMINUTE=30
"every Sunday in January at 8:30 AM and 9:30 AM, every other year"

RRULE:FREQ=YEARLY


       BEGIN:VCALENDAR
       VERSION:2.0
       PRODID:-//hacksw/handcal//NONSGML v1.0//EN
       BEGIN:VEVENT
       UID:19970610T172345Z-AF23B2@example.com
       DTSTAMP:19970610T172345Z
       DTSTART:19970714T170000Z
       DTEND:19970715T040000Z
       SUMMARY:Bastille Day Party
       END:VEVENT
       END:VCALENDAR


Sample calendar:


BEGIN:VEVENT
CLASS:PUBLIC
UID:2019-01-01GR415regcountry@www.officeholidays.com
CREATED:20191118T200338Z
DESCRIPTION: New Year's Day is a public holiday in all countries that observe the Gregorian calendar, with the exception of Israel\n\n\n\nInformation provided by www.officeholidays.com
URL:https://www.officeholidays.com/holidays/greece/international-new-years-day
DTSTART;VALUE=DATE:20190101
DTEND;VALUE=DATE:20190102
DTSTAMP:20080101T000000Z
LOCATION;LANGUAGE=el:Ξ•Ξ»Ξ»Ξ¬Ο‚
PRIORITY:5
SEQUENCE:0
SUMMARY;LANGUAGE=el:Ξ ΟΟ‰Ο„ΞΏΟ‡ΟΞΏΞ½ΞΉΞ¬
TRANSP:OPAQUE
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-DISALLOW-COUNTER:FALSE
X-MS-OLK-ALLOWEXTERNCHECK:TRUE
X-MS-OLK-AUTOFILLLOCATION:FALSE
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-MSNCALENDAR-ALLDAYEVENT:TRUE
X-MS-OLK-CONFTYPE:0
END:VEVENT
*/



// υπολογισμός ημέρας/μήνα του ελληνορθοδόξου Πάσχα για το έτος y
function greek_easter(y){
// η Ελλάδα υιοθέτησε το γρηγοριανό ημερολόγιο το 1923,
// η καθολική Ευρώπη το 1582
if (y<1923 || y>4099){return("year must be between 1923 and 4099");}

var e, y2, G, I, J, L, p, d, m;

e=10
if (y>1600) {
  y2=Math.floor(y/100)
  e=10+y2-16-Math.floor((y2-16)/4)
}
if (y<1583) { e=0 }

G=y%19
I=(19*G+15)%30
J=(y+Math.floor(y/4)+I)%7
L=I-J
p=L+e
d=1+(p+27+Math.floor((p+6)/40))%31
m=3+Math.floor((p+26)/30)

retval = {};
retval["year"]=y; retval["month"]=m; retval["day"]=d;
return retval;
}


// format ts string in local timezone (1997-06-10 20:23:45) as 19970610T172345Z
function ical_timestamp(ts){
  return 
	moment.tz(ts, grTZ)
	.tz("UTC")
	.format('YYYYMMDDTHHmmss') + 'Z'
}












const vcal_header = (function () {/*  
BEGIN:VCALENDAR
VERSION:2.0
PRODID:https://greek-holidays.herokuapp.com/
  Optional parameters: ?from=year1&to=year2
X-WR-CALNAME:Ξ•Ξ»Ξ»Ξ·Ξ½ΞΉΞΊΞ­Ο‚ Ξ±ΟΞ³Ξ―ΞµΟ‚
X-WR-CALDESC:Ξ•Ο€Ξ―ΟƒΞ·ΞΌΞµΟ‚ Ξ±ΟΞ³Ξ―ΞµΟ‚ ΟƒΟ„Ξ·Ξ½ Ξ•Ξ»Ξ»Ξ¬Ξ΄Ξ±
REFRESH-INTERVAL;VALUE=DURATION:PT48H
X-PUBLISHED-TTL:PT48H
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-MS-OLK-FORCEINSPECTOROPEN:TRUE
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

const vcal_footer = 'END:VCALENDAR';

express()
  .disable('x-powered-by')
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
		+ vcal_header + '\n'

		+ now.format('') + '\n' 
		+ now.format('MMMM DD/MM/YYYY HH:mm:ss') + '\n'
+ 'DTSTAMP:19970610T172345Z' + '\n'
		+ 'DTSTAMP:' + ical_timestamp(2018-01-06 00:00:00") + '\n'
		+ 'DTSTAMP:' + now.tz("UTC").format('YYYYMMDDTHHmmss') + 'Z' + '\n'
		+ thisYear + '\n'
		+ req.query.from + '\n'
		+ req.query.to + '\n'
		+ moment.tz("2018-01-01 00:00:00",grTZ).format() + '\n'
		+ moment.tz("2018-01-01 00:00:00",grTZ).format('DD/MM/YYYY HH:mm:ss') + '\n'
		+ moment.tz("2018-01-01 00:00:00",grTZ).tz('UTC').format('DD/MM/YYYY HH:mm:ss') + '\n'

		+ moment.tz("2018-01-01 23:59:59",grTZ).format() + '\n'
		+ moment.tz("2018-01-01 23:59:59",grTZ).format('DD/MM/YYYY HH:mm:ss') + '\n'
		+ moment.tz("2018-01-01 23:59:59",grTZ).tz('UTC').format('DD/MM/YYYY HH:mm:ss') + '\n'


		+ vcal_footer + '\n'
		+ JSON.stringify(greek_easter(req.query.from)) + '\n'
        );
  })
  .listen(PORT  /*, () => console.log(`Listening on ${ PORT }`)*/)



/*
1/1 Πρωτοχρονιά
6/1 Θεοφάνεια
25/3 Εθνική εορτή
1/5 Μετατίθεται σε άλλη εργάσιμη ημέρα,
    εφόσον συμπίπτει με Κυριακή, με ημέρα της Μεγάλης Εβδομάδας
    ή με τη Δευτέρα του Πάσχα
15/8 Κοίμηση της Θεοτόκου
28/10 Εθνική εορτή 
25/12 Χριστούγεννα
26/12 Δεύτερη ημέρα Χριστουγέννων

Πάσχα-48 	Καθαρά Δευτέρα
Πάσχα-2		Μεγάλη Παρασκευή
Πάσχα		Πάσχα
Πάσχα+1  	Δευτέρα του Πάσχα
Πάσχα+50	Αγίου Πνεύματος
*/
