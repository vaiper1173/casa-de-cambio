const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// Elige 3002 o dame un puerto viable
const port = process.env.PORT || 3002;

// use ejs and express layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);

// loading static resources
app.use(express.static('public'));

// use body parser
app.use(bodyParser.urlencoded({ extended: true}));

// route our app
const router = require('./app/routes');
app.use('/', router);

// route for our homepage
router.get('/', function(req, res) {
	res.render('pages/home');
  });

// start the server
app.listen(port, function() {
	console.log('App started in port 3002');
});