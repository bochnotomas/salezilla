import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Browse from './pages/Browse';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Sell from './pages/Sell';
import MyItems from './pages/MyItems';
import Settings from './pages/Settings';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/browse' element={<Browse />}></Route>
            <Route path='/sell' element={<Sell />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/myitems' element={<MyItems />}></Route>
            <Route path='/settings' element={<Settings />}></Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
