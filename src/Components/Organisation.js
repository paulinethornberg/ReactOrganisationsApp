import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router'
import FontAwesome from 'react-fontawesome';
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
    state = {
        organisationDetails: {},
        filter: {}
    };
    constructor(props) {
        super(props);
        // this.state = getState(props);
        this.onChange = this.onChange.bind(this);
    }

    async componentDidMount() {
        //after render when DOM exists - integrate with kenticoCloud

        await OrganisationStore.provideOrganisation(this.props.props.params.organisationSlug).then(
            this.state = getState(this.props));
        OrganisationStore.addChangeListener(this.onChange);
        //    OrganisationStore.provideOrganisation(this.props.props.params.organisationSlug).then(
        //         this.setState(getState(this.props))
        //    );
        // let organisation = OrganisationStore.getOrganisation(this.props.props.params.organisationSlug);

    }

    componentWillMount() {
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
                <div className="container"></div>
            );
        }

        let renderTags = (tag) => {
            if (tag.value.length === 0) {
                return <span />
            }
            let tagValues = tag.value.map(x => x.name);
            let tags = tagValues.map((tag) => {
                return (<TagItem key={tag} tag={tag} />);
            });

            return (
                <span >
                    {tags}
                </span>
            );

        }

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
        let website = "";
        if (organisation.website.value) {
            website = organisation.website.value;
        }
        let facebook = "";
        if (organisation.facebook.value) {
            facebook = organisation.facebook.value;
        }
        let phone = organisation.phone.value;


        return (
            <div className="organisation-page">
                <Link to="organisations">
                    <div className="back-arrow">
                        <FontAwesome size='4x' name='long-arrow-left' />
                    </div>
                </Link>
                <div className="container-organsiation">
                    <div >

                        <img alt={title} className="organisation-image" src={imageLink} title={title} />
                        <h2  className="organisation-title notranslate" >{title}</h2>

                        <div className="organiastion-contact-wrapper notranslate">
                            <div>
                                <div className="organisation-contact-info" >
                                    <FontAwesome size='2x' name='globe' />
                                </div>
                                <div className="organisation-contact-info-text">
                                    <a target="_blank" href={website}> {website} </a>
                                </div>
                            </div>
                            <div >
                                <div className="organisation-contact-info" >
                                    <FontAwesome size='2x' name='facebook' />
                                </div>
                                <div className="organisation-contact-info-text">
                                    {facebook}
                                </div>
                            </div>
                            <div >
                                <div className="organisation-contact-info" >
                                    <FontAwesome size='2x' name='phone' />
                                </div>
                                <div className="organisation-contact-info-text">
                                    {phone}
                                </div>
                            </div>
                            <div>
                                <div className="organisation-contact-info" >
                                    <FontAwesome size='2x' name='envelope-o' />
                                </div>
                                <div className="organisation-contact-info-text">
                                    {email}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span className="product-tile">
                                    {category}
                                </span>
                            </div>
                        </div>
                        <div>
                            <h3  className="notranslate" >{title}</h3>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: description }} >

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
const TagItem = (props) => {
    var style = {
        marginRight: '10px',
        marginTop: '10px'
    }
    return (
        <div style={style} className="organisation-tags-status">
            {props.tag}
        </div>
    );
}

export default Organisation;