app.controller('authCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
  $scope.signup = function () {
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
  $scope.staffId = auth.staffId;
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
  $scope.staffid = auth.staffId();
  $scope.test = "test";

  $scope.submit = function() {
    var prob = $scope.prob;
    prob.staffid = auth.staffId();
    proposals.create(prob);
    $state.go('proposals');
  }
}]);

app.controller('manageContestCtrl', [
'$scope', '$http',
function ($scope, $http) {
  //
}]);

app.controller('probBankCtrl', [
'$scope',
'$http',
'proposals',
function ($scope, $http, proposals) {
  $scope.bank = proposals.bank;
  $scope.bankEmpty = ($scope.bank.length == 0);
}]);

app.controller('myProposalsCtrl', [
'$scope',
'$http',
'proposals',
function ($scope, $http, proposals) {
  $scope.probs = proposals.probs;
  $scope.hasProposals = ($scope.probs.length > 0);
}]);

app.controller('viewProbCtrl', [
'$scope',
'$state',
'proposals',
function ($scope, $state, proposals) {
  var p = proposals.prob;
  if (p == []) {
    $state.go('proposals') //@TODO go to an error message
  } else {
    $scope.prob = proposals.prob[0];
    $scope.revealIdentity = function() {
      document.getElementById("prob-author").innerHTML = $scope.prob.staffid;
      document.getElementById("prob-author").removeAttribute("href");
    };
  }

  $scope.comment = function () {
    //@TODO
  };
}]);

app.controller('editProbCtrl', [
'$scope',
'$state',
'$location',
'proposals',
function ($scope, $state, $location, proposals) {
  var p = proposals.prob;
  if (p == []) {
    $state.go('proposals') //@TODO go to an error message
  } else {
    p = p[0];
    p.difficulty = p.difficulty.toString();
    $scope.prob = p;
  }

  $scope.put = function () {
    proposals.put(p.probid, p);
    $location.path('proposals');
  }

  $scope.delete = function () {
    proposals.delete(p.probid);
    $location.path('proposals');
  }
}]);

app.controller('homeCtrl', [
'$scope',
'auth',
function($scope, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.accountType = auth.accountType;
}]);
