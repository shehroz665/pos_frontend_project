import React,{useState,useEffect} from 'react'
import "./ProductCategory.css"
import Banner from '../Banner';
import axios from 'axios';
import * as MdIcons from 'react-icons/md';
import * as LiaIcons from 'react-icons/lia';
import { showErrorAlert,showSuccessAlert } from '../Alerts/Alert';
import { useNavigate } from 'react-router-dom';
import Switch from 'react-switch';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const ProductCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [recallApi, setrecallApi] = useState(false);
  const token = localStorage.getItem('token');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(0);
  const itemsPerPage = 10;
  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/api/productcategory?page=${currentPage}&per_page=${itemsPerPage}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    axios.get(apiUrl,config)
      .then((response) => {
        // console.log(response.data.data.data.length)
        setCategory(response.data.data.data);
        settotalPages(response.data.data.last_page);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [recallApi,currentPage,token]);
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
  const edit=(id)=> {
    console.log('edit',id);
    const propsToPass = {
      id: id,
    };
    navigate('/productcategory/update', { state: propsToPass });
  }
  const handleSwitchToggle = async(id) => {
    console.log('index',id,'token',token)
    const apiUrl = `http://127.0.0.1:8000/api/productcategory/changeStatus/${id}`;
    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post(apiUrl, [],configs);
      console.log('Product category deleted:', response.data);
      showSuccessAlert('Product category status updated successfully');
      setrecallApi((prev) => !prev);
    } catch (error) {
      console.error('Error updating product category status:', error);
      showErrorAlert(error.message);
    }
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
                <td className='centered'>
                  <>
                  <LiaIcons.LiaEdit onClick={()=> edit(cat.cat_id)} size={24} color='black'/>
                  <MdIcons.MdDelete size={24} color='rgb(206, 32, 32)' onClick={()=>handleDelete(cat.cat_id)}/>
                  <Switch
                    width={42}
                    height={20}
                    onChange={() => handleSwitchToggle(cat.cat_id)}
                    checked={cat.status==1 ? true : false}
                    offColor="#CE2020"
                    onColor="#008000"
                  />
                  </></td>
              </tr>
            )))   } 
          </tbody>
        </table>
      </div>
      <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={handlePageChange}
        />
    </div>
    </>

  )
}

export default ProductCategory
