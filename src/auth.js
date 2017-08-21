const auth = {
  isLoggedIn: () => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    }
    return false;
  },
  isAdmin: () => {
    if (auth.isLoggedIn()) {
      const token = localStorage.getItem('token'),
            payload = JSON.parse(atob(token.split('.')[1]));
      return payload.admin;
    }
    return false;
  }
};

export default auth;
