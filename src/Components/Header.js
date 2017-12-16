import React from 'react';
import { Link, IndexLink } from 'react-router'
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
         <img className="logo-link" src={HorizontalLogo}/>
         </IndexLink>
          <nav role="navigation">
           <ul className="menu-nav">
               <li>
                 <IndexLink to="/">Hem</IndexLink>
              </li>
                <li>
                 <IndexLink to="/about-us">Om Asylkompassen</IndexLink>
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

    // <header className="header" role="banner">

    //   <div className="menu">
    //     <div className="container">
    //      <img style={style} src={Logo}/>
    //       <nav role="navigation">
    //         <ul>
    //           <li>
    //             <IndexLink to="/">Home</IndexLink>
    //           </li>
    //           <li>
    //             <Link to="/organisations">organisations</Link>
    //           </li>
    //         </ul>
    //       </nav>
    //       <Location/>
    //     </div>
    //   </div>
    // </header>