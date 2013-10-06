'use strict';

angular.module('sheepwebApp')
  .controller('RegionsCtrl', function ($scope, $location, $routeParams, RegionService) {
	$scope.$location = $location;
    $scope.newRegion = {};

    var center_id = $routeParams.id;
	RegionService.get({uip_center_id: center_id}, function(data) {
	 	$scope.uip_regions = data.uip_regions;
	 	if(data.uip_regions.length > 0) {
	 		$scope.newRegion = 	data.uip_regions[0];
	 	} 
        $scope.regionsTotal = data.uip_regions.length;
		$scope.newRegion.uip_center_id = center_id;
	});

    $scope.addRegion = function () {
        delete $scope.newRegion.id;
        delete $scope.newRegion.uip_center;
        $scope.newRegion.uip_center_id = center_id;
    	var params = {uip_region : $scope.newRegion};
    	RegionService.save(params, function (data) {
    		$scope.uip_regions.put(data.uip_region);
    		console.log(data);
    	})
    }

	$scope.editRegion = function (region) {
    	$scope.newRegion = region;
    	$scope.newRegion.uip_center_id = region.uip_center.id;
    }

    $scope.updateRegion = function (region) {
    	var param = angular.copy($scope.newRegion);
    	delete param.uip_center;
    	var params = {uip_region : param,
    				 id : $scope.newRegion.id};
    	RegionService.update(params, function (data) {
    		console.log(data);
    		lookupDs(region.id, function (row){
				$scope.uip_regions[row] = region;
    		});
    	})
    }

    $scope.deleteRegion = function (region) {
    	RegionService.delete({"id" : region.id}, function (data) {
    		console.log(data);
    		lookupDs(region.id, function (row){
    			$scope.uip_regions.splice(row, 1);
    		});
    		$scope.newRegion = {};
    	})
    }

    $scope.initRegion = function () {
    	$scope.newRegion = {};
    }

    $scope.goHomeRegion = function () {
    	var path = '/centers';
	 	$location.path( path );
	}

    $scope.orderby = 'product';
    $scope.reverse = false;

    $scope.setOrder = function (orderby) {
        if (orderby === $scope.orderby)
        {
            $scope.reverse = !$scope.reverse;
        }
        $scope.orderby = orderby;
    };

	var lookupDs = function ( id, callback ) {
    	for (var i = $scope.uip_regions.length - 1; i >= 0; i--) {
    		if ($scope.uip_regions[i].id == (id + '')) {
				callback(i);
				break;
			}
		}
	}

  });
