app.controller('mainCtrl', [
'$scope',
function ($scope) {
  $scope.test = 'Hello world!';
}]);

app.controller('loginCtrl', [
'$scope',
function ($scope) {
  $scope.test = 'Hello world!';
}]);

app.controller('authCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
  $scope.user = {};

  $scope.signup = function(){
    auth.signup($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };

  $scope.login = function(){
    auth.login($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };
}])
