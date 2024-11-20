import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../CSS/SignUp.css";

function SignUp() {
  const [formData, setFormData] = useState({
    UserName: '',   // Thêm UserName vào formData
    Password: '',
    Password_Repeat: '',
    Email: '',
    PhoneNumber: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.Password !== formData.Password_Repeat) {
      setError('Mật khẩu nhập lại không khớp');
      return;
    }

    try {
      const response = await fetch('http://localhost:19006/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserName: formData.UserName, // Gửi UserName cùng với các dữ liệu khác
          Password: formData.Password,
          Password_Repeat: formData.Password_Repeat,
          Email: formData.Email,
          PhoneNumber: formData.PhoneNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setError(null); 
        setTimeout(() => {
          navigate('/sign-in'); 
        }, 1000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  };

  return (
    <div className="signup-container">
      <h1>Đăng Ký Tài Khoản</h1>
      {error && <p className="alert alert-danger">{error}</p>}
      {success && <p className="alert alert-success">{success}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <label>Tên Tài Khoản:</label>
          <input
            type="text"
            name="UserName"
            value={formData.UserName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Số Điện Thoại:</label>
          <input
            type="text"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mật Khẩu:</label>
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nhập Lại Mật Khẩu:</label>
          <input
            type="password"
            name="Password_Repeat"
            value={formData.Password_Repeat}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Đăng Ký</button>
        <button onClick={() => navigate('/')} className="back-button">Quay lại</button>
      </form>
    </div>
  );
}

export default SignUp;
