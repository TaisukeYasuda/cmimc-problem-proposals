import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

//import Header from './header';
import Routes from './routes';

const Header = () => (
  <header>
    <nav className="teal darken-4">
      <Link to="/" className="brand-logo">USMCA</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="propose">Propose</Link></li>
        <li><Link to="database">Database</Link></li>
        <li><Link to="account">Account</Link></li>
      </ul>
    </nav>
  </header>
);

const Footer = () => (
  <footer></footer>
);

const App = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Routes />
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
