import React,{useState,useEffect} from 'react'
import "../ProductCategory/ProductCategory.css"
import Banner from '../Banner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import * as FcIcons from 'react-icons/fc'
import { showSuccessAlert,showErrorAlert } from '../Alerts/Alert';
const Credit = () => {
    const navigate = useNavigate();
    const [invoice, setinvoice] = useState([]);
    const token = localStorage.getItem('token');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, settotalPages] = useState(0);
    const [search, setsearch] = useState('');
    const itemsPerPage = 10;
    const [recallApi, setrecallApi] = useState(false);
    useEffect(() => {
      const apiUrl = `http://127.0.0.1:8000/api/invoice/credit?page=${currentPage}&per_page=${itemsPerPage}&search=${search}`;
      // console.log('url',apiUrl)
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      axios.get(apiUrl,config)
        .then((response) => {
          // console.log(response.data.data.data.length)  
          setinvoice(response.data.data.data);
          // console.log('last->page',response.data.data);
          settotalPages(response.data.data.last_page);
          // console.log('products-> ',response.data.data.data);
        })
        .catch((error) => {
          console.error('Error fetching product data:', error);
        });
    }, [currentPage,token,search,recallApi]);
    const updateCredit = (item) => {
        const apiUrl = `http://127.0.0.1:8000/api/invoice/update/${item.invoice_id}`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        const data={
            status:1,
            borrow_amount:parseInt(item.total_price),
          };
        axios
          .post(apiUrl, data, config)
          .then((response) => {
            //console.log('API Response:', response.data);
            showSuccessAlert('Credit Invoice '+response.data.data.cust_name+' updated successfully');
            setrecallApi((prev) => !prev);
            navigate('/sales');
          })
          .catch((error) => {
            console.error('API Error:', error);
            showErrorAlert(error.message)
          });
          
      };
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  return (
    <>
    <Banner title={"View Credits"}/>
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
              <th className='centered'>Received Amount</th>
              <th className='centered'>Remaining</th> 
              <th className='centered'>Total Quantity</th>
              <th className='centered'>Created Date</th>                       
              <th className='centered'>Actions</th>
            </tr>
          </thead>
          <tbody>
           {invoice.length===0? <tr>
      <td colSpan="10" className="centered">
        No records found
      </td>
    </tr>  :(invoice.map((inv) => (
              <tr key={inv.invoice_id}>
                <td>{inv.invoice_id}</td>
                <td className='centered'>{inv.cust_name}</td>
                <td className='centered'>{inv.cust_number}</td>
                <td className='centered'>{inv.total_products}</td>
                <td className='centered'>Rs {inv.total_price}</td>
                <td className='centered'>Rs {inv.borrow_amount}</td>
                <td className='centered'>Rs {inv.total_price-inv.borrow_amount}</td>
                <td className='centered'>{inv.total_quantity}</td>
                <td className='centered'>{inv.created_date}</td>
                <td className='centered'>
                  <FcIcons.FcCheckmark onClick={()=> updateCredit(inv)}
                   size={24}/></td>
                   
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

export default Credit