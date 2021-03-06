import React, { Component } from 'react';
import { Link } from 'react-router'
import OrganisationStore from "../Stores/Organisation";
import PeopleImage from '../Images/people.jpg';
import Scroll from 'react-scroll';

let getState = (isFiltered) => {
    // console.log(isFiltered);
    return {
        organisations: OrganisationStore.getOrganisations(),
        filter: OrganisationStore.getFilter(),
        categories: OrganisationStore.getCategories()
    };
};

class Organisations extends Component {

    constructor(props) {
        super(props);
        var isFiltered = this.props.isFiltered;
        this.state = getState(isFiltered);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        OrganisationStore.addChangeListener(this.onChange);
        OrganisationStore.provideOrganisations();
        Scroll.Events.scrollEvent.register('begin', function (to, element) {
            console.log("begin", arguments);
        });
    }

    componentWillUnmount() {
        OrganisationStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState(getState());
    }

    render() {
        let renderTags = (tag) => {
            if (tag.value.length === 0) {
                return <span />
            }
            let tagValues = tag.value.map(x => x.name);
            // var icon = OrganisationStore.getIconForCategory(props.category.name);
            let counter = 0;
            let tags = tagValues.map((tag) => {
                return (<TagItem key={tag + counter++} tag={tag} />);
            });
            if (tags.length > 8) {
                tags = tags.slice(0, 8);
            }
            return (
                <span >
                    {tags}
                </span>
            );

        }

        let filter = (organisation) => {
            return this.state.filter.matches(organisation);
        };

        if (this.props.isFiltered) {
            let organisations = this.state.organisations.filter(filter).map((organisation, index) => {
                let name = organisation.name.value;
                let imageLink = PeopleImage;
                if (organisation.image.value.length > 0) {
                    imageLink = organisation.image.value[0].url;
                }
                let category = renderTags(organisation.category);
                let link = "organisations/" + organisation.slug.value;
                Scroll.animateScroll.scrollTo(450);

                return (
                    <div className="organisations-page col-sm-6 col-md-3 col-xs-6" key={index}>
                        <Link to={link} params={{ organisationSlug: { name } }}>
                            <figure className="organisations-image">
                                <img alt={name} className="" src={imageLink} title={name} />
                            </figure>
                            <h1 className="notranslate">{name}</h1>

                            <div className="organisation-tags">
                                <span>
                                    {category}
                                </span>
                            </div>
                        </Link>
                    </div>
                );
            });
            return (
                <div>
                    {organisations}
                </div>
            );
        }

        let organisations = this.state.organisations.map((organisation, index) => {
            let name = organisation.name.value;
            let imageLink = PeopleImage;
            if (organisation.image.value.length > 0) {
                imageLink = organisation.image.value[0].url;
            }
            let category = renderTags(organisation.category);
            let link = "organisations/" + organisation.slug.value;
            Scroll.animateScroll.scrollTo(450);

            return (
                <div className="organisations-page col-sm-6 col-md-3 col-xs-6" key={index}>
                    <Link to={link} params={{ organisationSlug: { name } }}>
                        <figure className="organisations-image">
                            <img alt={name} className="" src={imageLink} title={name} />
                        </figure>
                        <h1 className="notranslate">{name}</h1>

                        <div className="organisation-tags">
                            <span>
                                {category}
                            </span>
                        </div>
                    </Link>
                </div>
            );
        });
        return (
            <div>
                {organisations}
            </div>
        );


    }
}

const TagItem = (props) => {
    var style = {
        marginRight: '5px',
        display: 'inline-block',
        marginTop: '5px',
        marginBottom: '5px',
    }
    return (
        <span style={style} className=" organisation-listings-tags-status">
            {props.tag},
        </span>
    );
}

export default Organisations;