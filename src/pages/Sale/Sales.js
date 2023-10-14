import React, { useState, useEffect } from 'react'
import "../ProductCategory/ProductCategory.css"
import Banner from '../Banner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import * as TbIcons from 'react-icons/tb';
import ClipLoader from "react-spinners/ClipLoader";
const Sales = () => {
  const navigate = useNavigate();
  const [invoice, setinvoice] = useState([]);
  const token = localStorage.getItem('token');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(0);
  const itemsPerPage = 10;
  const [date, setDate] = useState(formatDate(new Date()));
  const [salesCalculations, setsalesCalculations] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const formatedDate = formatDateToDDMMYYYY(date);
    setLoading(true);
    const apiUrl = `http://127.0.0.1:8000/api/invoice?page=${currentPage}&per_page=${itemsPerPage}&search=${formatedDate}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    axios.get(apiUrl, config)
      .then((response) => {
       
        setinvoice(response.data.data.data);
        settotalPages(response.data.data.last_page);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
        setLoading(false);
      });
  }, [currentPage, token, date]);
  useEffect(() => {
    const formatedDate = formatDateToDDMMYYYY(date);
    setLoading(true);
    const apiUrl = `http://127.0.0.1:8000/api/invoice/sales?&search=${formatedDate}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    axios.get(apiUrl, config)
      .then((response) => {
        setLoading(true);
        setsalesCalculations(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
        setLoading(false);
      });
  }, [token, date]);
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const edit = (id) => {
    // console.log('edit', id);
    const propsToPass = {
      id: id,
    };
    navigate('/invoice/print', { state: propsToPass });
  }
  const handlePageChange = (newPage) => {
    setLoading(true);
    setCurrentPage(newPage);
  };
  function formatDateToDDMMYYYY(inputDate) {
    const parts = inputDate.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      const shortenedYear = year.slice(-2);
      return `${day}-${month}-${shortenedYear}`;
    }
  }
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
          : (<div>
            <Banner title={"View Sales"} />
            <div className='home'>
              <div className='search-container'>
                <input
                  type='date'
                  className='search-input'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className='table-container'>
                <table>
                  <thead>
                    <tr>
                      <th>Total Products</th>
                      <th className='centered'>Total Quantity</th>
                      <th className='centered'>Total Price</th>
                      <th className='centered'>Total Cost</th>
                      <th className='centered'>Total Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parseInt(salesCalculations.total_products_sum) === 0 ? (
                      <tr>
                        <td colSpan="5" className="centered">
                          No records found
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td>{salesCalculations.total_products_sum}</td>
                        <td className='centered'>{salesCalculations.total_quantity_sum}</td>
                        <td className='centered'>{salesCalculations.total_price_sum}</td>
                        <td className='centered'>{salesCalculations.total_cost_sum}</td>
                        <td className='centered'>
                          {isNaN(parseInt(salesCalculations.total_price_sum) - parseInt(salesCalculations.total_cost_sum)) ? 0 :
                            parseInt(salesCalculations.total_price_sum) - parseInt(salesCalculations.total_cost_sum)}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

              </div>
              <div className='table-container'>
                <table>
                  <thead>
                    <tr>
                      <th>Sr.</th>
                      <th className='centered'>Customer Name</th>
                      <th className='centered'>Contact</th>
                      <th className='centered'>Total Products</th>
                      <th className='centered'>Total Price</th>
                      <th className='centered'>Total Cost</th>
                      <th className='centered'>Total Quantity</th>
                      <th className='centered'>Created Date</th>
                      <th className='centered'>Updated Date</th>
                      <th className='centered'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.length === 0 ? <tr>
                      <td colSpan="10" className="centered">
                        No records found
                      </td>
                    </tr> : (invoice.map((inv) => (
                      <tr key={inv.invoice_id}>
                        <td>{inv.invoice_id}</td>
                        <td className='centered'>{inv.cust_name}</td>
                        <td className='centered'>{inv.cust_number}</td>
                        <td className='centered'>{inv.total_products}</td>
                        <td className='centered'>Rs {inv.total_price}</td>
                        <td className='centered'>Rs {inv.total_cost}</td>
                        <td className='centered'>{inv.total_quantity}</td>
                        <td className='centered'>{inv.created_date}</td>
                        <td className='centered'>{inv.updated_date}</td>
                        <td className='centered'>
                          <TbIcons.TbFileInvoice onClick={() => edit(inv.invoice_id)} size={24} color='black' /></td>
                      </tr>
                    )))}
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

export default Sales
