import { formatTime } from "../../helpers/formatTime";
import suspension from "../../assets/icons/suspension.svg"
import down from "../../assets/icons/down.svg"
import close from "../../assets/icons/close.svg"
import hearth from "../../assets/icons/hearth.svg"
import right from "../../assets/icons/right.svg"
import messages from "../../assets/icons/messages.svg"
import nathalie from "../../assets/images/nathalie.jpg";
import emogis from "../../assets/images/emogis.jpg"
import eunice from "../../assets/images/eunice.jpg";
import gabbi from "../../assets/images/gabbi.jpg";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const DisplayPosts =({newPostDatas,firstData,lastData})=>{
    console.log(newPostDatas)
    const [comments, setComments] = useState(false)
    const [userName, setUserName] = useState(null)
    const [imgProfil, setImgProfil] = useState(null)
    const [description, setDescription] = useState(null)
    const [postImage, setPostImage] = useState(null)
    const [heure, setHeure] = useState(null)
    const data = useSelector((state) => state?.allPostDatas.allPostData)
    console.log(data)
    const messagesComments =(e)=>{
        setComments(true)
        console.log(e.target.dataset.id)
        const parent =  e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstElementChild.src
        const description = e.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.textContent
        const profil = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.src
        const postPublier =  e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstElementChild.src
        const speudoName = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.lastElementChild.firstElementChild.textContent
        const heure = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.lastElementChild.lastElementChild.textContent
        setUserName(speudoName)
        setHeure (heure)
        setImgProfil(profil)
        setDescription(description)
        setPostImage(postPublier)
    }
    const closeIcons =()=>{
      setComments(false)

    }
    return(
        <>
        <div  className={` ${comments?"masqueComment":""}`}></div>
         {/****debut commentaire */}
        {comments &&<div id="page-comment">
            <div id="header-comment">
            <p>Publication de {userName}</p>
            <img src={close} alt="close.svg" className="close-comment" onClick ={closeIcons}/>
            </div>
            <div id="parent-main-comment">
                <div className="main-comment">
                  {/****debut maincommentaire */}
                  <div class = "sous-section2-1-2-sous-parent">
    <div class="sous-section2-1-2-child1">
    <div class="sous-section2-1-2-child1-header-title">
      <img src={imgProfil} alt="info.profil" />
        
        <div class="sous-section2-1-2-child1-header-title-span">
            <span  class="sous-section2-1-2-child1-header-title-span1">{userName}</span>
            <span  class="sous-section2-1-2-child1-header-title-span3">{heure}</span>
        </div>
    </div>
    <img src={suspension} alt="suspension.svg" />
    
 </div>
 <div class="sous-section2-1-2-child2">
   
    <div class="sous-section2-1-2-child2-emogis">
        <span>{description}</span>
    </div>
 </div>
 <div class="sous-section2-1-2-child3">
      <img src={postImage} alt="info.imagePost" />
 
 </div>
 <div class="sous-section2-1-2-child4">
   <div class="sous-section2-1-2-child4-img">
      <img src={gabbi} alt="gabbi.jpg" />
      <img src={nathalie} alt="nathalie.jpg" />
      <img src={eunice} alt="eunice.jpg" />
    
    <span>+ 245 Likes</span>
   </div>
   <div class="sous-section2-1-2-child4-icons">
        <div class="sous-section2-1-2-child4-sous-icons">
            <img src={hearth} alt="hearth.svg" />
           
            <span>Likes</span>
        </div>
        <div class="sous-section2-1-2-child4-sous-icons">
            <img src={messages} alt="messages.svg" class = "messages-comment"/>
            <span>8Comments</span>
        </div>
        <div class="sous-section2-1-2-child4-sous-icons">
            <img src={messages} alt="messages.svg" />
            <span>0Shares</span>
        </div>
   </div>
 
 </div>

 </div>
    
                  {/****fin main commentaire */}
                      
                </div>
                <div id="space-comment">
                    <div className="space-comment-header">
                        <span>Plus pertinent</span>
                        <img src={down} alt="down.svg" />
                        
                    </div>
                    <div className="parent-space-comment-main"></div>
                </div>
                
            </div>
            
                <div className="sous-section2-1-2-child5">
                <input type="text" placeholder="write comment" id= "inputComment"/>
                <img src={imgProfil} alt="objectProfile.image" class="franck2"/>
                <img src={emogis} alt="emogis" class="cinema-icons"/>
                <img src={right} alt="right" id="music-icons"/>
                        
                </div>
                <div id="textarea-comment"></div>
        </div>}
        {/****fin commentaire */}
        <div id="sous-section2-1-2">
             {/*{newPostDatas?.slice(firstData,lastData).map((post) => {*/}
        {newPostDatas.map((post) => {
                          return (
              <div className="sous-section2-1-2-sous-parent"    key={post._id}>
                    <div className="sous-section2-1-2-child1">
                          <div className="sous-section2-1-2-child1-header-title">
                                <img
                                      src={
                                            post.photoprofil
                                      }
                                      alt="profil"
                                />
                                <div className="sous-section2-1-2-child1-header-title-span">
                                      <span className="sous-section2-1-2-child1-header-title-span1">
                                            {
                                                  post.UserName
                                            }
                                            
                                      </span>
                                      <span className="sous-section2-1-2-child1-header-title-span3">
                                        Date et heure du post {formatTime(post?.timePost)?.date} a   {formatTime(post?.timePost)?.time}
                                      </span>
                                </div>
                          </div>
                          <img
                                src={suspension}
                                alt="suspension"
                          />
                    </div>

                    
                                <div
                                   
                                      className="postData"
                                >
                                      <div className="sous-section2-1-2-child2">
                                            <div className="sous-section2-1-2-child2-emogis">
                                                  <span>
                                                        {
                                                              post.message
                                                        }
                                                  </span>
                                            </div>
                                      </div>
                                      <div className="sous-section2-1-2-child3">
                                            <img
                                                  src={
                                                        post?.picture
                                                  }
                                                  alt="photoPublier"
                                            />
                                      </div>
                                      <div className="sous-section2-1-2-child4">
                                            <div className="sous-section2-1-2-child4-img">
                                                  <img
                                                        src={
                                                              nathalie
                                                        }
                                                        alt="gabbi"
                                                  />
                                                  <img
                                                        src={
                                                              gabbi
                                                        }
                                                        alt="gabbi"
                                                  />
                                                  <img
                                                        src={
                                                              eunice
                                                        }
                                                        alt="gabbi"
                                                  />
                                                  <img
                                                        src={
                                                              nathalie
                                                        }
                                                        alt="gabbi"
                                                  />

                                                  <span>
                                                        9
                                                  </span>
                                                  <span>
                                                        Likes
                                                  </span>
                                            </div>
                                            <div className="sous-section2-1-2-child4-icons">
                                                  <span>
                                                        9
                                                  </span>
                                                  <div className="sous-section2-1-2-child4-sous-icons">
                                                        <img
                                                              src={
                                                                    hearth
                                                              }
                                                              alt="hearth"
                                                        />

                                                        <span>
                                                              Likes
                                                        </span>
                                                  </div>
                                                  <div className="sous-section2-1-2-child4-sous-icons">
                                                        <img
                                                              src={
                                                                    messages
                                                              }
                                                              alt="messages"
                                                        onClick={messagesComments} data-id={post._id}/>

                                                        <span>
                                                              8Comments
                                                        </span>
                                                  </div>
                                                  <div className="sous-section2-1-2-child4-sous-icons">
                                                        <img
                                                              src={
                                                                    messages
                                                              }
                                                              alt="messages"
                                                        />
                                                        <span>
                                                              0Shares
                                                        </span>
                                                  </div>
                                            </div>
                                      </div>
                      
              </div>
                        </div>
                        );
                  })}
                  <div  id="limiteObservation"></div>
                  
        </div>
        </>
    )
}