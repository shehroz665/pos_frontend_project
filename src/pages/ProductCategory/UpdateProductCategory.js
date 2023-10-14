import React, { useState,useEffect } from 'react';
import "./AddProductCategory.css"
import axios from 'axios';
import { showErrorAlert,showSuccessAlert } from '../Alerts/Alert';
import { useNavigate } from 'react-router-dom';
import Banner from '../Banner';
import { useLocation } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
const UpdateProductCategory = () => {
    const location = useLocation();
    const id = location.state.id;
    const [categoryName, setCategoryName] = useState('');
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const apiUrl = `http://127.0.0.1:8000/api/productcategory/${id}`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        axios.get(apiUrl,config)
          .then((response) => {
            setLoading(true);
            setCategoryName(response.data.data.cat_name);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching product data:', error);
          });
      }, [id,token]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log('Category Name:', categoryName);
        const apiUrl = `http://127.0.0.1:8000/api/productcategory/update/${id}`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        const data = {
          cat_name:categoryName
        };
    
        axios
          .post(apiUrl, data, config)
          .then((response) => {
            //console.log('API Response:', response.data);
            showSuccessAlert('Category '+response.data.data.cat_name+ ' updated successfully')
          })
          .catch((error) => {
            console.error('API Error:', error);
            showErrorAlert(error.message)
          });
        setCategoryName('');
        navigate('/productcategory');
      };
  return (
    <div>
      {
        loading ? 
        <div>
        <ClipLoader
          color={'#022888'}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="centered-loader"
        /></div>       
        :(    <div>
          <Banner title={"Update Product Category"} />
          <div className="home">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="categoryName">Category Name:</label>
                <input
                  type="text"
                  id="categoryName"
                  name="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Update Category</button>
            </form>
          </div>
          </div>)
      }

    </div>
  )
}

export default UpdateProductCategory