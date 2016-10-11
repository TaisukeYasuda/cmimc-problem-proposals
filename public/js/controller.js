app.controller('authCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
  $scope.signup = function () {
    alert(JSON.stringify($scope.user));
    auth.signup($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('proposals');
    });
  };

  $scope.login = function () {
    auth.login($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('proposals');
    });
  };
}]);

app.controller('navCtrl', [
'$scope',
'auth',
function($scope, auth){
  // get info by calling isLoggedIn() and currentUser()
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.accountType = auth.accountType;
  $scope.userId = auth.userId;
  $scope.logOut = auth.logOut;
}]);

app.controller('proposeCtrl', [
'$scope',
'$state',
'$http',
'auth',
'proposals',
function ($scope, $state, $http, auth, proposals) {
  // submit:
  // INSERT INTO proposals (staffid, topic, problem, answer, solution, difficulty) VALUES ()
  $scope.submit = function() {
    var prob = $scope.prob;
    prob.staffid = auth.staffId();
    proposals.create(prob);
    // @TODO go to view prob afterwards
  }
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
'$scope',
'$http',
'proposals',
function ($scope, $http, proposals) {
  $scope.proposals = proposals.proposals;
}]);

app.controller('viewProposalCtrl', [
'$scope', '$http',
function ($scope, $http) {
  //
}]);
