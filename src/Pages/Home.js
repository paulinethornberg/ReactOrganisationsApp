import React from 'react';
import CategoryComponent from '../Components/Category';
import LocationComponent from '../Components/Location';

const Home = () => {
  return (
    <div className="container">
        <h2>Välj en kategori för att se tips på organisationer</h2>
        <CategoryComponent/>
    </div>
  );
}

export default Home;