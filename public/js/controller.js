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

app.controller('proposeCtrl', [
'$scope', '$http',
function ($scope, $http) {
  // submit:
  // INSERT INTO proposals (staffid, topic, problem, answer, solution, difficulty) VALUES ()
}]);

app.controller('editProbCtrl', [
'$scope', '$http',
function ($scope, $http) {
  // submit:
  // UPDATE proposals SET topic=, difficulty=, problem=, answer=, solution= WHERE probid=
  // delete:
  // DELETE FROM proposals WHERE probid=
}]);

app.controller('manageContestCtrl', [
'$scope', '$http',
function ($scope, $http) {
  //
}]);

app.controller('probBankCtrl', [
'$scope', '$http',
function ($scope, $http) {
  //
}]);

app.controller('myProposalsCtrl', [
'$scope', '$http',
function ($scope, $http) {
  //
}]);

app.controller('viewProposalCtrl', [
'$scope', '$http',
function ($scope, $http) {
  //
}]);
