import React, { Component } from 'react';
import { Link } from 'react-router'
import OrganisationWFilterStore from "../Stores/OrganisationWFilter";
import PeopleImage from '../Images/people.jpg';

let getState = () => {
  return {
    organisations: OrganisationWFilterStore.getOrganisations(),
    filter: OrganisationWFilterStore.getFilter()
  };
};

class Organisations extends Component {

  constructor(props) {
    super(props);

    this.state = getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    OrganisationWFilterStore.addChangeListener(this.onChange);
    OrganisationWFilterStore.provideOrganisations();
  }

  componentWillUnmount() {
    OrganisationWFilterStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    // let formatPrice = (price) => {
    //   return price.toLocaleString("en-US", {
    //     style: "currency",
    //     currency: "USD"
    //   });
    // };

    // let renderTags = (tag) => {
    //   if (tag.value.length === 0) {
    //     return <span />
    //   }
     
    //   let text = tag.value.map((x) => x.name).join(", ");
      
    //   return (
    //     <span className="product-tile-status">
    //       {text}
    //     </span>
    //   );
    // };
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


    let filter = (organisation) => {
      return this.state.filter.matches(organisation);
    };

    let organisations = this.state.organisations.filter(filter).map((organisation, index) => {
      let name = organisation.name.value;
      let imageLink = PeopleImage;
      if (organisation.image.value.length > 0) {
           imageLink = organisation.image.value[0].url;
      } 
      let location = renderTags(organisation.location);
      let category = renderTags(organisation.category);
      let link = "organisations/" + organisation.slug.value;

      return (
        <div className="col-md-6 col-lg-3" key={index}>
          <article className="product-tile">
            <Link to={link}>
              <h1 className="product-heading">{name}</h1>
              <figure className="product-tile-image">
                <img alt={name} className="" src={imageLink} title={name} />
              </figure>
              <div className="product-tile-info">
                <span className="product-tile-price">
                  {location}
                 </span>
                  <span className="product-tile-price">
                  {category}
                 </span>
              </div>
            </Link>
          </article>
        </div>
      );
    });

    return (
      <div id="product-list" className="col-md-8 col-lg-9 product-list">
        {organisations}
      </div>
    );
  }
}

export default Organisations;