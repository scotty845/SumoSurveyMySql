var express = require( 'express' );
var models = require( './models' );
var util = require( 'util' );
var _ = require( 'underscore' );
var q = require( 'q' );

var router = express.Router();
var app = express();



//
//Get a list of question ids that the ip address is associated with
//

function getQuestionIdsGuestHasSeen( ipaddress ) {
    var defered = q.defer();

    models.SurveyAnswer.findAll({ 
        where: { guestIP: ipaddress }
    }).then( function( surveyAnswers ) {
        var ids = _.pluck( surveyAnswers, 'QuestionId' );
        defered.resolve( ids );

    }).catch( function( error ) {
        defered.reject( error );
    });

    return defered.promise;
}
//
//Get a list of question ids that the ip address is associated with
//


//
//  Get a list of valid question ids from the database;
//
function getListOfValidQuestionIds( filterIds ) {
    var defered = q.defer();

    var filterIds = filterIds || [];

    models.Question.findAll().then(function( questions ) {
        var ids = _.pluck( questions, 'id' );
        var validIds = _.difference( ids, filterIds );

        defered.resolve( validIds );

    }).catch( function( error ) {
        defered.reject( error );
    });

    return defered.promise;
}

//
//  Get a list of valid question ids from the database;
//


//	
//  Pull a random id from the list provided
//
function randomlySelectQuestionId( ids ) {
    var randomIndex = _.random( 0, ids.length-1 );
    return ids[ randomIndex ];
}
//	
//  Pull a random id from the list provided
//




//
//  saveSurveyAnswer
// router.post( '/saveSurveyAnswer'
//
router.post( '/saveSurveyAnswer', function ( req, res, next ) {
	
	
	console.log('router.get /addSurveyAnswer inside TakeySurvey'  );
	
	console.log("Received add one survey answer request...");
	console.log(req.body);
	var mySurveyAnswer = req.body.answer;
	//var myAnswerText = mySurveyAnswer.answerText;
	//console.log('myAnswerText is...' + myAnswerText);
	var jsonString = mySurveyAnswer;
    var jsonObj = JSON.parse(jsonString);
	var mySurveyAnswerText =jsonObj.answerText;
	var mySurveyAnswerId =jsonObj.id;
	var mySurveyQuestionId =jsonObj.QuestionId;
	var myRealIpAddress = req.ip;
    //console.log(jsonObj.answerText);
	console.log(' mySurveyAnswerText ..' +  mySurveyAnswerText );
	console.log(' mySurveyAnswerId ..' +  mySurveyAnswerId );
	console.log(' mySurveyQuestionId ..' +  mySurveyQuestionId );
	console.log(' myRealIpAddress ..' +  myRealIpAddress );
	
	var questionId = req.body.questionId;
    var answerId = req.body.answer;
    var guestIP = req.ip;
    //
    // Allow developer to mock IPs for testing.
    //  
    if( process.env.RANDOM_IP ) {
        guestIP = process.env.RANDOM_IP;
    }
    // 
    // Allow developer to mock IPs for testing.
    //  
	
	 //if invalid question //
    if( !mySurveyQuestionId || mySurveyQuestionId.length === 0 ) {
        var err = new Error( 'Invalid question id.' );
        throw err;
        return;
    }

	//if user was able to post without choosing an answer //
    if( !mySurveyAnswerId || mySurveyAnswerId.length === 0 ) {
        var errors = [
            { msg: 'Please choose an answer and try again.' }
        ];
		
		//since user was able to post with out choosing an answerId
		//find question that corresponds to users survey question
		// and pull the respective answers
		//send them back to /TakeSurvey to answer same question again
        models.Question.find( { 
            where: { id: mySurveyQuestionId },
            include: [{ model: models.Answer }] 
        } ).then( function( question ) {
            res.json( '/TakeSurvey', { question: question, errors: errors } );
        });
    } else {     
         //user properly chose an answer
		//create and entry in SurveyAnswer table
        models.SurveyAnswer.create({
            guestIP: myRealIpAddress,
            QuestionId: mySurveyQuestionId,
            AnswerId: mySurveyAnswerId
        }).then( function( surveyAnswer ) {
			 res.json( '/TakeSurvey', { msg: 'Thank U', errors: errors } );
        })
    }
} );

//
//  saveSurveyAnswer
//





//
// get survey data 
//router.get('/survey'
// 	
router.get('/survey', function(req, res){
	 
	console.log('router.get /survey inside TakeySurvey'  );
	
	
	var ipaddress = req.ip;
		
		
    // process.env.RANDOM_IP = '::1';
	
    // Allow developer to mock IPs for testing.
    // ************************************** **************************************
    if( process.env.RANDOM_IP ) {
        ipaddress = process.env.RANDOM_IP;
    }
    // ************************************** **************************************
    
	console.log('the ipaddress is ...' + ipaddress);
	
	
    //
    //  get survey data of questions user has not answered
    //
    models.Question.findAll().then(
        function( questions ) {
            if( questions.length === 0 ) {
				console.log('...if( questions.length === 0 ) {....')
                //
                //  No survey questions yet  
               
            } else {
				console.log('...else theres some questions in the database that the user has not answered...')
                q.fcall( function() { return ipaddress; } )
                //
                //  Get a list of question ids the guest ip has seen
                //
                .then( getQuestionIdsGuestHasSeen )
                //
                //  Filter out the question ids the guest has seen already
                //
                .then( getListOfValidQuestionIds )
                //
                //  Randomly pick a question out of the filtered ids
                //
                .then( randomlySelectQuestionId )
                //
                //  Present the question to the user
                //
                .then( function( questionId ) {
                    if( !questionId ) {
                	res.json('/TakeSurvey',{ question:null,errors: null });	
                    } else {
                        models.Question.find( { 
                            where: { id: questionId },
                            include: [{ model: models.Answer}] ,
							
                        } ).then( function( question ) {
                            
							if(question.Answers.length >1) {
							res.json('/TakeSurvey',{ question:question,errors: null });	
							}
							else{
								
							res.json('/TakeSurvey',{ question:null,errors: null });	
							
							}
						
						
						
						});
                    }
                });

            }
        }
    ).catch( function( error ) {
       
    });

	
});	
//
// get survey data of questions user has not answered
//router.get('/survey'
// 	




module.exports = router;