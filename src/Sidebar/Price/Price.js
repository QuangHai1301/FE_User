import Input from "../../components/Input";
import "./Price.css";

const Price = ({ handleChange }) => {
  return (
    <>
      <div className="ml">
        <h2 className="sidebar-title price-title">Xem theo giá</h2>

        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test2" />
          <span className="checkmark"></span>All
        </label>

        <Input
          handleChange={handleChange}
          value={50}
          title="$1 - 3tr"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={100}
          title="$3 - 5tr"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={150}
          title="$5 - 10"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={200}
          title="$ Trên 10"
          name="test2"
        />
      </div>
    </>
  );
};

export default Price;