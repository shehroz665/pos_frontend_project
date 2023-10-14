import React,{useState,useEffect} from 'react'
import "../ProductCategory/ProductCategory.css"
import Banner from '../Banner';
import axios from 'axios';
import * as MdIcons from 'react-icons/md';
import * as TbIcons from 'react-icons/tb';
import * as AiIcons from 'react-icons/ai';
import { showErrorAlert,showSuccessAlert } from '../Alerts/Alert';
import { useNavigate } from 'react-router-dom';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import ClipLoader from "react-spinners/ClipLoader";
const ArchiveProducts = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useState([])
  const [costVisible, setCostVisible] = useState([]);
  const [recallApi, setrecallApi] = useState(false);
  const token = localStorage.getItem('token');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(0);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/api/product/archive?page=${currentPage}&per_page=${itemsPerPage}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    axios.get(apiUrl,config)
      .then((response) => {
        // console.log(response.data.data.data.length)
        setproducts(response.data.data.data);
        settotalPages(response.data.data.last_page);
        setLoading(false);  
        // console.log('archive-> ',response.data.data.data)
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [recallApi,currentPage,token]);
  const restoreOrDelete = async(id,status)=> {
    // console.log('id',id,'status',status)
    const apiUrl = `http://127.0.0.1:8000/api/product/restoreOrDelete/${id}`;
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
        showSuccessAlert('Product '+response.data.data.prod_name+' restored successfully');
      }
      else{
        showSuccessAlert('Product '+response.data.data.prod_name+' deleted successfully');
      }

      setrecallApi((prev) => !prev);
      navigate('/products');
    } catch (error) {
      console.error('Error deleting product category:', error);
      showErrorAlert(error.message);
    }
  };
  const toggleCostVisibility = (index) => {
    const updatedVisibility = [...costVisible];
    updatedVisibility[index] = !updatedVisibility[index];
    setCostVisible(updatedVisibility);
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div>
      {
        loading ?
        <div>
        <ClipLoader
          color={'#022888'}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="centered-loader"
        /></div>  
        : (    <div>
          <Banner title={"Archive Product"}/>
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
                    <th className='centered'>Size</th>
                    <th className='centered'>Quantity</th>              
                    <th className='centered'>Status</th>
                    <th className='centered'>Updated Date</th>
                    <th className='centered'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                 {products.length===0? <tr>
            <td colSpan="10" className="centered">
              No records found
            </td>
          </tr>  :(products.map((prod,index) => (
                    <tr key={prod.prod_id}>
                      <td>{prod.prod_id}</td>
                      <td className='centered'>{prod.prod_name}</td>
                      <td className='centered'>{prod.cat_name}</td>
                      <td className='centered'>{prod.sup_name}</td>
                      <td className='centered'>{costVisible[index]?  parseFloat(prod.prod_cost).toFixed(0): '*'.repeat(parseFloat(prod.prod_cost).toFixed(0).length)}</td>
                      <td className='centered'>{parseFloat(prod.prod_selling_price).toFixed(0)}</td>
                      <td className='centered'>{prod.size_name}</td>
                      <td className='centered'>{parseFloat(prod.prod_quantity).toFixed(0)}</td>
                      <td className={`centered ${prod.status === 1 ? 'status-active' : 'status-deactivated'}`}>
                        {prod.status === 1 ? "Active" : "Deleted"}
                      </td>
                      <td className='centered'>{prod.updated_date}</td>
                      <td className='centered'>
                        <>
                        <AiIcons.AiFillEyeInvisible onClick={()=>toggleCostVisibility(index)}  size={24} color='black'/>
                        <TbIcons.TbRestore onClick={()=> restoreOrDelete(prod.prod_id,1)} size={21} color='#008000'/>
                        <MdIcons.MdDelete size={24} color='rgb(206, 32, 32)' onClick={()=>restoreOrDelete(prod.prod_id,3)}/>
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
          </div>)
      }
    </div>

  )
}

export default ArchiveProducts