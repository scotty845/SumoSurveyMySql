var express = require( 'express' );
var models = require( './models' );
var sequelize = require( 'sequelize' );
var expressValidator = require('express-validator');
var router = express.Router();
var app = express();


//
//router.post /Logout destroy the express-session server data 
//known user username/uname and email/email and userid/uid
//
router.get('/Logout', function(req, res){

//on user logout destroy session data
req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
    res.json('/MakeSurvey');
  }

});

});
 //
//app.get /Logout destroy express-session data
//
	
// variables to hold session data and log in message
var sess;
var logginMessage;


//
//router.post /Authenticate in verify username and password for log in authentication
//
router.post('/Authenticate', function( req, res, next ) {
	
console.log(req.body);	 
var userName=req.body.username;
var userEmail=req.body.password;	
var stat=0;
      models.surveyusers.find({
        where: { 
				uname: userName,
				pass:  userEmail
          },
       }).then( function( results ) {
		   
		
		console.log('the results are');
		console.log(JSON.stringify(results));
		

		if(results!==null){
		  logginMessage ='Loggin Succesful a Username and Password Match';
		  
		  sess = req.session;
		  sess.knownuser = true;
		  sess.knownuserUserName = results.uname;
		  sess.knownuserUserEmail = results.email;
		  sess.knownuserUserUid = results.id;
		  
		  res.end('done');
		  
		}
		else{
			
			console.log(results);
			logginMessage ='Loggin Unsucessful a Username and Password Do Match';
            res.end('done');
				
		}
		
       
	   } ).catch( function( err ) {
		 
		 
		
		
       });
	
  
});
//
//app.post /Authenticate in verify username and password for log in authentication
//



//
//  Create Question
//router.post /addQuestion  
//
router.post( '/addQuestion', function( req, res, next ) {
	
	console.log('just did a $http.post(/MakeSurvey/addQuestion, person) ');
    console.log('the form posted question is req.body ' + JSON.stringify(req.body ) );

    var mySurveyNewQuestionText = req.body.questionText;
	console.log('the form posted question is req.body ' + JSON.stringify(mySurveyNewQuestionText ) );
	var mySurveyCreatedBy = req.body.createdByParam;
	

	 req.checkBody( 'questionText', 'Question is required.' ).notEmpty(); 
	  
    var errors = req.validationErrors();
	
	console.log('the server side errors using express-validator are errors..' + JSON.stringify(errors) );
    
	if ( errors ) {
        res.json( { errors: errors } );
    } else {
        models.Question.create( { questionText: req.body.questionText, createdBy: req.body.createdByParam  } ).then( 
            function ( question ) {
               
			  res.json( '/MakeSurvey', { question: question } );
				
			} 
			
        );  
		
    }
				
});
//
//  Create Question
//


//
//  Create Answer
//router.post /addAnswer
//
router.post( '/addAnswer', function( req, res, next ) {
console.log('just did a $http.post(/MakeSurvey/addAnswer, person'); 
console.log('the form posted question is req.body ' + JSON.stringify(req.body ) );

console.log('the form posted answerText is req.body.answerText ' + JSON.stringify(req.body.answerText[req.body.questionId] ) );

  req.check( 'answerText', 'An answer is required.' ).notEmpty();

    var errors = req.validationErrors();
	console.log('the server side errors using express-validator are errors..' + JSON.stringify(errors) );
	
    if ( errors ) {
		res.json( '/MakeSurvey', { errors: errors, answerText: {} } );
    } else {
        var newAnswer = {
			  QuestionId: req.body.questionId,
			  answerText: req.body.answerText[req.body.questionId]
        }
        models.Answer.create( newAnswer ).then( function ( answer ) {
           res.json( {'answer': answer } );
        } );    
    }

} );

//
//  Create Answer
//


//
//  Update Answer
// router.put ( '/updateAnswer/:answerId/:answerText'
//
router.put( '/updateAnswer/:answerId/:answerText', function( req, res, next ) {


	console.log('just did a $http.post(/MakeSurvey/updateAnswer, person'); 
    console.log("Received updateAnswer  request...");
	console.log('the id for the answer to be deleted is ...' + req.params);
	console.log('the id for the answer to be deleted is ...' +
	JSON.stringify(req.params));
	
    req.check( 'answerText', 'Answer is required.' ).notEmpty();

    var errors = req.validationErrors();
    if ( errors ) {
        res.json( '/MakeSurvey',{ errors: errors } );
    } else {

        models.Answer.update( 
			{ answerText: req.params.answerText },
            { where: { id: req.params.answerId }}
		).then( function ( answer ) {	
           
			res.json('/MakeSurvey', {'answer': answer } );

        } ).catch( function( err ) {
            
			 res.json('/MakeSurvey', { error: err } );
        } );
    }

} );
//
//  Update Answer
//


//
//  Update Question
//router.put( '/question/:question_id'
//
router.put( '/updateQuestion/:questionId/:questionText', function( req, res, next ) {


	console.log('just did a $http.post(/MakeSurvey/updateQuestion, person'); 
	console.log("Received updateQuestion  request...");
	console.log('the id for the answer to be deleted is ...' + req.params);

    req.check( 'questionText', 'Question is required.' ).notEmpty();

    var errors = req.validationErrors();
    if ( errors ) {
         res.json( '/MakeSurvey',{ errors: errors } );
    } else {

        models.Question.update( 
            { questionText: req.params.questionText },
            { where: { id: req.params.questionId  }}
        ).then( function ( question) {
			res.json('/MakeSurvey', {'question': question } );
        } ).catch( function( err ) {
             res.json('/MakeSurvey', { error: err } );

        } );
    }

} );
//
//  Update Question
//




//
//  Delete Answer
// router.delete( '/deleteAnswer/:answerId'
//
router.delete( '/deleteAnswer/:answerId', function( req, res, next ) {

	console.log('just did a $http.post(/MakeSurvey/deleteAnswer, person'); 
	console.log("Received deleteAnswer  request...");
	console.log('the id for the answer to be deleted is ...' + req.params);
	console.log('the id for the answer to be deleted is ...' +
	JSON.stringify(req.params));
	
    req.check( 'answerId', 'Question id is required.' ).notEmpty().isInt();

    var errors = req.validationErrors();
    if ( errors ) {
	
	res.json( '/MakeSurvey', { errors: errors } );
    
	} else {
        models.Answer.destroy( { 
           where: {
                id: req.params.answerId
            }
        } ).then( function ( question ) {
           
			res.json( '/MakeSurvey', { answerId: req.params.answerId } );

        } ).catch( function( err ) {
          
			res.json( '/MakeSurvey', { error: err } );
        } );
    }

} );

//
//  Delete Answer
//


//
//  Delete Question
//router.delete( '/deleteQuestion/:questionId'
//

router.delete( '/deleteQuestion/:questionId', function( req, res, next ) {

	
	console.log('just did a $http.post(/MakeSurvey/deleteQuestion, person'); 
    console.log("Received deleteAnswer  request...");
	console.log('the id for the answer to be deleted is ...' + req.params);
	console.log('the id for the answer to be deleted is ...' +
	JSON.stringify(req.params));
    
	req.check( 'questionId', 'Question id is required.' ).notEmpty();

    var errors = req.validationErrors();
    if ( errors ) {
		res.json( '/MakeSurvey', { errors: errors } );
    } else {
		 models.Answer.destroy( { 
           where: {
                QuestionId: req.params.questionId
            }
        } )
        models.Question.destroy( { 
            where: {
                id: req.params.questionId
            }
			
        } ).then( function ( question ) {
				res.json( '/MakeSurvey', { answerId: req.params.questionId } );

        } ).catch( function( err ) {
				res.json( '/MakeSurvey', { error: err } );
        } );
    }

} );


//
//  Delete Question
//




//
// Get Survey Data of questions and answers
//router.get( '/SurveyData2', function( req, res, next ) {
//	

router.get( '/SurveyData2', function( req, res, next ) {	

var adminPriv = false;
	sess = req.session;

	if (sess.knownuser){
		adminPriv = true;
	}
	else{
		adminPriv = false;
		
	}

	//SurveyData2
    models.Question.findAll({
        include: [{
            model: models.Answer
        }]
    }).then(
        function( questions ) {
			
            //res.render( 'admin/questions', { questions: questions } );
			res.json( '/SurveyData2', { questions: questions,admin:adminPriv, sessionData:sess,sessKnownUser:sess.knownuser   } );
        }
    );
} );
//
// Get Survey Data of questions and answers
//



//
//  Stats by Question
//router.get( '/question/:question_id/stats', function( req, res, next ) {
//	
router.get( '/SurveyStats/:questionId', function( req, res, next ) {

	console.log('you just requested router.get SurveyStats...' );
	console.log('the req.params.questionId is ...' + req.params.questionId);


    models.SurveyAnswer.findAll({
        where: { 
            AnswerId: {
              $ne: null
            }
			
        },
        include: [{ model: models.Answer }],
        attributes: [ [sequelize.fn( 'count', sequelize.col('AnswerId') ), 'total'] ],
        group: ['AnswerId'],
		
    }).then( function( results ) {
		res.json( '/MakeSurvey', { SurveyStats: results, } );
    });

} );

//
//  Stats by Question
//	


module.exports = router;