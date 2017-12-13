import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link, IndexLink } from 'react-router'
import Organisations from "../Components/Organisations";
import SubCategories from "../Components/SubCategories";

const FilteredOrganisations = () => {
  return (
    <div>
      <Link to="/">
        <div className="back-arrow">
          <FontAwesome size='5x' name='long-arrow-left' />
        </div>
      </Link>
      <div className="organisations-page row">
        <SubCategories />
        <div >
          <Organisations />
        </div>
      </div>
    </div>
  );
}

export default FilteredOrganisations;