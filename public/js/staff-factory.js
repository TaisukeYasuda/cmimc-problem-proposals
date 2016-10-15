app.factory('staff', ['$http', 'auth', function($http, auth) {
  var o = {
    staff: []
  };

  o.getAll = function () {
    return $http.get('/staff', {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
      angular.copy(data, o.staff);
    });
  }

  return o;
}]);
