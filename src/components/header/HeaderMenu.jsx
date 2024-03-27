import "./header.css"
import chatter from "../../icons/chatter.svg"
import people from "../../icons/people.svg"
import { useSelector } from "react-redux"
export const HeaderMenu = ()=>{
    const userInfos = useSelector(state => state.userInfos)
   
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