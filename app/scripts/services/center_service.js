'use strict';

angular.module('sheepwebApp')
.factory('CenterService', function ($resource) {
	return $resource("http://localhost\\:3000/uip_centers/:id", {
		id:"@id"
	}, {
		update: {
			method: "PUT"
		}
	});

});
