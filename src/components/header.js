import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../actions';

const Header = ({ logout, authenticated }) => (
  <header>
    <img src='img/cmimc-logo-huge.png' height='28px' />
    <Link to='/login' className='logout' onClick={logout}>
      {authenticated ? 'Logout' : 'Login'}
    </Link>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        { authenticated && (
            <li><Link to='/propose'>Propose</Link></li>
          )
        }
      </ul>
    </nav>
    <br className="clearfloat" />
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
