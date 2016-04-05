var express = require( 'express' );
var app = express();
var router = express.Router();


router.get( '/SumoSurvey', function( req, res, next ) {
	
     res.json( '/SumoSurvey', { msg: 'Welcome To The Sumo Survey', errors: errors } );
	console.log('Welcome To The Sumo Survey');
});	




module.exports = router;