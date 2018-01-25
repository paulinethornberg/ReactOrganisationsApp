import React from 'react';
import { IndexLink } from 'react-router'
import BackgroundImage from '../Images/header.png';
import Logo from '../Images/Asylkompassen_Reversed.png';
import HorizontalLogo from '../Images/Asylkompassen_Horizontal.png';
import Location from './Location';

const Header = () => {

        //
  return (
    <div>

    <header className="header" role="banner">

      <div className="menu">
        <div className="container">
         <IndexLink className="logo-link" to="/">
         <img className="logo-link-image" src={HorizontalLogo}/>
         </IndexLink>
          <nav role="navigation">
           <ul className="menu-nav">
          
               <li>
                 <IndexLink to="/">Hem</IndexLink>
              </li>
                <li>
                 <IndexLink to="/about-us">Om Asylkompassen</IndexLink>
              </li>
               <li>
                   <Location/>
              </li>
              
              
          </ul>
          </nav>
         
        </div>
      </div>
    </header>

    </div>
  );
}

export default Header;

  // <li className="google-translate">
  //                  <div id="google_translate_element"></div>
  //             </li>