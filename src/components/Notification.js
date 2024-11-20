import React, { useEffect, useState } from "react";
import "../CSS/Notification.css";
import { useNavigate } from "react-router-dom";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null); // State for the alert message
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:19006/api/notifications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications || []);
        } else {
          console.error("Failed to fetch notifications.");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:19006/api/approve-request/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setAlertMessage("Bạn đã chấp nhận yêu cầu thuê thành công!");
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.Request_ID !== id)
        );
      } else {
        const data = await response.json();
        setAlertMessage(data.message || "Lỗi khi chấp nhận yêu cầu thuê. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error approving request:", error);
      setAlertMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="notification-container">
      <h2>Thông báo</h2>

      {/* Sử dụng Bootstrap hiển thị thông báo */}
      {alertMessage && (
        <div className="alert alert-success text-center" role="alert">
          {alertMessage}
        </div>
      )}

      {notifications.length > 0 ? (
        <div className="notification-grid">
          {notifications.map((notification) => (
            <div className="notification-card" key={notification.Request_ID}>
              <p>
                <strong>Tên người thuê:</strong> {notification.Renter_Name}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {notification.Renter_Phone}
              </p>
              <p>
                <strong>Nội dung:</strong> {notification.Message}
              </p>
              <p>
                <strong>Ngày yêu cầu:</strong>{" "}
                {new Date(notification.Request_Date).toLocaleString()}
              </p>
              <p>
                <strong>Tên sản phẩm:</strong> {notification.Product_Title}
              </p>
              <div className="button-group d-flex justify-content-center">
                <button
                  className="btn btn-success"
                  onClick={() => handleApprove(notification.Request_ID)}
                >
                  Cho thuê
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Không có thông báo nào.</p>
      )}
      <div className="back-button-container">
        <button className="btn btn-primary" onClick={handleBack}>
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
}

export default Notification;
