'use strict';

angular.module('sheepwebApp')
.factory('socket', function ($rootScope) {
  var socket = io.connect("http://127.0.0.1:8080/test1");
  socket.on('connect',function() {
      console.log('Client has connected to the server!');
    });
  
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});