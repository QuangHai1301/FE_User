import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function SignUp() {
  const [formData, setFormData] = useState({
    UserName: '',
    Password: '',
    Password_Repeat: '',
    Email: '',
    PhoneNumber: '',
    Role_ID: '2', // Mặc định chọn người thuê phòng
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

  // Hàm xử lý khi có thay đổi trong form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Hàm xử lý đăng ký
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
          UserName: formData.UserName,
          Password: formData.Password,
          Password_Repeat: formData.Password_Repeat,
          Email: formData.Email,
          PhoneNumber: formData.PhoneNumber,
          Role_ID: formData.Role_ID, // Gửi Role_ID từ form
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setError(null); // Xóa lỗi nếu đăng ký thành công
        setTimeout(() => {
          navigate('/login'); // Chuyển hướng về trang đăng nhập sau khi đăng ký thành công
        }, 1000); // Delay 1 giây trước khi chuyển trang
      } else {
        setError(data.message); // Hiển thị thông báo lỗi từ API
      }
    } catch (error) {
      setError('Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  };

  return (
    <div>
      <h1>Đăng Ký Tài Khoản</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên Đăng Nhập:</label>
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
        <div>
          <label>Chọn Vai Trò:</label>
          <select name="Role_ID" value={formData.Role_ID} onChange={handleChange}>
            <option value="1">Người thuê</option>
            <option value="2">Người thuê phòng</option>
          </select>
        </div>
        <button type="submit">Đăng Ký</button>
      </form>

      {/* Nút Quay lại */}
      <button onClick={() => navigate('/')}>Quay lại</button>
    </div>
  );
}

export default SignUp;