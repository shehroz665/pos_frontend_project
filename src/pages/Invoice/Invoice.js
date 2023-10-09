import React,{useState,useEffect} from 'react'
import "../ProductCategory/ProductCategory.css"
import Banner from '../Banner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import * as TbIcons from 'react-icons/tb';

const Invoice = () => {
  const navigate = useNavigate();
  const [invoice, setinvoice] = useState([]);
  const token = localStorage.getItem('token');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(0);
  const [search, setsearch] = useState('');
  const itemsPerPage = 10;
  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/api/invoice?page=${currentPage}&per_page=${itemsPerPage}&search=${search}`;
    console.log('url',apiUrl)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    axios.get(apiUrl,config)
      .then((response) => {
        console.log(response.data.data.data.length)  
        setinvoice(response.data.data.data);
        console.log('last->page',response.data.data);
        settotalPages(response.data.data.last_page);
        console.log('products-> ',response.data.data.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [currentPage,token,search]);
  const edit=(id)=> {
    console.log('edit',id);
    const propsToPass = {
      id: id,
    };
    navigate('/invoice/print', { state: propsToPass });
  }
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <>
    <Banner title={"View Invoices"}/>
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
              <th className='centered'>Customer Name</th>
              <th className='centered'>Customer Phone</th>
              <th className='centered'>Total Products</th> 
              <th className='centered'>Total Price</th> 
              <th className='centered'>Total Quantity</th>
              <th className='centered'>Created Date</th>
                <th className='centered'>Updated Date</th>                      
              <th className='centered'>Actions</th>
            </tr>
          </thead>
          <tbody>
           {invoice.length===0? <tr>
      <td colSpan="9" className="centered">
        No records found
      </td>
    </tr>  :(invoice.map((inv) => (
              <tr key={inv.invoice_id}>
                <td>{inv.invoice_id}</td>
                <td className='centered'>{inv.cust_name}</td>
                <td className='centered'>{inv.cust_number}</td>
                <td className='centered'>{inv.total_products}</td>
                <td className='centered'>Rs {inv.total_price}</td>
                <td className='centered'>{inv.total_quantity}</td>
                {/* <td className='centered'>{inv.created_at}</td> */}
                <td className='centered'>{inv.created_date}</td>
                  <td className='centered'>{inv.updated_date}</td>
                <td className='centered'>
                  <TbIcons.TbFileInvoice onClick={()=> edit(inv.invoice_id)} size={24} color='black'/></td>
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

export default Invoice
