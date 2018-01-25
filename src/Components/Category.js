import React, { Component } from 'react';
import { Link } from 'react-router'
import OrganisationStore from '../Stores/Organisation';
import FontAwesome from 'react-fontawesome';

let getState = () => {
  return {
    categories: OrganisationStore.getCategories(),
    filter: OrganisationStore.getFilter(),
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
  OrganisationStore.provideAboutUs();
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
       let center = {
         textAlign: 'center'
       }
     return (
      <div style={center}>
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
  var icon = OrganisationStore.getIconForCategory(props.category.name);
  let onChange = () => {
    OrganisationStore.resetMainCategoryFilter();
    props.filter.toggleCategory(codename);
    OrganisationStore.setFilter(props.filter);
    OrganisationStore.setChosenFilter(codename);
    document.cookie = "category="+ codename;
    var x = document.cookie;
  }

   let innerDiv = {
    // width: '80%',
    backgroundColor: 'white',
    paddingTop: '40px',
    paddingBottom: '40px'
  }

   return (
    <div className="category-wrapper">
     <Link to="organisations" onClick={onChange}>
      <div className="category-div">
      <div style={innerDiv} >
     <h3>{props.category.name}</h3>
     <FontAwesome name={icon} size="4x" />
     </div>

    </div>
    </Link>

    </div>

  );
}
export default Category;