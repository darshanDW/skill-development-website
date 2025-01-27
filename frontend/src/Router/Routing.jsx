import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import Home from '../components/Home';
import Contact from '../components/Contact';
import Profile from '../components/Profile';
import Feedback from '../components/Feedback';
import SignUpPage from '../components/SignUpPage';
import Games from '../components/Games.jsx';
import Admin_home from '../components/Admin/Admin_home.jsx';
import Skills from '../components/Skills';

function Routing() {
  return (
    <div>
    
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/Contact' element={<Contact />} ></Route>
          <Route path='/Profile' element={<Profile />} ></Route>
          <Route path='/login' element={<LoginPage />} ></Route>
          <Route path='/signup' element={<SignUpPage />} ></Route>
          <Route path='/Games' element={<Games />} ></Route>
          <Route path='/Feedback' element={<Feedback />} ></Route>
          <Route path='/Admin_home' element={<Admin_home />} ></Route>
          <Route path='/Skills' element={<Skills />} ></Route>

        </Routes>
      
    </div>
  );
}

export default Routing;
