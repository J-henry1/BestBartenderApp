import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import BarNavbar from "./navbar/BarNavbar";
import { useNavigate } from "react-router-dom";

function OrderQ() {
  
  const [listOfOrders, setListOfOrders] = useState ([]);

//makes api call to backend
useEffect(() =>{

  Axios.get("http://localhost:3001/getOrders").then((Response) => {

  setListOfOrders(Response.data);

  });



}, []);//end use Effect call

  async function handleOrderUpdate(id) {
    const confirmDelete = window.confirm("Are you sure you want to order this order?");
    
    //confirm user wants to delete record
    if (confirmDelete) {
        try {
            const response = await Axios.delete(`http://localhost:3001/OrderQ/${id}`);
            if (response.data.success) {
                // Remove the deleted opportunity from the state
                setListOfOrders(prevOrders => prevOrders.filter(order => order._id !== id));
            } else {
                console.error('Error deleting opportunity:', response.data.message);
            }
        } catch (error) {
            console.error('Error (Unable to Cancel):', error);
        }
    } else {
        // User canceled the deletion, do nothing or handle as needed
        console.log("Order was not removed")
    }
}

  return (
      
    <div className="App">
       <BarNavbar />
      <div className="products">

        <h3>There are {listOfOrders.length} orders waiting.</h3>


          {listOfOrders.map((order) => {
              return (<div key={order._id}>
                <div className='Orders'>
                    <h1>Order Number: {order.orderNumber}</h1>
                    <h1>Product Ordered: {order.productsName}</h1>
                    <h1>Order Status: {order.orderStatus}</h1>
                    <h1>Order Date: {order.orderDate}</h1>
                </div> 
                <div className='order-button-container'>
                    <button className='button' title='Order a Drink' type = "button"
                    onClick={() => {
                        handleOrderUpdate(order._id); // Set the selected product
                    }}
                    >Complete Order</button>
                </div> 
            </div>
          );
      })}

      </div>

      
    </div>
  );

}//end app function

export default OrderQ;


