import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import SignUp from './components/SignUp';
import FavoritesPage from "./components/FavoritesPage";
import Login from './components/SignIn';
import HomePage from "./components/HomePage";
import Detail_Product from "./components/Detail_Product";
import DataFromSQL from "./db/DataFromSQL";
import EditArticle from './components/EditArticle';
import Notification from './components/Notification';
import RentPage from "./components/RentPage";
import Messages from './components/Messages';
import UpdateUser from './components/UpdateUser';
import MyArticle from "./components/MyArticles"; 
import PostArticle from "./components/PostArticle"; 
import Sidebar from "./Sidebar/Sidebar"; // Đảm bảo import đúng đường dẫn
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./index.css";

function App() {
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState([]);

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  useEffect(() => {
    // Fetch dữ liệu từ API và lọc dựa trên filters
    const fetchData = async () => {
      const response = await fetch("http://localhost:16009/api/get-items");
      const result = await response.json();
      const items = result.items || [];

      const filtered = items.filter((item) => {
        if (filters.category && item.category !== filters.category) return false;
        if (filters.minPrice && item.price < filters.minPrice) return false;
        if (filters.maxPrice && item.price > filters.maxPrice) return false;
        if (filters.minArea && item.area < filters.minArea) return false;
        if (filters.maxArea && item.area > filters.maxArea) return false;
        return true;
      });

      setFilteredData(filtered);
    };

    fetchData();
  }, [filters]);

  return (
    <Router>
      <Sidebar handleFilterChange={handleFilterChange} />
      <Routes>
        <Route path="/" element={<HomePage filteredData={filteredData} />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/rent/:id" element={<RentPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/edit-article/:articleId" element={<EditArticle />} />
        <Route path="/edit-profile" element={<UpdateUser />} />
        <Route path="/product/:id" element={<Detail_Product />} />
        <Route path="/data" element={<DataFromSQL />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/my-articles" element={<MyArticle />} /> 
        <Route path="/post-article" element={<PostArticle />} /> 
        <Route path="/notifications" element={<Notification />} /> 
      </Routes>
    </Router>
  );
}

export default App;
