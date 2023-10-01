import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstPage from './components/FirstPage';
import Login from './components/Login';
import Register from './components/Register';
import Home from "./components/Home"

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element = {<FirstPage/>} />
          <Route path="/register" element ={<Register />} />
          <Route path="/login" element ={<Login />} />
          <Route path="/feed" element ={<Home />} />
          
        </Routes>      
      </Router>      
    </div>
  )
}

export default App


