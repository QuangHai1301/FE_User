import { BsFillBagFill } from "react-icons/bs";

const Card = ({ ID, Attachment, Title, Price, Description, onClick }) => {
    return (
        <>
            <section className="card" onClick={onClick}> {/* Đảm bảo xử lý onClick */}
                <img src={Attachment} alt={Title} className="card-img" />
                <div className="card-details">
                    <h3 className="card-title">{Title}</h3>
                    <section className="card-price">
                        <div className="price">
                            <del>{ }</del> {Price}
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
};

export default Card;
