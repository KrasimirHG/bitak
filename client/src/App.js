import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './components/Home';
import DetailReview from './components/DetailReview';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="detailReview" element={ <DetailReview/> } />
    </Routes>
  );
}

export default App;
