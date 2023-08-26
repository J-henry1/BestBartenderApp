
import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  
  const [listOfProducts, setListOfProducts] = useState ([])
  
  //makes api call to backend
  useEffect(() =>{

    Axios.get("http://localhost:3001/getProducts").then((Response) => {

    setListOfProducts(Response.data);

    });

  }, []);

  return (
    <div className="App">

      <div class="products">

          {listOfProducts.map((product) => {
              return (<div>

                    <h1>Product Name: {product.productName}</h1>
                    <h1>Product Description: {product.productDescription}</h1>
                    <h1>Product Price: ${product.price}</h1>

              </div>
            );
          })}

      </div>

      
    </div>
  );
}

export default App;
