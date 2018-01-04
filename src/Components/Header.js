import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router'
import BackgroundImage from '../Images/header.png';
import Logo from '../Images/Asylkompassen_Reversed.png';
import HorizontalLogo from '../Images/Asylkompassen_Horizontal.png';
import Location from './Location';

class Header extends Component {

  render() {
     let activeHome = true;
     console.log(activeHome);
    let activeAbout = false;
    let setActive = () => {
      console.log("hello from active");
      this.activeAbout = true;
      this.activeHome = false;
    }
    let setActiveHome = () => {
      console.log("hello from active");
      this.activeAbout = false;
      this.activeHome = true;
    }

    return (
      <div>

        <header className="header" role="banner">

          <div className="menu">
            <div className="container">
              <IndexLink className="logo-link" to="/">
                <img className="logo-link" src={HorizontalLogo} />
              </IndexLink>
              <nav role="navigation">
                <ul className="menu-nav">
                  <li >
                    <IndexLink className={this.activeHome ? 'active-menu' : 'no-active-menu'} onClick={setActiveHome} to="/">Hem</IndexLink>
                  </li>
                  <li >
                    <IndexLink className={this.activeAbout ? 'active-menu' : 'no-active-menu'} onClick={setActive} to="/about-us">Om Asylkompassen</IndexLink>
                  </li>
                  <li>
                    <Location />
                  </li>
                  <li className="google-translate">
                    <div id="google_translate_element"></div>
                  </li>

                </ul>
              </nav>

            </div>
          </div>
        </header>

      </div>
    );
  }
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