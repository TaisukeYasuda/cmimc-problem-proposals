var app = angular.module('mainApp', ['ngRoute']);

app.controller('mainCtrl', [
'$scope',
function ($scope) {
  $scope.test = 'Hello world!';
}]);

app.config(function($routeProvider) {
  $routeProvider
  .when("/proposals", {
    templateUrl : "templates/proposals.html"
  })
  .when("/login", {
    templateUrl : "templates/login.html"
  })
  .when("/signup", {
    templateUrl : "templates/signup.html"
  })
  .otherwise({
    templateUrl : "home.html"
  });
});
