import React, { useState, useEffect } from 'react';
import { FiHeart, FiBell } from "react-icons/fi"; // Thêm icon chuông
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
  const [unreadNotifications, setUnreadNotifications] = useState(0); // Số lượng thông báo chưa đọc

  // State cho bộ lọc
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserData(token);
      fetchNotifications(token); // Lấy thông báo khi người dùng đăng nhập
    }

    fetchCategories();
    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetchDistricts(selectedCity);
    } else {
      setDistricts([]); // Reset districts nếu không chọn city
    }
  }, [selectedCity]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("http://localhost:19006/api/user-info", {
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
      const response = await fetch("http://localhost:19006/api/notifications", {
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

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:19006/api/realty-categories");
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch("http://localhost:19006/api/cities");
      const data = await response.json();
      setCities(data.cities || []);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  const fetchDistricts = async (cityId) => {
    try {
      const response = await fetch(`http://localhost:19006/api/districts/${cityId}`);
      const data = await response.json();
      setDistricts(data.districts || []);
    } catch (error) {
      console.error("Failed to fetch districts:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    onFilterChange && onFilterChange({ category });
  };

  const handleCityChange = (e) => {
    const city = e.target.value; // Giá trị ID của thành phố được chọn
    setSelectedCity(city); // Lưu giá trị thành phố đã chọn
    onFilterChange && onFilterChange({ city }); // Truyền dữ liệu bộ lọc ra HomePage
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value; // Giá trị ID của quận/huyện được chọn
    onFilterChange && onFilterChange({ district }); // Truyền dữ liệu bộ lọc ra HomePage
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
    setUnreadNotifications(0); // Reset thông báo chưa đọc
    navigate('/');
    window.location.reload();
  };

  const handleNotificationsClick = () => {
    setUnreadNotifications(0); // Đánh dấu tất cả thông báo là đã đọc
    navigate('/notifications'); // Điều hướng đến trang thông báo
  };

  return (
    <nav>
      {/* Bộ lọc */}
      <div className="filter-container">
        <select onChange={handleCategoryChange} className="filter-select">
          <option value="">Chọn danh mục</option>
          {categories.map((category) => (
            <option key={category.ID} value={category.Name}>
              {category.Name}
            </option>
          ))}
        </select>

        <select onChange={handleCityChange} className="filter-select">
          <option value="">Chọn tỉnh/thành</option>
          {cities.map((city) => (
            <option key={city.ID} value={city.ID}>
              {city.City_Name}
            </option>
          ))}
        </select>

        <select onChange={handleDistrictChange} className="filter-select" disabled={!selectedCity}>
          <option value="">Chọn quận/huyện</option>
          {districts.map((district) => (
            <option key={district.ID} value={district.ID}>
              {district.District_Name}
            </option>
          ))}
        </select>
      </div>

      {/* Tài khoản và thông báo */}
      <div className="profile-container">
        {isAuthenticated && (
          <>
            <div className="notification-icon" onClick={handleNotificationsClick}>
              <FiBell className="nav-icons" />
              {unreadNotifications > 0 && (
                <span className="notification-badge">{unreadNotifications}</span>
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
