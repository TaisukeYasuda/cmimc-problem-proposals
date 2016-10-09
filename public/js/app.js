var app = angular.module('mainApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/proposals", {
    templateUrl : "templates/proposals.html"
  })
  .when("/login", {
    templateUrl : "templates/login.html",
    controller : "loginCtrl"
  })
  .when("/signup", {
    templateUrl : "templates/signup.html"
  })
  .otherwise({
    templateUrl : "home.html"
  });
});
