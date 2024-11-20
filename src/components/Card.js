import { useState } from "react";
import { BsFillHeartFill, BsHeart } from "react-icons/bs"; // Sử dụng icon cho nút yêu thích

const Card = ({ ID, Attachment, Title, Price, Description, UserName, onClick, onFavoriteToggle, isFavorite }) => {
    const [favorite, setFavorite] = useState(isFavorite);

    // Hàm định dạng giá tiền theo đơn vị VNĐ
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    // Xử lý sự kiện click vào nút yêu thích
    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện onClick của card
        setFavorite(!favorite);
        onFavoriteToggle(ID); // Gọi hàm từ component cha để cập nhật trạng thái yêu thích
    };

    return (
        <section className="card" onClick={onClick}> {/* Thêm sự kiện onClick vào card */}
            <img src={Attachment} alt={Title} className="card-img" />
            <div className="card-details">
                <h3 className="card-title">{Title}</h3>
                <p className="card-description">{Description}</p>
                <p className="card-user">Đăng bởi: {UserName}</p> {/* Hiển thị tên người dùng */}
                <section className="card-price">
                    <div className="price">
                        {formatPrice(Price)} {/* Hiển thị giá tiền đã định dạng */}
                    </div>
                    <div className="favorite-icon" onClick={handleFavoriteClick}>
                        {favorite ? <BsFillHeartFill color="red" /> : <BsHeart color="gray" />} {/* Hiển thị icon yêu thích */}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Card;
