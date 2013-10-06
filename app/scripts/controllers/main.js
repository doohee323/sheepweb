'use strict';

angular.module('sheepwebApp')
  .controller('MainCtrl', function ($scope, $location) {
	$scope.$location = $location;
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
