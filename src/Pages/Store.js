import React from 'react';
import { Link } from 'react-router'
import OrganisationListing from '../Components/OrganisationListing.js';

//this store is the second page named AllOrganisations

const Store = (props) => {
  return (
    <div className="container">
    <OrganisationListing />
    </div>
  );
}

export default Store;