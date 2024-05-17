import { Header } from "../components/header/Header"
import { Login } from "../components/login/Login"
import { useState,useEffect } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export const PageLogin = ()=>{
    const [idUser,setIdUser]= useState(null)
    const navigate = useNavigate();
   /* useEffect(()=>{
      const fetchToken = async()=>{
        await axios({
          method:'get',
          url:"https://changes-social.onrender.com/jwt",
          withCredentials:true
        }).then((response)=>{
          console.log(response)
         
          setIdUser(response.userId)
        }).catch((err)=>console.log("no token"))
  
      }
      fetchToken()
    },[idUser])*/
   
    return(
        <>
        <Header/>
        <Login/>
        </>
    )
}