'use strict';

(function () {
    var addressBookApp = angular.module("addressBookApp");

    var TakeSurveyCtrl = function ($scope, $http,genericServices,$window,$location,$anchorScroll)
    {
    	$scope.working = 'Angular is Working';
		$scope.genericServices = genericServices;
				
		$scope.mode = 'quiz';
		
		
		//
		// to control position after answering a question post 
		//
		$scope.scrollTo = function(id) {
		var old = $location.hash();
		$location.hash(id).replace();
		$anchorScroll();
		console.log('asked to scroll to .' + id);
	    };
		//
		// to control position after answering a question post 
		//
		
			
        //common error function
    	var onError = function (error) {
            $scope.error = error.data;
        };
        //end error function
		
		//
		//get all initial and ongoing survey data questions and answers
		//using server api router.get('/TakeSurvey/survey')
    	//
        var refresh = function(){
        	$http.get('/TakeSurvey/survey')
        		
			.success(function(data) {
				
			var myServerObject = $scope.genericServices.isEmptyObjectService(data.question)
			console.log(myServerObject);
				console.log('the data on .success is ..' + JSON.stringify(data));
			
			$scope.questions = data;
			if (myServerObject== false )
				
			{
				
			$scope.mode = 'quiz';
			}
			else
			{
			
			$scope.mode = 'finished';	
			}	
            
			
            }).error(function(data) {
				
   			
            })
			

            $scope.mode = 'quiz';
           

        	console.log('Response received...');
        }
		//
		//get all initial and ongoing survey data questions and answers
    	//
		
		
		refresh();
        
    	
		
	//	
	// **for radio button dynamic submit**
	//
	 $scope.master = {};
	
	 $scope.reset = function() {
       $scope.employee = angular.copy($scope.master);	
     };
    
	$scope.reset();	
	
	//
	// save save survey answer 
	// save survey answer with server api router.post( '/saveSurveyAnswer'
	//
    $scope.save= function(answer) {
			console.log('the answer is...' + JSON.stringify(answer) );
			
			console.log('the $scope.genericServices.isEmptyObjectService(answer) ' + $scope.genericServices.isEmptyObjectService(answer));
			
			
		 if ($scope.genericServices.isEmptyObjectService(answer) !== true) {
			 
			 
			console.log('...at $scope.save.....');
			console.log('...at $scope.save employee is.....' + JSON.stringify(answer) );
			
           
			$http.post('/TakeSurvey/saveSurveyAnswer', answer)
			
 
			.success(function(data) {
            console.log("posted survey answer successfully");
			console.log(data)
			$scope.mode='result'
			$scope.scrollTo('home') // to control position 	
			
            }).error(function(data) {
            console.error("error in posting");
			
            })
					
			
			$scope.master = angular.copy(answer);
			
            console.log(answer);
		 
		    }
			
			
    };
    //
	// save save survey answer 
	// 
		
		//console.log('you are at QuizCtrl2...');
     
		//console.log($scope.genericServices.hello());
		//console.log($scope.genericServices.hello2());	
	    
    }
	
	
	
	
	//
	//directive for link redirect work around
	//
	addressBookApp.directive('myRefresh',function($location,$route){
    return function(scope, element, attrs) {
        element.bind('click',function(){
            if(element[0] && element[0].href && element[0].href === $location.absUrl()){
                $route.reload();
            }
        });
    }   
});
	//
	//directive for link redirect work around
	//
	
	
    addressBookApp.controller('TakeSurveyCtrl', TakeSurveyCtrl);
}());