import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../CSS/MyArticles.css";

const MyArticles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hàm lấy danh sách bài viết từ API
  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:16009/api/my-articles', {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data = await response.json();
      const uniqueArticles = Array.isArray(data.articles)
        ? [...new Map(data.articles.map(item => [item.ID, item])).values()]
        : [];

      setArticles(uniqueArticles);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      setError("Không thể tải bài viết. Vui lòng thử lại sau.");
    }
  };

  // Gọi fetchArticles khi component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  // Hàm xử lý xóa bài viết
  const handleDelete = async (articleId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:16009/api/delete-article/${articleId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Xóa bài viết không thành công.");
        }

        // Cập nhật danh sách bài viết trên frontend
        const updatedArticles = articles.filter(article => article.ID !== articleId);
        setArticles(updatedArticles);

        // Optional: Cập nhật lại từ API nếu cần thiết
        await fetchArticles();
    } catch (error) {
        console.error("Failed to delete article:", error);
        setError("Xóa bài viết không thành công. Vui lòng thử lại sau.");
    }
};

  // Hàm xử lý chỉnh sửa bài viết
  const handleEdit = (articleId) => {
    navigate(`/edit-article/${articleId}`);
  };

  // Hàm quay lại trang chủ
  const handleBackToHome = () => {
    navigate('/'); // Điều hướng quay lại trang Homepage
  };

  return (
    <div className="my-articles-container">
      <h2>Bài viết đã đăng</h2>

      {error && <p className="alert alert-danger">{error}</p>}

      {articles.length > 0 ? (
        <ul className="article-list">
          {articles.map((article) => (
            <li key={article.ID}>
              <h3>{article.Title}</h3>
              <p>{article.Description}</p>
              <div className="button-group">
                <button className="btn-delete" onClick={() => handleDelete(article.ID)}>Xóa</button>
                <button className="btn-edit" onClick={() => handleEdit(article.ID)}>Chỉnh sửa</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Không có bài viết nào.</p>
      )}
      <button className="btn-back" onClick={handleBackToHome}>Quay lại trang chủ</button>
    </div>
  );
};

export default MyArticles;
