import React from 'react';
import HandImage from '../Images/hand.jpg';
import PeopleImage from '../Images/people.jpg';

const Banner = (props) => {
  return (
    <div>
    <section className="mini-banner-section" style={{ backgroundImage: "url(" + PeopleImage + ")" }}>
    </section>

     </div>
  );
}

export default Banner;