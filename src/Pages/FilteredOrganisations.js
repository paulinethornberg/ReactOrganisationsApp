import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router'
import Organisations from "../Components/Organisations";
import SubCategories from "../Components/SubCategories";

const FilteredOrganisations = () => {
  let style = {
    display: 'block'
  }
  let isFiltered = true;

  return (
    <div>
      <Link to="/">
        <div className="back-arrow">
          <FontAwesome size='4x' name='long-arrow-left' />
        </div>
      </Link>
      <div style={style}>
        <SubCategories />      
        </div>
      <div>
        <div className="organisations-wrapper-div">
          <Organisations isFiltered={isFiltered} />
        </div>
      </div>
    </div>
  );
}

export default FilteredOrganisations;