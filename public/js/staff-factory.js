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

  o.changePrivilege = function (staff_id, privilege) {
    return $http.put('/staff/privilege/'+staff_id.toString(), {
      privilege: privilege
    }, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(res){
    //
    });
  }

  return o;
}]);
