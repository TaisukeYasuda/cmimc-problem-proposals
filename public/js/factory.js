app.factory('auth', ['$http', '$window', function($http, $window){
  var auth = {};

  auth.saveToken = function (token) {
    $window.localStorage['jwt-token'] = token;
  };

  auth.getToken = function () {
    return $window.localStorage['jwt-token'];
  }

  auth.isLoggedIn = function () {
    var token = auth.getToken();

    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  auth.currentUser = function () {
    if(auth.isLoggedIn()){
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.name;
    }
  };

  auth.accountType = function () {
    if(auth.isLoggedIn()){
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.type;
    }
  };

  auth.staffId = function () {
    if(auth.isLoggedIn()){
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.id;
    }
  };

  auth.signup = function (user) {
    return $http.post('/signup', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.login = function (user) {
    return $http.post('/login', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logout = function () {
    $window.localStorage.removeItem('jwt-token');
  };

  return auth;
}])

app.factory('proposals', ['$http', 'auth', function($http, auth) {
  var o = {
    probs: [],
    prob: [],
    bank: []
  };

  o.getAll = function () {
    return $http.get('/proposals/'+auth.staffId(), {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      angular.copy(data, o.probs);
    });
  };

  o.getBank = function () {
    return $http.get('/proposals/bank/', {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      angular.copy(data, o.bank);
    });
  };

  o.create = function (prob) {
    return $http.post('/proposals', prob, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).then(
      function (res) {
        // success callback
        o.probs.push(res)
      },
      function (res) {
        // failure callback
      }
    );
  };

  o.get = function (probid) {
    return $http.get('/proposals/problem/'+probid, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
      angular.copy(data, o.prob);
    });
  }

  o.put = function (probid, prob) {
    return $http.put('/proposals/problem/'+probid, prob, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
      //
    });
  }

  o.delete = function (probid) {
    return $http.delete('/proposals/problem/'+probid, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
      //
    });
  }

  return o;
}]);
