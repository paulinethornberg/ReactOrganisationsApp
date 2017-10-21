import React, { Component } from 'react';
import OrganisationStore from '../Stores/Organisation';
// import RichTextElement from '../Components/RichTextElement';
// import dateFormat from 'dateformat';

let organisationCount = 10;

let getState = (props) => {
  return {
    organisations: OrganisationStore.getOrganisations(organisationCount)
  };
};

class Organisations extends Component {

  constructor(props) {
    super(props);

    this.state = getState(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    OrganisationStore.addChangeListener(this.onChange);
    OrganisationStore.provideOrganistions(organisationCount);
  }

  componentWillUnmount() {
    OrganisationStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    // let formatDate = (value) => {
    //   return dateFormat(value, "dddd, mmmm d, yyyy");
    // };
  
    let counter = 0;

    let organisations = this.state.organisations.reduce((result, organisation, index) => {
      if (index % 4 === 0) {
        result.push(
          <div className="clear" key={counter++}></div>
        );
      }

    let title = organisation.name.value;
    let description = organisation.description.value;
    // let imageLink = organisation.image.value[0].url;
    // let postDate = 'dateFormat';
    // let bodyCopyElement = 'bodyelement';


    result.push(
        <div className="col-md-3" key={counter++}>
          <div className="article-tile">
            <div className="article-tile-date">
              {title}
            </div>
            <div className="article-tile-content">
              <h2 className="h4">
                 {title}
              </h2>
              <p className="article-tile-text">
                {description}
              </p>
            </div>
          </div>
        </div>
      );

      return result;
    }, []);

    return (
      <div className="container">
        {organisations}
      </div>
    );
  }
}

export default Organisations;