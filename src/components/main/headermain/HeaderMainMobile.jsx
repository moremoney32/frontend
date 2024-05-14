import { useSelector } from "react-redux";
import barMaise from "../../../assets/icons/barMaise.svg";
import maise from "../../../assets/icons/maise.svg";
import messages from "../../../assets/icons/messages.svg";
import { useEffect, useState } from "react";
import axios from "axios"
export const HeaderMainMobile = ({handleClick}) => {
    const [userInfos,setUserInfos] = useState(useSelector(state => state?.userInfos))
    const [userId,setUserId] = useState(null)
    useEffect(()=>{
        const fetchToken = async()=>{
          await axios({
            method:'get',
            url:"https://changes-social.onrender.com/jwt",
            withCredentials:true
          }).then((response)=>{
            setUserId(response?.data)
          }).catch((err)=>console.log("no token"))
        }
        fetchToken()
      },[userId])
    useEffect(()=>{
        if(userId){
            fetch(`https://changes-social.onrender.com/api/infoinfocontrollers/${userId}`).then((response)=>{
            return response.json()
        }).then((result)=>{
            return setUserInfos(result.data)
        })
        }

    },[userId])
      return (
            <div id="main-mobile-header">
                  <div className="main-left-mobile">
                        <div className="sous-bloc-main-left-header">
                              <img src={maise} alt="" />
                              <span>Maise</span>
                        </div>
                        <img src={barMaise} alt="" className="bar-maise" onClick={handleClick}/>
                  </div>
                  <div className="main-right-mobile">
                    
                        <div className="main-right-mobile-left">
                            <input type="text"  placeholder="Type to search ..."/>
                        </div>   
                    <div className="main-right-mobile-right">
                        <div className="messages-mobile">
                            <img src={messages} alt="" />
                            <span>Messages</span>
                        </div>
                        <div className="profil-mobile">
                            <img src={userInfos.picture} alt="" />
                        </div>
                    </div>
                </div> 
            </div>
            
      );
};
