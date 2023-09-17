import React, { useState } from 'react';
import "../ProductCategory/AddProductCategory.css"
import axios from 'axios';
import { showErrorAlert,showSuccessAlert } from '../Alerts/Alert';
import { useNavigate } from 'react-router-dom';
import Banner from '../Banner';
const AddSupplier = () => {
  const [ supplierName, setSupplierName] = useState('');
  const [supplierContact, setsupplierContact] = useState('');
  const [supplierDescription, setsupplierDescription] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Category Name:', supplierName,supplierContact,supplierDescription);
    const apiUrl = 'http://127.0.0.1:8000/api/supplier/add';
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const data = {
      sup_name:supplierName,
      sup_contact:supplierContact,
      sup_description:supplierDescription
    };
    axios
      .post(apiUrl, data, config)
      .then((response) => {
        console.log('API Response:', response.data);
        showSuccessAlert('Supplier added successfully')
      })
      .catch((error) => {
        console.error('API Error:', error);
        showErrorAlert(error.message)
      });
      setSupplierName('');
      setsupplierContact('');
      setsupplierDescription('');
    // navigate('/suppliers');
  };
  return (
    <>
    <Banner title={"Add Supplier"} />
    <div className="home">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className='form-group-div'>
          <label htmlFor="supplierName">Supplier Name:</label>
          <input
            type="text"
            id="supplierName"
            name="supplierName"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            required
          />
          </div>
          <div className='form-group-div'>
          <label htmlFor="supplierName">Supplier Contact:</label>
          <input
            type="text"
            id="supplierContact"
            name="supplierContact"
            maxLength={11}
            value={supplierContact}
            onChange={(e) => setsupplierContact(e.target.value)}
            required
          />
          </div>
          <div className='form-group-div'>
          <label htmlFor="supplierDescription">Supplier Description:</label>
          <input
            type="text"
            id="supplierDescription"
            name="supplierDescription"
            value={supplierDescription}
            onChange={(e) => setsupplierDescription(e.target.value)}
            required
          />
          </div>
        </div>
        <button type="submit">Add Supplier</button>
      </form>
    </div>
    </>

  )
}

export default AddSupplier
