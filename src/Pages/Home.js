import React from 'react';
import CategoryComponent from '../Components/Category';

const Home = () => {
  return (
    <div className="container">
     <keep-alive>
      <CategoryComponent/>
     </keep-alive>
 </div>

  );
}

export default Home;