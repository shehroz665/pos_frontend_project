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
function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        {/*Statistics */}
        <Route path='/' element={<Statistics />} />
        {/*Products */}
        <Route path='/products' element={<Products />} />
        <Route path='/product/add' element={<AddProduct />} />
        {/*Product Category */}
        <Route path='/productcategory' element={<ProductCategory />} />
        <Route path='/productcategory/add' element={<AddProductCategory />} />
        {/*Suppliers */}
        <Route path='/suppliers' element={<Suppliers />} />
        <Route path='/supplier/add' element={<AddSupplier />} />

        <Route path='/sales' element={<Sales />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
