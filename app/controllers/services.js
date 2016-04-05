 /* Generic Services */                                                                                                                                                                                                    
 angular.module('app.services', [])                                                                                                                                                                        
   .factory("genericServices", function() {         
    
	                                                                                                                                      
     return {
	
	 hello2: function () {
        return "Hello My Litttle Kitty Cat";
     },
       

	 hello: function () {
        return "Hello World";
		//console.log('hello there kitty');
	},
	 
       doSomething: function() {   
			console.log(' doSomething: function() {   ');
         //Do something here
       },
       doSomethingElse: function() {
         //Do something else here
		 console.log(' doSomethingElse: function() {   ');
       },
   
     toBool: function (val) {
        if (val == 'undefined' || val == null || val == '' || val == 'false' || val == 'False')
            return false;
        else if (val == true || val == 'true' || val == 'True')
            return true;
        else
            return 'unidentified';
    },
	
	toParse: function (val) {
		
		return JSON.parse(val);
	},
	
	//
	// isEmptyObjectService function to test if an object is empty or not
	//
	isEmptyObjectService: function(obj) {
	 //function isEmptyObject(obj) {
    
	if(typeof obj!='object') {
        //it is not object, so is not empty
        return false;
    } else {
        var x,i=0;
        for(x in obj) {
            i++;
        }
        if(i>0) {
            //this object has some properties or methods
            return false;
        } else {
            //this object has not any property or method
            return true;
        }
		}
	},
    
	//
	// isEmptyObjectService function to test if an object is empty or not
	//
	
	
	//
	// mySum sum the elements in an object 
	//
	mySum: function ( obj ) {
			//console.log('the object is ...' + JSON.stringify(obj) );
			  var sum = 0;
			  for( var el in obj ) {
				  //console.log('the el in the object is ..' + el);
				if( obj.hasOwnProperty( el ) ) {
					if(el=='total'){
				  sum += parseFloat( obj[el] );
					}
				}
			  }
			  return sum;
			},

	//
	//  mySum sum the elements in an object 
	//
	
	//
	//  myCurrentAnswerVotes goes thru surveyResults data and gets votes for specific answer
	//
	myCurrentAnswerVotes: function (SurveyStats,paramAnswerId,paramQuestionId) {
		
		
		
		var mySum2  = function(items, prop){
            return items.reduce( function(a, b){
            return a + b[prop];
            }, 0);
           };
		
		
		var mySummedCurrentAnswer = this.mySum(SurveyStats,'total');
		
	
		var mySurveyStatsLength = SurveyStats.length-1;
		var myVotes=[];
		var myTotalVotes = 0;
		
			for(var x=0; x<=SurveyStats.length-1; x++){
				
				if(SurveyStats[x].Answer.QuestionId == paramQuestionId ){
					
				var myTotal;
				myTotal = this.mySum(SurveyStats[x],'total');
				//console.log('... my total is ...' + myTotal);
				myVotes.push(myTotal)
				
				}
				
				var sum = 0;
				for(var i=0; i < myVotes.length; i++){
				sum += parseInt(myVotes[i]);
				}

					
				
				if(SurveyStats[x].Answer.id == paramAnswerId ){
				var mySummedCurrentAnswer = this.mySum(SurveyStats[x],'total');
				//myVotes[paramQuestionId].push(mySummedCurrentAnswer);
				
				
			    //var myTotal;
				//myTotal += parseInt();
				}
				
				//myVotes.push(mySummedCurrentAnswer);
			//var mySummedQuestionAnswer;
			//mySummedQuestionAnswer += mySummedCurrentAnswer;
				
//if(SurveyStats[x].Answer.Answer.id == paramAnswerId ){
				//var mySummedQuestionAnswer = this.mySum(SurveyStats[x],'total');
				//myVotes.push(mySummedQuestionAnswer);
			//	}
				
				//console.log('mySummedQuestionAnswer...is ' + mySummedQuestionAnswer)
			
			}
			//console.log('the myVotes array is..' +myVotes[paramQuestionId])
		
			//return mySummedCurrentAnswer;
			
			return {votes: {
			totalVotesPerAnswer: mySummedCurrentAnswer,
			summedVotes:sum,
			questionId: paramQuestionId
			
			}
			}
			
			console.log('SurveyStats from services ' + JSON.stringify(SurveyStats) );
			
			
		 
	 },
	
	 
		
   
   shuffle: function (array) {
        var currentIndex = array.length, temp, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temp;
        }
        return array;
    },
   
   
	 extend: function (out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
                continue;

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                    out[key] = arguments[i][key];
            }
        }
        return out;
    },
   
   
   
   
	 }
		
		
   
   });
