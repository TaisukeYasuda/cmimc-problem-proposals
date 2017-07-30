app.factory('proposals', ['$http', 'auth', function($http, auth) {
  var o = {
    probs: [],
    prob: [],
    bank: [],
    subjects: [],
    author: null
  };

  o.getAll = function () {
    return $http.get('/proposals/'+auth.staffId(), {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(res){
      angular.copy(res, o.probs);
      o.probs = o.probs.map(p => {
        p.subject = o.subjects[p.subject];
        if (!p.subject) p.subject = 'Invalid';
        return p;
      })
    });
  };

  o.getBank = function () {
    return $http.get('/proposals/bank/', {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(res){
      angular.copy(res, o.bank);
      o.bank = o.bank.map(p => {
        p.subject = o.subjects[p.subject];
        if (!p.subject) p.subject = 'Invalid';
        return p;
      })
    });
  };

  o.changeChecked = function (probid, checked) {
    return $http.put('/proposals/checked/'+probid, {checked: checked}, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
      //
    });
  }

  /*
   * proposals.create: 
   *    prob: {subject, difficulty, problem, answer, solution, staff_id}
   */
  o.create = function(prob) {
    return $http.post('/proposals', prob, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).then(
      function (res) {
        // success callback
        o.probs.push(res)
      },
      function (res) {
        // failure callback
      }
    );
  };

  o.get = function(prob_id) {
    return $http.get('/proposals/problem/'+prob_id, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res) {
      angular.copy(res.data, o.prob);
      o.prob.subject = o.subjects[o.prob.subject];
      if (!o.prob.subject) o.prob.subject = 'Invalid';
    })
  }

  o.put = function(prob_id, prob) {
    return $http.put('/proposals/problem/'+prob_id, prob, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      //
    });
  }

  o.delete = function (probid) {
    return $http.delete('/proposals/problem/'+probid, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
      //
    });
  }

  $http.get('/subjects').success(function(res) {
    subjects = [];
    for (i in res) {
      subject = res[i];
      subjects[subject.subject_id - 1] = subject.title;
    }
    angular.copy(subjects, o.subjects);
  }).error(function(err) {
    alert('Error retrieving subjects, please reload the page.');
  });

  return o;
}]);
