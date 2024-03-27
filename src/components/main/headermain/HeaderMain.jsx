import "./headermain.css"
import barMaise from "../../../assets/icons/barMaise.svg"
import maise from "../../../assets/icons/maise.svg"
import left from "../../../assets/icons/left.svg"
import right from "../../../assets/icons/right.svg"
import search from "../../../assets/icons/search.svg"
import notification from "../../../assets/icons/notification.svg"
import messages from "../../../assets/icons/messages.svg"
import basket from "../../../assets/images/basket.jpg"
import { HeaderMainMobile } from "./HeaderMainMobile"
import { useSelector } from "react-redux"

export const HeaderMain = ({handle})=>{
    const userInfos = useSelector(state => state?.userInfos)
    console.log(userInfos)
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