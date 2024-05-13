import "./header.css"
import chatter from "../../icons/chatter.svg"
import people from "../../icons/people.svg"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
export const HeaderMenu = ()=>{
    const [userInfos,setUserInfos] = useState(useSelector(state => state?.userInfos))
    const userId = localStorage.getItem("id")
    useEffect(()=>{
        fetch(`http://localhost:3001/api/infoinfocontrollers/${userId}`).then((response)=>{
            return response.json()
        }).then((result)=>{
            console.log(result.data)
            return setUserInfos(result.data)
        })

    },[])
   
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