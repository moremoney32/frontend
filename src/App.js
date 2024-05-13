import React, { useEffect } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { PageLogin } from './pages/PageLogin';
import { UidContext } from './components/UidContext';
import { useState } from 'react';
import { Profile } from './pages/Profile';
import { Menu } from './pages/Menu';



const App = () => {
  const [idUser,setIdUser]= useState(null)
  //https://frontend-reseau.onrender.com
  useEffect(()=>{
    fetch("http://localhost:3001/jwt").then((response)=>{
      return response.json()
    }).then((result)=>{
      console.log(result)
      return setIdUser(result)
    }).catch(error => {
      console.error('No token', error);
    })
  },[idUser])
  
  return (
    <UidContext.Provider value={idUser}>
    <BrowserRouter>
    <div className="App" id='body'>
          <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<PageLogin />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/menu" element={<Menu />} /> 
          </Routes>     
    </div>
   
</BrowserRouter>
</UidContext.Provider>
  )
}

export default App