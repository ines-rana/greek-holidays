const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  //.use(express.static(path.join(__dirname, 'public')))
  //.set('views', path.join(__dirname, 'views'))
  //.set('view engine', 'ejs')
  .get('/', (req, res, next) => {
		// allow XHR calls (CORS)
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
  	res.send('Hello World 3!\n');
  })
