import React,{useContext} from 'react';
import "./App.css";
import LoginPage from "./Components/LoginPage";
import axios from 'axios';
import Home from "./Components/Home";
import CategoryList from "./Components/CategoryList";
import AddCategoryList from "./Components/AddCategoryList";
import ProductList from "./Components/ProductList";
import AddProduct from "./Components/AddProduct";
import AuthContext from "./context/AuthContext";
import EditCategory from "./Components/EditCategory";

import { BrowserRouter, Routes, Route } from "react-router-dom";
axios.defaults.withCredentials = true;

function App() {
  const { loggedIn } = useContext(AuthContext);
  // console.log(loggedIn);
  
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          {loggedIn === true && (
            <>
            <Route path="/home" element={<Home />} />
            <Route path="/category" element={<CategoryList />} />
            <Route path="/addCategory" element={<AddCategoryList />} />
            <Route path="/editCategory" element={<EditCategory />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/addProduct" element={<AddProduct />} />
          </>
          )}
          {loggedIn === false && (
            <>
          <Route path="/" element={<LoginPage />} />
          </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
