import React from 'react';
import Header from './Components/Header.js';
import LocationHomeComponent from './Components/LocationHome';

const App = (props) => {
  return (
    <div>
      <Header />
     <div className="home-page-top-wrapper">
        <div className="intro-div">Välj språk och stad nedan för att hitta organisationer, lokala initiativ och grupper för asylsökande</div>
        <div className="location-language-selector-wrapper">
          <div className="google-translate">
            <div id="google_translate_element"></div>
          </div>
          <div className="location-wrapper">
            <LocationHomeComponent/>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default App;
