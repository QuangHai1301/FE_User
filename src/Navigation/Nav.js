import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import "./Nav.css";
import { useNavigate } from 'react-router-dom';
import SignUp from "../components/signup";



const Nav = ({ handleInputChange, query }) => {
  const navigate = useNavigate();
  
const handleClick_signIn = () => {
  navigate("/sign-in");
};
const handleClick_signUp = () => {
  navigate("/sign-up");
};


  
  return (
    <nav>
      <div className="nav-container">
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Enter your search shoes."
        />
      </div>
     

      <div className="profile-container">
        <a href="">
          <FiHeart className="nav-icons" />
        </a>
        <a href="">
          <AiOutlineShoppingCart className="nav-icons" />
        </a>
        <a href="">
          <AiOutlineUserAdd className="nav-icons" />
        </a>
        {/* <a href="">
          <AiOutlineUserAdd className="nav-icons" />
         Đăng nhập 
        </a> */}
        
        
      </div>
      <div className="profile-container">
        <a href="">
          <FiHeart className="nav-icons" />
        </a>
        <a href="">
          <AiOutlineShoppingCart className="nav-icons" />
        </a>
        <button onClick={handleClick_signIn} className="btn-signin">Đăng nhập</button> {/* Nút đăng nhập */}
        <button onClick={handleClick_signUp} className="btn-signup">Đăng ký</button> {/* Nút đăng ký */}
      </div>
    </nav>
  );
};
      
  
   

export default Nav;