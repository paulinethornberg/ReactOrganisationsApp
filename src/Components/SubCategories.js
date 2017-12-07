import React, { Component } from 'react';
import OrganisationStore from '../Stores/Organisation';

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
    let categories = this.state.categories
    let filter = this.state.filter;
    var subFilterStyle = {
      textAlign: 'center',
      fontSize: '16px'
    }

    return (
      <div style={subFilterStyle}>
        <h4>Kategorier</h4>
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
  let onChange = () => {
    props.filter.toggleCategory(codename);
    OrganisationStore.setFilter(props.filter);
    chosenFilter = codename;
  }

  if (codename === chosenFilter) {
    return (
      <div >
        <h3>{props.category.name}</h3>
        <input id={codename} type="checkbox" checked={checked} onChange={onChange} />
        <label htmlFor={codename}>{props.category.name}</label>

        <SubCategoryFilter categories={categories} filter={props.filter} />
      </div>
    );
  }
  else {
    return (
      <div>
      </div>
    );
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
  let categories = props.category.terms;
  let codename = props.category.codename;
  let checked = props.filter.categories.includes(codename);
  let onChange = () => {
    //remove filter on change. add maincategory back on remove
    props.filter.toggleCategory(codename);
    OrganisationStore.setFilter(props.filter);
  }

  return (
    <span className="checkbox js-postback">
      <input id={codename} type="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor={codename}>{props.category.name}</label>
    </span>
  );
}
export default SubCategories;