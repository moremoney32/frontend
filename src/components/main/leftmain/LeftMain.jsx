
import notification from "../../../assets/icons/notification.svg";
import messages from "../../../assets/icons/messages.svg";
import people from "../../../assets/icons/people.svg";
import feeds from "../../../assets/icons/feeds.svg";
import profile from "../../../assets/icons/profile.svg";
import down from "../../../assets/icons/down.svg";
import pages from "../../../assets/icons/pages.svg";
import events from "../../../assets/icons/events.svg";
import bag from "../../../assets/icons/bag.svg";
import groups from "../../../assets/icons/groups.svg";
import saved from "../../../assets/icons/saved.svg";
import recommendations from "../../../assets/icons/recommendations.svg";
import memories from "../../../assets/icons/memories.svg";
import "./leftmain.css";
export const LeftMain = ({visible}) => {
      return (
            <div className={`section-left ${visible?"visible-left-main":""}`}>
                  <div className="sous-section1">
                        <span>Main Menu</span>
                        <img src={down} alt="down" />
                  </div>
                  <div className="sous-section2">
                        <div>
                              <img src={notification} alt="" />
                              <span className="sous-section-div-span">
                                    Notifications
                              </span>
                        </div>
                        <span className="sous-section-span">2</span>
                  </div>
                  <div className="sous-section2">
                        <div>
                              <img src={messages} alt="mail" />
                              <span className="sous-section-div-span">
                                    Messages
                              </span>
                        </div>
                        <span className="sous-section-span">1</span>
                  </div>
                  <div className="sous-section2">
                        <div>
                              <img src={people} alt="people" />
                              <span className="sous-section-div-span">People</span>
                        </div>
                  </div>
                  <div className="sous-section2">
                        <div>
                              <img src={feeds} alt="feeds" />
                              <span className="sous-section-div-span">Feed</span>
                        </div>
                  </div>
                  <div className="sous-section2">
                        <div>
                              <img src={profile} alt="profile" />
                              <span className="sous-section-div-span">Profile</span>
                        </div>
                  </div>
                  <div className="sous-section1">
                        <span>Explore</span>
                        <img src={down} alt="down" />
                  </div>
                  <div className="sous-section2">
                        <div>
                              <img src={pages} alt="" />
                              <span className="sous-section-div-span">Pages</span>
                        </div>
                  </div>
                  <div className="sous-section2">
                        <div>
                              <img src={events} alt="events" />
                              <span className="sous-section-div-span">Events</span>
                        </div>
                  </div>
                  <div className="sous-section2">
                        <div>
                              <img src={bag} alt="bag" />
                              <span className="sous-section-div-span">Jobs</span>
                        </div>
                  </div>
                  <div className="sous-section2">
                        <div>
                              <img src={groups} alt="groups" />
                              <span className="sous-section-div-span">Groups</span>
                        </div>
                  </div>
                  <div className="sous-section2">
                        <div>
                              <img src={saved} alt="saved" />
                              <span className="sous-section-div-span">Saved</span>
                        </div>
                  </div>
                  <div className="sous-section2">
                        <div>
                              <img
                                    src={recommendations}
                                    alt="recommendations"
                              />
                              <span className="sous-section-div-span">
                                    Recommendations
                              </span>
                        </div>
                  </div>
                  <div className="sous-section2">
                        <div>
                              <img src={memories} alt="memories" />
                              <span className="sous-section-div-span">
                                    Memories
                              </span>
                        </div>
                  </div>
            </div>
      );
};
