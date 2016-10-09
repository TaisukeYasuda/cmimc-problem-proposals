app.controller('headerCtrl', [
'$scope',
function ($scope) {
  $scope.logged_in = true;
  $scope.account_class = 'Member';
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
  // submit:
  // INSERT INTO staff (email, password, type, name, andrewid, salt, jwt) VALUES ()
}]);

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

app.controller('loginCtrl', [
'$scope', '$http',
function ($scope, $http) {
  // log in:
  // SELECT * FROM staff WHERE email=
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
