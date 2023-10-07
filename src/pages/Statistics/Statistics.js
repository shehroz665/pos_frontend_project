import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import "../ProductCategory/ProductCategory.css";

const Statistics = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  return (
    <div className='home'>
      <div className='statistics-container'>
        <Link to="/products" className="statistic-box" onClick={()=> navigate('/products')}>
          <h2>Total Products</h2>
          <p>0</p>
        </Link>
        <Link to="/products" className="statistic-box" onClick={()=> navigate('/products')}>
          <h2>Total Sales Today</h2>
          <p>0</p>
        </Link>
        <Link to="/products" className="statistic-box" onClick={()=> navigate('/products')}>
          <h2>Total Suppliers</h2>
          <p>0</p>
        </Link>
        <Link to="/products" className="statistic-box" onClick={()=> navigate('/products')}>
          <h2>Total Categories</h2>
          <p>0</p>
        </Link>
      </div>
    </div>
  );
};

export default Statistics;
