import React, { Component } from 'react';
import OrganisationStore from '../Stores/OrganisationWFilter';
import { Link } from 'react-router'
import dateFormat from 'dateformat';

const organisationCount = 5;

let getState = (props) => {
  return {
    organisations: OrganisationStore.getOrganisations(organisationCount)
  };
};

class LatestOrganisations extends Component {
  constructor(props) {
    super(props);

    this.state = getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    OrganisationStore.addChangeListener(this.onChange);
    OrganisationStore.provideOrganisations(organisationCount);
  }

  componentWillUnmount() {
    OrganisationStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    if (this.state.organisations.length === 0) {
      return (
        <div className="row" />
      );
    }

    let formatDate = (value) => {
      return dateFormat(value, "mmmm d");
    };

    var otherOrganisations = this.state.organisations.slice(1).map((organisation, index) => {
      let title = organisation.name.value;
      let imageLink = organisation.image.value[0].url;
      let postDate = formatDate(organisation.postdate.value);
      // let summary = article.summary.value;
      let link = "/organisations/" + organisation.slug.value;

      return (
        <div className="col-md-3" key={index}>
          <div className="article-tile">
            <Link to={link}>
              <img alt={"Article " + title} className="article-tile-image" src={imageLink} title={"Organisation " + title} />
            </Link>
            <div className="article-tile-date">
              {postDate}
            </div>
            <div className="article-tile-content">
              <h2 className="h4">
                <Link to={link}>{title}</Link>
              </h2>
              <p className="article-tile-text">
                {title}
              </p>
            </div>
          </div>
        </div>
      );
    });

    let organisation = this.state.organisations[0];
    let title = organisation.name.value;
    let imageLink = organisation.image.value[0].url;
    let postDate = formatDate(organisation.postDate.value);
    // let summary = organisation.summary.value;
    let link = "/organisations/" + organisation.slug.value;

    return (
      <div className="row">
        <h1 className="title-tab">Latest organisation</h1>
        <div className="article-tile article-tile-large">
          <div className="col-md-12 col-lg-6">
            <Link to={link}>
              <img alt={title} className="article-tile-image" src={imageLink} title={title} />
            </Link>
          </div>
          <div className="col-md-12 col-lg-6">
            <div className="article-tile-date">
              {postDate}
            </div>
            <div className="article-tile-content">
              <h2>
                <Link to={link}>{title}</Link>
              </h2>
              <p className="article-tile-text lead-paragraph">
                {name}
              </p>
            </div>
          </div>
        </div>
        {otherOrganisations}
      </div>
    );
  }
}

export default LatestOrganisations;