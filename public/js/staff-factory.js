app.factory('staff', ['$http', 'auth', function($http, auth) {
  var o = {
    staff: [],
    staffNames: {}
  };

  o.getAll = function() {
    return $http.get('/staff', {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(res) {
      angular.copy(res, o.staff);
      for (i in res) {
        var staff = res[i];
        o.staffNames[staff.staff_id] = staff.name;
      }
    });
  }

  o.getName = function(staff_id) {
    return $http.get('/staff/'+staff_id.toString()).then(function(res) {
      o.author = res.data;
    });
  }

  o.changePrivilege = function(staff_id, privilege) {
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
