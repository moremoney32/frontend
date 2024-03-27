import "./footer.css"
import barMaise from "../../assets/icons/barMaise.svg"
import home from "../../assets/icons/home.svg"
import events from "../../assets/icons/events.svg"
import groups from "../../assets/icons/groups.svg"
export const Footer = ({change}) => {
      return (
        <div className="position-sticked">
        <div className="child-position-sticked">
              <img src={home} alt="" />

              <span>Accueil</span>
        </div>
        <div className="child-position-sticked">
              <img src={barMaise} alt="" />

              <span>Menu</span>
        </div>
        <div className="child-position-sticked">
              <img src={events} alt="" />

              <span>events</span>
        </div>
        <div className="child-position-sticked">
              <img src={groups} alt="" onClick={change}/>

              <span>Groups</span>
        </div>
  </div>
      );
};
