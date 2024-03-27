import "./centermain.css";
import plus from "../../../assets/icons/plus.svg";
import feed from "../../../assets/icons/feed.svg";
import music from "../../../assets/icons/music.svg";
import cinema from "../../../assets/icons/cinema.svg";
import suspension from "../../../assets/icons/suspension.svg";
import events from "../../../assets/icons/events.svg";
import messages from "../../../assets/icons/messages.svg";
import close from "../../../assets/icons/close.svg";
import alarms from "../../../assets/icons/alarms.svg";
import calendar from "../../../assets/icons/calendar.svg";
import down from "../../../assets/icons/down.svg";
import pictures from "../../../assets/icons/pictures.svg";
import camera from "../../../assets/icons/camera.svg";
import basket from "../../../assets/images/basket.jpg";
import eunice from "../../../assets/images/eunice.jpg";
import gabbi from "../../../assets/images/gabbi.jpg";
import chatter from "../../../assets/icons/chatter.svg";
import nathalie from "../../../assets/images/nathalie.jpg";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { emogisArray } from "../../../helpers/emogis";
import { setPostData } from "../../../appRedux/features/allPostSlice";
import { formatTime } from "../../../helpers/formatTime";
import { DisplayPosts } from "../../displayposts/DisplayPosts";
export const CenterMain = () => {
      const [visible, setVisible] = useState(false);
      const [background, setBackground] = useState(false);
      const [checkPost, setCheckPost] = useState(false);
      const [postDonnes, setPostDonnes] = useState(false);
      const [file, setFile] = useState(null);
      const [emogis, setEmogis] = useState(false);
      const [postDatas, setPostDatas] = useState(useSelector(state => state.allPostDatas.allPostData));
      const [selectedStickers, setSelectedStickers] = useState([]);
      const [inputValue, setInputValue] = useState("");
      const userInfos = useSelector((state) => state?.userInfos);
      let [firstIndexData, setFirstIndexData] = useState(0);
      const [lastIndexData, setLastIndexData] = useState(3);
      const inputText = document.querySelector("#post-input-input");
      const dispatch = useDispatch();
      const limiteObservationRef = useRef(null)
      
     
      useEffect(() => {
            fetch("https://changes-social.onrender.com/api/allpost")
            .then((response) => {
                  return response.json();
            })
            .then((result) => {
                  console.log(result);
                  
                        dispatch(setPostData(result))
                        setPostDatas(result.allPostData) 
                                 
            });
            console.log(postDatas)
      }, [dispatch]);
       const allPostData = useSelector(state => state.allPostDatas.allPostData);
      console.log(allPostData)
      console.log(postDatas)
     
      /******debut de l intersection observer */
      /*const loadMorePosts = (entries) => {
            const dataNumber = 3
            
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Load more posts here
                    console.log("Load more posts");
                    console.log(postDatas)
                    console.log(firstIndexData)
                    if(firstIndexData+dataNumber<postDatas?.length) {
                        console.log(true)
                        firstIndexData +=dataNumber 
                        console.log(firstIndexData)
                        let lastCurrentIndex = firstIndexData+dataNumber
                             setFirstIndexData(firstIndexData)
                             setLastIndexData(lastCurrentIndex)
                             console.log(lastCurrentIndex)  
              }
                }
            });
        };*/
     
      /*useEffect(()=>{
            const observer = new IntersectionObserver(loadMorePosts, {
                  root: null,
                  rootMargin: "0px",
                  threshold: 0.1,
              });
      
              if (limiteObservationRef.current) {
                  observer.observe(limiteObservationRef.current);
              }
      
              return () => {
                  if (limiteObservationRef.current) {
                      observer.unobserve(limiteObservationRef.current);
                  }
              };

      },[])
      
    
    
 /*****fin de intersection observer probleme de longueur du post***** */

  
      function allPost(){
            fetch("https://changes-social.onrender.com/api/allpost")
                  .then((response) => {
                        return response.json();
                  })
                  .then((result) => {
                        console.log(result.allPostData);
                        return (
                              dispatch(setPostData(result.allPostData)),
                              setPostDatas(result.allPostData)
                        );
                  });
      }
   

      //*********** */
      const handleClick = () => {
            setVisible(true);
            setBackground(true);
      };
      const masquePost = (e) => {
            setCheckPost(true);
            setPostDonnes(true);
      };
      const handleClickOutside = (event) => {
            // Cacher le bloc des catégories et le filtre lorsque l'utilisateur clique en dehors
            if (visible && !event.target.closest(".sous-section2-2")) {
                  setVisible(false);
                  setBackground(false);
                  setEmogis(false);
            }
      };
      const handleClickOutsidePost = (event) => {
            // Cacher le bloc des catégories et le filtre lorsque l'utilisateur clique en dehors
            if (emogis && !event.target.closest(".parent-emogis")) {
                  setEmogis(false);
            }
      };
      const closePost = () => {
            setCheckPost(false);
            setPostDonnes(false);
            setEmogis(false);
            setFile(false);
      };
      const displayEmogis = () => {
            setEmogis(true);
      };
      const handlePictureChange = (e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
                  const TypesImages = ["image/jpeg", "image/png", "image/jpg"];
                  if (TypesImages.includes(selectedFile.type)) {
                        console.log(selectedFile);
                        setFile(selectedFile);
                  } else {
                        alert(
                              "Veuillez sélectionner un fichier au format .jpg, .jpeg ou .png."
                        );
                  }
            }
      };
      const styles = {
            display: "none",
      };
      const handleStickerClick = (sticker) => {
            //setSelectedStickers([...selectedStickers, sticker]);
            setInputValue((prevValue) => prevValue + sticker);
      };

      const handleInputChange = (e) => {
            setInputValue(e.target.value);
            setEmogis(false);
      };
      const handlePost = async () => {
            if (file || inputText.value) {
                  console.log(file);
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("postId", userInfos._id);
                  formData.append("message", inputText.value);
                  formData.append("photoProfil", userInfos.picture);
                  formData.append("name", userInfos.name);
                  try {
                        const response = await fetch(
                              "https://changes-social.onrender.com/api/postuser",
                              {
                                    method: "POST",
                                    body: formData,
                              }
                        );
                        if (!response.ok) {
                              throw new Error("echec du telechargement");
                        }
                        const data = await response.json();
                        console.log("post reussi:", data);
                        if (data.message === "Publication réussie") {
                              
                                    alert("post reussi")
                                    setPostDonnes(false)
                                    setCheckPost(false)
                                    allPost()
                              
                             
                        } else if (
                              data.message === "Publication réussie sans photo"
                        ) {
                              return (
                                    alert("post reussi"),
                                    setPostDonnes(false),
                                    setCheckPost(false),
                                    allPost()     
                              )
                        }
                  } catch (error) {
                        console.error(
                              "error lors du telechargement:",
                              error.message
                        );
                        alert("photo trop lourde veuillez changer  d image");
                  }
            } else {
                  alert("Vous n avez rien poste.");
            }
      };
      return (
            <>
                  {postDonnes && (
                        <div
                              className="posts-donnees"
                              onClick={handleClickOutsidePost}
                        >
                              <div className="sous-posts-donnees">
                                    <div className="post-infos">
                                          <div className="post-infos-img">
                                                <img
                                                      src={userInfos.picture}
                                                      alt="objectProfile.image"
                                                />

                                                <div className="sous-post-infos-img">
                                                      <div className="sous-post-infos-img-name">
                                                            <span>
                                                                  {
                                                                        userInfos.name
                                                                  }
                                                            </span>
                                                            <img
                                                                  src={down}
                                                                  alt="down"
                                                            />
                                                      </div>
                                                      <span className="Visibilite">
                                                            Visibilite:tout le
                                                            monde
                                                      </span>
                                                </div>
                                          </div>
                                          <img
                                                src={close}
                                                alt="close"
                                                className="close"
                                                onClick={closePost}
                                          />
                                    </div>
                                    <div className="post-input">
                                          <input
                                                type="text"
                                                name="postValue"
                                                placeholder="Que souhaitez vous postez"
                                                id="post-input-input"
                                                value={inputValue}
                                                onChange={handleInputChange}
                                          />
                                    </div>
                                    <div className="post-emoticone">
                                          {file && (
                                                <img
                                                      src={URL.createObjectURL(
                                                            file
                                                      )}
                                                      alt=""
                                                />
                                          )}
                                          {emogis && (
                                                <div className="parent-emogis">
                                                      {emogisArray.map(
                                                            (icone, index) => {
                                                                  return (
                                                                        <span
                                                                              key={
                                                                                    index
                                                                              }
                                                                              onClick={() =>
                                                                                    handleStickerClick(
                                                                                          icone
                                                                                    )
                                                                              }
                                                                        >
                                                                              {
                                                                                    icone
                                                                              }
                                                                        </span>
                                                                  );
                                                            }
                                                      )}
                                                </div>
                                          )}
                                          <span
                                                className="emogis-click"
                                                onClick={displayEmogis}
                                          >
                                                🙂
                                          </span>
                                    </div>
                                    <div className="all-video-pictures">
                                          <div className="sous-all-video-pictures img-pictures">
                                                <span className="sous-all-video-pictures-span ">
                                                      Ajouter une photo
                                                </span>
                                                <input
                                                      type="file"
                                                      id="update-picture-input"
                                                      accept=".jpg,.jpeg,.png"
                                                      name="file"
                                                      onChange={
                                                            handlePictureChange
                                                      }
                                                />
                                                <img
                                                      src={pictures}
                                                      alt="pictures"
                                                      id="update-picture"
                                                />
                                          </div>

                                          <div className="sous-all-video-pictures imgvideo">
                                                <span className="sous-all-video-pictures-span">
                                                      Ajouter une video
                                                </span>
                                                <input
                                                      type="file"
                                                      id="update-picture-video"
                                                      style={styles}
                                                />
                                                <img
                                                      src={camera}
                                                      alt="camera"
                                                      id="update-video"
                                                />
                                          </div>

                                          <div className="sous-all-video-pictures imgvideo img-pictures">
                                                <span className="sous-all-video-pictures-span">
                                                      {" "}
                                                      un calendrier
                                                </span>
                                                <img
                                                      src={calendar}
                                                      alt="calendar"
                                                />
                                          </div>

                                          <div className="sous-all-video-pictures imgvideo  img-pictures">
                                                <span className="sous-all-video-pictures-span">
                                                      Ajouter encore
                                                </span>
                                                <img
                                                      src={suspension}
                                                      alt="suspension"
                                                />
                                          </div>
                                    </div>
                              </div>
                              <div className="post-information">
                                    <div className="alarm-post">
                                          <img src={alarms} alt="alarms" />

                                          {file ||
                                          inputText?.value?.length > 0 ? (
                                                <span
                                                      className="publier  postPublier"
                                                      onClick={handlePost}
                                                >
                                                      publier
                                                </span>
                                          ) : (
                                                <span className="publier">
                                                      publier
                                                </span>
                                          )}
                                    </div>
                              </div>
                        </div>
                  )}

                  <div className={checkPost ? "masque" : ""}></div>
                  <div
                        className={`section2 ${
                              background ? "black-mobile-commande-right" : ""
                        }`}
                        onClick={handleClickOutside}
                  >
                        <div className="sous-section2-1">
                              <div className="sous-section2-1-input">
                                    <input
                                          type="text"
                                          placeholder="Check Post"
                                          id="sous-section2-1-input-input"
                                          onClick={masquePost}
                                    />
                                    <img
                                          src={userInfos.picture}
                                          alt="photoprofile"
                                          className="photoprofile"
                                    />
                                    <img
                                          src={music}
                                          alt="music"
                                          className="music-video-birthay"
                                    />
                                    <img
                                          src={events}
                                          alt="events"
                                          className="eventClick"
                                          onClick={handleClick}
                                    />
                              </div>
                              <DisplayPosts newPostDatas ={postDatas} firstData={firstIndexData} lastData ={lastIndexData}/>
                             
                        </div>
                        <div
                              className={`sous-section2-2 ${
                                    visible ? "visible-right" : ""
                              }`}
                        >
                              <div className="sous-section2-2-1">
                                    <div className="sous-section2-upcoming">
                                          <span className="sous-section2-upcoming-span">
                                                Upcoming Events
                                          </span>
                                          <div className="sous-section2-upcoming-img">
                                                <img src={plus} alt="plus" />
                                          </div>
                                    </div>
                                    <div className="sous-section2-2-2">
                                          <div className="sous-section2-2-2-bloc">
                                                <div className="sous-section2-2-2-bloc-icons">
                                                      <img
                                                            src={feed}
                                                            alt="feed"
                                                      />

                                                      <span>Apple Keymote</span>
                                                </div>
                                                <span className="sous-section2-2-2-bloc-icons-span">
                                                      Monday,Aug 3,10:00 AM
                                                </span>
                                          </div>
                                          <div className="sous-section2-2-2-bloc">
                                                <div className="sous-section2-2-2-bloc-icons">
                                                      <img
                                                            src={music}
                                                            alt="music"
                                                      />

                                                      <span>
                                                            30 Second to Mars
                                                      </span>
                                                </div>
                                                <span className="sous-section2-2-2-bloc-icons-span">
                                                      Monday,Aug 3,1:00 PM
                                                </span>
                                          </div>
                                          <div className="sous-section2-2-2-bloc">
                                                <div className="sous-section2-2-2-bloc-icons">
                                                      <img
                                                            src={cinema}
                                                            alt="cinema"
                                                      />

                                                      <span>
                                                            Captain Marvel
                                                            Premiere
                                                      </span>
                                                </div>
                                                <span className="sous-section2-2-2-bloc-icons-span">
                                                      Tuesday,Aug 4,9:00 AM
                                                </span>
                                          </div>
                                          <div className="sous-section2-2-2-bloc">
                                                <div className="sous-section2-2-2-bloc-icons">
                                                      <img
                                                            src={feed}
                                                            alt="feed"
                                                      />

                                                      <span>
                                                            UX Design Course
                                                      </span>
                                                </div>
                                                <span className="sous-section2-2-2-bloc-icons-span">
                                                      Friday,Aug 7,11:00 AM
                                                </span>
                                          </div>
                                          <div className="sous-section2-2-2-bloc">
                                                <div className="sous-section2-2-2-bloc-icons">
                                                      <img
                                                            src={feed}
                                                            alt="feed"
                                                      />
                                                      <span>
                                                            UX Design Course
                                                      </span>
                                                </div>
                                                <span className="sous-section2-2-2-bloc-icons-span">
                                                      Friday,Aug 7,11:00 AM
                                                </span>
                                          </div>
                                    </div>
                              </div>
                              <div className="sous-section2-2-1">
                                    <div className="sous-section2-upcoming">
                                          <span class="sous-section2-upcoming-span">
                                                Advertising
                                          </span>

                                          <img src={close} alt="close" />
                                    </div>
                                    <div className="sous-section2-2-2">
                                          <img
                                                src={basket}
                                                alt="basket"
                                                className="basket"
                                          />

                                          <span className="special">
                                                Special offer:20% off today
                                          </span>
                                          <span className="lien-nike">
                                                htpp://nike.com
                                          </span>
                                          <span className="sous-section2-2-2-span">
                                                excepteur sim,carridar concetat
                                          </span>
                                          <span className="sous-section2-2-2-span">
                                                pront, sunt in culpa key officia
                                          </span>
                                          <span className="sous-section2-2-2-span">
                                                desert molit anim id est labor.
                                          </span>
                                    </div>
                              </div>
                              <div className="sous-section2-2-1">
                                    <div className="sous-section2-upcoming">
                                          <span className="sous-section2-upcoming-span">
                                                Birthays in August
                                          </span>
                                    </div>
                                    <div className="sous-section2-2-2">
                                          <span>August 4</span>
                                          <div className="parent-profil-user-site">
                                                <div className="profil-user-site">
                                                      <img
                                                            src={eunice}
                                                            alt="eunice"
                                                            className="profil-user-site-img"
                                                      />

                                                      <div className="profil-user-site-span">
                                                            <span className="profil-user-site-span1">
                                                                  Title Benson
                                                            </span>
                                                            <span className="profil-user-site-span2">
                                                                  Turning 24
                                                                  years old
                                                            </span>
                                                      </div>
                                                </div>
                                                <img
                                                      src={chatter}
                                                      alt="chatter"
                                                      className="profil-user-icons-sites"
                                                />
                                          </div>
                                          <div className="parent-profil-user-site">
                                                <div className="profil-user-site">
                                                      <img
                                                            src={nathalie}
                                                            alt="nathalie"
                                                            class="profil-user-site-img"
                                                      />

                                                      <div class="profil-user-site-span">
                                                            <span class="profil-user-site-span1">
                                                                  Cynthia Henry
                                                            </span>
                                                            <span class="profil-user-site-span2">
                                                                  Turning 25
                                                                  years old
                                                            </span>
                                                      </div>
                                                </div>
                                                <img
                                                      src={chatter}
                                                      alt="chatter"
                                                      class="profil-user-icons-sites"
                                                />
                                          </div>
                                          <div class="parent-profil-user-site">
                                                <div class="profil-user-site">
                                                      <img
                                                            src={gabbi}
                                                            alt="gabbi"
                                                            class="profil-user-site-img"
                                                      />

                                                      <div class="profil-user-site-span">
                                                            <span class="profil-user-site-span1">
                                                                  Synphonix
                                                                  marcel
                                                            </span>
                                                            <span class="profil-user-site-span2">
                                                                  Turning 28
                                                                  years old
                                                            </span>
                                                      </div>
                                                </div>
                                                <img
                                                      src={chatter}
                                                      alt="chatter"
                                                      class="profil-user-icons-sites"
                                                />
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      );
};
