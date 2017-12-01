import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router'
import OrganisationStore from '../Stores/Organisation';
import PeopleImage from '../Images/people.jpg';

let getState = () => {
  return {
    categories: OrganisationStore.getCategories(),
    filter: OrganisationStore.getFilter()
  };
};

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = getState();
    this.onChange = this.onChange.bind(this);
  }

componentDidMount() {
  OrganisationStore.addChangeListener(this.onChange);
  OrganisationStore.provideCategories();
}

  componentWillUnmount() {
    OrganisationStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    let categories = this.state.categories
       let filter = this.state.filter;

     return (
      <div>
        <CategoryFilter categories={categories} filter={filter} />
      </div>
    );
  }
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
  let categories = props.category.terms;
  let codename = props.category.codename;
  let checked = props.filter.categories.includes(codename);
  let onChange = () => {
    OrganisationStore.resetMainCategoryFilter();
    props.filter.toggleCategory(codename);
    OrganisationStore.setFilter(props.filter);
    OrganisationStore.setChosenFilter(codename);
  }
   return (
    <span className="checkbox js-postback">
     <Link to="organisations" onClick={onChange}>
    <div className="col-lg-4 col-sm-6">
     <h3>{props.category.name}</h3>
      <img src={PeopleImage}/>
    </div>
    </Link>
   
    </span>

  );
}
export default Category;