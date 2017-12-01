import React from 'react';
import { Link, IndexLink } from 'react-router'
import BackgroundImage from '../Images/header.png';
import Location from './Location';

const Header = () => {
  return (
    <div>
    <header className="header" role="banner">
      <div className="menu">
        <div className="container">
          <nav role="navigation">
            <ul>
              <li>
                <IndexLink to="/">Home</IndexLink>
              </li>
              <li>
                <Link to="/organisations">organisations</Link>
              </li>
            </ul>
          </nav>
          
        </div>
      </div>
    </header>
    <Location/>
    </div>
  );
}

export default Header;