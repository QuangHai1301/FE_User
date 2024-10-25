import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Get ID from URL
import "../CSS/detail.css";
import "../Products/Products.css";
import Nav from '../Navigation/Nav';

function Detail_Product() {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get ID from URL
  const { id } = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:19006/api/post-article?ID=${id}`); // Use ID as a query parameter
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProductData(data); // The entire response, including all nested data
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);  // Re-run useEffect whenever ID changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    
    <div>
    <Nav/>
      <h1 className='text'>Chi tiết sản phẩm</h1>
      {productData ? (
        <div className='container-detail'>
          <h2 className='title-detail'>{productData.result[0]?.Title}</h2>
          <p className='text-detail'>
            <p ><strong>ID:</strong> {productData.result[0]?.ID}</p>
            <p><strong>Người bán:</strong> {productData.resultUser[0]?.UserName || 'N/A'}</p>
            <p><strong>Giá:</strong> {productData.result[0]?.Price} VND</p>
            <p><strong>Mô tả:</strong> {productData.result[0]?.Description}</p>
            <p><strong>Diện tích:</strong> {productData.result[0]?.Area} m²</p>
            <p><strong>Ngày bắt đầu:</strong> {new Date(productData.result[0]?.Date_Begin).toLocaleDateString()}</p>
            <p><strong>Ngày kết thúc:</strong> {new Date(productData.result[0]?.Date_End).toLocaleDateString()}</p>
            <p><strong>Danh mục:</strong> {productData.resultCategory[0]?.Name || 'N/A'}</p>
            <p><strong>Thành phố:</strong> {productData.resultCity[0]?.City_Name || 'N/A'}</p>
            <p><strong>Trạng thái:</strong> {productData.resultStatus[0]?.Name_Status || 'N/A'}</p>

          </p>

          <img className='image-detail' src={productData.result[0]?.Attachment} alt="Hình ảnh sản phẩm" />
        </div>
      ) : (
        <p>Không tìm thấy dữ liệu sản phẩm.</p>
      )}
    </div>
  );
}

export default Detail_Product;