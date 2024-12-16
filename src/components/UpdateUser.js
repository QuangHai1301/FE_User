import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../CSS/UpdateUser.css";

const UpdateUser = () => {
  const [formData, setFormData] = useState({
    UserName: '',
    Email: '',
    PhoneNumber: '',
    Password: '',
    ConfirmPassword: '', // Thêm ConfirmPassword
  });

  const [message, setMessage] = useState(''); // Định nghĩa message
  const [error, setError] = useState(''); // Định nghĩa error
  const navigate = useNavigate(); // Định nghĩa navigate

  // Fetch current user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:16009/api/user-info', {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setFormData({
            UserName: data.userName || '',
            Email: data.email || '',
            PhoneNumber: data.phoneNumber || '',
            Password: '',
            ConfirmPassword: '',
          });
        } else {
          setError(data.message || 'Unable to fetch user data');
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Unable to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (formData.Password && formData.Password !== formData.ConfirmPassword) {
      setError('Mật khẩu và Xác nhận mật khẩu không khớp');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:16009/api/update-profile', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          UserName: formData.UserName,
          Email: formData.Email,
          PhoneNumber: formData.PhoneNumber,
          Password: formData.Password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Thông tin người dùng đã được cập nhật thành công");
        setTimeout(() => navigate('/'), 2000); // Điều hướng về trang chủ sau khi cập nhật thành công
      } else {
        setError(data.message || 'Cập nhật thông tin không thành công');
      }
    } catch (err) {
      console.error("Error updating user info:", err);
      setError("Cập nhật thông tin không thành công");
    }
  };

  return (
    <div className="update-user-container">
      <form onSubmit={handleSubmit} className="update-user-form">
        <h2>Cập nhật thông tin cá nhân</h2>
        {error && <p className="alert alert-danger">{error}</p>}
        {message && <p className="alert alert-success">{message}</p>}

        <div className="form-group">
          <label>Tên người dùng:</label>
          <input
            type="text"
            name="UserName"
            value={formData.UserName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại:</label>
          <input
            type="tel"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mật khẩu mới:</label>
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Xác nhận mật khẩu:</label>
          <input
            type="password"
            name="ConfirmPassword"
            value={formData.ConfirmPassword}
            onChange={handleChange}
            required={!!formData.Password}
          />
        </div>
        <div className="button-group">
          <button type="submit" className="btn-update">Cập nhật</button>
          <button 
            type="button" 
            className="btn-back"
            onClick={() => navigate(-1)} // Điều hướng về trang trước đó
          >
            Quay lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
