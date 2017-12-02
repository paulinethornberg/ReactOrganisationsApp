import React, { Component } from 'react';
import { Link } from 'react-router'
import OrganisationStore from "../Stores/Organisation";
import PeopleImage from '../Images/people.jpg';

let getState = () => {
    return {
        organisations: OrganisationStore.getOrganisations(),
        filter: OrganisationStore.getFilter(),
        categories: OrganisationStore.getCategories()
    };
};

class Organisations extends Component {

    constructor(props) {
        super(props);
        this.state = getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        OrganisationStore.addChangeListener(this.onChange);
        OrganisationStore.provideOrganisations();
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

            let tags = tagValues.map((tag) => {
                return (<TagItem tag={tag} />);
            });  
               
             return (
                <span >
                    {tags}
                </span>
            );

        }

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
                <div className="col-sm-6 col-lg-3" key={index}>
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

const TagItem = (props) => {
    console.log(props);
    var style = {
        marginRight: '5px'
    }
    return (
       <span style={style} className="product-tile-status">
            {props.tag}
        </span>
    );
}

export default Organisations;