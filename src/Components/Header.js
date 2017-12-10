import React from 'react';
import { Link, IndexLink } from 'react-router'
import BackgroundImage from '../Images/header.png';
import Logo from '../Images/Asylkompassen_Reversed.png';
import Location from './Location';

const Header = () => {
  var style = {
    maxWidth: '20%'
  }
        // 
  return (
    <div>
   
    <header className="header" role="banner">

      <div className="menu">
        <div className="container">
         <IndexLink className="logo-link" to="/">
         <img style={style} src={Logo}/> 
         </IndexLink>
          <nav role="navigation">
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