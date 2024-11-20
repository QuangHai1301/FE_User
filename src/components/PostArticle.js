import React, { useState, useEffect } from 'react';
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
    city: '',
    district: '',
  });
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch cities on component mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:19006/api/cities');
        const data = await response.json();
        setCities(data.cities || []);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    };

    fetchCities();
  }, []);

  // Fetch districts when a city is selected
  useEffect(() => {
    if (!formData.city) {
      setDistricts([]);
      return;
    }

    const fetchDistricts = async () => {
      try {
        const response = await fetch(`http://localhost:19006/api/districts/${formData.city}`);
        const data = await response.json();
        setDistricts(data.districts || []);
      } catch (error) {
        console.error('Failed to fetch districts:', error);
      }
    };

    fetchDistricts();
  }, [formData.city]);

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
      const response = await fetch('http://localhost:19006/api/post-article', {
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
          city: formData.city,
          district: formData.district,
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
          <label>Tỉnh/Thành phố:</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Chọn tỉnh/thành</option>
            {cities.map((city) => (
              <option key={city.ID} value={city.ID}>
                {city.City_Name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Quận/Huyện:</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            disabled={!formData.city}
            required
          >
            <option value="">Chọn quận/huyện</option>
            {districts.map((district) => (
              <option key={district.ID} value={district.ID}>
                {district.District_Name}
              </option>
            ))}
          </select>
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
