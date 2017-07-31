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
        p.subject = o.subjects[p.subject-1];
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
        p.subject = o.subjects[p.subject-1];
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
    return $http.get('/proposals/problem/'+prob_id.toString(), {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res) {
      angular.copy(res.data, o.prob);
      o.prob.subjectName = o.subjects[o.prob.subject];
      o.prob.subject = o.prob.subject.toString();
      if (!o.prob.subjectName) o.prob.subjectName = 'Invalid';
    })
  }

  o.put = function(prob_id, prob) {
    return $http.put('/proposals/problem/'+prob_id.toString(), prob, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(res) {
      //
    }).error(function(res) {
      alert(res.message);
    });
  }

  o.delete = function (prob_id) {
    return $http.delete('/proposals/problem/'+prob_id.toString(), {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(res) {
      // remove the problem from the factory copy
      o.probs = o.probs.filter(prob => {
        return prob.prob_id.toString() !== prob_id.toString()
      });
      o.bank = o.bank.filter(prob => {
        return prob.prob_id.toString() !== prob_id.toString()
      });
      // notify everyone via sockets
    }).error(function(res) {
      alert(res.message);
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
