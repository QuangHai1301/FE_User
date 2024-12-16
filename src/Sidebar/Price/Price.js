import "./Price.css";


function Price({ handlePriceChange }) {
  const handleRadioChange = (priceRange) => {
    if (handlePriceChange) {
      handlePriceChange(priceRange);
    } else {
      console.error("handlePriceChange is not defined");
    }
  };

  return (
    <div>
      <h2 className="sidebar-title">Khoảng giá</h2>
      <div>
        <label className="sidebar-label-container">
          <input
            onChange={() => handleRadioChange({ minPrice: null, maxPrice: null })}
            type="radio"
            value=""
            name="price"
          />
          <span className="checkmark"></span>Tất cả
        </label>
        <label className="sidebar-label-container">
          <input
            onChange={() => handleRadioChange({ minPrice: 1000000, maxPrice: 2000000 })}
            type="radio"
            value="1000000-2000000"
            name="price"
          />
          <span className="checkmark"></span>1 triệu - 2 triệu
        </label>
        <label className="sidebar-label-container">
          <input
            onChange={() => handleRadioChange({ minPrice: 2000000, maxPrice: 5000000 })}
            type="radio"
            value="2000000-5000000"
            name="price"
          />
          <span className="checkmark"></span>2 triệu - 5 triệu
        </label>
        <label className="sidebar-label-container">
          <input
            onChange={() => handleRadioChange({ minPrice: 5000000, maxPrice: null })}
            type="radio"
            value=">5000000"
            name="price"
          />
          <span className="checkmark"></span>Trên 5 triệu
        </label>
      </div>
    </div>
  );
}

export default Price;
