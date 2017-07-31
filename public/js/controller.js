app.controller('authCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
  $scope.signup = function () {
    if (!$scope.user.name || !$scope.user.email || 
        !$scope.user.password || !$scope.user.passwordConfirm) {
      $scope.error = {message: 'Please fill out all fields.'};
      return
    } else if ($scope.user.password !== $scope.user.passwordConfirm) {
      $scope.error = {message: 'Passwords do not match.'};
      return
    }
    auth.signup($scope.user).error(function(error){
      $scope.error = error;
    }).then(function() {
      $state.go('proposals');
    });
  };

  $scope.login = function () {
    if (!$scope.user.email || !$scope.user.password) {
      $scope.error = {message: 'Please fill out all fields.'};
    } else {
      auth.login($scope.user).error(function(error){
        $scope.error = error;
      }).then(function() {
        $state.go('proposals');
      });
    }
  };
}]);

app.controller('navCtrl', [
'$scope',
'auth',
function($scope, auth){
  // get info by calling isLoggedIn() and currentUser()
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.privilege = auth.privilege;
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
  $scope.subjects = proposals.subjects;

  $scope.submit = function() {
    var prob = $scope.prob;
    prob.staff_id = auth.staffId();
    proposals.create(prob);
    $state.go('proposals');
  }
}]);

app.controller('manageContestCtrl', [
'$scope',
'proposals',
function ($scope, proposals) {
  $scope.bank = proposals.bank;
  $scope.changeChecked = proposals.changeChecked;
}]);

app.controller('manageUsersCtrl', [
'$scope',
'staff',
'auth',
function ($scope, staff, auth) {
  $scope.staff = staff.staff;
  $scope.changePrivilege = staff.changePrivilege;
  $scope.staffId = auth.staffId;
}]);

app.controller('probBankCtrl', [
'$scope',
'$http',
'proposals',
function ($scope, $http, proposals) {
  $scope.bank = proposals.bank;
}]);

app.controller('myProposalsCtrl', [
'$scope',
'$http',
'proposals',
function ($scope, $http, proposals) {
  $scope.subjects = proposals.subjects;
  $scope.probs = proposals.probs;
}]);

app.controller('viewProbCtrl', [
'$scope',
'$state',
'auth',
'staff',
'proposals',
'comments',
'solutions',
function ($scope, $state, auth, staff, proposals, comments, solutions) {
  $scope.comments = comments.comments;
  $scope.solutions = solutions.solutions;
  $scope.author = '';

  var p = proposals.prob;
  if (!p) {
    $state.go('proposals') //@TODO go to an error message
  } else {
    $scope.prob = proposals.prob;
  }

  staff.getName($scope.prob.staff_id).then(function() {
    if (staff.author) $scope.author = staff.author.name;
    else $scope.author = 'Not found';
  })  

  $scope.submitComment = function () {
    $scope.comment.staff_id = auth.staffId();
    $scope.comment.prob_id = $scope.prob.prob_id;
    comments.create(angular.copy($scope.comment));
    $scope.comments.push(angular.copy($scope.comment));
    $scope.comment.comment = '';
  };

  $scope.submitSolution = function () {
    $scope.solution.staffid = auth.staffId();
    $scope.solution.probid = $scope.prob.probid;
    solutions.create(angular.copy($scope.solution));
    $scope.solutions.push(angular.copy($scope.solution));
    $scope.solution.solution = '';
  };
}]);

app.controller('editProbCtrl', [
'$scope',
'$state',
'$location',
'proposals',
function ($scope, $state, $location, proposals) {
  $scope.subjects = proposals.subjects;

  var p = proposals.prob;
  if (!p) {
    $state.go('proposals') //@TODO go to an error message
  } else {
    p.difficulty = p.difficulty.toString();
    $scope.prob = p;
  }

  $scope.put = function () {
    proposals.put(p.prob_id, {
      subject: $scope.prob.subject,
      difficulty: $scope.prob.difficulty,
      problem: $scope.prob.problem,
      answer: $scope.prob.answer,
      solution: $scope.prob.solution,
      staff_id: $scope.prob.staff_id
    });
    $location.path('proposals');
  }

  $scope.delete = function () {
    proposals.delete(p.prob_id);
    $location.path('proposals');
  }
}]);

app.controller('homeCtrl', [
'$scope',
'auth',
function($scope, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.privilege = auth.privilege;
}]);
