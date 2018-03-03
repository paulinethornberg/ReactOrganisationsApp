import React from 'react';
import Organisations from "../Components/Organisations";

const AllOrganisations = () => {
 let isFiltered = false;
  return (
    <div>
        <div className="organisations-wrapper-div">
          <Organisations isFiltered={isFiltered} />
        </div>
      </div>
  );
}

export default AllOrganisations;