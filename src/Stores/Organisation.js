import Client from "../Client.js";

let changeListeners = [];
let initialized = false;
let organisations = [];
let organisationDetails = {};
let organisationListCapacity = 0;
let locations = ['hela_sverige'];
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
    // this.categories = [category];
    if (index < 0) this.categories.push(category); else this.categories.splice(index, 1);
  }


}

let organisationFilter = new Filter();

class OrganisationStore {

  // Actions

  async provideOrganisation(organisationSlug) {
    await Client.items()
      .type('organisation')
      .equalsFilter('elements.slug', organisationSlug)
      .elementsParameter(['name', 'description', 'image', 'phone', 'website', 'email', 'location', 'category'])
      .get()
      .subscribe(response => {
        // response = response.json();
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
    // if(this.organisations === undefined) {
    //   this.provideOrganisations();
    // }
    // return organisations.find((organisation) => organisation.slug.value === organisationSlug);
    return organisationDetails[organisationSlug];
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

  setSubCategoryFilter(filter) {
    organisationFilter = [filter];
    notifyChange;
  }

  resetMainCategoryFilter(){
    organisationFilter.categories = [];
  }

//No filter functions, just to show chosen filter
  setChosenLocation(location) {
    this.chosenLocation = location;
    ("chosenLocationNow: " + this.chosenLocation);
  }

//No filter functions, just to show chosen filter
  getChosenLocation(){
    return this.chosenLocation;
  }

//No filter functions, just to show chosen filter
  setChosenFilter(category) {
    this.chosenFitler = category;
  }

//No filter functions, just to show chosen filter
  getChosenFilter(){
    return this.chosenFitler;
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
   getIconForCategory(category) {
    if(category == "Juridisk rådgivning"){
      return 'gavel';
    }
    if(category == "Mat & Boende"){
      return 'home';
    }
    if(category == "Hälsa"){
      return 'medkit';
    }
    if(category == "Kvinna"){
      return 'venus';
    }
    if(category == "Socialt (stöd/umgänge)"){
      return 'users';
    }
    if(category == "Arbete & utbildning"){
      return 'briefcase';
    }
    if(category == "Barn"){
      return 'child';
    }
    if(category == "HBTQI+"){
      return 'transgender-alt';
    }
  }

}

export default new OrganisationStore();
