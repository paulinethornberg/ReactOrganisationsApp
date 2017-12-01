import Client from "../Client.js";

let changeListeners = [];
let initialized = false;
let organisations = [];
let organisationDetails = {};
let organisationListCapacity = 0;
let locations = [];
let categories = [];
let chosenFilter = new String();
let chosenLocation = new String();

let notifyChange = () => {
  changeListeners.forEach((listener) => {
    listener();
  });
}

let fetchLocations = () => {
  Client.taxonomy("location")
    .get()
    .subscribe(response => {
      locations = response.terms;
      notifyChange();
    });
};

let fetchCategories = () => {
  Client.taxonomy("category")
    .get()
    .subscribe(response => {
      categories = response.terms;
      // if (categories.terms.length > 0) {
      //   subcategories = categories.terms;
      // }
      notifyChange();
    });
}

export class Filter {
  constructor() {
    this.locations = [];
    this.categories = [];

  }
 matches(organisation) {
    return this.matchesLocations(organisation) && this.matchesCategories(organisation);
  }

  matchesLocations(organisation) {
    if (this.locations.length === 0) {
      return true;
    }

    let locations = organisation.location.value.map(x => x.codename);

    return this.locations.some(x => locations.includes(x));
  }

  matchesCategories(organisation) {
    if (this.categories.length === 0) {
      return true;
    }

    let categories = organisation.category.value.map(x => x.codename);

    return this.categories.some(x => categories.includes(x));
  }
 
  toggleLocation(location) {
    let index = this.locations.indexOf(location);

    if (index < 0) this.locations.push(location); else this.locations.splice(index, 1);
  }

  toggleCategory(category) {
    let index = this.categories.indexOf(category);

    if (index < 0) this.categories.push(category); else this.categories.splice(index, 1);
  }
  
  //TODO: this is not right i believe if we do this, all filters will dissappear.
  toggleSubCategory(category) {
    let index = this.categories.indexOf(category);
    this.categories = [category];
    // if (index < 0) this.categories.push(category); else this.categories.splice(index, 1);
  }
}

let organisationFilter = new Filter();

class OrganisationStore {

  // Actions

   provideOrganisation(organisationSlug) {

    Client.items()
      .type('organisation')
      .equalsFilter('elements.slug', organisationSlug)
      .elementsParameter(['name', 'description', 'image', 'phone', 'website'])
      .get()
      .subscribe(response => {
        if (!response.isEmpty) {
          organisationDetails[organisationSlug] = response.items[0];
          notifyChange();
        }
      })
  }
  provideOrganisations(count) {
    if (count <= organisationListCapacity) {
      return;
    }

    organisationListCapacity = count;

    Client.items()
      .type('organisation')
      .get()
      .subscribe(response =>
        {
          organisations = response.items;
          notifyChange();
        });
  }


  provideLocations() {
    fetchLocations();
  }

  provideCategories() {
    fetchCategories();
  }

  // Methods

  getOrganisation(organisationSlug) {
    if(this.organisations === undefined) {
      this.provideOrganisations();
    }
    return organisations.find((organisation) => organisation.slug.value === organisationSlug);
    // organisationDetails[organisationSlug];
  }

  getOrganisations(count) {
    return organisations.slice(0, count);
  }

  getLocations() {
    return locations;
  }

  getCategories() {
    return categories;
  }

  getFilter() {
    return organisationFilter;
  }

   setFilter(filter) {
    organisationFilter = filter;
    notifyChange();
  }

  setChosenLocation(location) {
    this.chosenLocation = location;
    console.log("chosenLocationNow: " + this.chosenLocation);    
  }
  getChosenLocation(){
    return this.chosenLocation;
  }

   setChosenFilter(category) {
    this.chosenFitler = category;
  }
  getChosenFilter(){
    return this.chosenFitler;
  }
  setSubCategoryFilter(filter) {
    organisationFilter = [filter];
    notifyChange;
  }
  // Listeners

  addChangeListener(listener) {
    changeListeners.push(listener);
  }

  removeChangeListener(listener) {
    changeListeners = changeListeners.filter((element) => {
      return element !== listener;
    });
  }

}

export default new OrganisationStore();
