import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import AddProductCategory from './pages/ProductCategory/AddProductCategory';
import ProductCategory from './pages/ProductCategory/ProductCategory';
import UpdateProductCategory from './pages/ProductCategory/UpdateProductCategory';
import ArchiveProductCategory from './pages/ProductCategory/ArchiveProductCategory';

import AddProduct from './pages/Product/AddProduct';
import Products from './pages/Product/Products';
import ArchiveProducts from './pages/Product/ArchiveProducts';
import UpdateProduct from './pages/Product/UpdateProduct';
import OutofStock from './pages/Product/OutofStock';

import Suppliers from './pages/Suppliers/Suppliers'
import AddSupplier from './pages/Suppliers/AddSupplier';
import AchiveSupplier from './pages/Suppliers/AchiveSupplier';
import UpdateSupplier from './pages/Suppliers/UpdateSupplier';

import Statistics from './pages/Statistics/Statistics';

import Sales from './pages/Sale/Sales';

import Settings from './pages/Setting/Settings';

import Login from './pages/Login';
import Logout from './pages/Logout';

import AddToCart from './pages/Cart/AddToCart';
import GenerateInvoice from './pages/Invoice/GenerateInvoice';

import Invoice from './pages/Invoice/Invoice';
import Credit from './pages/Credit/Credit';

function App() {
  return (
    <Router>
      {/* <Sidebar /> */}
      <Routes>
        {/*Statistics */}
        <Route path='/' element={<Login />} />      
        <Route path='/statistics' element={<><Sidebar /><Statistics /></>} />
        {/*Products */}
        <Route path='/products' element={<><Sidebar /><Products /></>} />
        <Route path='/product/add' element={<><Sidebar /><AddProduct /></>} />
        <Route path='/product/update' element={<><Sidebar /><UpdateProduct /></>} />
        <Route path='/product/archive' element={<><Sidebar /><ArchiveProducts /></>} />
        <Route path='/product/outofstock' element={<><Sidebar /><OutofStock /></>} />
        
        {/*Product Category */}
        <Route path='/productcategory' element={<><Sidebar /><ProductCategory /></>} />
        <Route path='/productcategory/add' element={<><Sidebar /><AddProductCategory /></>} />
        <Route path='/productcategory/update' element={<><Sidebar /><UpdateProductCategory /></>} />
        <Route path='/productcategory/archive' element={<><Sidebar /><ArchiveProductCategory /></>} />

        {/*Suppliers */}
        <Route path='/suppliers' element={<><Sidebar /><Suppliers /></>} />
        <Route path='/supplier/add' element={<><Sidebar /><AddSupplier /></>} />
        <Route path='/supplier/update' element={<><Sidebar /><UpdateSupplier /></>} />
        <Route path='/supplier/archive' element={<><Sidebar /><AchiveSupplier /></>} />

        <Route path='/invoices' element={<><Sidebar /><Invoice /></>} /> 
        <Route path='/invoice/print' element={<><Sidebar /><GenerateInvoice /></>} />


        <Route path='/addtocart' element={<><Sidebar /><AddToCart /></>} />
        <Route path='/sales' element={<><Sidebar /><Sales /></>} />
        <Route path='/settings' element={<><Sidebar /><Settings /></>} />
        <Route path='/logout' element={<><Sidebar /><Logout /></>} />

        <Route path='/credit' element={<><Sidebar /><Credit /></>} />
      </Routes>
    </Router>
  );
}

export default App;
