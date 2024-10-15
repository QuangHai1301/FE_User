import { useState, useEffect } from "react";

import Navigation from "../Navigation/Nav";
import Products from "../Products/Products";
import products from "../db/data";
import Recommended from "../Recommended/Recommended";
import Sidebar from "../Sidebar/Sidebar";
import Card from "../components/Card";
import "../CSS/HomePage.css";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };


  const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:19006/api/get-items')
            const nbaData = await response.json()
            const newData = nbaData.result.map(({ ID, Attachment, Title, Price, Description }) => ({
              ID,
              Attachment,
              Title,
              Price,
              Description
          }));
          setPlayerData(newData);

        }
        fetchData()
    }, [])
    


  function filteredData(playerData, selected, query) {
    let filteredProducts = playerData.result;

    // // Filtering Input Items
    // if (query) {
    //   filteredProducts = filteredItems;
    // }

    // // Applying selected filter
    // if (selected) {
    //   filteredProducts = filteredProducts.filter(
    //     ({ category, color, company, newPrice, title }) =>
    //       category === selected ||
    //       color === selected ||
    //       company === selected ||
    //       newPrice === selected ||
    //       title === selected
    //   );
    // }

    return playerData.map(
      ({ ID, Description, Attachment, Price , Title}) => (
        <Card
          key={ID}
          Attachment={Attachment}
          Title={Title}
          Price={Price}
          Description={Description}
          />
      )
    );
  }

  

  const result = filteredData(playerData, selectedCategory, query);

  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
      <Products result={result} />
      
    </>
  );
}

export default HomePage;