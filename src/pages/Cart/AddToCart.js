import React, { useState, useEffect } from 'react';
import "../ProductCategory/AddProductCategory.css";
import axios from 'axios';
import Banner from '../Banner';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import { showErrorAlert } from '../Alerts/Alert';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddToCart = () => {
  const navigate = useNavigate();
  const [availableItems, setAvailableItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const token = localStorage.getItem('token');
  const [costVisible, setCostVisible] = useState([]);
  const [search, setsearch] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCost, settotalCost] = useState(0);
  const [totalQuantity, settotalQuantity] = useState(0);
  const [customerName, setcustomerName] = useState('xyz');
  const [customerPhoneNumber, setcustomerPhoneNumber] = useState('03016036804');
  //const [invoiceId, setinvoiceId] = useState(0);
  const [recallApi, setrecallApi] = useState(false);
  const addToCart = (item) => {
    const isAlreadySelected = selectedItems.some((selectedItem) => selectedItem.prod_id === item.prod_id);
    if (!isAlreadySelected) {
      const newItem = {
        prod_id: item.prod_id,
        prod_name: item.prod_name,
        prod_quantity:parseInt(item.prod_quantity),
        quantity: 1,
        prod_selling_price: parseFloat(item.prod_selling_price),
        prod_cost: parseFloat(item.prod_cost),
      };
      setSelectedItems([...selectedItems, newItem]);
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
        const availableQuantity = parseInt(item.prod_quantity); // Parse the quantity as an integer
        if (!isNaN(availableQuantity) && selectedItem.quantity < availableQuantity) {
          return { ...selectedItem, quantity: selectedItem.quantity + 1 };
        } else {
          showErrorAlert(`Cannot increase quantity beyond the available stock (${availableQuantity})`);
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
  const handlePriceChange = (event, item) => {
    const updatedSelectedItems = selectedItems.map((selectedItem) => {
      if (selectedItem.prod_id === item.prod_id) {
        const newPrice = parseFloat(event.target.value);
        if (!isNaN(newPrice)) {
          return { ...selectedItem, prod_selling_price: newPrice };
        }
      }
      return selectedItem;
    });
    setSelectedItems(updatedSelectedItems);
  };
  const createInvoice = () => {
    const apiUrl = 'http://127.0.0.1:8000/api/invoice/add';
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const data = 
      {
        cust_name:customerName,
        cust_number: parseInt(customerPhoneNumber),
        products: selectedItems,
        total_products: parseInt(totalProducts),
        total_price: parseInt(totalPrice),
        total_quantity: parseInt(totalQuantity),
        total_cost:parseInt(totalCost)
    };
    axios
      .post(apiUrl, data, config)
      .then((response) => {
        console.log('API Response:', response.data.data.invoice_id);
        // setinvoiceId(response.data.data.invoice_id);
        Swal.fire({
          title:'Invoice generated successfully',
          text: "Do you want to print the Invoice?",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Print Invoice'
        }).then((result) => {
          if (result.isConfirmed) {
            const propsToPass = {
              id: response.data.data.invoice_id,
            };
            navigate('/invoice/print', { state: propsToPass });
            console.log('go to print');
          }
          else{
            setSelectedItems([]);
          }
        })
      })
      .catch((error) => {
        console.error('API Error:', error);
        showErrorAlert(error.message)
      });
      setrecallApi((prev) => !prev);
  }
  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/api/product/availableProducts?search=${search}`;
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
  }, [token, search,recallApi]);
  useEffect(() => {
    console.log('selected->', selectedItems)
    setTotalProducts(selectedItems.length);
    setTotalPrice(selectedItems.reduce((total, item) => {
      return total + item.quantity * parseFloat(item.prod_selling_price);
    }, 0));
    settotalQuantity(selectedItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0));
    settotalCost(selectedItems.reduce((total, item) => {
      return total + item.quantity * parseFloat(item.prod_cost);
    }, 0));
  }, [selectedItems])
  return (
    <>
      <Banner title={"Add to Cart"} />
      <div className='home'>
        <div>

        </div>
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
            <div className='div-margin-down'>
              <button className='clear-button' onClick={() => setSelectedItems([])}>Clear All</button>
            </div>
            <div className="scrollable-items">
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((item) => (
                    <tr key={item.prod_id}>
                      <td>{item.prod_name}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <input
                          type="number"
                          value={parseInt(item.prod_selling_price)}
                          onChange={(e) => handlePriceChange(e, item)}
                          min={item.prod_cost}
                        /></td>
                      <td>
                        <AiIcons.AiFillPlusCircle onClick={() => incrementQuantity(item)} size={24} color='green' />
                        <AiIcons.AiOutlineMinusCircle onClick={() => decrementQuantity(item)} size={24} color='rgb(255, 165, 0)' />
                        <MdIcons.MdDelete onClick={() => clearItem(item)} size={24} color='rgb(206, 32, 32)' />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='calculation'>
              <div className="calculation-text">
                <p>Total Products:</p>
                <p>Total Quantity:</p>
                <p>Total Price:</p>
              </div>
              <div className="calculation-values">
                <p>{totalProducts}</p>
                <p>{totalQuantity}</p>
                <p>Rs {parseInt(totalPrice)}</p>             
              </div>
            </div>
            <div className='customer-details'>
              {selectedItems.length!==0 && (
                <div>
                <h2>Customer Details</h2>
                <div className='customer-form'>
                  <label htmlFor='customerName'>Customer Name:</label>
                  <input
                    type='text'
                    id='customerName'
                    value={customerName}
                    onChange={(e)=>setcustomerName(e.target.value)}
                    required
                  />
                  <label htmlFor='customerPhoneNumber'>Phone Number:</label>
                  <input
                    type='text'
                    id='customerPhoneNumber'
                    value={customerPhoneNumber}
                    onChange={(e)=>setcustomerPhoneNumber(e.target.value)}
                    maxLength={11}
                    required
                  />
                  <button onClick={()=>createInvoice()}>Generate Invoice</button>
                </div>
                </div>

              )}
          </div>
          </div>

        </div>


      </div>
    </>
  )
}

export default AddToCart;
