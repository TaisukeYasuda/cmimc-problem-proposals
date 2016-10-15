app.factory('comments', ['$http', 'auth', function($http, auth) {
  var o = {
    comments: []
  };

  o.getAll = function () {
    return $http.get('/proposals/'+auth.staffId(), {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      angular.copy(data, o.probs);
    });
  };

  return o;
}]);
