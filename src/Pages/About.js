import React, { Component } from 'react';
import OrganisationStore from '../Stores/Organisation';
import FontAwesome from 'react-fontawesome';

let getState = () => {
  return {
    about: OrganisationStore.getAboutUs()
  };
};

class About extends Component {
  state = {
    aboutUs: {}
  }
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    await OrganisationStore.provideAboutUs().then(
      this.state = getState()
    );
    OrganisationStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    OrganisationStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    if (!this.state.about) {
      return (
        <div className="container">hello </div>
      );
    } 
      
      let about = this.state.about;
      if(!about.email){
          return (
        <div className="container">hello </div>
      );
      }
      let email = about.email.value;
      let description = about.description.value;
      return (
        <div className="container about-container">
          <div className="organisation-contact-info" >
            <FontAwesome size='2x' name='envelope-o' />
          </div>
          <div className="organisation-contact-info-text">
            {email}
          </div>
          <div dangerouslySetInnerHTML={{ __html: description }} >
          </div>
        </div>

      )
  }
}

export default About;