import './App.css';
import BarNavbar from "./navbar/BarNavbar";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { Link } from 'react-router-dom';
import Lumber from './Images/Navbar.jpg';

function Home(){

    return(
        <div className="App">
             <BarNavbar/>
            <div className="Home">
                <div className='container-home'>
                    <button title='Order Now' class="button"><Link to="/Menu" className="links">Drink Menu</Link></button>
                    <button title='Bartender Queue' class="button"><Link to="/OrderQ" className="links">Bartender</Link></button>
                </div>
            </div>
        
        
        
        
        </div>



    )


}//end home app

export default Home;