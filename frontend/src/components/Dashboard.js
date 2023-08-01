import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductList from './ProductList';

function Dashboard() {
  const history = useNavigate()
  const handleLogout = () => {
    // Remove the authentication token from local storage
    localStorage.removeItem('token');
    // Redirect to the login page or any other page after logout
    history('/login');
  };
  return (
    <div>

      <Link className='add-products-link' to="/add-product">Add Products Here</Link>
      <button className='logout-button' onClick={handleLogout}>Logout</button>

      <ProductList />
    </div>
  );
}

export default Dashboard;
