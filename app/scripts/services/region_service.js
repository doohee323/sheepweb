'use strict';

angular.module('sheepwebApp')
.factory('RegionService', function ($resource) {
	return $resource("http://localhost\\:3000/uip_regions/:id", {
		id:"@id"
	}, {
		update: {
			method: "PUT"
		}
	});

});
