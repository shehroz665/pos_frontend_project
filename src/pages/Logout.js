import React, { useState, useEffect } from 'react'
import "./ProductCategory/ProductCategory.css"
import Banner from './Banner';
import axios from 'axios';
import {showSuccessAlert} from './Alerts/Alert'
import { useNavigate } from 'react-router-dom';
const Logout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [logout, setlogout] = useState(false);
  useEffect(() => {
    if(!logout){
      const apiUrl = 'http://127.0.0.1:8000/api/logout';
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
    
      axios.post(apiUrl, [], config)
        .then((response) => {
          if (response.status === 200) {
            showSuccessAlert('Logout successfully');
            //console.log("logout...!");
            setlogout(true);
             navigate('/');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setlogout(true);
        });
    }

  }, [logout, token, navigate])
  
  return (
    <>
    <Banner title={"Logout"}/>
    <div className='home'>
    </div>
    </>
  )
}

export default Logout
