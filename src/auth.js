let auth = {
  isLoggedIn: () => {
    let token = localStorage.getItem('token');
    if (token) {
      var payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    }
    return false;
  },

  staffId: () => {
    let token = localStorage.getItem('token');
    if (token) {
      var payload = JSON.parse(atob(token.split('.')[1]));
      return payload.staff_id;
    }
    return null;
  }
};

export default auth;
