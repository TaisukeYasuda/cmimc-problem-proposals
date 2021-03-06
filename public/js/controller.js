app.controller('authCtrl', [
'$scope',
'$state',
'$http',
'auth',
function($scope, $state, $http, auth){
  $scope.signup = function () {
    if (!$scope.user.name || !$scope.user.email || 
        !$scope.user.password || !$scope.user.passwordConfirm) {
      $scope.error = {message: 'Please fill out all fields.'};
      return
    } else if ($scope.user.password !== $scope.user.passwordConfirm) {
      $scope.error = {message: 'Passwords do not match.'};
      return
    }
    var andrew_url = 'https://apis.scottylabs.org/directory/v1/andrewID/';
    $http.get(andrew_url + $scope.user.andrewid.toLowerCase()).then(
        function(res) {
          // andrew id found
          auth.signup($scope.user).error(function(error){
            $scope.error = error;
          }).then(function() {
            $state.go('proposals');
          });
        }, function(res) {
          // andrew id not found
          $scope.error = {message: 'Invalid Andrew ID.'};
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
'socket',
function($scope, auth, socket){
  // get info by calling isLoggedIn() and currentUser()
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.privilege = auth.privilege;
  $scope.staffId = auth.staffId;
  $scope.logOut = auth.logOut;

  // socket.io
  $scope.tester = function() {
    socket.emit('ailee', {ailee: 10});
  }
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
  $scope.comments = comments.comments.map(comment => {
    comment.staffName = staff.staffNames[comment.staff_id];
    return comment;
  });
  $scope.solutions = solutions.solutions.map(solution => {
    solution.staffName = staff.staffNames[solution.staff_id];
    return solution;
  });
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
    $scope.solution.staff_id = auth.staffId();
    $scope.solution.prob_id = $scope.prob.prob_id;
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
