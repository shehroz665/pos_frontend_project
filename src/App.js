import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Make sure to import BrowserRouter, Routes, and Route
import AddProductCategory from './pages/AddProductCategory';
import ProductCategory from './pages/ProductCategory';
import AddProduct from './pages/AddProduct';
import Products from './pages/Products';
import Suppliers from './pages/Suppliers';
import AddSupplier from './pages/AddSupplier';
import Statistics from './pages/Statistics';
import Sales from './pages/Sales';
import Logout from './pages/Logout';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Splash from './pages/Auth/Splash';
import UpdateProductCategory from './pages/UpdateProductCategory';
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
