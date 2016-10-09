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

app.controller('signupCtrl', [
'$scope', '$http',
function ($scope, $http) {
  $scope.signup = function() {

  }
}]);
