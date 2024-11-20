import React from "react";
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
import UpdateUser from './components/UpdateUser'; // Thêm import cho UpdateUser
import MyArticle from "./components/MyArticles";  // Đảm bảo đường dẫn đến MyArticles là chính xác
import PostArticle from "./components/PostArticle"; // Đảm bảo đường dẫn đến PostArticle là chính xác
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rent/:id" element={<RentPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/edit-article/:articleId" element={<EditArticle />} /> {/* Thêm route cho EditArticle */}
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
