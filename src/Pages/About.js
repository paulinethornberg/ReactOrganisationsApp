import React, { Component } from 'react';
import OrganisationStore from '../Stores/Organisation';
import FontAwesome from 'react-fontawesome';

let getState = (props) => {
  console.log("hello from state");
  return {
    aboutUs: OrganisationStore.getAboutUs()
  };
};

class About extends Component {
  state = {
    org: {}
  }
  constructor(props) {
    super(props);

    // this.state = getState();
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    await OrganisationStore.provideAboutUs().then(
      this.state = getState(this.props)
    );
    OrganisationStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    OrganisationStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState(this.props));
  }

  render() {
    let about = this.state.aboutUs;
    if (!about) {
      console.log("hello form not about");
      return (
        <div className="container"></div>
      );
    } else {

      console.log("this state" + about.email.value);
      let email = about.email.value;
      let description = about.description.value;
      return (
        <div className="container">
          <div className="organisation-contact-info" >
            <FontAwesome size='3x' name='envelope-o' />
          </div>
          <div className="organisation-contact-info-text">
            {email}
          </div>


          <div dangerouslySetInnerHTML={{ __html: description }} >

          </div>
        </div>

      )};
  }

}

export default About;