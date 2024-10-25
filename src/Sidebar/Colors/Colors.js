import "./Colors.css";
import Input from "../../components/Input";

const Colors = ({ handleChange }) => {
  return (
    <>
      <div>
        <h2 className="sidebar-title color-title">Xem theo diện tích</h2>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test1" />
          <span className="checkmark all"></span>
          All
        </label>

        <Input
          handleChange={handleChange}
          value="Dưới 20m²"
          title="Dưới 20m²"
          name="test1"
        />

        <Input
          handleChange={handleChange}
          value="20-30m²"
          title="20-30m²"
          name="test1"
        />

        <Input
          handleChange={handleChange}
          value="30-50m²"
          title="30-50m²"
          name="test1"
        />

        <Input
          handleChange={handleChange}
          value="50-70m²"
          title="50-70m²"
          name="test1"
        />

        <label className="sidebar-label-container">
          <input
            onChange={handleChange}
            type="white"
            value="white"
            name="test1"
          />
          <span
            className="checkmark"
            style={{ background: "white", border: "2px solid black" }}
          ></span>
          White
        </label>
      </div>
    </>
  );
};

export default Colors;