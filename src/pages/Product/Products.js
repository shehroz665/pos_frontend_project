import React,{useState,useEffect} from 'react'
import "../ProductCategory/ProductCategory.css"
import Banner from '../Banner';
import axios from 'axios';
import * as MdIcons from 'react-icons/md';
import * as LiaIcons from 'react-icons/lia';
import * as AiIcons from 'react-icons/ai';
import { showErrorAlert,showSuccessAlert } from '../Alerts/Alert';
import { useNavigate } from 'react-router-dom';
import Switch from 'react-switch';
const Products = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useState([])
  const [recallApi, setrecallApi] = useState(false);
  const token = localStorage.getItem('token');
  const [costVisible, setCostVisible] = useState([]);
  const toggleCostVisibility = (index) => {
    const updatedVisibility = [...costVisible];
    updatedVisibility[index] = !updatedVisibility[index];
    setCostVisible(updatedVisibility);
  };
  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/api/product';
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    axios.get(apiUrl,config)
      .then((response) => {
        console.log(response.data.data.data.length)
      
        setproducts(response.data.data.data);
        console.log('products-> ',response.data.data.data);
        const initialVisibility = new Array(response.data.data.data.length).fill(false);
        setCostVisible(initialVisibility);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [recallApi,token]);
  const handleDelete = async (id) => {
    const apiUrl = `http://127.0.0.1:8000/api/product/destory/${id}`;
    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.delete(apiUrl, configs);
      console.log('Product category deleted:', response.data);
      showSuccessAlert('Product deleted successfully');
      setrecallApi((prev) => !prev);
    } catch (error) {
      console.error('Error deleting product category:', error);
      showErrorAlert(error.message);
    }
  };
  const edit=(id)=> {
    console.log('edit',id);
    const propsToPass = {
      id: id,
    };
    navigate('/productcategory/update', { state: propsToPass });
  }
  const handleSwitchToggle = async(id) => {
    console.log('index',id,'token',token)
    const apiUrl = `http://127.0.0.1:8000/api/product/changeStatus/${id}`;
    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post(apiUrl, [],configs);
      showSuccessAlert('Product status updated successfully');
      setrecallApi((prev) => !prev);
    } catch (error) {
      console.error('Error updating product category status:', error);
      showErrorAlert(error.message);
    }
  };
  return (
    <>
    <Banner title={"View Products"}/>
    <div className='home'>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Sr.</th>
              <th className='centered'>Name</th>
              <th className='centered'>Category</th>
              <th className='centered'>Supplier</th> 
              <th className='centered'>Cost</th> 
              <th className='centered'>Selling Price</th>         
              <th className='centered'>Status</th>
              <th className='centered'>Actions</th>
            </tr>
          </thead>
          <tbody>
           {products.length===0? <tr>
      <td colSpan="4" className="centered">
        No records found
      </td>
    </tr>  :(products.map((prod,index) => (
              <tr key={prod.prod_id}>
                <td>{prod.prod_id}</td>
                <td className='centered'>{prod.prod_name}</td>
                <td className='centered'>{prod.prod_cat_id}</td>
                <td className='centered'>{prod.prod_sup_id}</td>
                <td className='centered'>{costVisible[index]?  parseFloat(prod.prod_cost).toFixed(0): '**'}</td>
                <td className='centered'>{parseFloat(prod.prod_selling_price).toFixed(0)}</td>
                <td className={`centered ${prod.status === 1 ? 'status-active' : 'status-deactivated'}`}>
                  {prod.status === 1 ? "Active" : "Deactivated"}
                </td>
                <td className='centered'>
                  <>
                  <AiIcons.AiFillEyeInvisible onClick={()=>toggleCostVisibility(index)}  size={24} color='black'/>
                  <LiaIcons.LiaEdit onClick={()=> edit(prod.prod_id)} size={24} color='black'/>
                  <MdIcons.MdDelete size={24} color='rgb(206, 32, 32)' onClick={()=>handleDelete(prod.prod_id)}/>
                  <Switch
                    width={42}
                    height={20}
                    onChange={() => handleSwitchToggle(prod.prod_id)}
                    checked={prod.status===1 ? true : false}
                    offColor="#CE2020"
                    onColor="#008000"
                  />
                  </></td>
              </tr>
            )))   } 
          </tbody>
        </table>
      </div>

    </div>
    </>
  )
}

export default Products
