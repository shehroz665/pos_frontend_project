import React,{useState,useEffect} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import "../ProductCategory/ProductCategory.css";
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const Statistics = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [recallApi, setrecallApi] = useState(false);
  const [totalSuppliers, settotalSuppliers] = useState(0);
  const [totalProducts, settotalProducts] = useState(0);
  const [totoalSalesToday, settotoalSalesToday] = useState(0);
  const [totalCategory, settotalCategory] = useState(0);
  const data = [
    { name: 'Category A', sales: 4000,  },
    { name: 'Category B', sales: 3000,  },
    { name: 'Category C', sales: 2000,  },
    { name: 'Category D', sales: 2780,  },
    { name: 'Category E', sales: 1890, },
  ];
  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/api/statistics`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    axios.get(apiUrl,config)
      .then((response) => {
        console.log(response.data.data);
        const responseData =response.data.data;
        settotalCategory(responseData.categories);
        settotalSuppliers(responseData.suppliers);
        settotalProducts(responseData.products);
        settotoalSalesToday(responseData.sales.total_price_sum);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [recallApi,token]);
  return (
    <div className='home'>
      <div className='statistics-container'>
      <Link to="/sales" className="statistic-box" onClick={()=> navigate('/sales')}>
          <h2>Today Sales</h2>
          <p>Rs {totoalSalesToday}</p>
        </Link>
        <Link to="/products" className="statistic-box" onClick={()=> navigate('/products')}>
          <h2>Total Products</h2>
          <p>{totalProducts}</p>
        </Link>
        <Link to="/suppliers" className="statistic-box" onClick={()=> navigate('/suppliers')}>
          <h2>Total Suppliers</h2>
          <p>{totalSuppliers}</p>
        </Link>
        <Link to="/productcategory" className="statistic-box" onClick={()=> navigate('/productcategory')}>
          <h2>Total Categories</h2>
          <p>{totalCategory}</p>
        </Link>
      </div>
      <div className='statistics-container'>
      <div className="statistics-graph-container">
        <h1>graph</h1>
        <BarChart width={600} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
      </div>
      <div className="statistics-graph-container">
        <h1>others</h1>
      </div>
      </div>
    </div>
  );
};

export default Statistics;
