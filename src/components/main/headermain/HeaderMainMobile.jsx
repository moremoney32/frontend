import { useSelector } from "react-redux";
import barMaise from "../../../assets/icons/barMaise.svg";
import maise from "../../../assets/icons/maise.svg";
import messages from "../../../assets/icons/messages.svg";
import axios from "axios"
import { useEffect, useState } from "react";
export const HeaderMainMobile = ({handleClick}) => {
    const [userInfos,setUserInfos] = useState(useSelector(state => state?.userInfos))
    const[userId,setUserId] = useState(null)
  
    useEffect(()=>{
      const fetchToken = async()=>{
        await axios({
          method:'get',
          url:"http://localhost:3001/jwt",
          withCredentials:true
        }).then((response)=>{
          console.log(response)
          setUserId(response?.data)
        }).catch((err)=>console.log("no token"))
      }
      fetchToken()
    },[userId])
   
  
    useEffect(() => {
      if(userId){
        fetch(`http://localhost:3001/api/infoinfocontrollers/${userId}`).then((response) => {
          return response.json()
        }).then((result) => {
          console.log(result.data)
          return dispatch(setUser(result.data)), setUserInfos(result.data)
        })
      }
      
    }, [userId])
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
