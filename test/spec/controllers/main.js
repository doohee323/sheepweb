'use strict';

describe('Controller: CentersCtrl', function () {

  // load the controller's module
  beforeEach(module('sheepwebApp', ['ngResource']));

  var CentersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $resource) {
    scope = $rootScope.$new();
    CentersCtrl = $controller('CentersCtrl', {
      $scope: scope


    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    $scope.newCenter;
    //expect(scope.awesomeThings.length).toBe(3);
  });
});
