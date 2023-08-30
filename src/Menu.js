import './App.css';
import BarNavbar from "./navbar/BarNavbar";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Menu() {
  
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
        <BarNavbar />
      <div className="products">

          {listOfProducts.map((product) => {
              return (<div  key={product._id}>

                  <div className='Orders'>
                    <h1 className='products-text'>Product Name: {product.productName}</h1>
                    <h1 className='products-text'>Product Description: {product.productDescription}</h1>
                    <h1 className='products-text'>Product Price: ${product.price}</h1>
                    </div> 
                    
                    <div className='order-button-container'>
                    <button className='button' title='Order a Drink' type = "button"
                    onClick={() => {
                      setSelectedProduct(product); // Set the selected product
                      submitToQueue(product); // Submit the product to the order collection
                    }}
                    >Order Now</button>
              </div>
              </div>
              
            );
          })}

      </div>

      
    </div>
  );
}

export default Menu;
