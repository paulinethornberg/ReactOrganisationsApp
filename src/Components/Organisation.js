import React, { Component } from 'react';
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
        let website = "i have no website";
        if (organisation.website.value) {
            website = organisation.website.value;
        }
        let phone = organisation.phone.value;

        var central = {
            width: '70%',
            margin: '0 auto'
        }
        var basicInfo = {
            // margin: '30px',

        }
        var tagContainer = {
            paddingTop: '40px'
        }
        var basicInfoText = {
            paddingLeft: '30px',
            display: 'inline-block',
            fontSize: '18px'
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
                        <figure className="product-tile-image">
                                <img alt={title} className="" src={imageLink} title={title} />
                            </figure>
                    </div>
                    <div>
                        <div style={basicInfo}>
                         <FontAwesome size='2x' name='globe' />
                            <div style={basicInfoText}>
                            {website}
                            </div>
                        </div>
                        <div style={basicInfo}>
                            <FontAwesome size='2x' name='facebook' />
                            <div style={basicInfoText}>
                            facebook
                            </div>
                    </div>
                        <div style={basicInfo}>
                            <FontAwesome size='2x' name='phone' />
                            <div style={basicInfoText}>
                                {phone}
                            </div>
                        </div>
                        <div style={basicInfo}>
                            <FontAwesome size='2x' name='envelope-o' />
                             <div style={basicInfoText}>
                            {email}
                            </div>
                        </div>
                        <div style={tagContainer}>
                            <div>
                                <span className="product-tile">
                                    {location}
                                </span>
                            </div>
                            <div style={tagContainer}>
                                <span className="product-tile">
                                    {category}
                                </span>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}
const TagItem = (props) => {
    var style = {
        marginRight: '5px'
    }
    return (
        <span style={style} className="product-tile-status">
            {props.tag}
        </span>
    );
}

export default Organisation;