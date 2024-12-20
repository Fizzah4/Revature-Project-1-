// src/components/Navbar/Navbar.tsx
import React from 'react';
import './Navbar.css';  // Importing CSS file specific to Navbar
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/ticket-form">Ticket Form</Link></li>
        <li><Link to="/manager-dashboard">Manager Dashboard</Link></li>
        <li><Link to="/employee-dashboard">Employee Dashboard</Link></li>        
              
            </ul>
        </nav>
    );
}

export default Navbar;
