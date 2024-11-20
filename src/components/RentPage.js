import "../CSS/RentPage.css";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const productData = location.state?.productData;

  const [showAlert, setShowAlert] = useState(false); // Trạng thái hiển thị thông báo
  const [message, setMessage] = useState(""); // Nội dung thuê

  if (!productData) {
    return <div className="alert alert-danger">Lỗi: Không tìm thấy thông tin sản phẩm.</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:19006/api/rental-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Gửi token xác thực
        },
        body: JSON.stringify({
          productID: productData.ID,
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Gửi yêu cầu thuê thất bại.");
      }

      // Lưu thông tin liên hệ vào Local Storage
      const contactedItems = JSON.parse(localStorage.getItem("contactedItems")) || [];
      if (!contactedItems.includes(productData.ID)) {
        contactedItems.push(productData.ID);
        localStorage.setItem("contactedItems", JSON.stringify(contactedItems));
      }

      setShowAlert(true); // Hiển thị thông báo
      setTimeout(() => {
        setShowAlert(false); // Ẩn thông báo sau 3 giây
        navigate("/"); // Điều hướng về trang chủ
      }, 2000);
    } catch (error) {
      console.error("Error submitting rental request:", error);
      alert("Đã xảy ra lỗi khi gửi yêu cầu thuê. Vui lòng thử lại.");
    }
  };

  // Định dạng giá tiền
  const formatPrice = (price) => {
    const numericPrice = Number(price);
    if (isNaN(numericPrice)) return "Không hợp lệ";
    return numericPrice.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // Không hiển thị phần thập phân
    });
  };

  return (
    <div className="rent-page-container">
      <h2>Thuê sản phẩm</h2>

      {/* Hiển thị thông báo Bootstrap */}
      {showAlert && (
        <div className="alert alert-success" role="alert">
          Yêu cầu thuê đã được gửi thành công!
        </div>
      )}

      <div className="rent-product-info">
        <p><strong>Tên sản phẩm:</strong> {productData?.Title}</p>
        <p><strong>Người bán:</strong> {productData?.UserName}</p>
        <p><strong>Số điện thoại:</strong> {productData?.Phone}</p>
        <p><strong>Giá:</strong> {formatPrice(productData?.Price)}</p>
      </div>

      <form className="rent-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="message">Nội dung thuê:</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Vui lòng nhập nội dung yêu cầu thuê"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="button-group mt-3">
          <button type="submit" className="btn btn-success me-2">Gửi yêu cầu</button>
          <button type="button" className="btn btn-secondary" onClick={handleBack}>Quay lại</button>
        </div>
      </form>
    </div>
  );
}

export default RentPage;
