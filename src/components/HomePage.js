import React, { useState, useEffect } from 'react';
import Navigation from "../Navigation/Nav";
import Products from "../Products/Products";
import Sidebar from "../Sidebar/Sidebar";
import Card from "../components/Card";
import "../CSS/HomePage.css";
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [filters, setFilters] = useState({}); // Bộ lọc từ Nav
    const [categories, setCategories] = useState([]); // Danh mục từ API
    const [playerData, setPlayerData] = useState([]); // Dữ liệu bài viết
    const [filteredItems, setFilteredItems] = useState([]); // Dữ liệu bài viết sau lọc
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem("favorites");
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const navigate = useNavigate();

    // Lấy danh mục từ API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:16009/api/realty-categories');
                const data = await response.json();
                setCategories(data.categories || []);
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
                const response = await fetch('http://localhost:16009/api/get-items');
    
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
    
                const data = await response.json();
    
                // Lọc bài viết không có Status_ID = 4
                const filteredData = data.result.filter(({ Status_ID }) => Status_ID !== 4);
    
                // Định dạng dữ liệu bài viết
                const formattedData = filteredData.map(
                    ({ ID, Attachment, Title, Price, Description, category, City, District, UserName, Area }) => ({
                        ID,
                        Attachment,
                        Title,
                        Price: Price || 0, // Giá mặc định là 0 nếu không có
                        Description,
                        category,
                        City,
                        District,
                        UserName,
                        Area: Area || 0, // Diện tích mặc định là 0 nếu không có
                    })
                );
    
                setPlayerData(formattedData); // Lưu tất cả bài viết
                setFilteredItems(formattedData); // Hiển thị tất cả bài viết ban đầu
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    // Lưu danh sách yêu thích vào localStorage
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // Lọc bài viết khi filters thay đổi
    useEffect(() => {
        const filterData = () => {
            let filtered = playerData;

            // Lọc theo danh mục
            if (filters.category) {
                filtered = filtered.filter((item) => item.category === filters.category);
            }

            // Lọc theo tỉnh/thành phố
            if (filters.city) {
                filtered = filtered.filter((item) => item.City === filters.city);
            }

            // Lọc theo quận/huyện
            if (filters.district) {
                filtered = filtered.filter((item) => item.District === filters.district);
            }

            // Lọc theo diện tích
            if (filters.area) {
                const [minArea, maxArea] = filters.area.split('-').map(Number);
                filtered = filtered.filter((item) => 
                    (!minArea || item.Area >= minArea) && 
                    (!maxArea || item.Area <= maxArea)
                );
            }

            // Lọc theo giá
            if (filters.price) {
                if (filters.price.minPrice !== undefined && filters.price.maxPrice !== undefined) {
                    filtered = filtered.filter((item) => 
                        item.Price >= filters.price.minPrice &&
                        item.Price <= filters.price.maxPrice
                    );
                } else if (filters.price.minPrice !== undefined) {
                    filtered = filtered.filter((item) => item.Price >= filters.price.minPrice);
                }
            }

            setFilteredItems(filtered);
        };

        filterData();
    }, [filters, playerData]);

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

    // Thay đổi bộ lọc khi có sự kiện từ Sidebar
    const handleSidebarChange = (filterName, filterValue) => {
        setFilters((prev) => ({
            ...prev,
            [filterName]: filterValue,
        }));
    };

    return (
        <>
            <Sidebar
                categories={categories}
                handleChange={handleSidebarChange}
            />
            <Navigation 
                onFilterChange={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))} 
            />
            <Products
                result={filteredItems.map(({ ID, Description, Attachment, Price, Title, UserName, Area }) => (
                    <Card
                        key={ID}
                        ID={ID}
                        Attachment={Attachment}
                        Title={Title}
                        Price={Price}
                        Description={Description}
                        Area={Area}
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
