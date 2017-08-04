import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var message = this.props.authenticated ? 'hi!' : 'oops!';
    return (
      <header>
        <img src="img/cmimc-logo-huge.png" height="28px" />
        <nav>
          <ul>
            <li><Link to='/'>home</Link></li>
            <li><Link to='/roster'>roster</Link></li>
            <li><Link to='/schedule'>schedule</Link></li>
            <li><Link to='/'>{message}</Link></li>
          </ul>
        </nav>
        <br classname="clearfloat" />
      </header>
    );
  }
}

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

export default Header;
