import "../CSS/Detail_Product.css";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Detail_Product() {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:19006/api/article?ID=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        if (data.articleDetails) {
          setProductData(data.articleDetails);
        } else {
          throw new Error('No product data found');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

  const handleRentClick = () => {
    navigate(`/rent/${id}`, { state: { productData } });
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="detail-product-container">
      <h2 className="detail-product-title">{productData?.Title || "No Title Available"}</h2>
      <img
        src={productData?.Attachment || ""}
        alt="Hình ảnh sản phẩm"
        className="detail-product-img"
      />
      <div className="detail-product-info">
        <p><strong>ID:</strong> {productData?.ID}</p>
        <p><strong>Người đăng bài:</strong> {productData?.UserName}</p>
        <p className="detail-product-price"><strong>Giá:</strong> {productData?.Price} VND</p>
        <p><strong>Mô tả:</strong> {productData?.Description}</p>
        <p><strong>Diện tích:</strong> {productData?.Area} m²</p>
        <p><strong>Ngày đăng bài:</strong> {new Date(productData?.Date_Begin).toLocaleDateString()}</p>
        {/* <p><strong>Ngày kết thúc:</strong> {new Date(productData?.Date_End).toLocaleDateString()}</p> */}
        <p><strong>Danh mục:</strong> {productData?.Category_Name}</p>
        <p><strong>Thành phố:</strong> {productData?.City_Name}</p>
        <p><strong>Trạng thái:</strong> {productData?.Status_Name}</p>
      </div>
      <div className="button-group">
        <button onClick={() => window.history.back()} className="back-button">Quay lại</button>
        <button onClick={handleRentClick} className="rent-button">Liên hệ</button>
      </div>
    </div>
  );
}

export default Detail_Product;
