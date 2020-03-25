// produce a list of official greek holidays in iCalendar (RFC 5545) format
// Content-Type: text/calendar; charset="UTF-8"

//	Î‘Î½ Ï‡ÏÎµÎ¹Î¬Î¶ÎµÏƒÎ±Î¹ Î¼Î¹Î± Ï€Î·Î³Î® Î±ÏÎ³Î¹ÏŽÎ½ ÏƒÎµ Î¼Î¿ÏÏ†Î® iCalendar Ï‡ÏÎ·ÏƒÎ¹Î¼Î¿Ï€Î¿Î¯Î·ÏƒÎµ Ï„Î¿
//	 
//	https://greek-holidays.herokuapp.com
//	      (Î±ÏÎ³Î¯ÎµÏ‚ Î³Î¹Î± Ï„Î¿ Ï„ÏÎ­Ï‡Î¿Î½ Î­Ï„Î¿Ï‚ ÎºÎ±Î¹ 5 Î­Ï„Î· Î¼Ï€ÏÎ¿ÏƒÏ„Î¬/Ï€Î¯ÏƒÏ‰)
//			Î®
//	https://greek-holidays.herokuapp.com?from=2017&to=2021
//	      (Î±ÏÎ³Î¯ÎµÏ‚ Î³Î¹Î± Ï„Î± ÎºÎ±Î¸Î¿ÏÎ¹Î¶ÏŒÎ¼ÎµÎ½Î± Î­Ï„Î·)
//	 
//	ÎœÏ€Î¿ÏÎµÎ¯Ï‚ Î½Î± Ï„Î¹Ï‚ Î´ÎµÎ¹Ï‚ ÎºÎ±Î¹ ÏƒÎµ Î­Î½Î± (Î¬Î´ÎµÎ¹Î¿) Î´Ï…Î½Î±Î¼Î¹ÎºÏŒ Î·Î¼ÎµÏÎ¿Î»ÏŒÎ³Î¹Î¿
//	
//	https://i-cal.herokuapp.com/calendar.html




const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


const moment = require('moment-timezone');	// date manipulation library
      // moment.tz(..., String)     create a moment with a time zone
      // moment().tz(String)        convert the time zone of an existing moment
      // DD/MM/YYYY  D/M/Y          format date with/without zero-padding
      // HH:mm:ss                   format time with zero-padding

const grTZ = 'Europe/Athens';			// timezone in Greece


const uuidv1 = require('uuid/v1');		// uuidv1();



// Ï…Ï€Î¿Î»Î¿Î³Î¹ÏƒÎ¼ÏŒÏ‚ Î·Î¼Î­ÏÎ±Ï‚/Î¼Î®Î½Î± Ï„Î¿Ï… ÎµÎ»Î»Î·Î½Î¿ÏÎ¸Î¿Î´ÏŒÎ¾Î¿Ï… Î Î¬ÏƒÏ‡Î± Î³Î¹Î± Ï„Î¿ Î­Ï„Î¿Ï‚ y
function greek_easter(y){
// Î· Î•Î»Î»Î¬Î´Î± Ï…Î¹Î¿Î¸Î­Ï„Î·ÏƒÎµ Ï„Î¿ Î³ÏÎ·Î³Î¿ÏÎ¹Î±Î½ÏŒ Î·Î¼ÎµÏÎ¿Î»ÏŒÎ³Î¹Î¿ Ï„Î¿ 1923,
// Î· ÎºÎ±Î¸Î¿Î»Î¹ÎºÎ® Î•Ï…ÏÏŽÏ€Î· Ï„Î¿ 1582
if (y<1923 || y>4099){return("year must be between 1923 and 4099");}

var retval = {};
var e=0, y2=0, G=0, I=0, J=0, L=0, p=0, d=0, m=0;

e=10
if (y>1600) {
  y2=Math.floor(y/100)
  e=10+y2-16-Math.floor((y2-16)/4)
}
if (y<1583) { e=0 }

G=y%19
I= (19*G+15)%30
J= (y+ (Math.floor(y/4)) +I) % 7
L=I-J
p=L+e
d=1+(p+27+Math.floor((p+6)/40))%31
m=3+Math.floor((p+26)/30)

retval["year"]=y; retval["month"]=m; retval["date"]=d;
return retval;
}





// format date string in local timezone (1997-01-06) as 19970105T220000Z
function ical_datestr(ts){
  var td = moment.tz(ts +" 00:00:00", grTZ);
  //return td.tz("UTC").format('YYYYMMDDTHHmmss') + 'Z'
  return td.tz("EET").format('YYYYMMDDTHHmmss')
}






function holidays(y){
var ey = greek_easter(Number(y))
var tm, tobj={}
var list = new Array();

function add_one(ad, am, at){
  var tobj={}; tobj.y=y; tobj.m=am; tobj.d=ad; tobj.t=at; list.push(tobj)
}

add_one(1, 1, "Î ÏÏ‰Ï„Î¿Ï‡ÏÎ¿Î½Î¹Î¬");
add_one(6, 1, "Î˜ÎµÎ¿Ï†Î¬Î½ÎµÎ¹Î±");
add_one(25, 3, "Î•Î¸Î½Î¹ÎºÎ® ÎµÎ¿ÏÏ„Î®")
add_one(15, 8, "ÎšÎ¿Î¯Î¼Î·ÏƒÎ· Ï„Î·Ï‚ Î˜ÎµÎ¿Ï„ÏŒÎºÎ¿Ï…")
add_one(28, 10, "Î•Î¸Î½Î¹ÎºÎ® ÎµÎ¿ÏÏ„Î® ")
add_one(25, 12, "Î§ÏÎ¹ÏƒÏ„Î¿ÏÎ³ÎµÎ½Î½Î±")
add_one(26, 12, "Î”ÎµÏÏ„ÎµÏÎ· Î·Î¼Î­ÏÎ± Î§ÏÎ¹ÏƒÏ„Î¿Ï…Î³Î­Î½Î½Ï‰Î½")


var easterMoment = moment.tz({year:2000}, grTZ);	// dummy date
easterMoment.year(ey.year)
easterMoment.set("month",ey.month-1)	// month: 0-11
easterMoment.set("date",ey.date)


tm = moment(easterMoment)	// clone moment
add_one(tm.date(), tm.month()+1, "Î Î¬ÏƒÏ‡Î±")

tm = moment(easterMoment).subtract(48,"days")
add_one(tm.date(), tm.month()+1, "ÎšÎ±Î¸Î±ÏÎ¬ Î”ÎµÏ…Ï„Î­ÏÎ±")

tm = moment(easterMoment).subtract(2,"days")
add_one(tm.date(), tm.month()+1, "ÎœÎµÎ³Î¬Î»Î· Î Î±ÏÎ±ÏƒÎºÎµÏ…Î®")

tm = moment(easterMoment).add(1,"days")
add_one(tm.date(), tm.month()+1, "Î”ÎµÏ…Ï„Î­ÏÎ± Ï„Î¿Ï… Î Î¬ÏƒÏ‡Î±")

tm = moment(easterMoment).add(50,"days")
add_one(tm.date(), tm.month()+1, "Î‘Î³Î¯Î¿Ï… Î Î½ÎµÏÎ¼Î±Ï„Î¿Ï‚")



//1/5 Î ÏÏ‰Ï„Î¿Î¼Î±Î³Î¹Î¬
//    ÎœÎµÏ„Î±Ï„Î¯Î¸ÎµÏ„Î±Î¹ ÏƒÎµ Î¬Î»Î»Î· ÎµÏÎ³Î¬ÏƒÎ¹Î¼Î· Î·Î¼Î­ÏÎ±,
//    ÎµÏ†ÏŒÏƒÎ¿Î½ ÏƒÏ…Î¼Ï€Î¯Ï€Ï„ÎµÎ¹ Î¼Îµ ÎšÏ…ÏÎ¹Î±ÎºÎ®, Î¼Îµ Î·Î¼Î­ÏÎ± Ï„Î·Ï‚ ÎœÎµÎ³Î¬Î»Î·Ï‚ Î•Î²Î´Î¿Î¼Î¬Î´Î±Ï‚
//    Î® Î¼Îµ Ï„Î· Î”ÎµÏ…Ï„Î­ÏÎ± Ï„Î¿Ï… Î Î¬ÏƒÏ‡Î±
//    Î .Ï‡. Ï„Î¿ 2013 Î· Î ÏÏ‰Ï„Î¿Î¼Î±Î³Î¹Î¬ Î¼ÎµÏ„Î±Ï„Î­Î¸Î·ÎºÎµ Î³Î¹Î± Ï„Î·Î½ Î¤ÏÎ¯Ï„Î· Ï„Î¿Ï… Î Î¬ÏƒÏ‡Î±,
//    ÎµÎ½ÏŽ Ï„Î¿ 2001 Ï€Î®Î³Îµ 2 ÎœÎ±ÎÎ¿Ï…
var pmMoment = moment.tz({year:2000}, grTZ);	// dummy date
pmMoment.year(ey.year)
pmMoment.set("month",5 -1)	// month: 0-11
pmMoment.set("date",1)
if ( pmMoment.dayOfYear() >= moment(easterMoment).subtract(6,"days").dayOfYear()
     && pmMoment.dayOfYear() <= moment(easterMoment).add(1,"days").dayOfYear() )
{
  tm = moment(easterMoment).add(2,"days")	// Î¤ÏÎ¯Ï„Î· Ï„Î¿Ï… Î Î¬ÏƒÏ‡Î±
  add_one(tm.date(), tm.month()+1, "Î ÏÏ‰Ï„Î¿Î¼Î±Î³Î¹Î¬")
} else {
    if ( pmMoment.day() == 0 ) {  // 0-6  : Sunday-Saturday
      add_one(2, 5, "Î ÏÏ‰Ï„Î¿Î¼Î±Î³Î¹Î¬")
    } else {
      add_one(1, 5, "Î ÏÏ‰Ï„Î¿Î¼Î±Î³Î¹Î¬")
    }
}


return list
}






const vcal_header = (function () {/*BEGIN:VCALENDAR
VERSION:2.0
PRODID:https://greek-holidays.herokuapp.com/
  Optional parameters: ?from=year1&to=year2
X-WR-CALNAME;LANGUAGE=el:Î•Î»Î»Î·Î½Î¹ÎºÎ­Ï‚ Î±ÏÎ³Î¯ÎµÏ‚
X-WR-CALDESC;LANGUAGE=el:Î•Ï€Î¯ÏƒÎ·Î¼ÎµÏ‚ Î±ÏÎ³Î¯ÎµÏ‚ ÏƒÏ„Î·Î½ Î•Î»Î»Î¬Î´Î±
REFRESH-INTERVAL;VALUE=DURATION:PT48H
X-PUBLISHED-TTL:PT48H
CALSCALE:GREGORIAN
METHOD:PUBLISH
LOCATION;LANGUAGE=el:Î•Î»Î»Î¬Ï‚
BEGIN:VTIMEZONE
TZID:Europe/Athens
TZURL:http://tzurl.org/zoneinfo-outlook/Europe/Athens
X-LIC-LOCATION:Europe/Athens
BEGIN:DAYLIGHT
TZOFFSETFROM:+0200
TZOFFSETTO:+0300
TZNAME:EEST
DTSTART:19700329T030000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:+0300
TZOFFSETTO:+0200
TZNAME:EET
DTSTART:19701025T040000
RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
END:STANDARD
END:VTIMEZONE
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

const vcal_event = (function () {/*BEGIN:VEVENT
DESCRIPTION;LANGUAGE=el:description
SUMMARY;LANGUAGE=el:summary
DTSTART:dtstart
DTEND:dtend
COMMENT;LANGUAGE=el:comment
UID:uid
DTSTAMP:dtstamp
END:VEVENT*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

const vcal_footer = '\nEND:VCALENDAR\r';




express()
  .disable('x-powered-by')
  //.use(express.static(path.join(__dirname, 'public')))
  //.set('views', path.join(__dirname, 'views'))
  //.set('view engine', 'ejs')
  .get('/', (req, res, next) => {
	res.append('Content-Type', 'text/calendar; charset=utf-8');
		// allow XHR calls (CORS)
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET');
	res.append('Access-Control-Allow-Headers', 'Content-Type');

	var now = moment().tz(grTZ);
	const thisYear=Number(now.format('YYYY'));

	var fromYear = Number(req.query.from)
	var   toYear = Number(req.query.to)
	if (isNaN(fromYear) && isNaN(toYear)) {
		fromYear=thisYear - 5; toYear=thisYear + 5
	} else {
		if (isNaN(toYear)) { toYear = thisYear }
		if (isNaN(fromYear)) { fromYear = thisYear }
	}
	if (fromYear > toYear) {
		var t = fromYear; fromYear = toYear; toYear = t
	}


	var hList = []
	for (var year=fromYear; year<=toYear; year++){
		hList=hList.concat(holidays(year))
	}

	function date2event(dobj){
		var o={}
		    o["year"]=dobj.y;
		    o["month"]=dobj.m -1; //month: 0-11
		    o["date"]=dobj.d;
		var d1 = moment.tz(o,grTZ).format("YYYY-MM-DD") 
		var d2 = moment.tz(o,grTZ).add(1,'day').format("YYYY-MM-DD") 
		var t=vcal_event;
		return (
		  t.replace(/summary/g, dobj.t)
		   .replace("dtstart",ical_datestr(d1))
		   .replace("dtend",ical_datestr(d2))
		   .replace("dtstamp",ical_datestr(now.format("YYYY-MM-DD")))
		   .replace("uid",uuidv1()+"_"+ical_datestr(d1))
		   .replace(/comment/g,moment.tz(o,grTZ).format("DD/MM/YYYY")+" "+dobj.t)
		   .replace("description",moment.tz(o,grTZ).format("DD/MM/YYYY"))
		)
	}


  	res.send(''
		+ vcal_header
		+ hList.map(date2event).join().replace(/,/g,"\n") 
		+ vcal_footer + '\n'
        );
  })
  .listen(PORT  /*, () => console.log(`Listening on ${ PORT }`)*/)



/* debugging
  	res.send(''
		+ vcal_header + '\n'

		+ now.format('') + '\n' 
		+ now.format('MMMM DD/MM/YYYY HH:mm:ss') + '\n'
		+ 'DTSTAMP:' + ical_datestr("1997-01-06") + '\n'
		+ 'DTSTAMP:' + now.tz("UTC").format('YYYYMMDDTHHmmss') + 'Z' + '\n'
		+ thisYear + '\n'
		+ fromYear + " - " + toYear + '\n'
		+ moment.tz("2018-01-01 00:00:00",grTZ).format() + '\n'
		+ moment.tz("2018-01-01 00:00:00",grTZ).format('DD/MM/YYYY HH:mm:ss') + '\n'
		+ moment.tz("2018-01-01 00:00:00",grTZ).tz('UTC').format('DD/MM/YYYY HH:mm:ss') + '\n'

		+ moment.tz("2018-01-01 23:59:59",grTZ).format() + '\n'
		+ moment.tz("2018-01-01 23:59:59",grTZ).format('DD/MM/YYYY HH:mm:ss') + '\n'
		+ moment.tz("2018-01-01 23:59:59",grTZ).tz('UTC').format('DD/MM/YYYY HH:mm:ss') + '\n'


		+ vcal_footer
		+ "easter: " + JSON.stringify(greek_easter(fromYear)) + '\n'
		+ JSON.stringify(hList) + '\n'
		+ fromYear + " - " + toYear + '\n'
        );
*/



/* https://tools.ietf.org/html/rfc5545

Samples:

LOCATION;LANGUAGE=el:ÅëëÜò
       DTSTART;TZID=America/New_York:19980119T020000
       DTEND;TZID=America/New_York:19980119T030000

DTSTART;TZID=America/New_York:19970105T083000
RRULE:FREQ=YEARLY;INTERVAL=2;BYMONTH=1;BYDAY=SU;BYHOUR=8,9;
 BYMINUTE=30
"every Sunday in January at 8:30 AM and 9:30 AM, every other year"

RRULE:FREQ=YEARLY



Sample event:

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
LOCATION;LANGUAGE=el:Î•Î»Î»Î¬Ï‚
PRIORITY:5
SEQUENCE:0
SUMMARY;LANGUAGE=el:Î ÏÏ‰Ï„Î¿Ï‡ÏÎ¿Î½Î¹Î¬
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





Another sample calendar:


BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Teamup Solutions AG//Teamup Calendar//EN
METHOD:PUBLISH
X-WR-CALNAME:ABCD
X-WR-CALDESC:1234
X-PUBLISHED-TTL:PT15M
BEGIN:VTIMEZONE
TZID:Europe/Athens
TZURL:http://tzurl.org/zoneinfo-outlook/Europe/Athens
X-LIC-LOCATION:Europe/Athens
BEGIN:DAYLIGHT
TZOFFSETFROM:+0200
TZOFFSETTO:+0300
TZNAME:EEST
DTSTART:19700329T030000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:+0300
TZOFFSETTO:+0200
TZNAME:EET
DTSTART:19701025T040000
RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
UID:TU676549499
DTSTART;VALUE=DATE:20150326
SEQUENCE:0
TRANSP:OPAQUE
DTEND;VALUE=DATE:20150327
URL:https://teamup.com/zzzaaazzz/events/123456789
SUMMARY:just a summary
CLASS:PUBLIC
DESCRIPTION:description\n
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
CATEGORIES:office
DTSTAMP:20150325T032235Z
CREATED:20150325T031433Z
END:VEVENT
BEGIN:VEVENT
UID:TU676550870
DTSTART;VALUE=DATE:20150310
SEQUENCE:0
TRANSP:OPAQUE
DTEND;VALUE=DATE:20150311
URL:https://teamup.com/zzzaaazzz/events/123456780
LOCATION:somewhere
SUMMARY:Notes 1 2 3
CLASS:PUBLIC
DESCRIPTION:notes (13/03/2015)\
 n\n
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
CATEGORIES:office
DTSTAMP:20150325T032235Z
CREATED:20150325T031849Z
X-TEAMUP-WHO:Smith
END:VEVENT
END:VCALENDAR

*/
