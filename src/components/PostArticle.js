import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../CSS/PostArticle.css";

const PostArticle = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    area: '',
    category: '',
    attachment: '',
    addressNumber: '',
    street: '',
    ward: '',
    district: '',
    city: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:16009/api/post-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: formData.price,
          area: formData.area,
          category: formData.category,
          attachment: formData.attachment,
          address: {
            Address_Number: formData.addressNumber,
            Street: formData.street,
            Ward: formData.ward,
            District: formData.district,
            City: formData.city,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Bài viết đã được đăng thành công!');
        setTimeout(() => navigate('/my-articles'), 2000);
      } else {
        setError(data.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    } catch (error) {
      setError('Đã xảy ra lỗi khi đăng bài viết.');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="post-article-container">
      <h2>Đăng bài viết mới</h2>
      {error && <p className="alert alert-danger">{error}</p>}
      {successMessage && <p className="alert alert-success">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="post-article-form">
        <div>
          <label>Tiêu đề:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mô tả:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Giá:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Diện tích (m²):</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Danh mục:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Chọn danh mục</option>
            <option value="Nhà ở">Nhà ở</option>
            <option value="Đất nền">Đất nền</option>
            <option value="Căn hộ">Căn hộ</option>
            <option value="Bất động sản thương mại">Bất động sản thương mại</option>
            <option value="Biệt thự">Biệt thự</option>
          </select>
        </div>
        <div>
          <label>Số nhà:</label>
          <input
            type="text"
            name="addressNumber"
            value={formData.addressNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tên đường:</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phường:</label>
          <input
            type="text"
            name="ward"
            value={formData.ward}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quận:</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Thành phố:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ảnh:</label>
          <input
            type="text"
            name="attachment"
            value={formData.attachment}
            onChange={handleChange}
            placeholder="URL ảnh"
          />
        </div>
        <div className="button-group">
          <button type="submit" className="btn-submit">Đăng bài viết</button>
          <button type="button" className="btn-back" onClick={handleBack}>Quay lại</button>
        </div>
      </form>
    </div>
  );
};

export default PostArticle;
