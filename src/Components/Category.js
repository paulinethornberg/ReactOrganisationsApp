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
        <h4>Categories</h4>
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
    props.filter.toggleCategory(codename);
    OrganisationStore.setFilter(props.filter);
    OrganisationStore.setChosenFilter(codename);
  }
   return (
    <span className="checkbox js-postback">
    <div className="col-lg-4 col-sm-6">
    <input id={codename} type="checkbox" checked={checked} onChange={onChange}/>
      <label htmlFor={codename}>{props.category.name}</label>
      <img src={PeopleImage}/>
    </div>
    </span>

  );
}
export default Category;