import React from 'react';
import { IndexLink } from 'react-router'
import HorizontalLogo from '../Images/Asylkompassen_Horizontal.png';
// import Location from './Location';

const Header = () => {
  return (
    <div>
    <header className="header" role="banner">
      <div className="menu">
        <div className="container">
        <span className="logo-menu">
         <IndexLink className="logo-link" to="/">
         <img className="logo-link-image" alt="asylkompassen-logo" src={HorizontalLogo}/>
         </IndexLink>
         </span>
          <nav>
           <ul className="menu-nav">
               <li>
                 <IndexLink to="/">Hem</IndexLink>
              </li>
                <li>
                 <IndexLink to="/all-organisations">Alla Organisationer</IndexLink>
              </li>
                <li>
                 <IndexLink to="/about-us">Om Oss</IndexLink>
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
 //  <li>
//      <Location/>
// </li>

  // <li className="google-translate">
  //                  <div id="google_translate_element"></div>
  //             </li>