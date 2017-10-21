import React from 'react';
import OrganisationFilter from "./OrganisationFilter";
import Organisations from "./Organisations";

const OrganisationListing = () => {
  return (
    <div className="product-page row">
      <div className="flex">
        <OrganisationFilter />
        <Organisations />
      </div>
    </div>
  );
}

export default OrganisationListing;