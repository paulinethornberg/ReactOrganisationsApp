import React from 'react';
import Story from '../Images/our-story.jpg';

const Organisation = () => {
  return (
    <div className="row">
      <h1 className="title-tab">Our Story</h1>
      <div className="col-sm-12">
        <div className="ourstory-section center-text" style={{ backgroundImage: "url(" + StoryImage + ")" }}>
         This are our organisations
        </div>
      </div>
    </div>
  );
};

export default Organisation;