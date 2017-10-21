// import Client from "../Client.js";

// let organisationList = [];
// let organisationListCapacity = 0;

// let organisationDetails = {};

// let changeListeners = [];

// let notifyChange = () => {
//   changeListeners.forEach((listener) => {
//     listener();
//   });
// }

// class OrganisationStore {

//   // Actions

//   provideOrganistion(organisationSlug) {

//     Client.items()
//       .type('organisation')
//       .equalsFilter('elements.slug', organisationSlug)  
//       .elementsParameter(['name', 'description', 'image'])
//       .get()
//       .subscribe(response => {
//         if (!response.isEmpty) {
//           organisationDetails[organisationSlug] = response.items[0];
//           notifyChange();
//         }
//       })
//   }

//   provideOrganistions(count) {
//     if (count <= organisationListCapacity) {
//       return;
//     }

//     organisationListCapacity = count;

//     Client.items()
//       .type('organisation')         
//       .get()
//       .subscribe(response =>
//         {
//           organisationList = response.items;
//           notifyChange();
//         });
//   }

//   // Methods
  
//   getOrganisation(organisationSlug) {
//     return organisationDetails[organisationSlug];
//   }

//   getOrganisations(count) {
//     return organisationList.slice(0, count);
//   }

//   // Listeners

//   addChangeListener(listener) {
//     changeListeners.push(listener);
//   }

//   removeChangeListener(listener) {
//     changeListeners = changeListeners.filter((element) => {
//       return element !== listener;
//     });
//   }

// }

// export default new OrganisationStore();