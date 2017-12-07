import React from 'react';
import { Link, IndexLink } from 'react-router'
import BackgroundImage from '../Images/header.png';
import Logo from '../Images/Asylkompassen_RGB.png';
import Location from './Location';

const Header = () => {
  var style = {
    maxWidth: '20%'
  }
  return (
    <div>
   
    <header className="header" role="banner">
     <img style={style} src={Logo}/>
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
          <Location/>
        </div>
      </div>
    </header>

    </div>
  );
}

export default Header;