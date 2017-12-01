import React, { Component } from 'react';
import OrganisationStore from '../Stores/Organisation';
import dateFormat from 'dateformat';
import PeopleImage from '../Images/people.jpg';

let getState = (props) => {
      return {
        organisation: OrganisationStore.getOrganisation(props.props.params.organisationSlug),
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
        //after render when DOM exists - integrate with kenticoCloud
        OrganisationStore.addChangeListener(this.onChange);
        OrganisationStore.provideOrganisation(this.props.props.params.organisationSlug);
    }

    componentWillMount(){
        //Set initial state? 
        // this.state = getState(this.props);
    }
    componentWillUnmount() {
        OrganisationStore.removeChangeListener(this.onChange);
    }

   // TODO:  undersök vad som händer med renderingen 
    // shouldComponentUpdate(){
    //     return false;
    // }

    onChange() {
        this.setState(getState(this.props));
    }

    render() {
        let organisation = this.state.organisation;

        if (!organisation) {
            return (
                <div className="container">Could not find organisation</div>
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
        let imageLink = PeopleImage;
        if (organisation.image.value.length > 0) {
            imageLink = organisation.image.value[0].url;
        }
        // let postDate = 'dateFormat';¨
        let description = organisation.description.value;
        let email = organisation.email.value;
        let website = "i have no website";
        if(organisation.website.value) {
            website = organisation.website.value;
        }
        let phone = organisation.phone.value;
        console.log("email " + email);
        console.log("website " + website);
        console.log("phone " + phone);

          var central = {
            paddingLeft: '300px',
            paddingRight: '300px'
        }
        var basicInfo = {
            textAlign: 'center',
            fontSize: '20px'
        }

        return (
            <div style={central} className="container">
                <article className="article-detail col-lg-9 col-md-12 article-detail-related-box">
                    <h2>{title}</h2>
                    <div className="article-detail-datetime">
                        {title}
                    </div>
                    <div className="row">
                        <div className="col-lg-8" dangerouslySetInnerHTML={{ __html: description }} >
                        </div>
                        <div className="article-detail-image col-lg-4">
                            <img alt={title} className="img-responsive" src={imageLink} title={title} />
                        </div>
                    </div>
                    <div>
                    <div style={basicInfo}>
                    {website}
                    </div>
                    <div style={basicInfo}>
                    {phone}
                    </div>
                    <div style={basicInfo}>
                    {email}
                    </div>
                    <span className="product-tile">
                        {location}
                        </span>
                    </div>
                    <div >
                        <span className="product-tile">
                        {category}
                        </span>
                    </div>
                </article>
            </div>
        );
    }
}

export default Organisation;