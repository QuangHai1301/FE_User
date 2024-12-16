import React, { useState, useEffect } from 'react';
import Card from "../components/Card";
import "../CSS/FavoritesPage.css";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Import biểu tượng 3 gạch

const FavoritesPage = () => {
    const navigate = useNavigate();
    const [view, setView] = useState("favorites"); // Trạng thái để chọn nội dung hiển thị
    const [sidebarVisible, setSidebarVisible] = useState(false); // Trạng thái hiển thị sidebar
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem("favorites")) || [];
    });
    const [contactedItems, setContactedItems] = useState([]);
    const [favoriteArticles, setFavoriteArticles] = useState([]);
    const [contactedArticles, setContactedArticles] = useState([]);

    // Lấy dữ liệu cho danh sách yêu thích
    useEffect(() => {
        const fetchFavoriteArticles = async () => {
            try {
                const response = await fetch('http://localhost:16009/api/get-items');
                const data = await response.json();
                const filteredData = data.result.filter((item) => favorites.includes(item.ID));
                setFavoriteArticles(filteredData);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };
        if (favorites.length > 0) {
            fetchFavoriteArticles();
        } else {
            setFavoriteArticles([]);
        }
    }, [favorites]);

    // Lấy dữ liệu cho danh sách liên hệ
    useEffect(() => {
        const fetchContactedArticles = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:16009/api/notifications", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setContactedItems(data.notifications || []);
                } else {
                    console.error("Failed to fetch notifications.");
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchContactedArticles();
    }, []);

    useEffect(() => {
        const fetchContactedArticlesDetails = async () => {
            try {
                const response = await fetch('http://localhost:16009/api/get-items');
                const data = await response.json();
                const filteredData = data.result.filter((item) =>
                    contactedItems.some((contact) => contact.Product_ID === item.ID)
                );
                setContactedArticles(filteredData);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };
        if (contactedItems.length > 0) {
            fetchContactedArticlesDetails();
        } else {
            setContactedArticles([]);
        }
    }, [contactedItems]);

    const handleToggleFavorite = (id) => {
        const updatedFavorites = favorites.includes(id)
            ? favorites.filter((favId) => favId !== id) // Xóa khỏi favorites nếu đã tồn tại
            : [...favorites, id]; // Thêm vào favorites nếu chưa tồn tại
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

        // Cập nhật trạng thái yêu thích trong danh sách bài viết
        setFavoriteArticles((prev) =>
            prev.map((article) =>
                article.ID === id ? { ...article, isFavorite: !favorites.includes(id) } : article
            )
        );
        setContactedArticles((prev) =>
            prev.map((article) =>
                article.ID === id ? { ...article, isFavorite: !favorites.includes(id) } : article
            )
        );
    };

    const handleCardClick = (id) => {
        navigate(`/product/${id}`); // Điều hướng tới trang chi tiết sản phẩm
    };

    const handleBackToHomepage = () => {
        navigate('/'); // Điều hướng quay lại trang chủ
    };

    return (
        <div className="favorites-page">
            {/* Nút 3 gạch để điều khiển sidebar */}
            <button className="toggle-sidebar-btn" onClick={() => setSidebarVisible(!sidebarVisible)}>
                <FaBars />
            </button>

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
                <ul>
                    <li
                        className={view === "favorites" ? "active" : ""}
                        onClick={() => {
                            setView("favorites");
                            setSidebarVisible(false); // Ẩn sidebar sau khi chọn
                        }}
                    >
                        Tin đã lưu
                    </li>
                    <li
                        className={view === "contacted" ? "active" : ""}
                        onClick={() => {
                            setView("contacted");
                            setSidebarVisible(false); // Ẩn sidebar sau khi chọn
                        }}
                    >
                        Tin đã liên hệ
                    </li>
                </ul>
            </aside>

            {/* Nội dung chính */}
            <main className="content">
                {view === "favorites" && (
                    <>
                        <h2>Tin đã lưu</h2>
                        {favoriteArticles.length > 0 ? (
                            <div className="favorites-grid">
                                {favoriteArticles.map(({ ID, Title, Attachment, Price, Description, UserName }) => (
                                    <Card
                                        key={ID}
                                        ID={ID}
                                        Attachment={Attachment}
                                        Title={Title}
                                        Price={Price}
                                        Description={Description}
                                        UserName={UserName}
                                        isFavorite={favorites.includes(ID)}
                                        onFavoriteToggle={() => handleToggleFavorite(ID)}
                                        onClick={() => handleCardClick(ID)} // Điều hướng khi nhấp vào bài viết
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>Không có bài viết nào trong danh sách yêu thích.</p>
                        )}
                    </>
                )}

                {view === "contacted" && (
                    <>
                        <h2>Tin đã liên hệ</h2>
                        {contactedArticles.length > 0 ? (
                            <div className="favorites-grid">
                                {contactedArticles.map(({ ID, Title, Attachment, Price, Description, UserName }) => (
                                    <Card
                                        key={ID}
                                        ID={ID}
                                        Attachment={Attachment}
                                        Title={Title}
                                        Price={Price}
                                        Description={Description}
                                        UserName={UserName}
                                        isFavorite={favorites.includes(ID)}
                                        onFavoriteToggle={() => handleToggleFavorite(ID)}
                                        onClick={() => handleCardClick(ID)} // Điều hướng khi nhấp vào bài viết
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>Không có bài viết nào trong danh sách liên hệ.</p>
                        )}
                    </>
                )}

                <button className="btn-back-homepage" onClick={handleBackToHomepage}>
                    Quay lại trang chủ
                </button>
            </main>
        </div>
    );
};

export default FavoritesPage;
