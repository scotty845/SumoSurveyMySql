'use strict';


(function () {

    var app = angular.module("addressBookApp", ['ngRoute','ngSanitize','app.services']);
    app.config(function ($routeProvider) {
        $routeProvider
        
		.when("/SumoSurvey", {
            templateUrl: '/templates/SumoSurvey.html',
            //controller: "StartCtrl"
        })
		
		
		.when("/MakeSurvey", {
            templateUrl: '/templates/MakeSurvey.html',
            controller:  "MakeSurveyCtrl"
        })
		
		
		.when("/TakeSurvey", {
            templateUrl: '/templates/TakeSurvey.html',
            controller:  "TakeSurveyCtrl"
        })
		
		
		
        .otherwise({ redirectTo: "/SumoSurvey" })
    });
}());
