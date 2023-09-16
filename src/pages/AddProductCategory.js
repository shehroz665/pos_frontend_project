import React, { useState } from 'react';
import "./AddProductCategory.css"
import axios from 'axios';
import { showSuccessAlert,showErrorAlert } from './Alerts/Alert';
const AddProductCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const token = localStorage.getItem('token');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Category Name:', categoryName);
    const apiUrl = 'http://127.0.0.1:8000/api/productcategory/add';
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
        console.log('API Response:', response.data);
        showSuccessAlert('Category added successfully')
      })
      .catch((error) => {
        console.error('API Error:', error);
        showErrorAlert(error.message)
      });
    setCategoryName('');
  };
  return (
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
        <button type="submit">Add Category</button>
      </form>
    </div>
  )
}

export default AddProductCategory
