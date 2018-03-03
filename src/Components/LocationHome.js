import React, { Component } from 'react';
import OrganisationStore from '../Stores/Organisation';
import FontAwesome from 'react-fontawesome';

let getState = () => {
  return {
    locations: OrganisationStore.getLocations(),
    filter: OrganisationStore.getFilter()
  };
};

class LocationHome extends Component {
  constructor(props) {
    super(props);

    this.state = getState("hela_sverige");
    this.onChange = this.onChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
  }

componentDidMount() {
  OrganisationStore.addChangeListener(this.onChange);
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
   this.state.filter.toggleLocation(event.target.value);
   OrganisationStore.setChosenLocation(event.target.selectedOptions[0].text);
   OrganisationStore.setFilter(this.state.filter);
  }

  render() {
    // let filter = this.state.filter;
    let options = this.state.locations.map((location) => {
      return {label: location.name, value: location.codename}
    });

    let dropdownStyle = {
      color: 'white',
      fontSize: '14px'
    }

    let counter = 0;

    return (
  <div className="location-div location-home-div" >
     <FontAwesome name="map-marker" />
         <select  onChange={this.onLocationChange}>
            {
                options.map(item => <option value={item.value} label={item.label} key={item.value + 'a' + counter++}>{item.label}</option>)
                })
            }
        </select>
       </div>
    );
  }
}
export default LocationHome;

        // <FontAwesome name="map-marker" size="2x" />

      //
      //   <Dropdown  className="location-filter location-home-filter" style={dropdownStyle} options={options} onChange = {this.onLocationChange} value={chosenLocation} placeholder="Välj plats här" />
      //
