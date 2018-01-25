import React, { Component } from 'react';
import OrganisationStore from '../Stores/Organisation';
import FontAwesome from 'react-fontawesome';


let getState = () => {
  return {
    categories: OrganisationStore.getCategories(),
    filter: OrganisationStore.getFilter()
  };
};

class SubCategories extends Component {
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
    let categories = this.state.categories;
    let filter = this.state.filter;
    var subFilterStyle = {
      textAlign: 'center',
      fontSize: '16px'
    }



    return (
      <div style={subFilterStyle}>
        <CategoryFilter categories={categories} filter={filter} />
      </div>
    );
  }
}

const CategoryFilter = (props) => {

  let filterItems = props.categories.map((category) => {
    return (
      <CategoryFilterItem category={category} filter={props.filter} key={category.codename} />
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
  let chosenFilter = OrganisationStore.getChosenFilter();
  if(chosenFilter === undefined) {
    let cookieValue = document.cookie.match(new RegExp("category" + '=([^;]+)'));
    if (cookieValue) chosenFilter = cookieValue[1];
    props.filter.toggleCategory(chosenFilter);
    // OrganisationStore.setFilter(props.filter);
    OrganisationStore.setChosenFilter(chosenFilter);
  }
  var icon = OrganisationStore.getIconForCategory(props.category.name);
  let onChange = () => {
    props.filter.toggleCategory(codename);
    OrganisationStore.setFilter(props.filter);
    chosenFilter = codename;
  }
        // <input id={codename} type="checkbox" checked={checked} onChange={onChange} />
        // <label htmlFor={codename}>{props.category.name}</label>
  if (codename === chosenFilter) {
    return (
      <div className="sub-categories">
      <FontAwesome name={icon} size="5x" />
        <h3>{props.category.name}</h3>
        <SubCategoryFilter categories={categories} filter={props.filter} />
      </div>
    );
  }
  else {
    return null;
  }
}

const SubCategoryFilter = (props) => {
  let filterItems = props.categories.map((category) => {
    return (
      <SubCategoryFilterItem category={category} filter={props.filter} key={category.codename} />
    );
  });

  return (
    <div className="subcategories">
      {filterItems}
    </div>
  );
}

const SubCategoryFilterItem = (props) => {
  let categories = props.category.name;
  // console.log("this is props " + props.category.name);
  let codename = props.category.codename;
  let checked = props.filter.categories.includes(codename);
  let onChange = () => {
    //remove filter on change. add maincategory back on remove
    props.filter.toggleSubCategory(codename);
    OrganisationStore.setFilter(props.filter);
  }

  return (
    <div className="checkbox js-postback col-md-4">
      <input className="float-left" id={codename} type="checkbox" checked={checked} onChange={onChange} />
      <label className="float-left" htmlFor={codename}>{props.category.name}</label>
    </div>
  );
}
export default SubCategories;