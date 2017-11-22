import React from 'react';
import { Link, IndexLink } from 'react-router'
import BackgroundImage from '../Images/header.png';

const Header = () => {
  return (
    <header className="header" role="banner">
    {/*  <section className="banner-section" style={{ backgroundImage: "url(" + BackgroundImage + ")" }}>
      </section>
      */}
      <div className="menu">
        <div className="container">
          <nav role="navigation">
            <ul>
              <li>
                <IndexLink to="/">Home</IndexLink>
              </li>
              <li>
                <Link to="/store">All organisations</Link>
              </li>
              <li>
                <Link to="/about">About us</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;