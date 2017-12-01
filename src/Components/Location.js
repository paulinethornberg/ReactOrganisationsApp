import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router'
import OrganisationStore from '../Stores/Organisation';
import Dropdown from 'react-dropdown';
import BubblesImage from '../Images/bubbles.jpg';

let getState = () => {
  return {
    locations: OrganisationStore.getLocations(),
    filter: OrganisationStore.getFilter()
  };
};

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = getState("hela_sverige");
    this.onChange = this.onChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
  }

componentDidMount() {
  OrganisationStore.addChangeListener(this.onChange);
  // OrganisationStore.addChangeListener(this.onLocationChange);
  OrganisationStore.provideLocations();
}

  componentWillUnmount() {
    OrganisationStore.removeChangeListener(this.onChange);
    OrganisationStore.removeChangeListener(this.onLocationChange);
  }

  onChange(event) {
    this.setState(getState());
  }

   onLocationChange (event) {
   console.log(event);
   this.state.filter.toggleLocation(event.value);
   OrganisationStore.setChosenLocation(event.label);   
   OrganisationStore.setFilter(this.state.filter);
  }

  render() {
    let locations = this.state.locations;
    let filter = this.state.filter;
      let options = this.state.locations.map((location) => {
      return {label: location.name, value: location.codename}
    });
    let chosenLocation = OrganisationStore.getChosenLocation(); 

    let dropdownStyle = {
      backgroundColor: 'red',
      fontSize: '14px'
    }

    return (
      <div>
        <Dropdown style={dropdownStyle} className="location-filter" options={options} onChange = {this.onLocationChange} value={chosenLocation} placeholder="Klicka för att välja en plats" />
      </div>
    );
  }
}
export default Location;
  // let options = this.state.locations.map((location) => {
  //     return {key: location.name, value: location.codename}
  //   });

// const LocationFilter = (props) => {
//   let options = props.locations.map((location) => location.name);
//   console.log("hello"+ options);
//   const defaultOption = options[0]
//    let onChange = (codename) => {
//     props.filter.toggleLocation(codename);
//     OrganisationStore.setFilter(props.filter);
//     OrganisationStore.setChosenFilter(codename);
//   }
//   return (
//     <div>
//     <select>
//     </select>
//     <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Välj en plats" />
//     </div>
//   );
// }

//      return (
//       <div>
//         <h4>Locations</h4>
//         <LocationFilter locations={locations} filter={filter} />
//       </div>
//     );
//   }
// }

// const LocationFilter = (props) => {
//   let filterItems = props.locations.map((location) => {
//   return (
//         <LocationFilterItem location={location} filter={props.filter} key={location.codename}/>
//   );
// // });
//   return (
//      <select onChange={onLocationChange}>
//         <option value="1">1 </option>
//         <option value="2"> 2</option>
//      </select>
//   );
// }

//   return (
//      <select onChange={onChange}>
//    
//       {filterItems}
//      </select>
//   );
// }

// const LocationFilter = (props) => {
//   let filterItems = props.locations.map((location) => {
//     return (
//       <LocationFilterItem location={location} filter={props.filter} key={location.codename}/>
//     );
//   });

// const LocationFilterItem = (props) => {
//   let locations = props.location.terms;
//   let name = props.location.name;
//   let codename = props.location.codename;
//    return (
//     <option value="{codename}">{name}</option>
//   );
// }




// const LocationFilter = (props) => {
//   let options = props.locations.map((location) => location.name);
//   console.log("hello"+ options);
//   const defaultOption = options[0]
//    let onChange = (codename) => {
//     props.filter.toggleLocation(codename);
//     OrganisationStore.setFilter(props.filter);
//     OrganisationStore.setChosenFilter(codename);
//   }
//   return (
//     <div>
//     <select>
//     </select>
//     <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Välj en plats" />
//     </div>
//   );
// }

// const LocationFilter = (props) => {
//   let filterItems = props.locations.map((location) => {
//     return (
//       <LocationFilterItem location={location} filter={props.filter} key={location.codename}/>
//     );
//   });

//   return (
//     <div>
//       {filterItems}
//     </div>
//   );
// }