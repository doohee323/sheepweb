'use strict';

angular.module('sheepwebApp')
  .controller('CentersCtrl', function ($scope, $location, $routeParams, config, CenterService, socket) {
	  
	$scope.$location = $location;
    $scope.newCenter = {};
    var currentid = 0;
    
//	socket.on('connect', function() {
//		$('#content_log').text('Connected');
//	});

//	socket.on('centers', function(msg) {
//		$('#content_log').append($('<p>').text(msg).append(
//				$('<em>').text(' from server')));
//		console.log(msg);
//	});
	
//    socket.on('message', function(msg) {
//    	$('#content_log').append($('<p>').text(msg).append(
//					$('<em>').text(' from server')));
//	});
    
	socket.on('inserted', function(data) {
		$('#content_log').text(data);
		$scope.uip_centers.unshift(data.uip_center);
	});	

	socket.on('updated', function(data) {
		$('#content_log').text(data);
		lookupDs(currentid, function (row){
			$scope.uip_centers[row] = data.uip_center;
			$scope.newCenter = $scope.uip_centers[row];
		});
	});	
	
	socket.on('deleted', function(data) {
		$('#content_log').text(data);
		lookupDs(data, function (row){
			$scope.uip_centers.splice(row, 1);
		});
		$scope.newregion = {};
	});	
	
	CenterService.get({}, function(data) {
	 	$scope.uip_centers = data.uip_centers;
	    if($location.$$path != '/centers') {
	    	currentid = $routeParams.id;
			lookupDs(currentid, function (row){
				$scope.newCenter = $scope.uip_centers[row];
			});
	    }
	    if(config.socketLogined == false) {
	    	config.socketLogined = true;
			socket.emit('centers', 'centers');
	    }
	});

    $scope.addCenter = function () {
        $scope.newCenter.id = '';
    	var params = {uip_center : $scope.newCenter};
    	if(config.server == 'spring') params = $scope.newCenter; // java
    	CenterService.save(params, function (data) {
    		console.log(data);
    		$scope.uip_centers.unshift(data.uip_center);
    		socket.emit('insert', data);
    	})
    };
    $scope.updateCenter = function (center) {
    	var params = {uip_center : $scope.newCenter,
    				 id : $scope.newCenter.id};
    	if(config.server == 'spring') params = params.uip_center; // java
    	delete params['key'];delete params['$$hashKey'];delete params['objectKey'];  // remove useless coluems for error fix
    	CenterService.update(params, function (data) {
    		console.log(data);
    		currentid = center.id;
    		socket.emit('update', data);
    	})
    };
    $scope.deleteCenter = function (center) {
    	CenterService.delete({"id" : center.id}, function (data) {
    		console.log(data);
    		currentid = center.id;
    		socket.emit('delete', currentid);
    	})
    };

    $scope.initCenter = function () {
    	$scope.newCenter = {};
    }

	var lookupDs = function ( id, callback ) {
    	for (var i = $scope.uip_centers.length - 1; i >= 0; i--) {
    		if ($scope.uip_centers[i].id == (id + '')) {
				callback(i);
				break;
			}
		}
	}

  });
