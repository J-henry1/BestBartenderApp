
import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  
  const [listOfProducts, setListOfProducts] = useState ([]);
  const[listOfOrders, setListOfOrders] = useState ([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  //makes api call to backend
  useEffect(() =>{

    Axios.get("http://localhost:3001/getProducts").then((Response) => {

    setListOfProducts(Response.data);

    });

  }, []);



  function submitToQueue(product) {
    console.log(product.productName);
    console.log("New");
    console.log(listOfOrders + 1);
    console.log(new Date());
    

    const order = {
      orderNumber: listOfOrders.length + 1, 
      productsName: product.productName,
      orderStatus: "New",
      // Assuming orderNumber starts from 1
      orderDate: new Date()
    };

    Axios.post("http://localhost:3001/createOrders", order)
    .then((response) => {
      console.log("Order submitted:", response.data);
      // Update the list of orders
      setListOfOrders((prevOrders) => [...prevOrders, response.data]);
    })
    .catch((error) => {
      console.error("Error submitting order:", error);
    });
}//end submit to queue

  return (
    <div className="App">

      <div className="products">

          {listOfProducts.map((product) => {
              return (<div key={product._id}>
                    <h1>Product Name: {product.productName}</h1>
                    <h1>Product Description: {product.productDescription}</h1>
                    <h1>Product Price: ${product.price}</h1>
                    <button type = "button"
                    onClick={() => {
                      setSelectedProduct(product); // Set the selected product
                      submitToQueue(product); // Submit the product to the order collection
                    }}
                    >Order Now</button>
              </div>
            );
          })}

      </div>

      
    </div>
  );
}

export default App;
