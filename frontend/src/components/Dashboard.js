import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from './ProductList';

function Dashboard() {
  return (
    <div>
      <Link to="/products">Add More Products Here</Link>
      <ProductList />
    </div>
  );
}

export default Dashboard;
