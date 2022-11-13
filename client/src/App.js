import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/auth/RegisterModal';
import SignIn from './components/auth/LoginModal';
import ItemUpload from './components/ItemUpload';
// import DetailReview from './components/DetailReview';

function App() {
    return (
        <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="register" element={ <SignUp/> } />
            <Route path="login" element={ <SignIn/> } />
            <Route path="addItem" element={ <ItemUpload/> } />
            {/* <Route path="detailReview" element={ <DetailReview/> } /> */}
            {/* <Route path="detailReview" element={ <DetailReview/> } /> */}
        </Routes>
    );
}

export default App;
