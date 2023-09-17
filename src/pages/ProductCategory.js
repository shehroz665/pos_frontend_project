import React,{useState,useEffect} from 'react'
import "./ProductCategory.css"
import Banner from './Banner';
import axios from 'axios';
import * as MdIcons from 'react-icons/md';
import * as LiaIcons from 'react-icons/lia';
import { showSuccessAlert,showErrorAlert } from './Alerts/Alert';
const ProductCategory = () => {
  const [category, setCategory] = useState([]);
  const [recallApi, setrecallApi] = useState(false)
  const [token, settoken] = useState(localStorage.getItem('token'));
  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/api/productcategory';
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    axios.get(apiUrl,config)
      .then((response) => {
        console.log(response.data.data.data.length)
        setCategory(response.data.data.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [recallApi]);
  const handleDelete = async (id) => {
    const apiUrl = `http://127.0.0.1:8000/api/productcategory/destory/${id}`;
    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.delete(apiUrl, configs);
      console.log('Product category deleted:', response.data);
      showSuccessAlert('Product category deleted successfully');
      setrecallApi((prev) => !prev);
    } catch (error) {
      console.error('Error deleting product category:', error);
      showErrorAlert(error.message);
    }
  };
  
  
  return (
    <>
    <Banner title={"View Product Category"}/>
    <div className='home'>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Sr.</th>
              <th className='centered'>Name</th>
              <th className='centered'>Status</th>
              <th className='centered'>Actions</th>
            </tr>
          </thead>
          <tbody>
           {category.length===0? <tr>
      <td colSpan="4" className="centered">
        No records found
      </td>
    </tr>  :(category.map((cat) => (
              <tr key={cat.cat_id}>
                <td>{cat.cat_id}</td>
                <td className='centered'>{cat.cat_name}</td>
                <td className={`centered ${cat.status === 1 ? 'status-active' : 'status-deactivated'}`}>
                  {cat.status === 1 ? "Active" : "Deactivated"}
                </td>
                <td className='centered'><><LiaIcons.LiaEdit size={24} color='green'/><MdIcons.MdDelete size={24} color='rgb(206, 32, 32)' onClick={()=>handleDelete(cat.cat_id)}/></></td>
              </tr>
            )))   } 
          </tbody>
        </table>
      </div>

    </div>
    </>

  )
}

export default ProductCategory
