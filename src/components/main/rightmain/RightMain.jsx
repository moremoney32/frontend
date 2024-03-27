import suspension from "../../../assets/icons/suspension.svg";
import homm1 from "../../../assets/images/homm1.jpg";
import femme1 from "../../../assets/images/femme1.jpg";
import femme2 from "../../../assets/images/femme2.jpg";
import femme3 from "../../../assets/images/femme3.jpg";
import femme4 from "../../../assets/images/femme4.jpg";
import basket from "../../../assets/images/basket.jpg";
import phoneinstagram from "../../../assets/images/phoneinstagram.PNG";
import "./rightmain.css";
export const RightMain = ({visibleGroups}) => {
      return (
            <div  className={`section3 ${visibleGroups ? 'visibleGroup' : ''}`}>
                  <div className="section3-1">
                        <div className="section3-information">
                              <span>Groups</span>
                              <img src={suspension} alt="suspension" />
                        </div>
                        <div className="section3-information-profil">
                              <img src={basket} alt="basket" />

                              <div className="section3-information-name">
                                    <span>Nike</span>
                                    <span>819K Subscribers</span>
                              </div>
                        </div>
                        <div className="section3-information-profil">
                              <img src={phoneinstagram} alt="phoneinstagram" />

                              <div className="section3-information-name">
                                    <span>Netflix</span>
                                    <span>5.2M Subscribers</span>
                              </div>
                        </div>
                  </div>
                  <div className="section3-2">
                        <div className="section3-information">
                              <span>Contact</span>
                              <img src={suspension} alt="suspension" />
                        </div>
                        <div className="section3-2-profil">
                              <div className="section3-2-profil-img">
                                    <img src={homm1} alt="homm1" />

                                    <span className="vert"></span>
                                    <span>Helena Thomton</span>
                              </div>
                              <span className="chiffre">(3)</span>
                        </div>
                        <div className="section3-2-profil">
                              <div className="section3-2-profil-img">
                                    <img src={femme1} alt="femme1" />

                                    <span className="vert"></span>
                                    <span>Adam Mendoza</span>
                              </div>
                        </div>
                        <div className="section3-2-profil">
                              <div className="section3-2-profil-img">
                                    <img src={femme4} alt="femme4" />

                                    <span>Phillip Kelly</span>
                              </div>
                        </div>
                        <div className="section3-2-profil">
                              <div className="section3-2-profil-img">
                                    <img src={femme3} alt="femme3" />

                                    <span className="orange"></span>
                                    <span>Mabelle Franck</span>
                              </div>
                        </div>
                        <div className="section3-2-profil">
                              <div className="section3-2-profil-img">
                                    <img src={femme1} alt="femme1" />

                                    <span>Title benson</span>
                              </div>
                              <span className="chiffre">(1)</span>
                        </div>
                        <div className="section3-2-profil">
                              <div className="section3-2-profil-img">
                                    <img src={femme4} alt="femme4" />

                                    <span>Mika mika</span>
                              </div>
                        </div>
                        <div className="section3-2-profil">
                              <div className="section3-2-profil-img">
                                    <img src={femme3} alt="femme3" />

                                    <span className="orange"></span>
                                    <span>Mabelle Franck</span>
                              </div>
                        </div>
                        <div className="section3-2-profil">
                              <div className="section3-2-profil-img">
                                    <img src={homm1} alt="homm1" />

                                    <span className="vert"></span>
                                    <span>Helena Thomton</span>
                              </div>
                              <span className="chiffre">(3)</span>
                        </div>
                        <div className="section3-2-profil">
                              <div className="section3-2-profil-img">
                                    <img src={femme2} alt="femme2" />

                                    <span>Phillip Kelly</span>
                              </div>
                        </div>
                        <div className="section3-2-profil">
                              <div className="section3-2-profil-img">
                                    <img src={homm1} alt="homm1" />

                                    <span className="vert"></span>
                                    <span>Helena Thomton</span>
                              </div>
                              <span className="chiffre">(3)</span>
                        </div>
                        <div className="section3-2-profil">
                              <div className="section3-2-profil-img">
                                    <img src={femme2} alt="femme2" />

                                    <span>Phillip Kelly</span>
                              </div>
                        </div>
                  </div>
                  <div className="section3-2">
                        <div className="section3-1">
                              <div className="section3-information">
                                    <span>Messages</span>
                                    <img src={suspension} alt="suspension" />
                              </div>
                              <div className="section3-information-profil">
                                    <img src={femme1} alt="femme1" />

                                    <div className="section3-information-name">
                                          <span>Title benson</span>
                                          <span>today 13h00pm</span>
                                    </div>
                              </div>
                              <div className="section3-information-profil">
                                    <img src={homm1} alt="homm1" />

                                    <div className="section3-information-name">
                                          <span>Helena Thomton</span>
                                          <span>Thursday,jun 31</span>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};
