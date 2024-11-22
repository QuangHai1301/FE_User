import { BsFillBagFill } from "react-icons/bs";
import "../CSS/HomePage.css"

const Card = ({ ID, Attachment, Title, Price, Description }) => {
  return (
    <>
      <section className="card">
        <img src={Attachment} alt={Title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{Title}</h3>
          <section className="card-price">
            <div className="price">
              <del>{}</del> {Price}
            </div>
            
          </section>
        </div>
      </section>
    </>
  );
};

export default Card;