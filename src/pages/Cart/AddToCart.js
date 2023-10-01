import React,{useState,useEffect} from 'react'
import "../ProductCategory/AddProductCategory.css"
import axios from 'axios';
import Banner from '../Banner';
const AddToCart = () => {
  const [availableItems, setAvailableItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const token = localStorage.getItem('token');
  const addToCart = (item) => {
    setSelectedItems([...selectedItems, item]);
  };
  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/api/product`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    axios.get(apiUrl,config)
      .then((response) => {
        console.log(response.data.data.data)
      
        setAvailableItems(response.data.data.data);

      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [token]);
  return (
   <>
  <Banner title={"View Products"}/>
   <div className='home'>
   <div className="add-to-cart-container">
      <div className="available-items">
        <h2>Available Items</h2>
        <div className="scrollable-items">
          {availableItems.map((item) => (
            <div key={item.id} onClick={() => addToCart(item)}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <div className="selected-items">
        <h2>Selected Items</h2>
        <div>
          {/* Map through selectedItems and display them */}
          {selectedItems.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      </div>
    </div>
   </div>
   </>
  )
}

export default AddToCart