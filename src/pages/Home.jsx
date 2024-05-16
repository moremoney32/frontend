import { Header } from "../components/header/Header"
import { Signup } from "../components/signup/Signup"
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

export const Home =()=>{
    const [idUser,setIdUser]= useState(null)
    const navigate = useNavigate();
    useEffect(()=>{
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
    },[idUser])
    if(idUser){
        return navigate("/profile")
    }
    return(
    <>
     <Header/>
     <Signup/>    
    </>
    )
}