'use strict';

var config = {
	url : 'http://localhost:3000',
	// url : 'http://192.168.219.112:3000/',
	// url : '/pattern/pt42/masterdetail',
	server : 'rails' // spring, rails
};

angular.module('sheepwebApp', ['ngResource'])
	.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/centers', {
		controller : 'CentersCtrl',
		templateUrl : './views/centers.html'
	})
	.when('/center/:id', {
		controller : 'CentersCtrl',
		templateUrl : './views/centers.html'
	})	
	.when('/regions/:id', {
		controller : 'RegionsCtrl',
		templateUrl : '/views/regions.html'
	})
	.when('/main', {
		templateUrl : 'views/main.html',
		controller : 'MainCtrl'
	})
	.otherwise({
		redirectTo : '/centers'
	});
	
	$locationProvider.html5Mode(true).hashPrefix('!');

});
