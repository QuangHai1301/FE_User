import "../CSS/Detail_Product.css";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Detail_Product() {
  const [productData, setProductData] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const mapInstance = useRef(null); // Tham chiếu đến map instance
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchCoordinates = async (address) => {
    try {
      const apiKey = "aC5aaIrpdhIR-oR0MunUN5w-LzTMsj-_ewSoM28IDoQ";
      const response = await fetch(
        `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=${apiKey}`
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const { lat, lng } = data.items[0].position;
        setCoordinates({ lat, lng });
      }
    } catch (err) {
      console.error("Error fetching coordinates:", err);
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:16009/api/article?ID=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        if (data.articleDetails) {
          setProductData(data.articleDetails);

          const { Address_Number, Street, District, City } = data.articleDetails;
          const fullAddress = `${Address_Number || ""} ${Street || ""}, ${District || ""}, ${City || ""}`;
          await fetchCoordinates(fullAddress);
        } else {
          throw new Error("No product data found");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

  useEffect(() => {
    if (coordinates && mapRef.current) {
      const H = window.H;
      if (H && H.service) {
        const platform = new H.service.Platform({
          apikey: "aC5aaIrpdhIR-oR0MunUN5w-LzTMsj-_ewSoM28IDoQ",
        });
        const defaultLayers = platform.createDefaultLayers();

        // Kiểm tra và tạo bản đồ chỉ khi mapRef.current tồn tại
        if (mapRef.current && !mapInstance.current) {
          mapInstance.current = new H.Map(
            mapRef.current,
            defaultLayers.vector.normal.map,
            {
              center: { lat: coordinates.lat, lng: coordinates.lng },
              zoom: 14,
              pixelRatio: window.devicePixelRatio || 1,
            }
          );

          //them marker
          const marker = new H.map.Marker({ lat: coordinates.lat, lng: coordinates.lng });
          mapInstance.current.addObject(marker);

          // Kích hoạt các điều khiển tương tác
          new H.mapevents.Behavior(new H.mapevents.MapEvents(mapInstance.current));
          H.ui.UI.createDefault(mapInstance.current, defaultLayers);
        }
      } else {
        console.error("HERE Maps SDK chưa được tải.");
      }

      return () => {
        if (mapInstance.current) {
          mapInstance.current.dispose(); // Hủy map khi component unmount
          mapInstance.current = null; // Đặt lại map instance
        }
      };
    }
  }, [coordinates]);

  const handleRentClick = () => {
    navigate(`/rent/${id}`, { state: { productData } });
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="detail-product-container">
      <h2 className="detail-product-title">{productData?.Title || "No Title Available"}</h2>
      <img
        src={productData?.Attachment || ""}
        alt="Hình ảnh sản phẩm"
        className="detail-product-img"
      />
      <div className="detail-product-info">
        <p><strong>ID:</strong> {productData?.ID}</p>
        <p><strong>Người đăng bài:</strong> {productData?.UserName}</p>
        <p className="detail-product-price"><strong>Giá:</strong> {productData?.Price} VND</p>
        <p><strong>Mô tả:</strong> {productData?.Description}</p>
        <p><strong>Diện tích:</strong> {productData?.Area} m²</p>
        <p><strong>Ngày đăng bài:</strong> {new Date(productData?.Date_Begin).toLocaleDateString()}</p>
        <p><strong>Danh mục:</strong> {productData?.Category_Name}</p>
        <p><strong>Địa chỉ:</strong> {`${productData?.Address_Number || ""} ${productData?.Street || ""}`}</p>
        <p><strong>Phường:</strong> {productData?.District}</p>
        <p><strong>Quận:</strong> {productData?.City}</p>
        <p><strong>Thành phố:</strong> {productData?.Province}</p>
        <p><strong>Trạng thái:</strong> {productData?.Status_Name}</p>
      </div>
      <div ref={mapRef} style={{ width: "100%", height: "300px", margin: "20px 0" }}></div>
      <div className="button-group">
        <button onClick={() => window.history.back()} className="back-button">Quay lại</button>
        <button onClick={handleRentClick} className="rent-button">Liên hệ</button>
      </div>
    </div>
  );
}

export default Detail_Product;
