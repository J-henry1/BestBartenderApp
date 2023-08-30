import React from 'react';
import Menu from './Menu.js'; // Correct the import path
import Home from './Home.js';
import OrderQ from './OrderQ.js'; // Correct the import path
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {
    // Use the useNavigate hook to get the navigation function
    let navigate = useNavigate();

    return (
        <div className='Home'>
            <Routes>

                <Route path="/" element={<Home/>} />

                {/* Define your routes */}
                <Route path="/OrderQ" element={<OrderQ />} />
                <Route path="/Menu" element={<Menu />} />
            </Routes>
        </div>
    );
}

export default App;
