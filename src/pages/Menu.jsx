
import { CenterMain } from "../components/main/centermain/CenterMain"
import { HeaderMain } from "../components/main/headermain/HeaderMain"
import { LeftMain } from "../components/main/leftmain/LeftMain"
import "../index.css"
import { Footer } from "../components/footer/Footer"
import { RightMain } from "../components/main/rightmain/RightMain"
import { useState } from "react";


export const Menu =()=>{
    const [visible,setVisible] = useState(false)
    const [visibleGroups,setVisibleGroups] = useState(false)
    const [background,setBackground] = useState(false)
    const handleClick = ()=>{
        setVisible(true)
        setBackground(true)
    }
    const handleGroup = ()=>{
        setVisibleGroups(true)
        setBackground(true)
    }
    const handleClickOutside = (event) => {
        // Cacher le bloc des catégories et le filtre lorsque l'utilisateur clique en dehors
        if ((visible && !event.target.closest('.section-left')) || (visibleGroups && !event.target.closest('.section3')) ) {
            setVisible(false)
            setVisibleGroups(false)
            setBackground(false)
        }
      };
     
    return(
        <>
    <div id="bloc-page-menu">
        <HeaderMain handle={handleClick}/> 
     <div id="section">
        <LeftMain visible = {visible}/>
        <div className={background ? "black-mobile-commande" : "black-center-main"} onClick={handleClickOutside}><CenterMain/></div>
        
        <RightMain  visibleGroups ={visibleGroups}/>
    </div>
     
        
    </div>
     <Footer change ={handleGroup} />
     </> 
    )
}