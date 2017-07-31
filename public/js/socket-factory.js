app.factory('socket', function($rootScope) {
  var socket = io.connect();

  socket.on('news', function(data) {
    console.log(data);
    socket.emit('my other event', {my: 'data'});
  });

  return {
    on: function(eventName, callback) {
      socket.on(eventName, calback);
    },
    emit: function(eventName, data, callback) {
      socket.emit(eventName, data, callback);
    }
  };
});
