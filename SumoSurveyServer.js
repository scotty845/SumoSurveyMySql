
//required modules
var express = require('express');
var path = require( 'path' );
var expressSession =require('express-session')
var cookieParser = require( 'cookie-parser' );
var expressValidator = require('express-validator');
var http = require( 'http' );
var util = require( 'util' );
var _ = require( 'underscore' );
var q = require( 'q' );
var router = express.Router();
var models = require( './models' );

//establish routes
var mySumoSurvey = require( './SumoSurvey' );
var myMakeSurvey = require( './MakeSurvey' );
var myTakeSurvey = require( './TakeSurvey' );


var app = express();

//session must be before route is established and body-parser
app.use(cookieParser());


app.use(expressSession({
    secret: 'munshin',
    resave: true,
    saveUninitialized: true
}));



// create router
app.use(router);

//make app directory with angular front end, scripts and css available to entire node application
app.use(express.static(path.join(__dirname, 'app')));
// for extra server side validation
app.use(expressValidator() );
console.log(__dirname);


var bodyParser = require('body-parser');
app.use(bodyParser.json());

// use these routes
app.use('/SumoSurvey', mySumoSurvey );
app.use('/MakeSurvey', myMakeSurvey );
app.use('/TakeSurvey', myTakeSurvey );


app.listen(3000);
console.log("Sumo Survey Server Running On Port 3000");