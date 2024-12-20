import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import TicketForm from './Components/TicketForm/TicketForm';
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import ManagerDashboard from './Components/Dashboard/ManagerDashboard';
import {EmployeeDashboard }from './Components/Dashboard/EmployeeDashboard';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/ticket-form" element={<TicketForm />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
