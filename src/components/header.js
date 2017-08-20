import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../actions';

const Header = ({ authenticated, logout }) => (
  <header>
    <nav className="teal darken-4">
      <Link to="/" className="brand-logo">USMCA</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        { authenticated && (<li><Link to="propose">Propose</Link></li>) }
        { authenticated && (<li><Link to="database">Database</Link></li>) }
        { authenticated && (<li><Link to="account">Account</Link></li>) }
        { authenticated && (<li><Link to="/" onClick={ logoutUser }>Log Out</Link></li>) }
        { !authenticated && (<li><Link to="login">Log In</Link></li>) }
      </ul>
    </nav>
  </header>
);

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = dispatch => ({
  logout: () => logoutUser(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
