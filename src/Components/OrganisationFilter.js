import React, { Component } from 'react';
import OrganisationWFilterStore from "../Stores/OrganisationWFilter";

let getState = () => {
  return {
    locations: OrganisationWFilterStore.getLocations(),
    categories: OrganisationWFilterStore.getCategories(),
    filter: OrganisationWFilterStore.getFilter()
  };
};

class OrganisationFilter extends Component {
  constructor(props) {
    super(props);

    this.state = getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    OrganisationWFilterStore.addChangeListener(this.onChange);
    OrganisationWFilterStore.provideLocations();
    OrganisationWFilterStore.provideCategories();
  }

  componentWillUnmount() {
    OrganisationWFilterStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    let locations = this.state.locations;
    let categories = this.state.categories;
    // console.log(categories[0]);
    let filter = this.state.filter;
    // console.log(filter);

    return (
      <aside className="col-md-4 col-lg-2 product-filter">
        <h4>Category</h4>
        <CategoryFilter categories={categories} filter={filter}/>
         <h4>Location</h4>
        <LocationFilter locations={locations} filter={filter}/>
      </aside>
    );
  }
}

const LocationFilter = (props) => {
  let filterItems = props.locations.map((location) => {
    return (
      <LocationFilterItem location={location} filter={props.filter} key={location.codename}/>
    );
  });

  return (
    <div>
      {filterItems}
    </div>
  );
}

const LocationFilterItem = (props) => {
  let codename = props.location.codename;
  let checked = props.filter.locations.includes(codename);
  let onChange = () => {
    props.filter.toggleLocation(codename);
    OrganisationWFilterStore.setFilter(props.filter);
  }

  return (
    <span className="checkbox js-postback">
      <input id={codename} type="checkbox" checked={checked} onChange={onChange}/>
      <label htmlFor={codename}>{props.location.name}</label>
    </span>
  );
}

const CategoryFilter = (props) => {
  let filterItems = props.categories.map((category) => {
    return (
      <CategoryFilterItem category={category} filter={props.filter} key={category.codename}/>
    );
  });

  return (
    <div>
      {filterItems}
    </div>
  );
}

const CategoryFilterItem = (props) => {
//   let subFilterItems = [];
//   subFilterItems = props.category.terms.map((category) => {
//     return ( 
//       <CategorySubFilterItem category ={category} filter={props.filter} key={category.codename} />
//     );
// });
  let categories = props.category.terms;

  let codename = props.category.codename;
  let checked = props.filter.categories.includes(codename);
  let onChange = () => {
    props.filter.toggleCategory(codename);
    OrganisationWFilterStore.setFilter(props.filter);
  }
  return (
    <span className="checkbox js-postback">
      <input id={codename} type="checkbox" checked={checked} onChange={onChange}/>
      <label htmlFor={codename}>{props.category.name}</label>
      <SubCategoryFilter categories={categories} filter={props.filter}/>
    </span>
    
  );
}
const SubCategoryFilter = (props) => {
  let filterItems = props.categories.map((category) => {
    return (
      <CategoryFilterItem category={category} filter={props.filter} key={category.codename}/>
    );
  });

  return (
    <div className ="subcategories">
      {filterItems}
    </div>
  );
}

export default OrganisationFilter;
