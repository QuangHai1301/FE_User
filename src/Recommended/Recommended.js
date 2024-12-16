import Button from "../components/Button";
import "./Recommended.css";

const Recommended = ({ handleClick }) => {
  return (
    <>
      <div>
        <h2 className="recommended-title">Recommended</h2>
        <div className="recommended-flex">
          <Button onClickHandler={handleClick} value="" title="All Products" />
          <Button onClickHandler={handleClick} value="Căn hộ" title="chung cư" />
          <Button onClickHandler={handleClick} value="Nhà ở" title="nhà phố" />
          <Button onClickHandler={handleClick} value="Đất nền" title="đất nền" />
          <Button onClickHandler={handleClick} value="Bất động sản thương mại" title="văn phòng" />
          <Button onClickHandler={handleClick} value="Biệt thự" title="biệt thự" />
        </div>
      </div>
    </>
  );
};

export default Recommended;
