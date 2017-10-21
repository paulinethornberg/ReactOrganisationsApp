import React from 'react';
import Banner from '../Components/Banner.js';
import OrganisationListing from '../Components/OrganisationListing.js';
import LinkButton from '../Components/LinkButton.js';
import OurStory from '../Components/OurStory.js';

const Home = () => {
  return (
    <div className="container">
      <OrganisationListing />
      <Banner />
      <LinkButton link="/store/organisationWithFilter" text="More organisations" />
    </div>
  );
}

export default Home;