import React, { useState, useEffect } from 'react';
import Navigation from "../Navigation/Nav";
import Products from "../Products/Products";
import Recommended from "../Recommended/Recommended";
import Sidebar from "../Sidebar/Sidebar";
import Card from "../components/Card";
import "../CSS/HomePage.css";
import { useNavigate } from 'react-router-dom';

function HomePage(props) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [query, setQuery] = useState("");
    const [playerData, setPlayerData] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const navigate = useNavigate();

    // Fetch dữ liệu từ API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:19006/api/get-items');
                const nbaData = await response.json();
                const newData = nbaData.result.map(({ ID, Attachment, Title, Price, Description }) => ({
                    ID,
                    Attachment,
                    Title,
                    Price,
                    Description
                }));
                setPlayerData(newData);
                setFilteredItems(newData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Lọc dữ liệu dựa trên query và danh mục đã chọn
    useEffect(() => {
        const filterData = () => {
            let filtered = playerData;

            if (query) {
                filtered = filtered.filter(
                    (product) =>
                        product.Title.toLowerCase().includes(query.toLowerCase())
                );
            }

            if (selectedCategory) {
                filtered = filtered.filter((product) => product.category === selectedCategory);
            }

            setFilteredItems(filtered);
        };

        filterData();
    }, [query, selectedCategory, playerData]);

    // Xử lý khi bấm vào Card để điều hướng sang trang chi tiết sản phẩm
    const handleCardClick = (ID) => {
        navigate(`/product/${ID}`);
    }

    // Xử lý input tìm kiếm
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    // Xử lý thay đổi danh mục
    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    // Xử lý khi bấm vào nút chọn danh mục
    const handleClick = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <>
            <Sidebar handleChange={handleChange} />
            <Navigation query={query} handleInputChange={handleInputChange} />
            <Recommended handleClick={handleClick} />
            <Products result={filteredItems.map(({ ID, Description, Attachment, Price, Title }) => (
                <Card
                    key={ID}
                    Attachment={Attachment}
                    Title={Title}
                    Price={Price}
                    Description={Description}
                    onClick={() => handleCardClick(ID)} // Truyền sự kiện onClick cho Card
                />
            ))} />
        </>
    );
}
export default HomePage;


//homepage.js