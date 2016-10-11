var app = angular.module('mainApp', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '',
      templateUrl: 'templates/home.html'
    })
    .state('manage-users', {
      url: '/manage-users',
      templateUrl: 'templates/manage-users.html'
    })
    .state('manage-contest', {
      url: '/manage-contest',
      templateUrl: 'templates/manage-contest.html'
    })
    .state('prob-bank', {
      url: '/prob-bank',
      templateUrl: 'templates/prob-bank.html'
    })
    .state('proposals', {
      url: '/proposals',
      templateUrl: 'templates/proposals.html'
    })
    .state('access-denied', {
      url: '/access-denied',
      templateUrl: 'templates/access-denied.html'
    })
    .state('edit-prob', {
      url: '/edit-prob',
      templateUrl: 'templates/edit-prob.html'
    })
    .state('view-prob', {
      url: '/view-prob',
      templateUrl: 'templates/view-prob.html'
    })
    .state('propose', {
      url: '/propose',
      templateUrl: 'templates/propose.html',
      controller: 'proposeCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'authCtrl',
      onEnter: ['$state', 'auth', function ($state, auth) {
        if (auth.isLoggedIn()) {
          $state.go('propose');
        }
      }]
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'authCtrl'
    })
    .state('error', {
      url: '/error',
      templateUrl: 'templates/404.html'
    })
    .state('logged-out', {
      url: '/logged-out',
      templateUrl: 'templates/logged-out.html',
      onEnter: ['$state', 'auth', function ($state, auth) {
        if (auth.isLoggedIn()) {
          auth.logout()
        }
      }]
    });

  $urlRouterProvider.otherwise('error');
}]);
