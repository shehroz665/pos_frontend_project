import React, { useState, useEffect } from 'react';
import "../ProductCategory/AddProductCategory.css";
import axios from 'axios';
import Banner from '../Banner';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import { showErrorAlert, showSuccessAlert } from '../Alerts/Alert';

const AddToCart = () => {
  const [availableItems, setAvailableItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const token = localStorage.getItem('token');
  const [costVisible, setCostVisible] = useState([]);
  const [search, setsearch] = useState('');
  const addToCart = (item) => {
    const isAlreadySelected = selectedItems.some((selectedItem) => selectedItem.prod_id === item.prod_id);
    if (!isAlreadySelected) {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    } else {
      showErrorAlert("Item is already in the cart");
    }
  };
  const toggleCostVisibility = (index) => {
    const updatedVisibility = [...costVisible];
    updatedVisibility[index] = !updatedVisibility[index];
    setCostVisible(updatedVisibility);
  };
  const incrementQuantity = (item) => {
    const updatedSelectedItems = selectedItems.map((selectedItem) => {
      if (selectedItem.prod_id === item.prod_id) {
        if (selectedItem.quantity < parseFloat(item.prod_quantity)) {
          return { ...selectedItem, quantity: selectedItem.quantity + 1 };
        } else {
          showErrorAlert(`Cannot increase quantity beyond the available stock (${parseInt(item.prod_quantity)})`);
        }
      }
      return selectedItem;
    });
    setSelectedItems(updatedSelectedItems);
  };
  const decrementQuantity = (item) => {
    const updatedSelectedItems = selectedItems.map((selectedItem) => {
      if (selectedItem.prod_id === item.prod_id && selectedItem.quantity > 1) {
        return { ...selectedItem, quantity: selectedItem.quantity - 1 };
      }
      return selectedItem;
    });
    setSelectedItems(updatedSelectedItems);
  };
  const clearItem = (item) => {
    const updatedSelectedItems = selectedItems.filter((selectedItem) => selectedItem.prod_id !== item.prod_id);
    setSelectedItems(updatedSelectedItems);
  };
  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/api/product?search=${search}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    axios.get(apiUrl, config)
      .then((response) => {
        console.log(response.data.data.data)
        setAvailableItems(response.data.data.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [token, search]);

  return (
    <>
      <Banner title={"Add to Cart"} />
      <div className='home'>
        <div className="add-to-cart-container">
          <div className="available-items">
            <h2>Products</h2>
            <div style={{ marginBottom: '10px' }}>
              <div className='search-container'>
                <input
                  type='text'
                  placeholder='Search here...'
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                />
              </div>
            </div>
            <div className="scrollable-items">
              <table>
                <thead>
                  <tr>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Supplier</th>
                    <th>Category</th>
                    <th>Cost</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {availableItems.map((item, index) => (
                    <tr key={item.prod_id}>
                      <td>{item.prod_id}</td>
                      <td>{item.prod_name}</td>
                      <td>{item.sup_name}</td>
                      <td>{item.cat_name}</td>
                      <td>{costVisible[index] ? parseFloat(item.prod_cost).toFixed(0) : '*'.repeat(parseFloat(item.prod_cost).toFixed(0).length)}</td>
                      <td>{parseInt(item.prod_quantity)}</td>
                      <td >
                        <div style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>
                          <BiIcons.BiCartDownload onClick={() => addToCart(item)} size={24} color='green' />
                          <AiIcons.AiFillEyeInvisible onClick={() => toggleCostVisibility(index)} size={24} color='black' />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
          <div className="selected-items">
            <h2>Cart</h2>
            <div style={{ marginBottom: '10px' }}>
            <button className='clear-button' onClick={()=>setSelectedItems([])}>Clear All</button>
            </div>
            <div className="scrollable-items">
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((item) => (
                    <tr key={item.prod_id}>
                      <td>{item.prod_name}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <AiIcons.AiFillPlusCircle onClick={() => incrementQuantity(item)} size={24} color='green'/>
                        <AiIcons.AiOutlineMinusCircle onClick={() => decrementQuantity(item)} size={24} color='rgb(255, 165, 0)' />
                        <MdIcons.MdDelete onClick={() => clearItem(item)} size={24} color='rgb(206, 32, 32)'/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default AddToCart;
