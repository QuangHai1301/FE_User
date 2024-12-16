import "../CSS/EditArticle.css";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditArticle = () => {
  const { articleId } = useParams();
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    Price: '',
    Area: '',
    Attachment: '',
    Realty_Category_ID: '',
    address: {
      Address_Number: '',
      Street: '',
      Ward: '',
      District: '',
      City: '',
    },
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:16009/api/article-detail/${articleId}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Không thể tải dữ liệu bài viết.');
        }

        const data = await response.json();
        setFormData({
          ...data.article,
          address: {
            Address_Number: data.article.Address_Number || '',
            Street: data.article.Street || '',
            Ward: data.article.Ward || '',
            District: data.article.District || '',
            City: data.article.City || '',
          },
        });
        setError('');
      } catch (error) {
        console.error("Failed to fetch article data:", error);
        setError(error.message || 'Không thể tải dữ liệu bài viết. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleData();
  }, [articleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['Address_Number', 'Street', 'Ward', 'District', 'City'].includes(name)) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:16009/api/edit-article/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("Bài viết đã được cập nhật thành công!");
        setTimeout(() => {
          navigate('/my-articles');
        }, 1500);
      } else {
        setError(data.message || 'Cập nhật bài viết không thành công.');
      }
    } catch (error) {
      console.error("Error updating article:", error);
      setError("Cập nhật bài viết không thành công.");
    }
  };

  return (
    <div className="edit-article-container">
      <h2>Chỉnh sửa bài viết</h2>
      {error && <p className="alert alert-danger">{error}</p>}
      {message && <p className="alert alert-success">{message}</p>}

      {!isLoading ? (
        <form onSubmit={handleSubmit} className="edit-article-form">
          <div className="form-group">
            <label>Tiêu đề:</label>
            <input
              type="text"
              name="Title"
              value={formData.Title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mô tả:</label>
            <textarea
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Giá:</label>
            <input
              type="number"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Diện tích (m²):</label>
            <input
              type="number"
              name="Area"
              value={formData.Area}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Danh mục:</label>
            <select
              name="Realty_Category_ID"
              value={formData.Realty_Category_ID}
              onChange={handleChange}
              required
            >
              <option value="">Chọn danh mục</option>
              <option value="1">Nhà ở</option>
              <option value="2">Đất nền</option>
              <option value="3">Căn hộ</option>
              <option value="4">Bất động sản thương mại</option>
              <option value="5">Biệt thự</option>
            </select>
          </div>
          <div className="form-group">
            <label>Số nhà:</label>
            <input
              type="text"
              name="Address_Number"
              value={formData.address.Address_Number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Tên đường:</label>
            <input
              type="text"
              name="Street"
              value={formData.address.Street}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phường/Xã:</label>
            <input
              type="text"
              name="Ward"
              value={formData.address.Ward}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Quận:</label>
            <input
              type="text"
              name="District"
              value={formData.address.District}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Thành phố:</label>
            <input
              type="text"
              name="City"
              value={formData.address.City}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Ảnh:</label>
            <input
              type="text"
              name="Attachment"
              value={formData.Attachment}
              onChange={handleChange}
            />
          </div>
          <div className="button-group">
            <button className="btn-submit" type="submit">Lưu thay đổi</button>
            <button 
              type="button" 
              className="btn-back" 
              onClick={() => navigate('/my-articles')}
            >
              Quay lại
            </button>
          </div>
        </form>
      ) : (
        <p className="loading-message">Đang tải dữ liệu bài viết...</p>
      )}
    </div>
  );
};

export default EditArticle;
