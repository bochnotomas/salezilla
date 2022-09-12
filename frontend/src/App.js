import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import Browse from './pages/Browse/Browse';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Sell from './pages/Sell/Sell';
import MyItems from './pages/MyItems/MyItems';
import Settings from './pages/Settings/Settings';

import ItemPage from './pages/ItemPage/ItemPage';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/browse' element={<Browse />}></Route>
          <Route path='/sell' element={<Sell />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/myitems' element={<MyItems />}></Route>
          <Route path='/settings' element={<Settings />}></Route>
          <Route path='/item/:id' element={<ItemPage />}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
