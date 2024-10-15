import "./Products.css";
import Detail_Product from "../components/Detail_Product";
const Products = ({ result }) => {



  return (
    <>
      <section className="card-container" onClick={Detail_Product}>{result}</section>
    </>
  );
};

export default Products;