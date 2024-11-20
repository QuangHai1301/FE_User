import "./Category.css";
import Input from "../../components/Input";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleChange}
          value="Căn hộ"
          title="Căn hộ"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Nhà ở"
          title="Nhà ở"
          name="test"
        />
        <Input
          handleChange={handleChange} 
          value="Đất nền"
          title="Đất nền"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Bất động sản thương mại"
          title="Văn phòng"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Biệt thự"
          title="Biệt thự"
          name="test"
        />
      </div>
    </div>
  );
}

export default Category;
