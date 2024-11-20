// UserDropdown.js
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserDropdown = ({ userEmail, userPhone, onLogout, children }) => { // Thêm children
  const navigate = useNavigate();

  const handleViewArticles = () => {
    navigate('/my-articles'); // Đường dẫn tới trang "Bài viết đã đăng" của người dùng
  };

  const handlePostArticle = () => {
    navigate('/post-article'); // Đường dẫn tới trang "Đăng bài viết"
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {children} {/* Sử dụng children để hiển thị tên người dùng */}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item disabled>Email: {userEmail}</Dropdown.Item>
        <Dropdown.Item disabled>Phone: {userPhone}</Dropdown.Item>
        <Dropdown.Item href="/edit-profile">Chỉnh sửa thông tin</Dropdown.Item>
        <Dropdown.Item onClick={handleViewArticles}>Bài viết đã đăng</Dropdown.Item> {/* Thêm bài viết đã đăng */}
        <Dropdown.Item onClick={handlePostArticle}>Đăng bài viết</Dropdown.Item> {/* Thêm đăng bài viết */}
        <Dropdown.Item onClick={onLogout}>Đăng xuất</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
