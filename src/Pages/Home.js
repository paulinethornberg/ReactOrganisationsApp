import React from 'react';
import Banner from '../Components/Banner.js';
import CategoryFilters from '../Components/CategoryFilters.js';
import LinkButton from '../Components/LinkButton.js';
import OurStory from '../Components/OurStory.js';

const Home = () => {
  return (
    <div className="container">
      <CategoryFilters />
      <Banner />
      <LinkButton link="/store/organisationWithFilter" text="More organisations" />
    </div>
  );
}

export default Home;