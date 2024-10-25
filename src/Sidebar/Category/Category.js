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
          value="Chung cư"
          title="Chung cư"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Nhà phố"
          title="Nhà phố"
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
          value="Nhà trọ"
          title="Nhà trọ"
          name="test"
        />
      </div>
    </div>
  );
}

export default Category;