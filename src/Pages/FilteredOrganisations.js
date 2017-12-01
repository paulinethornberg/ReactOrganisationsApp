import React from 'react';
import Organisations from "../Components/Organisations";
import SubCategories from "../Components/SubCategories";

const FilteredOrganisations = () => {
  return (
    <div className="product-page row">
      <SubCategories />
      <div className="flex">
        <Organisations />
      </div>
    </div>
  );
}

export default FilteredOrganisations;