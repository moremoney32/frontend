import { useSelector } from "react-redux";
import barMaise from "../../../assets/icons/barMaise.svg";
import maise from "../../../assets/icons/maise.svg";
import messages from "../../../assets/icons/messages.svg";
export const HeaderMainMobile = ({handleClick}) => {
    const userInfos = useSelector(state => state?.userInfos)
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
