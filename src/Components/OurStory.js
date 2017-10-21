import React from 'react';
import StoryImage from '../Images/our-story.jpg';

const OurStory = () => {
  return (
    <div className="row">
      <h1 className="title-tab">Our Story</h1>
      <div className="col-sm-12">
        <div className="ourstory-section center-text" style={{ backgroundImage: "url(" + StoryImage + ")" }}>
        
        </div>
      </div>
    </div>
  );
};

export default OurStory;