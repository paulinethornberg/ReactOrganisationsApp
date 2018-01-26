import React, { Component } from 'react';
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome';
import OrganisationStore from '../Stores/Organisation';
import dateFormat from 'dateformat';
import PeopleImage from '../Images/people.jpg';
import Scroll from 'react-scroll';

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
        this.onChange = this.onChange.bind(this);
    }

    async componentDidMount() {
        await OrganisationStore.provideOrganisation(this.props.props.params.organisationSlug).then(
            this.state = getState(this.props));
        OrganisationStore.addChangeListener(this.onChange);
        Scroll.Events.scrollEvent.register('begin', function(to, element) {
            console.log("begin", arguments);
        });
    }

    componentWillMount() {
        // this.state = getState(this.props);
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

        Scroll.animateScroll.scrollTo(500);


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
                            <div style={{display: website ? 'block' : 'none' }}>
                                <div className="organisation-contact-info" >
                                    <FontAwesome size='2x' name='globe' />
                                </div>
                                <div className="organisation-contact-info-text">
                                    <a target="_blank" href={website}> {website} </a>
                                </div>
                            </div>
                            <div style={{display: facebook ? 'block' : 'none' }} >
                                <div className="organisation-contact-info" >
                                    <FontAwesome size='2x' name='facebook' />
                                </div>
                                <div className="organisation-contact-info-text">
                                    {facebook}
                                </div>
                            </div>
                            <div style={{display: phone ? 'block' : 'none' }}>
                                <div className="organisation-contact-info" >
                                    <FontAwesome size='2x' name='phone' />
                                </div>
                                <div className="organisation-contact-info-text">
                                    {phone}
                                </div>
                            </div>
                            <div style={{display: email ? 'block' : 'none' }}>
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