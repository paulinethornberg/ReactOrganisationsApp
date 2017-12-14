import React, { Component } from 'react';
import OrganisationStore from '../Stores/Organisation';

let getState = (props) => {
  return {
    aboutUs: OrganisationStore.getAboutUs()
  };
};

class About extends Component {
  state = {
        aboutUS: []
  };
  constructor(props) {
    super(props);

    // this.state = getState();
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    await OrganisationStore.provideAboutUs().then(
      this.state=getState(this.props)
    );
    OrganisationStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    // OrganisationStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {

    console.log("this props" + this.props.aboutUs);
    console.log("this state" + this.state.aboutUs[0].email.value);
    let email = this.state.aboutUs[0].email.value;
    let description = this.state.aboutUs[0].description.value;
    return (
      <div className="container">
      <div>
        {email}
      </div>
      <div>
        {description}
      </div>
      </div>
    );
  };
}

export default About;