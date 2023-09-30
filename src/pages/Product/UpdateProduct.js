import React, { useState,useEffect } from 'react';
import "../ProductCategory/AddProductCategory.css"
import axios from 'axios';
import { showErrorAlert,showSuccessAlert } from '../Alerts/Alert';
import { useNavigate } from 'react-router-dom';
import Banner from '../Banner';
import { useLocation } from 'react-router-dom';

const UpdateProduct = () => {
    const location = useLocation();
    const id = location.state.id;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [productName, setproductName] = useState('');
    const [selectedSupplier, setselectedSupplier] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSize, setselectedSize] = useState('');
    const [productCost, setproductCost] = useState(0);
    const [productSellingPrice, setproductSellingPrice] = useState(0);
    const [productQuantity, setproductQuantity] = useState(0);
    const [supplierArray, setsupplierArray] = useState([]);
    const [categoryArray, setcategoryArray] = useState([]);
    const [sizeArray, setsizeArray] = useState([])

    useEffect(() => {
        const apiUrl = `http://127.0.0.1:8000/api/product/${id}`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        axios.get(apiUrl,config)
          .then((response) => {
            const responseData= response.data.data[0];
            setproductName(responseData.prod_name);
            setproductQuantity(parseInt(responseData.prod_quantity));
            setproductCost(parseInt(responseData.prod_cost));
            setproductSellingPrice(parseInt(responseData.prod_selling_price));
            getDataFromApi(responseData);
            
          })
          .catch((error) => {
            console.error('Error fetching product data:', error);
          });
       
      }, [token]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const apiUrl = `http://127.0.0.1:8000/api/product/update/${id}`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        const data = {
          prod_name:productName,
          prod_sup_id:selectedSupplier,
          prod_cat_id:selectedCategory,
          prod_cost:productCost,
          prod_selling_price:productSellingPrice,
          prod_quantity:productQuantity,
          prod_size_id:selectedSize,
        };
        if (productQuantity <= 0) {
          showErrorAlert('Product quantity should be greater than zero');
          return;
        }
        if (productCost <= 0) {
          showErrorAlert('Product cost should not be zero');
          return;
        }
        if (productSellingPrice <= 0) {
          showErrorAlert('Product selling price should not be zero');
          return;
        }
    
        axios
          .post(apiUrl, data, config)
          .then((response) => {
            console.log('API Response:', response.data);
              showSuccessAlert('Product updated successfully');
              setproductName('');
              setproductCost(0);
              setproductSellingPrice(0);
              setproductQuantity(0);
              navigate('/products');
          })
          .catch((error) => {
            console.error('API Error:', error);
            showErrorAlert(error.message)
          });
      };
      const getDataFromApi = async (previousApiResponse) => {
        try {
            console.log('prev data',previousApiResponse.sup_name);
          const apiUrl = 'http://127.0.0.1:8000/api/product/dropdown';
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          };   
          const response = await axios.get(apiUrl, config);
          if (response.status === 200) {
            const responseData = response.data.data;
            setsupplierArray(responseData.suppliers);
            setcategoryArray(responseData.category);
            setsizeArray(responseData.sizes);
            setselectedSupplier(previousApiResponse.prod_sup_id);
            setSelectedCategory(previousApiResponse.prod_cat_id);
            setselectedSize(previousApiResponse.prod_size_id)
          } else {
            console.error('Unexpected response status:', response.status);
          }
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };
  return (
    <>
      <Banner title={"Add Product"} />
      <div className="home">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className='form-group-div'>
              <label htmlFor="productName">Product Name:</label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={productName}
                onChange={(e) => setproductName(e.target.value)}
                required
              />
            </div>
            <div className='form-group-div'>
              <label htmlFor="productQuantity">Product Quantity:</label>
              <input
                type="text"
                id="productQuantity"
                name="productQuantity"
                value={productQuantity}
                onChange={(e) => setproductQuantity(e.target.value)}
                required
              />
            </div>
            <div className='form-group-div'>
              <label htmlFor="category">Product Category:</label>
              <select
                id="category"
                name="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                {categoryArray.map((category) => (
                  <option key={category.cat_id} value={category.cat_id}>
                    {category.cat_name}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group-div'>
              <label htmlFor="supplier">Product Supplier:</label>
              <select
                id="supplier"
                name="supplier"
                value={selectedSupplier}
                onChange={(e) => setselectedSupplier(e.target.value)}
                required
              >
                {supplierArray.map((sup) => (
                  <option key={sup.sup_id} value={sup.sup_id}>
                    {sup.sup_name}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group-div'>
              <label htmlFor="productSize">Product Size:</label>
              <select
                id="productSize"
                name="productSize"
                value={selectedSize}
                onChange={(e) => setselectedSize(e.target.value)}
                required
              >
                {sizeArray.map((size) => (
                  <option key={size.size_id} value={size.size_id}>
                    {size.size_name}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group-div'>
              <label htmlFor="productCost">Product Cost:</label>
              <input
                type="text"
                id="productCost"
                name="productCost"
                maxLength={10}
                minLength={2}
                value={productCost}
                onChange={(e) => setproductCost(e.target.value)}
                required
              />
            </div>
            <div className='form-group-div'>
              <label htmlFor="productSellingPrice">Product Selling Price:</label>
              <input
                type="text"
                id="productSellingPrice"
                name="productSellingPrice"
                maxLength={10}
                minLength={2}
                value={productSellingPrice}
                onChange={(e) => setproductSellingPrice(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit">Update Product</button>
        </form>
      </div>
    </>
  )
}

export default UpdateProduct