import React, { Component } from 'react';
import OrganisationStore from '../Stores/OrganisationWFilter';
import RichTextElement from '../Components/RichTextElement';
import dateFormat from 'dateformat';
import PeopleImage from '../Images/people.jpg';

let getState = (props) => {
  return {
    organisation: OrganisationStore.getOrganisation(props.params.organisationSlug),
    filter: OrganisationStore.getFilter()

  };
};

class Organisation extends Component {

  constructor(props) {
    super(props);

    this.state = getState(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    OrganisationStore.addChangeListener(this.onChange);
    OrganisationStore.provideOrganisation(this.props.params.articleSlug);
  }

  componentWillUnmount() {
    OrganisationStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState(this.props));
  }

  render() {
    let organisation = this.state.organisation;

    if (!organisation) {
      return (
        <div className="container"></div>
      );
    }

   let renderTags = (tag) => {
      if (tag.value.length === 0) {
        return <span />
      }
     
      let text = tag.value.map((x) => x.name).join(", ");
      
      return (
        <span className="product-tile-status">
          {text}
        </span>
      );
    };

    let formatDate = (value) => {
      return dateFormat(value, "dddd, mmmm d, yyyy");
    };

      let location = renderTags(organisation.location);
      let category = renderTags(organisation.category);
    let title = organisation.name.value;
    var email = organisation.email.value;
    var website = organisation.website.value;
    let imageLink = PeopleImage;
      if (organisation.image.value.length > 0) {
           imageLink = organisation.image.value[0].url;
      } 
    // let postDate = 'dateFormat';¨
    let description = organisation.description.value;


    return (
      <div className="container">
        <article className="article-detail col-lg-9 col-md-12 article-detail-related-box">
          <h2>{title}</h2>
          <div className="article-detail-datetime">
            {title}
          </div>
          <div className="row">
            <div className="article-detail-image col-md-push-2 col-md-8">
              <img alt={title} className="img-responsive" src={imageLink} title={title} />
            </div>
          </div>
           <div className="article-detail-datetime">
            {website}
          </div>
           <div className="article-detail-datetime">
            {email} 
          </div>
          <div className="row">
            <RichTextElement className="article-detail-content" element={description} />
            <p dangerouslySetInnerHTML={{__html: description}} />
          </div>
            <div className="row">
                <span className="product-tile-price">
                  {location}
                 </span>
                  <span className="product-tile-price">
                  {category}
                 </span>
              </div>
        </article>
      </div>
    );
  }
}

export default Organisation;