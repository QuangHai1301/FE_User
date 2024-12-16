import "./Area.css";


function Area({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Diện tích</h2>
      <div>
        <label className="sidebar-label-container">
          <input
            onChange={() => handleChange({ minArea: null, maxArea: null })}
            type="radio"
            value=""
            name="area"
          />
          <span className="checkmark"></span>Tất cả
        </label>
        <label className="sidebar-label-container">
          <input
            onChange={() => handleChange({ minArea: 100, maxArea: 200 })}
            type="radio"
            value="100-200"
            name="area"
          />
          <span className="checkmark"></span>100 m² - 200 m²
        </label>
        <label className="sidebar-label-container">
          <input
            onChange={() => handleChange({ minArea: 200, maxArea: 400 })}
            type="radio"
            value="200-400"
            name="area"
          />
          <span className="checkmark"></span>200 m² - 400 m²
        </label>
        <label className="sidebar-label-container">
          <input
            onChange={() => handleChange({ minArea: 400, maxArea: 800 })}
            type="radio"
            value="400-800"
            name="area"
          />
          <span className="checkmark"></span>400 m² - 800 m²
        </label>
        <label className="sidebar-label-container">
          <input
            onChange={() => handleChange({ minArea: 800, maxArea: null })}
            type="radio"
            value=">800"
            name="area"
          />
          <span className="checkmark"></span>Trên 800 m²
        </label>
      </div>
    </div>
  );
}

export default Area;
