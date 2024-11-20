import React, { useState, useEffect } from 'react';
import Navigation from "../Navigation/Nav";
import Products from "../Products/Products";
import Sidebar from "../Sidebar/Sidebar";
import Card from "../components/Card";
import "../CSS/HomePage.css";
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [filters, setFilters] = useState({}); // Bộ lọc từ Nav
    const [categories, setCategories] = useState([]); // Danh mục từ lấy từ API lên
    const [playerData, setPlayerData] = useState([]); // data bài viết
    const [filteredItems, setFilteredItems] = useState([]); // data bài viết sau lọc
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem("favorites");
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const navigate = useNavigate();

    // Lấy danh mục từ API
    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:19006/api/realty-categories');
                const data = await response.json();
                setCategories(data.categories); 
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    // Lấy bài viết từ API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:19006/api/get-items');
                const nbaData = await response.json();
                const newData = nbaData.result.map(({ ID, Attachment, Title, Price, Description, category, City_ID, District_ID, UserName }) => ({
                    ID,
                    Attachment,
                    Title,
                    Price: Price || 0, //price này luôn là số, nếu không có sẽ mặc định là 0
                    Description,
                    category,
                    City_ID,
                    District_ID,
                    UserName
                }));
                setPlayerData(newData);
                setFilteredItems(newData); // Hiển thị tất cả bài viết ban đầu
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // save vào danh sách yêu thích vào localStorage
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // lọc bài viết khi filters thay đổi
    useEffect(() => {
        const filterData = () => {
            let filtered = playerData;

            //theo danh mục
            if (filters.category) {
                filtered = filtered.filter((item) => item.category === filters.category);
            }

            //theo tỉnh/thành phố
            if (filters.city) {
                filtered = filtered.filter((item) => item.City_ID === parseInt(filters.city));
            }

            //theo quận/huyện
            if (filters.district) {
                filtered = filtered.filter((item) => item.District_ID === parseInt(filters.district));
            }

            setFilteredItems(filtered);
        };

        filterData();
    }, [filters, playerData]); // Chạy lại khi filters hoặc dữ liệu thay đổi

    // Điều hướng khi nhấp vào bài viết
    const handleCardClick = (ID) => {
        navigate(`/product/${ID}`);
    };

    // Xử lý thêm/xóa bài viết vào danh sách yêu thích
    const handleFavoriteToggle = (id) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(id)
                ? prevFavorites.filter((favId) => favId !== id)
                : [...prevFavorites, id]
        );
    };

    return (
        <>
            <Sidebar
                categories={categories} // Danh mục từ API
                handleChange={(category) => setFilters((prev) => ({ ...prev, category }))} // Thay đổi danh mục
            />
            <Navigation onFilterChange={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))} />
            <Products
                result={filteredItems.map(({ ID, Description, Attachment, Price, Title, UserName }) => (
                    <Card
                        key={ID}
                        ID={ID}
                        Attachment={Attachment}
                        Title={Title}
                        Price={Price}
                        Description={Description}
                        UserName={UserName}
                        isFavorite={favorites.includes(ID)}
                        onFavoriteToggle={handleFavoriteToggle}
                        onClick={() => handleCardClick(ID)}
                    />
                ))}
            />
        </>
    );
}

export default HomePage;
