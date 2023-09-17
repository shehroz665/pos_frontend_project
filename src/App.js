import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import AddProductCategory from './pages/ProductCategory/AddProductCategory';
import ProductCategory from './pages/ProductCategory/ProductCategory';
import UpdateProductCategory from './pages/ProductCategory/UpdateProductCategory';

import AddProduct from './pages/Product/AddProduct';
import Products from './pages/Product/Products';

import Suppliers from './pages/Suppliers/Suppliers'
import AddSupplier from './pages/Suppliers/AddSupplier';

import Statistics from './pages/Statistics/Statistics';

import Sales from './pages/Sale/Sales';


import Settings from './pages/Setting/Settings';

import Login from './pages/Login';
import Logout from './pages/Logout';

import Splash from './pages/Auth/Splash';

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
        {/*Product Category */}
        <Route path='/productcategory' element={<><Sidebar /><ProductCategory /></>} />
        <Route path='/productcategory/add' element={<><Sidebar /><AddProductCategory /></>} />
        <Route path='/productcategory/update' element={<><Sidebar /><UpdateProductCategory /></>} />
        {/*Suppliers */}
        <Route path='/suppliers' element={<><Sidebar /><Suppliers /></>} />
        <Route path='/supplier/add' element={<><Sidebar /><AddSupplier /></>} />

        <Route path='/sales' element={<><Sidebar /><Sales /></>} />
        <Route path='/settings' element={<><Sidebar /><Settings /></>} />
        <Route path='/logout' element={<><Sidebar /><Logout /></>} />
      </Routes>
    </Router>
  );
}

export default App;
