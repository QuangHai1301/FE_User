import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hàm xử lý sự kiện khi nhấn nút đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:19006/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: userName,
          Password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Đăng nhập thành công
        alert("Đăng nhập thành công!");
        localStorage.setItem("token", data.token); // Lưu token vào localStorage để sử dụng sau
        navigate("/"); // Chuyển hướng về trang chính hoặc trang người dùng
      } else {
        // Đăng nhập thất bại
        setError(data.message || "Đăng nhập thất bại!");
      }
    } catch (err) {
      setError("Có lỗi xảy ra trong quá trình đăng nhập!");
    }
  };

  // Hàm xử lý khi nhấn nút "Quay lại"
  const handleGoBack = () => {
    navigate("/"); // Chuyển về trang chủ hoặc bất kỳ trang nào bạn muốn
  };

  return (
    <div className="login-container">
      <h1>Đăng nhập</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Tên đăng nhập</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Đăng nhập</button>
      </form>

      {/* Thêm nút "Quay lại" */}
      <button onClick={handleGoBack} style={{ marginTop: "20px" }}>
        Quay lại
      </button>
    </div>
  );
};

export default Login;