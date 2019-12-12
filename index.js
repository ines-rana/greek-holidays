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

LOCATION;LANGUAGE=el:�����
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
LOCATION;LANGUAGE=el:Ελλάς
PRIORITY:5
SEQUENCE:0
SUMMARY;LANGUAGE=el:Πρωτοχρονιά
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



// ����������� ������/���� ��� �������������� ����� ��� �� ���� y
function greek_easter(y){
// � ������ ��������� �� ���������� ���������� �� 1923,
// � �������� ������ �� 1582
if (y<1923 || y>4099){return("year must be between 1923 and 4099");}

var retval = {};
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

retval["year"]=y; retval["month"]=m; retval["day"]=d;
return retval;
}


// format date string in local timezone (1997-01-06) as 19970105T220000Z
function ical_datestr(ts){
  var td = moment.tz(ts +" 00:00:00", grTZ);
  return td.tz("UTC").format('YYYYMMDDTHHmmss') + 'Z'
}






function holidays(y){
var ey = greek_easter(y)
console.log("00 ey"); console.log(ey);
var tm, tobj={}
var list = new Array();

tobj.y=y

tobj.d=1;  tobj.m=1;  tobj.t="Πρωτοχρονιά"; list.push(tobj)
tobj.d=6;  tobj.m=1;  tobj.t="Θεοφάνεια"; list.push(tobj)
tobj.d=25; tobj.m=3;  tobj.t="Εθνική εορτή"; list.push(tobj)
tobj.d=15; tobj.m=8;  tobj.t="Κοίμηση της Θεοτόκου"; list.push(tobj)
tobj.d=28; tobj.m=10; tobj.t="Εθνική εορτή "; list.push(tobj)
tobj.d=25; tobj.m=12; tobj.t="Χριστούγεννα"; list.push(tobj)
tobj.d=26; tobj.m=12; tobj.t="Δεύτερη ημέρα Χριστουγέννων"; list.push(tobj)


var easterMoment = moment.tz("2018-01-01 12:00:00",grTZ);
console.log("10", easterMoment.format());
console.log("12", ey.y, ey.m, ey.d);
easterMoment.year(ey.y)
easterMoment.set("month",ey.m-1)	// month: 0-11
easterMoment.set("date",ey.d)
console.log("15", easterMoment.format());


tm = easterMoment
tobj.d=tm.date(); tobj.m=tm.month(); tobj.t="Πάσχα"; list.push(tobj)

tm = easterMoment.subtract(48,"days")
tobj.d=tm.date(); tobj.m=tm.month(); tobj.t="Καθαρά Δευτέρα"; list.push(tobj)

tm = easterMoment.subtract(2,"days")
tobj.d=tm.date(); tobj.m=tm.month(); tobj.t="Μεγάλη Παρασκευή"; list.push(tobj)

tm = easterMoment.add(1,"days")
tobj.d=tm.date(); tobj.m=tm.month(); tobj.t="Δευτέρα του Πάσχα"; list.push(tobj)

tm = easterMoment.add(50,"days")
console.log(tm.format());
tobj={y:2021}
tobj.d=tm.date(); tobj.m=tm.month(); tobj.t="Αγίου Πνεύματος"; list.push(tobj)



//1/5 Πρωτομαγιά
//    Μετατίθεται σε άλλη εργάσιμη ημέρα,
//    εφόσον συμπίπτει με Κυριακή, με ημέρα της Μεγάλης Εβδομάδας
//    ή με τη Δευτέρα του Πάσχα

return list
}







const vcal_header = (function () {/*  
BEGIN:VCALENDAR
VERSION:2.0
PRODID:https://greek-holidays.herokuapp.com/
  Optional parameters: ?from=year1&to=year2
X-WR-CALNAME:Ελληνικές αργίες
X-WR-CALDESC:Επίσημες αργίες στην Ελλάδα
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
		+ 'DTSTAMP:' + ical_datestr("1997-01-06") + '\n'
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
		+ JSON.stringify(holidays(req.query.from)) + '\n'
        );
  })
  .listen(PORT  /*, () => console.log(`Listening on ${ PORT }`)*/)


