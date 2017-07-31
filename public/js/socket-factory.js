app.factory('socket', function($rootScope) {
  var socket = io.connect();

  socket.on('news', function(data) {
    console.log(data);
    socket.emit('my other event', {my: 'data'});
  });

  return {
    on: function(eventName, callback) {
      socket.on(eventName, function() {  
        var args = arguments;
        $rootScope.$apply(function() {
          callback.apply(socket, args);
        });
      });
    },
    emit: function(eventName, data, callback) {
    var args = arguments;
      $rootScope.$apply(function () {
        if (callback) {
          callback.apply(socket, args);
        }
      });
    }
  };
});
