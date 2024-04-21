import "./header.css"
import chatter from "../../icons/chatter.svg"
import people from "../../icons/people.svg"
export const Header = ()=>{
    return(
        <>
        <div className="header-mobile"></div>
    <div className="parent-header">
        <div className="sous-parent-header">
            <img src={chatter} alt="" />
            <span>Racoont</span>
        </div>
        <img src={people} alt="" />
    </div>
    </>
    )
}