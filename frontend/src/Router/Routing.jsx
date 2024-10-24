import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import Home from '../components/Home';
import Contact from '../components/Contact';
import Profile from '../components/Profile';
import Feedback from '../components/Feedback';
import SignUpPage from '../components/SignUpPage';
import Games from '../components/Games.jsx';

function Routing() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/Contact' element={<Contact />} ></Route>
          <Route path='/Profile' element={<Profile />} ></Route>
          <Route path='/login' element={<LoginPage />} ></Route>
          <Route path='/signup' element={<SignUpPage />} ></Route>
          <Route path='/Games' element={<Games />} ></Route>
          <Route path='/Feedback' element={<Feedback />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
