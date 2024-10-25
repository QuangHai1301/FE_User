import Button from "../components/Button";
import "./Recommended.css";

const Recommended = ({ handleClick }) => {
  return (
    <>
      <div>
        <h2 className="recommended-title">Recommended</h2>
        <div className="recommended-flex">
          <Button onClickHandler={handleClick} value="" title="All Products" />
          <Button onClickHandler={handleClick} value="Căn hộ" title="Căn hộ" />
          <Button onClickHandler={handleClick} value="Nhà phố" title="Nhà phố" />
          <Button onClickHandler={handleClick} value="Đất nền" title="Đất nền" />
          <Button onClickHandler={handleClick} value="Văn phòng" title="Văn phòng" />
          <Button onClickHandler={handleClick} value="Biệt thự" title="Biệt thự" />
        </div>
      </div>
    </>
  );
};

export default Recommended;