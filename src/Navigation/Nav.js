import React, { useState, useEffect } from 'react';
import { FiHeart, FiBell, FiMessageCircle } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import UserDropdown from '../components/UserDropdown';
import "./Nav.css";

const Nav = ({ onFilterChange }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userName: '',
    userEmail: '',
    userPhone: ''
  });
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);

  // Data tĩnh cho tỉnh/thành và quận/huyện
  const staticCities = [
    { ID: 1, City_Name: "Hồ Chí Minh" },
    { ID: 2, City_Name: "Biên Hòa" },
    { ID: 3, City_Name: "Đà Nẵng" },
    { ID: 4, City_Name: "Cần Thơ" },
    { ID: 5, City_Name: "Mỹ Tho" },
    { ID: 6, City_Name: "Rạch Giá" },
  ];

  const staticDistricts = {
    "Hồ Chí Minh": ["Gò Vấp", "12", "Phú Nhuận", "Tân Bình", "Bình Tân"],
    "Biên Hòa": ["Long Thành", "Tân Uyên", "Xuân Lộc", "Núi Bà Rá", "Châu Thành"],
    "Đà Nẵng": ["Liên Chiểu", "Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn"],
    "Cần Thơ": ["Ninh Kiều", "Cái Răng", "Bình Thủy", "Ô Môn", "Thốt Nốt"],
    "Mỹ Tho": ["Quận 1", "Quận 2", "Quận 3", "Quận 4"],
    "Rạch Giá": ["Châu Thành", "Long Mỹ", "Phước Long", "Gò Quao", "An Biên"],
  };

  const [selectedCity, setSelectedCity] = useState(null);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserData(token);
      fetchNotifications(token);
      fetchMessages(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("http://localhost:16009/api/user-info", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUserInfo({
          userName: data.userName,
          userEmail: data.email,
          userPhone: data.phoneNumber,
        });
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const fetchNotifications = async (token) => {
    try {
      const response = await fetch("http://localhost:16009/api/notifications", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        const unreadCount = data.notifications?.filter(notification => !notification.read).length || 0;
        setUnreadNotifications(unreadCount);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const fetchMessages = async (token) => {
    try {
      const response = await fetch("http://localhost:16009/api/user-messages", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        const unreadCount = data.messages?.filter(message => !message.read).length || 0;
        setUnreadMessages(unreadCount);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    onFilterChange && onFilterChange({ category });
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
    setDistricts(staticDistricts[cityName] || []);
    onFilterChange && onFilterChange({ city: cityName, district: null }); // Reset district
  };

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    onFilterChange && onFilterChange({ district: districtName });
  };

  const handleLoginClick = () => {
    navigate('/sign-in');
  };

  const handleSignUpClick = () => {
    navigate('/sign-up');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserInfo({ userName: '', userEmail: '', userPhone: '' });
    setUnreadNotifications(0);
    setUnreadMessages(0);
    navigate('/');
    window.location.reload();
  };

  const handleNotificationsClick = () => {
    setUnreadNotifications(0);
    navigate('/notifications');
  };

  const handleMessagesClick = () => {
    setUnreadMessages(0);
    navigate('/messages');
  };

  return (
    <nav>
      {/* Bộ lọc */}
      <div className="filter-container">
        <select onChange={handleCategoryChange} className="filter-select">
          <option value="">Chọn danh mục</option>
          <option value="Nhà ở">Nhà ở</option>
          <option value="Căn hộ">Căn hộ</option>
          <option value="Đất nền">Đất nền</option>
          <option value="Bất động sản thương mại">Bất động sản thương mại</option>
          <option value="Biệt thự">Biệt thự</option>
        </select>

        <select onChange={handleCityChange} className="filter-select">
          <option value="">Chọn tỉnh/thành</option>
          {staticCities.map((city) => (
            <option key={city.ID} value={city.City_Name}>
              {city.City_Name}
            </option>
          ))}
        </select>

        <select onChange={handleDistrictChange} className="filter-select" disabled={!selectedCity}>
          <option value="">Chọn quận/huyện</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      {/* Tài khoản, thông báo và tin nhắn */}
      <div className="profile-container">
        {isAuthenticated && (
          <>
            <div className="notification-icon" onClick={handleNotificationsClick}>
              <FiBell className="nav-icons" />
              {unreadNotifications > 0 && (
                <span className="notification-badge">{unreadNotifications}</span>
              )}
            </div>
            <div className="message-icon" onClick={handleMessagesClick}>
              <FiMessageCircle className="nav-icons" />
              {unreadMessages > 0 && (
                <span className="notification-badge">{unreadMessages}</span>
              )}
            </div>
            <a href="/favorites">
              <FiHeart className="nav-icons" />
            </a>
          </>
        )}

        {isAuthenticated ? (
          <UserDropdown
            userEmail={userInfo.userEmail}
            userPhone={userInfo.userPhone}
            onLogout={handleLogout}
          >
            {userInfo.userName}
          </UserDropdown>
        ) : (
          <div className="auth-buttons">
            <button onClick={handleLoginClick} className="login-btn">Đăng nhập</button>
            <button onClick={handleSignUpClick} className="signup-btn">Đăng ký</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
