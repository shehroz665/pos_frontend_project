import React,{useState,useEffect} from 'react'
import "./ProductCategory.css"
import Banner from '../Banner';
import axios from 'axios';
import * as MdIcons from 'react-icons/md';
import * as TbIcons from 'react-icons/tb';
import { showErrorAlert,showSuccessAlert } from '../Alerts/Alert';
import { useNavigate } from 'react-router-dom';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const ArchiveProductCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [recallApi, setrecallApi] = useState(false);
  const token = localStorage.getItem('token');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(0);
  const itemsPerPage = 10;
  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/api/productcategory/archive?page=${currentPage}&per_page=${itemsPerPage}`;
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
  const restoreOrDelete = async(id,status)=> {
    console.log('id',id,'status',status)
    const apiUrl = `http://127.0.0.1:8000/api/productcategory/restoreOrDelete/${id}`;
    const data = {
      status:status
    };
    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post(apiUrl,data, configs);
      console.log('Product category deleted:', response.data);
      if(status===1){
        showSuccessAlert('Product category restored successfully');
      }
      else{
        showSuccessAlert('Product category deleted successfully');
      }

      setrecallApi((prev) => !prev);
      navigate('/productcategory');
    } catch (error) {
      console.error('Error deleting product category:', error);
      showErrorAlert(error.message);
    }
  }
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  return (
    <>
    <Banner title={"Archive Product Category"}/>
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
                  {"Deleted"}
                </td>
                <td className='centered'>
                  <>
                  <TbIcons.TbRestore onClick={()=> restoreOrDelete(cat.cat_id,1)} size={21} color='#008000'/>
                  <MdIcons.MdDelete size={24} color='rgb(206, 32, 32)' onClick={()=>restoreOrDelete(cat.cat_id,3)}/>
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

export default ArchiveProductCategory
