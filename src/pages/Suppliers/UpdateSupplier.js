import React, { useState,useEffect } from 'react';
import "../ProductCategory/AddProductCategory.css"
import axios from 'axios';
import { showErrorAlert,showSuccessAlert } from '../Alerts/Alert';
import { useNavigate } from 'react-router-dom';
import Banner from '../Banner';
import { useLocation } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
const UpdateSupplier = () => {
    const location = useLocation();
    const id = location.state.id;
    const [ supplierName, setSupplierName] = useState('');
    const [supplierContact, setsupplierContact] = useState('');
    const [supplierDescription, setsupplierDescription] = useState('');
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const apiUrl = `http://127.0.0.1:8000/api/supplier/${id}`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        axios.get(apiUrl,config)
          .then((response) => {
            setSupplierName(response.data.data.sup_name);
            setsupplierContact(response.data.data.sup_contact);
            if(response.data.data.sup_description!==null || response.data.data.sup_description!==undefined)
            {
              setsupplierDescription(response.data.data.sup_description);
            }
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching product data:', error);
            setLoading(false);
          });
      }, [id,token]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const apiUrl = `http://127.0.0.1:8000/api/supplier/update/${id}`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        const data = {
            sup_name:supplierName,
            sup_contact:supplierContact,
            sup_description:supplierDescription,
        };
    
        axios
          .post(apiUrl, data, config)
          .then((response) => {
           // console.log('API Response:', response.data);
            showSuccessAlert('Supplier '+response.data.data.sup_name+' updated successfully')
          })
          .catch((error) => {
            console.error('API Error:', error);
            showErrorAlert(error.message)
          });
        setSupplierName('');
        setsupplierContact('');
        setsupplierDescription('');
        navigate('/suppliers');
      };
  return (
    <div>
      {
        loading?
        <div>
        <ClipLoader
          color={'#022888'}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="centered-loader"
        /></div>
        :(    
          <div>
          <Banner title={"Update Supplier"} />
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
                <textarea
                  type="text"
                  id="supplierDescription"
                  name="supplierDescription"
                  value={supplierDescription}
                  onChange={(e) => setsupplierDescription(e.target.value)}
                />
                </div>
              </div>
              <button type="submit">Update Supplier</button>
            </form>
          </div>
          </div>)
      }
    </div>
  )
}

export default UpdateSupplier