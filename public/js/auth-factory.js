app.factory('auth', ['$http', '$window', function($http, $window){
  var auth = {
    name: ''
  };

  auth.saveToken = function(token) {
    $window.localStorage['jwt-token'] = token;
  };

  auth.getToken = function() {
    return $window.localStorage['jwt-token'];
  }

  auth.isLoggedIn = function() {
    var token = auth.getToken();
    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  auth.privilege = function(){
    if (auth.isLoggedIn()) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.privilege;
    }
  };

  auth.staffId = function() {
    if (auth.isLoggedIn()){
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.staff_id;
    }
  };

  auth.currentUser = function() {
    if (auth.isLoggedIn()) return $window.localStorage['user'];
  }

  auth.signup = function (user) {
    return $http.post('/signup', user).success(function(res){
      auth.saveToken(res.token);
      $window.localStorage['user'] = res.name;
    });
  };

  auth.login = function(user) {
    return $http.post('/login', user).success(function(res) {
      auth.saveToken(res.token);
      $window.localStorage['user'] = res.name;
    });
  };

  auth.logout = function() {
    $window.localStorage.removeItem('jwt-token');
    $window.localStorage.removeItem('user');
  };

  return auth;
}])
