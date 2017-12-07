import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router'
import OrganisationStore from '../Stores/Organisation';
import Dropdown from 'react-dropdown';
import FontAwesome from 'react-fontawesome';
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
    let locationDiv = {
      color: 'white',
      display: 'inline-block',
      float: 'right',
    }

    let dropdownStyle = {
      color: 'white',
      fontSize: '14px'
    }

    return (
      <div>
      <div style={locationDiv}>
        <FontAwesome name="map-marker" size="2x" />
        </div>
        <div style={locationDiv}>
        <Dropdown  className="location-filter" style={dropdownStyle} options={options} onChange = {this.onLocationChange} value={chosenLocation} placeholder="Välj plats här" />
      </div>
      </div>
    );
  }
}
export default Location;
