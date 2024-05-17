import "./header.css"
import chatter from "../../icons/chatter.svg"
import people from "../../icons/people.svg"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
//import axios from "axios"
export const HeaderMenu = ()=>{
    const [userInfos,setUserInfos] = useState(useSelector(state => state?.userInfos))
   /* const [userId,setUserId] = useState(null)
    useEffect(()=>{
        const fetchToken = async()=>{
          await axios({
            method:'get',
            url:"https://changes-social.onrender.com/jwt",
            withCredentials:true
          }).then((response)=>{
            if(response?.userId){
              fetch(`https://changes-social.onrender.com/api/infoinfocontrollers/${response?.userId}`).then((response)=>{
              return response.json()
          }).then((result)=>{
              return setUserInfos(result.data),setUserId(response?.data)
          })
          }
          }).catch((err)=>console.log("no token"))
        }
        fetchToken()
      },[userId])*/
      const userId = localStorage.getItem("dataUser")
    useEffect(()=>{
        if(userId){
            fetch(`https://changes-social.onrender.com/api/infoinfocontrollers/${userId}`).then((response)=>{
            return response.json()
        }).then((result)=>{
            return setUserInfos(result.data)
        })
        }

    },[userId])
   
   
    return(
    <div className="parent-header">
        <div className="sous-parent-header">
            <img src={chatter} alt="" />
            <em><span className="logo-hot">RIEN QUE LES HOTS</span></em>
        </div>
        <div className="parent-header-profile">
            <span className="user-profile">bienvenue:{userInfos?.name}</span>
            <img src={people} alt="" />
        </div>
       
    </div>
    )
}