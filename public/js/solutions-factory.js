app.factory('solutions', ['$http', 'auth', function($http, auth) {
  var o = {
    solutions: []
  };

  o.create = function (solution) {
    return $http.post('/solutions', solution, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).then(
      function (res) {
        o.solutions.push(angular.copy(solution));
      },
      function (res) {
        // failure callback
      }
    );
  };

  o.get = function (prob_id) {
    return $http.get('/solutions/problem/'+prob_id.toString(), {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
      angular.copy(data, o.solutions);
    });
  }

  return o;
}]);
