import React, { useEffect, useState } from "react";
import "../CSS/Notification.css";
import { useNavigate } from "react-router-dom";

function Notification() {
    const [pendingRentals, setPendingRentals] = useState([]);
    const [approvedRentals, setApprovedRentals] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);
    const navigate = useNavigate();

    // Lấy thông báo từ API
    const fetchNotifications = async () => {
        try {
            const response = await fetch("http://localhost:16009/api/notifications", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPendingRentals(data.pendingRentals || []);
                setApprovedRentals(data.approvedRentals || []);
            } else {
                console.error("Không thể tải thông báo.");
            }
        } catch (error) {
            console.error("Lỗi khi tải thông báo:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleApprove = async (id) => {
        try {
            const response = await fetch(`http://localhost:16009/api/approve-request/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                setAlertMessage("Yêu cầu thuê đã được chấp nhận thành công!");
                // Di chuyển yêu cầu từ "Đang chờ thuê" sang "Đã cho thuê"
                const approvedRequest = pendingRentals.find((r) => r.Request_ID === id);
                setPendingRentals((prev) =>
                    prev.filter((notification) => notification.Request_ID !== id)
                );
                setApprovedRentals((prev) => [...prev, approvedRequest]);
            } else {
                const data = await response.json();
                setAlertMessage(data.message || "Lỗi khi chấp nhận yêu cầu thuê. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi phê duyệt yêu cầu:", error);
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

            {alertMessage && (
                <div className="alert alert-success text-center" role="alert">
                    {alertMessage}
                </div>
            )}

            <div className="notification-section">
                <h3>Đang chờ thuê</h3>
                {pendingRentals.length > 0 ? (
                    <div className="notification-grid">
                        {pendingRentals.map((notification) => (
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
                    <p>Không có yêu cầu nào đang chờ thuê.</p>
                )}
            </div>

            <div className="notification-section">
                <h3>Đã cho thuê</h3>
                {approvedRentals.length > 0 ? (
                    <div className="notification-grid">
                        {approvedRentals.map((notification) => (
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
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Không có yêu cầu nào đã được cho thuê.</p>
                )}
            </div>

            <div className="back-button-container">
                <button className="btn btn-primary" onClick={handleBack}>
                    Quay lại trang chủ
                </button>
            </div>
        </div>
    );
}

export default Notification;
