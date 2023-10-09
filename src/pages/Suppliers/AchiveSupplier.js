import React,{useState,useEffect} from 'react'
import "../ProductCategory/ProductCategory.css"
import Banner from '../Banner';
import axios from 'axios';
import * as MdIcons from 'react-icons/md';
import * as TbIcons from 'react-icons/tb';
import { showErrorAlert,showSuccessAlert } from '../Alerts/Alert';
import { useNavigate } from 'react-router-dom';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const AchiveSupplier = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [recallApi, setrecallApi] = useState(false);
  const token = localStorage.getItem('token');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(0);
  const itemsPerPage = 10;
  useEffect(() => {
    // const apiUrl = 'http://127.0.0.1:8000/api/supplier/archive';
    const apiUrl = `http://127.0.0.1:8000/api/supplier/archive?page=${currentPage}&per_page=${itemsPerPage}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    axios.get(apiUrl,config)
      .then((response) => {
        // console.log(response.data.data.last_page);
        setCategory(response.data.data.data);
        settotalPages(response.data.data.last_page);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [recallApi,currentPage,token]);
  const restoreOrDelete = async(id,status)=> {
    console.log('id',id,'status',status)
    const apiUrl = `http://127.0.0.1:8000/api/supplier/restoreOrDelete/${id}`;
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
      if(status===1){
        showSuccessAlert('Supplier restored successfully');
      }
      else{
        showSuccessAlert('Supplier deleted successfully');
      }
      setrecallApi((prev) => !prev);
      navigate('/suppliers');
    } catch (error) {
      console.error('Error updating Supplier restore or delete:', error);
      showErrorAlert(error.message);
    }
  };
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
              <th className='centered'>Contact</th>
              <th className='centered'>Description</th>
              <th className='centered'>Status</th>
              <th className='centered'>Updated Date</th>
              <th className='centered'>Actions</th>
            </tr>
          </thead>
          <tbody>
           {category.length===0? <tr>
      <td colSpan="6" className="centered">
        No records found
      </td>
    </tr>  :(category.map((sup) => (
              <tr key={sup.sup_id}>
                <td>{sup.sup_id}</td>
                <td className='centered'>{sup.sup_name}</td>
                <td className='centered'>{sup.sup_contact}</td>
                <td className='centered'>{sup.sup_description? sup.sup_description : "-"}</td>
                <td className={`centered ${sup.status === 1 ? 'status-active' : 'status-deactivated'}`}>
                  {"Deleted"}
                </td>
                <td className='centered'>{sup.updated_date}</td>
                <td className='centered'>
                  <>
                  <TbIcons.TbRestore onClick={()=> restoreOrDelete(sup.sup_id,1)} size={21} color='#008000'/>
                  <MdIcons.MdDelete size={24} color='rgb(206, 32, 32)' onClick={()=>restoreOrDelete(sup.sup_id,3)}/>
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

export default AchiveSupplier

