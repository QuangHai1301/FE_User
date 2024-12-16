import "./Category.css";
import Input from "../../components/Input";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Danh mục</h2>

      <div>
        <label className="sidebar-label-container">
          <input
            onChange={() => handleChange('')}
            type="radio"
            value=""
            name="category"
          />
          <span className="checkmark"></span>Tất cả
        </label>
        <Input
          handleChange={() => handleChange('Căn hộ')}
          value="Căn hộ"
          title="Căn hộ"
          name="category"
        />
        <Input
          handleChange={() => handleChange('Nhà ở')}
          value="Nhà ở"
          title="Nhà ở"
          name="category"
        />
        <Input
          handleChange={() => handleChange('Đất nền')}
          value="Đất nền"
          title="Đất nền"
          name="category"
        />
        <Input
          handleChange={() => handleChange('Bất động sản thương mại')}
          value="Bất động sản thương mại"
          title="Văn phòng"
          name="category"
        />
        <Input
          handleChange={() => handleChange('Biệt thự')}
          value="Biệt thự"
          title="Biệt thự"
          name="category"
        />
      </div>
    </div>
  );
}

export default Category;
