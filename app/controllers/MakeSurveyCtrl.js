'use strict';



(function () {
    var addressBookApp = angular.module("addressBookApp");
	
    var MakeSurveyCtrl = function ($scope,$http,genericServices)
    {
		
  	
		$scope.working = 'Angular is Working';
		$scope.genericServices = genericServices;

        //common error function
    	var onError = function (error) {
            $scope.error = error.data;
        };
        //end error function
		
		
		//
		//function to toggle pannel via directive
		//
		
		
			
			var mySum2  = function(items, prop){
            return items.reduce( function(a, b){
            return a + b[prop];
            }, 0);
            };
           
		
		
			
			$scope.hiddenDiv=[];
			$scope.textModel=[];
			
			$scope.SurveyResults=[];
			
			
			//
			//showDivAnswer
			//when user clicks on question collapse to show answers
			//
	$scope.showDivAnswer = function (index,paramQuestion)
			{
				
		$scope.hiddenDiv[paramQuestion.id] = !$scope.hiddenDiv[paramQuestion.id];
		var myQuestionId = paramQuestion.id;
		console.log('the myQuestionId is ' + myQuestionId);
		var myAnswerCount = paramQuestion.Answers.length;
		console.log('the myAnswerCount is ' + myAnswerCount);
				
				
	    $http.get('/MakeSurvey/SurveyStats/' + myQuestionId,  {params: {questionId:myQuestionId}})
	    //while they are looking at answers get updated
		//survey stats from the server 
				
	    .success(function(data) {
		     var mySummedTotalAnswers;
			 console.log('the data is ...'  +JSON.stringify(data.SurveyStats));
		     var mySummedTotalAnswers = mySum2(data.SurveyStats,'total');
			 console.log('the total answers for this quest is .' + mySummedTotalAnswers)
				   
				   
			$scope.SurveyResults = data.SurveyStats;
			$scope.TotalQuestionAnswers = mySummedTotalAnswers;
				
			
         }).error(function(data) {
			     console.error("error in getting Survey Results");
               
			})
				
					
	    }
		//
		//showDivAnswer
		//	


			

        //on getting survey questions from server set $scope
    	var onSurveyGetQuestionsCompleted = function(response){	
			$scope.questions = response.data;
			$scope.adminRights = response.data.admin;
			$scope.sessionData = response.data.sessionData;		
    	}
    	
        //get all survey questions from server
        var refresh = function(){
			$http.get('/MakeSurvey/SurveyData2')
        		.then(onSurveyGetQuestionsCompleted, onError);	
        }

        refresh();
    	
	
  
  
 //****** for adding offices, employees, todos, questions *******
  
  $scope.offices = [];
  
  $scope.addOffice = function() {
    $scope.offices.push({
      employees: []
    });
  };
  
  $scope.addEmployee = function(office) {
    office.employees.push({});
  };
  
  $scope.submitOffices = function() {
    $http.post('/offices', $scope.offices)
      .success(function(res) {
        $scope.offices = [];
        $scope.serverData = res; 
      }).error(function() {
        // Handle error. 
      });
  };
  
  //****** for adding offices, employees, todos, questions *******
  
  
  
		 
		 //X EDITABLE STUFF
		 
		 
		 
// ******************* for adding todos ***********************
 
//$scope.offices = [];
        
		//to toggle add question form
        $scope.showAddQuestionContent = false;
        
        $scope.myAddQuestionShow = function() {
            $scope.showAddQuestionContent = !$scope.showAddQuestionContent;
        }
		
		// to toggle login form start of with login form showing
		$scope.showLogin = true;
		
		$scope.myLoginShow = function() {
            $scope.showLogin = !$scope.showLogin;
        }
         
         //to toggle answers by question
		 $scope.showContentAnswers=[];
		 
		 $scope.myFunctionSCA = function(index,paramQuestion) {
		
		 console.log('the paramAnwer id is....'+paramQuestion.id);
        
		 $scope.showContentAnswers[paramQuestion.id] = !$scope.showContentAnswers[paramQuestion.id];
		 
        }
  
		
	
  
  $scope.addAnswers = function(office) {
    office.answers.push({id:office.answers.length + 1});
  };
  
  
    //
	// logoutUser
	//
    //call node server API router.get /Logout
	//API server logs out user 
    $scope.logoutUser = function () {
		console.log('at logout user..');
        
	    $http.get('/MakeSurvey/Logout')
	  
			.success(function(data) {
            console.log('just Logged User Out');
			console.log('the server data is');
			console.log(data);
			
			refresh(); // called to update data for display
			
           }).error(function(data) {
            console.error("error in get logout");
			console.log('the server data is');
			console.log(data);
           })
	
	};
	
	
	//
	// logoutUser
	//	
  
  
  
  
    //
    // Login
    //call node server API router.post /Login
	//API server logs out user 
  	 
	 $scope.formValid = {};
	 
	 
	 
     $scope.Login =function() {
			
			console.log('..At Login..');
            
			
			$http.post('/MakeSurvey/Authenticate',$scope.formValid)
         
			.success(function(data) {
            console.log("Login In Authenticating");
			console.log('the Server data is??');
			console.log(data)
			//$window.location.href = data.redirect; 
			//$location.url=data.redirect;
			//$scope.adminRights=true;
			
			refresh();
           }).error(function(data) {
            console.error("error in posting");
			
			refresh();
           })
			
           // var landingUrl = "http://" + $window.location.host + "/#MakeSurvey";
           //$window.location.href = landingUrl;
			//refresh();
			
			
    }
  
  //
  //Login
  //
  
  
  // ************ addQuestion *********************
   $scope.formData = {};
   $scope.submitToggle = true;
  //$scope.toDoName ={};
   
   $scope.formData.questionText = "";
  //
  // ************ addQuestion *********************  
  // server api router.post addQuestion 
  //
  $scope.addQuestion = function (createdByParam) {
  
    if ($scope.formData.questionText !== "") {
		console.log('the $scope.formData is ...'  + JSON.stringify($scope.formData ) );
		
		$http.post('/MakeSurvey/addQuestion',{questionText:$scope.formData.questionText,createdByParam:createdByParam})
		
		   .success(function(data) {
            console.log("posted successfully");
			console.log(data)
			$scope.formData.questionText = "";
	        var myNewAnswerSpaceArray = {Answers:[]};
	        var myNewQuestionArray = angular.fromJson(data.question);
	
	
	        console.log('the myNewQuestionArray is ' + JSON.stringify(myNewQuestionArray) );
		
		    $scope.questions.questions.push();
			
			
	        $scope.questions.questions.concat(myNewQuestionArray,myNewAnswerSpaceArray);
			
	        console.log('$scope.questions after addQuestions is ....'  + JSON.stringify($scope.questions.questions));
		    
			//added to get data from server to browser quicker
			$scope.questions.questions.push(angular.fromJson(data.question));
			
		    refresh()
			
            }).error(function(data) {
             console.error("error in posting");
            })
			
           
        }
		
		else if ($scope.formData.questionText == ""){ 
		
		$scope.formData.questionText = "";
		console.log('questionText was nothing...') 
		}  
		
		$scope.showAddQuestionContent = false;	
		$scope.submitToggle = !$scope.submitToggle;
    };
	//
	// ************ addQuestion *********************
	//
	
	
	
  
    // ************ addAnswer *********************
    $scope.formData.answerText = "";
    //
	// ************ addAnswer *********************
	// server api router.post addAnswer
	//
    $scope.addAnswer = function (question) {
    console.log('the passed in question in scope.addAnswer is..' + JSON.stringify(question) );
    

	if ($scope.formData.answerText !== "") {
	    
		$scope.formData.questionId = question.id;

		console.log('the $scope.formData is ...'  + JSON.stringify($scope.formData ) );
		console.log('the $scope.survey-questionId is ...'  + question.id );
		
		
		$http.post('/MakeSurvey/addAnswer',$scope.formData)
           
		   .success(function(data) {
            console.log("posted answer successfully");
			console.log(data)
			
			
			question.Answers.push(angular.fromJson(data.answer));
			
			
			console.log(' ZZZZZ the $scope.formData.answerText[question.id].ZZZZ' + $scope.formData.answerText[question.id] );
			
			
			$scope.formData.answerText = "";
			
			console.log(' !!!! the $scope.formData.answerText[question.id].!!!' + $scope.formData.answerText[question.id] );
			console.log(' bbbbb the $scope.formData...!!!' + JSON.stringify($scope.formData) );
			
        }).error(function(data) {
			
            console.error("error in posting");
        })
			 
		
	    
           
        }
		
		else if ($scope.formData.answerText == ""){ 
		
		
		$scope.formData.questionId = "";
		console.log('answerText was nothing...') 
		}
		$scope.showContentAnswers[$scope.formData.questionId] = false;	
		$scope.submitToggle = !$scope.submitToggle;
		
    };
	// 
    // ************ addAnswer *********************
    //
  



// ******************* for adding todos ***************************

		
		  
	
		 //X EDITABLE STUFF
		 
		 
		
	
	//
	// deleteQuestion //
	// server api router.delete( '/deleteQuestion/:questionId'
	//
	$scope.deleteQuestion = function(question,questions){
			
        console.log('the passed in question in deleteQuestion is ' + JSON.stringify(question));
		
		function findWithAttr(array, attr, value) {
		for(var i = 0; i < array.length; i += 1) {
		if(array[i][attr] === value) {
        return i;
		}
		}
		}

		var indexQuestion;
		indexQuestion = findWithAttr($scope.questions.questions,'id', question.id); // returns 0
			
		
		$scope.questions.questions.splice(indexQuestion,1);
			this.question = null;
			
		console.log( '..$scope.deleteQuestion..');
			
		    $http.delete('/MakeSurvey/deleteQuestion/' + question.id, {params: {questionId:question.id}})
			.success(function(data) {
            console.log("posted successfully u deleted the question and its answers");
			console.log(data)
			$scope.formData.questionText = "";
            }).error(function(data) {
            console.error("error in posting");
            })
			
			
     };
	//
	// deleteQuestion //
	//
		
		
		
		
		
	//
	// deleteAnswer //
	// server api router.delete( '/deleteAnswer/:answerId'
	//
    $scope.deleteAnswer = function(question,answer){
				
		
    console.log('the passed in question in deleteAnswer is ' + JSON.stringify(question));
	console.log('the passed in answer in deleteAnswer is ' + JSON.stringify(answer));
	console.log('the passed in answer.id in deleteAnswer is ' + JSON.stringify(answer.id));
			  
			  
	var indexAnswer = question.Answers.indexOf(answer);
	question.Answers.splice(indexAnswer,1);
			
     console.log( '..$scope.deleteAnswer..');
			
			
	    $http.delete('/MakeSurvey/deleteAnswer/' + answer.id, {params: {answerId:answer.id}})
		
		.success(function(data) {
         console.log("Deleted answer successfully");
		 console.log("The server data is");
		 console.log(data)
		 $scope.formData.questionText = "";
        }).error(function(data) {
            console.error("error in posting");
        })
			
		
        };
		
	//
	// deleteAnswer 
	//
		
	
	
		
		
		
		
		
		
//CORRECT updateAnswer		
	// updateAnswer
  // server api router.put( '/updateAnswer/:answerId/:answerText'
   //
   
    $scope.updateAnswer = function(question,answer){
				
		
    console.log('the passed in   SSSSS answer in updateAnswer is ' + JSON.stringify(answer));
	console.log('the passed in answer.id in updateAnswer is ' + JSON.stringify(answer.id));
			
	var indexAnswer = question.Answers.indexOf(answer);
		
    console.log( '..$scope.deleteAnswer..');
			
	
	$http.put('/MakeSurvey/updateAnswer/' + answer.id + '/' + answer.answerText, {params: {answerId:answer.id, answerText:answer.answerText}})
		.success(function(data) {
        console.log("Answer SSSS updated successfully");
		console.log("The server SSSS data is");
		console.log(data)
		$scope.formData.questionText = "";
			
	    }).error(function(data) {
            console.error("error in posting");
        })
			
			
			
	};
	
	//
	// updateAnswer //
	//
	//CORRECT updateAnswer	
		
		
		
		
	// updateQuestion
   //server api router.put( '/updateQuestion/:questionId/:questionText',
   //		
   $scope.updateQuestion = function(question){
				
	console.log('the passed in question in updateQuestion is ' + JSON.stringify(question));
	console.log('the passed in question.id in updateQuestion is ' + JSON.stringify(question.id));
			  
	
		$http.put('/MakeSurvey/updateQuestion/' + question.id + '/' + question.questionText, {params: {questionId:question.id, questionText:question.questionText}})
			
			.success(function(data) {
            console.log("Updated question successfully");
			console.log("The server data is");
			console.log(data)
			
	
            }).error(function(data) {
            console.error("error in posting");
            })
			
			
		
		
    };
	
	//	
	// updateQuestion
    //	
		
		
		
			
			
			
    }
	
	
	
	// MODAL STUFF
	

	
//
// app directive for inline editing controller
//

	addressBookApp.directive('onEnter', function () {
  var ENTER_KEY = 13;

  return {
    scope: {
      expressionFn: '&onEnter'
    },
    link: function (scope, element) {
      element.on('keypress', function (e) {
        if (e.which === ENTER_KEY) {
          scope.$apply(function () {
            scope.expressionFn({ $event: e });
          });
        }
      });
    }
  };
})

//
// app directive for inline editing controller
//

//for adding question
addressBookApp.directive('blur', function () {
  return function (scope, element, attrs) {
    scope.$watch(attrs.blur, function () {
        //element[0].blur();
		//questionForm
		//newQuestionText
		element[0].blur();
    });
  };
});

//
// app directive for inline editing controller
//
addressBookApp.directive('inlineEdit', function($timeout){
  return {
        scope: {
            model: '=inlineEdit',
            handleSave: '&onSave',
            handleCancel: '&onCancel',
            presetValues: '=presetValues',
			handleDelete: '&onDelete'
        },
        link: function (scope, elm, attr) {
            var previousValue,
                previousSelectVal;

            scope.inputType = {
                settingValuesSelectbox: (scope.presetValues && scope.presetValues.length > 0) ? scope.presetValues : false
            };

            scope.edit = function () {
                scope.editMode = true;

                previousValue = scope.model;


                if (scope.inputType.settingValuesSelectbox) {

                } else if (scope.model !== 'true' && scope.model !== 'false') {
                    $timeout(function () {
                        elm.find('input')[0].focus();
                    }, 0, false);
                }
            };
			
			
				//scope.delete
		    scope.deleteItem = function () {
		    console.log('deleteItem');
					
			scope.handleDelete({ value: scope.model });
				   
			scope.editMode = false; 
	
            };
			   
	
            scope.save = function (param) {                
            scope.handleSave({ value: scope.model });
            scope.editMode = false;
				
            };

            scope.cancel = function () {
            scope.editMode = false;
            scope.model = previousValue;
            scope.handleCancel({ value: scope.model });
            
			};

			
            scope.selectChanged = function (param) {
                previousSelectVal = param;
            };
			
        },
        templateUrl: 'inlineEditTemplate'
    };
});

//
// app directive for inline editing controller
//


    //set up app controller as MakeSurveyCtrl
    addressBookApp.controller('MakeSurveyCtrl', MakeSurveyCtrl);
}());