import React from 'react';
import { Link } from 'react-router'

const Articles = (props) => {
  return (
    <div className="container">
      <div className="container product-page-container">
        <nav role="navigation" className="sub-menu row">
          <div className="store-menu-list row">
            <ul>
              <li>
                <Link to="/store/organisationWithFilter">organisationWithFilter hejehj</Link>
              </li>
            </ul>
          </div>
        </nav>
        {props.children}
      </div>
    </div>
  );
}

export default Articles;