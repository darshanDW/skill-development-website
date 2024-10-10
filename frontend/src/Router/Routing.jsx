import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import Home from '../components/Home';
import Contact from '../components/Contact';
import SignUpPage from '../components/SignUpPage.jsx';

function Routing() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/Contact' element={<Contact />} ></Route>
          <Route path='/login' element={<LoginPage />} ></Route>
          <Route path='/signup' element={<SignUpPage />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
