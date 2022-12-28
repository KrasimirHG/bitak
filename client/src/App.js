import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import SignUp from './components/auth/Register';
import SignIn from './components/auth/Login';
import DetailReview from './components/DetailReview';
import ItemAdd from './components/ItemAdd';
import AppNav from './components/AppNav';

function App() {
  return (
      <div>
        <AppNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="detailReview" element={<DetailReview />} />
          <Route path="register" element={<SignUp />} />
          <Route path="login" element={<SignIn />} />
          <Route path="logout" element={<Home />} />
          <Route path="addItem" element={<ItemAdd />} />
        </Routes>
      </div>
  );
}

export default App;
