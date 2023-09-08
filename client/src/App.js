import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Alerts from './components/layout/Alerts';
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import About from './components/pages/About';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <BrowserRouter>
            <Navbar />
            <div className="container">
              <Alerts />
              <Routes>
                <Route path="/" element={<PrivateRoute />}/>
                  <Route index element={<Home />} />
               
                <Route path="about" element={<About />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
              </Routes>
            </div>
          </BrowserRouter>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
