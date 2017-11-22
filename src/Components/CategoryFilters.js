import React, { Component } from 'react';
import OrganisationWFilterStore from "../Stores/OrganisationWFilter";
import HandImage from '../Images/hand.jpg';
import PeopleImage from '../Images/people.jpg';
import BubblesImage from '../Images/bubbles.jpg';

let getState = () => {
  return {
    categories: OrganisationWFilterStore.getCategories(),
    filter: OrganisationWFilterStore.getFilter()
  };
};

class CategoryFilters extends Component {
  constructor(props) {
    super(props);

    this.state = getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    OrganisationWFilterStore.addChangeListener(this.onChange);
    OrganisationWFilterStore.provideCategories();
  }

  componentWillUnmount() {
    OrganisationWFilterStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    let categories = this.state.categories;
    let filter = this.state.filter;

    return (
      <aside>
        <h4>Category</h4>
        <CategoryFilterIcon categories={categories} filter={filter}/>
      </aside>
    );
  }
}

const CategoryFilterIcon = (props) => {
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
  let url = "organisations/" + props.category.codename;
  let checked = props.filter.categories.includes(codename);
  let onChange = () => {
    props.filter.toggleCategory(codename);
    OrganisationWFilterStore.setFilter(props.filter);
  }
  return (
      <div className="col-lg-4 col-sm-6">
    <span className="checkbox js-postback">
      <input id={codename} type="checkbox" checked={checked} onChange={onChange}/>
       <h2 htmlFor={codename}>{props.category.name}</h2>           
      <a href={url}>
       <img src={PeopleImage}/>
       </a>
    </span>
    </div>
    
  );
}

export default CategoryFilters;
