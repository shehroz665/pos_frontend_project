import React,{useState,useEffect} from 'react'
import "../ProductCategory/AddProductCategory.css"
import Banner from '../Banner';
import axios from 'axios';
import * as MdIcons from 'react-icons/md';
import * as LiaIcons from 'react-icons/lia';
import { showErrorAlert,showSuccessAlert } from '../Alerts/Alert';
import { useNavigate } from 'react-router-dom';
import Switch from 'react-switch';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
const Suppliers = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [recallApi, setrecallApi] = useState(false);
  const token =localStorage.getItem('token');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(0);
  const itemsPerPage = 10;
  const [search, setsearch] = useState('');
  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/api/supplier?page=${currentPage}&per_page=${itemsPerPage}&search=${search}`;
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
  }, [recallApi,currentPage,token,search]);
  const handleDelete = async (id) => {
    const apiUrl = `http://127.0.0.1:8000/api/supplier/destory/${id}`;
    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.delete(apiUrl, configs);
      //console.log('Supplier deleted:', response.data);
      showSuccessAlert('Supplier '+response.data.data.sup_name+' deleted successfully');
      setrecallApi((prev) => !prev);
    } catch (error) {
      console.error('Error deleting Supplier:', error);
      showErrorAlert(error.message);
    }
  };
  const edit=(id)=> {
    //console.log('edit',id);
    const propsToPass = {
      id: id,
    };
    navigate('/supplier/update', { state: propsToPass });
  }
  const handleSwitchToggle = async(id) => {
    //console.log('index',id,'token',token)
    const apiUrl = `http://127.0.0.1:8000/api/supplier/changeStatus/${id}`;
    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post(apiUrl, [],configs);
      showSuccessAlert('Supplier '+response.data.data.sup_name+' status updated successfully');
      setrecallApi((prev) => !prev);
    } catch (error) {
      console.error('Error updating Supplier status:', error);
      showErrorAlert(error.message);
    }
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <>
    <Banner title={"View Suppliers"}/>
    <div className='home'>
    <div className='search-container'>
          <input
            type='text'
            className='search-input'
            placeholder='Search here...'
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Sr.</th>
              <th className='centered'>Name</th>
              <th className='centered'>Contact</th>
              <th className='centered'>Description</th>
              <th className='centered'>Status</th>
              <th className='centered'>Created Date</th>
              <th className='centered'>Updated Date</th>
              <th className='centered'>Actions</th>
            </tr>
          </thead>
          <tbody>
           {category.length===0? <tr>
      <td colSpan="8" className="centered">
        No records found
      </td>
    </tr>  :(category.map((sup) => (
              <tr key={sup.sup_id}>
                <td>{sup.sup_id}</td>
                <td className='centered'>{sup.sup_name}</td>
                <td className='centered'>{sup.sup_contact}</td>
                <td className='centered'>{sup.sup_description? sup.sup_description : "-"}</td>
                <td className={`centered ${sup.status === 1 ? 'status-active' : 'status-deactivated'}`}>
                  {sup.status === 1 ? "Active" : "Deactivated"}
                </td>
                <td className='centered'>{sup.created_date}</td>
                <td className='centered'>{sup.updated_date}</td>
                <td className='centered'>
                  <>
                  <LiaIcons.LiaEdit onClick={()=> edit(sup.sup_id)} size={24} color='black'/>
                  <MdIcons.MdDelete size={24} color='rgb(206, 32, 32)' onClick={()=>handleDelete(sup.sup_id)}/>
                  <Switch
                    width={42}
                    height={20}
                    onChange={() => handleSwitchToggle(sup.sup_id)}
                    checked={sup.status===1 ? true : false}
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

export default Suppliers

