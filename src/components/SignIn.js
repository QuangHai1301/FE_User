import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/SignIn.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:19006/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        localStorage.setItem("token", data.token); 
        localStorage.setItem("userData", JSON.stringify(data.user));
        setTimeout(() => {
          setSuccess(false);
          navigate("/"); 
        }, 1000);
      } else {
        setError(data.message || "Tài khoản hoặc mật khẩu sai!");
      }
    } catch (err) {
      setError("Có lỗi xảy ra trong quá trình đăng nhập!");
    }
  };

  return (
    <div className="login-container">
      <h1>Đăng nhập</h1>

      {success && (
        <div className="alert alert-success" role="alert">
          Đăng nhập thành công!
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className="btn btn-primary mt-3">Đăng nhập</button>
        <button 
          type="button" 
          className="btn btn-secondary mt-3" 
          onClick={() => navigate('/')}
        >
          Quay lại
        </button>
      </form>
    </div>
  );
};

export default Login;
