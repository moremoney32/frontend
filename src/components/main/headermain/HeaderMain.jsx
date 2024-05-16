import "./headermain.css"
import barMaise from "../../../assets/icons/barMaise.svg"
import maise from "../../../assets/icons/maise.svg"
import left from "../../../assets/icons/left.svg"
import right from "../../../assets/icons/right.svg"
import search from "../../../assets/icons/search.svg"
import notification from "../../../assets/icons/notification.svg"
import messages from "../../../assets/icons/messages.svg"
import { useEffect, useState } from "react";
import { HeaderMainMobile } from "./HeaderMainMobile"
import { useSelector } from "react-redux"
import axios from "axios"

export const HeaderMain = ({handle})=>{
  const [userInfos,setUserInfos] = useState(useSelector(state => state?.userInfos))
  const [userId,setUserId] = useState(null)
  useEffect(()=>{
      const fetchToken = async()=>{
        await axios({
          method:'get',
          url:"https://changes-social.onrender.com/jwt",
          withCredentials:true
        }).then((resolve)=>{
         // setUserId(response?.data)
          if(resolve.userId){
            fetch(`https://changes-social.onrender.com/api/infoinfocontrollers/${resolve.userId}`).then((response)=>{
            return response.json()
        }).then((result)=>{
            return setUserInfos(result.data), setUserId(resolve.userId)
        })
        }
        }).catch((err)=>console.log("no token"))
      }
      fetchToken()
    },[userId])
 /* useEffect(()=>{
      if(userId){
          fetch(`https://changes-social.onrender.com/api/infoinfocontrollers/${userId}`).then((response)=>{
          return response.json()
      }).then((result)=>{
          return setUserInfos(result.data)
      })
      }

  },[userId])*/
    return(
    <>
    <HeaderMainMobile handleClick={handle}/>
        <main id="main">
                <div className="main-left">
                    <div className="main-left-header">
                        <div className="sous-bloc-main-left-header">
                           <img src={maise} alt="" />
                            <span>Maise</span>
                        </div>
                        <img src={barMaise} alt="" className="bar-maise"/>
                    </div>
                </div>
                <div className="main-right">
                    <div className="main-right-center">
                        <div className="main-right-center1">
                            <img src={left} alt="" />
                            <span>|</span>
                           <img src={right} alt="" />
                        </div>
                        <div className="main-right-center2">
                            <input type="text"  placeholder="Type to search ..."/>
                            <img src={search} alt="" />
                            
                        </div>   
                    </div>
                    <div className="main-right-right">
                        <div className="notification">
                            <img src={notification} alt="" />
                            <span>Notifications</span>
                        </div>
                        <div className="notification">
                        <img src={messages} alt="" />
                            <span>Messages</span>
                        </div>
                        <div className="profil">
                        <img src={userInfos.picture} alt="" />
                        </div>
                    </div>
                </div> 
        </main>
    </>
    )
}