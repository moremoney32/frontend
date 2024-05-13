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
import {  useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { emogisArray } from "../../helpers/emogis";
import axios from "axios";

export const DisplayPosts =({newPostDatas,firstData,lastData})=>{
    const [comments, setComments] = useState(false)
    const [userName, setUserName] = useState(null)
    const [imgProfil, setImgProfil] = useState(null)
    const [description, setDescription] = useState(null)
    const [postImage, setPostImage] = useState(null)
    const [heure, setHeure] = useState(null)
    const [emogiStickers, setEmogiStickers] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [userId,setUserId] = useState(null)
    const [firstIndexComments, setFirstIndexComments] = useState(0);
      const [lastIndexComments, setLastIndexComments] = useState(1);
    const [userInfos,setUserInfos] = useState(useSelector(state => state?.userInfos))
    const[id,setId] = useState(null)
    const dataInput = useRef(null)
    const [postDatas, setPostDatas] = useState(useSelector(state => state.allPostDatas.allPostData));
    const containUseref = useRef(null)
    
    const postNewData = newPostDatas.slice().reverse()
    const messagesComments =(e)=>{
        setComments(true)
        console.log(e.target.dataset.id)
        setId(e.target.dataset.id)
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
        fetch("http://localhost:3001/api/allpost")
                  .then((response) => {
                        return response.json();
                  })
                  .then((result) => {
                       
                       console.log(result)
                             setPostDatas(result.allPostData)
                  });
    }
    useEffect(()=>{
      const fetchToken = async()=>{
        await axios({
          method:'get',
          url:"http://localhost:3001/jwt",
          withCredentials:true
        }).then((response)=>{
          setUserId(response?.data)
        }).catch((err)=>console.log("no token"))
      }
      fetchToken()
    },[userId])
    console.log(userId)
useEffect(()=>{
  if(userId){
        fetch(`http://localhost:3001/api/infoinfocontrollers/${userId}`).then((response)=>{
        return response.json()
    }).then((result)=>{
        return setUserInfos(result.data)
    })
    }

},[userId])
  
    const closeIcons =()=>{
      setComments(false)

    }
    const handleStickerClick = (sticker) => {
      setInputValue((prevValue) => prevValue + sticker);
};
    const displayEmogis = () => {
      setEmogiStickers(true);
};
const handleInputChange = (e) => {
      setInputValue(e.target.value);
      setEmogiStickers(false);
};
const handleClickOutsidePost = (event) => {
      // Cacher le bloc des catégories et le filtre lorsque l'utilisateur clique en dehors
      if (emogiStickers && !event.target.closest(".parent-emogis")) {
            setEmogiStickers(false);
      }
};
console.log(userInfos.picture)
const  sendCommentData = async(e) =>{
      console.log(dataInput.current.value)
      const commentData ={
      commentId: userId,
      commenterPseudo:userInfos.name,
      commentText:dataInput.current.value, 
      photoprofilcomment:userInfos.picture
      }
      console.log(commentData)
        
            try {
              const response = await fetch(`http://localhost:3001/api/comment/${id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData)
              });
              if (!response.ok) {
                throw new Error('echec de l envoi');
              }
              const data = await response.json();
              console.log(data);
              if (data.message === " nouveau commentaire ajoute avec succes") {
                  fetch("http://localhost:3001/api/allpost")
                  .then((response) => {
                        return response.json();
                  })
                  .then((result) => {
                       
                       console.log(result)
                             setPostDatas(result.allPostData)
                             alert("commentaire envoyé")
                  });
               
              }
        
            } catch (error) {
              //console.error('echec de la mise a jour:', error.message);
        
            }
          //}
      
}
/****intersection observer comments */

function intersectionCommentsObserver (){
      const option = {
            root:null,
            rootMargin:"0px",
            threshold:1.0
      }
      const contenairComments = containUseref.current
      const observer = new IntersectionObserver((entries)=>{
       entries.forEach((entry)=>{
             if(entry.isIntersecting){
                  console.log("true")
                        setLastIndexComments((prevLots) => prevLots + 1);        
             }
             return;
            
             
       })
      },option);
      if(contenairComments){
       observer.observe(contenairComments)
      }
      return () =>{
       if(contenairComments){
             observer.unobserve(contenairComments)
            }
      }
}

useEffect(() => {
      intersectionCommentsObserver() 
    }, [ containUseref.current]);
/***fin intersction observer comments */
const objectComment = postDatas?.find((comment)=>comment._id === id)
console.log(objectComment)

const datasComment = objectComment?.comments.slice().reverse()
console.log(datasComment)
   
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
      <img src={postImage} alt="" />
 
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
                    <div className="updateComments">
                    {
                         
                        datasComment?.slice(firstIndexComments,lastIndexComments).map((data)=>{
                              return(
                        <div className="parent-space-comment-main" key={data.uniqueCommentId}>
                        
                              <div class="space-comment-main">
                                    <img src={data.photoprofilcomment} alt=""/>
                                    <div class="contain-comment">
                                          <span class="contain-comment-name">{data.commenterPseudo}</span>
                                          <span class="contain-comment-message">{data.commentText}</span>
                                    </div>
                              </div>
                              <div class="space-comment-footer">
                                    <span>time</span>
                                    <span>j aime</span>
                                    <span>Repondre</span>
                              </div> 
                        
                        </div>
                   
                              )

                        })
                        
                    }
                    <div className="obsevation" ref={containUseref}>.......</div>
                     </div>
                     
                    
                    
                </div>
                
            </div>
            
                <div className="sous-section2-1-2-child5">
                <input type="text" placeholder="write comment" id= "inputComment" value={inputValue} ref={dataInput}  onChange={handleInputChange}/>
                <img src={imgProfil} alt="objectProfile.image" class="franck2"/>
                <img src={emogis} alt="emogis" class="cinema-icons" onClick={displayEmogis}/>
                <img src={right} alt="right" id="music-icons" onClick={sendCommentData}/>
                        
                </div>
                {/*** debut emogis*/}
                <div className="control-emogiStickers" onClick={handleClickOutsidePost}>
                {emogiStickers && (
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
                </div>
                
                {/***fin emogis */}
        </div>}
        {/****fin commentaire */}
        <div id="sous-section2-1-2">
           
        {postNewData.slice(firstData,lastData).map((post) => {
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
                                                  alt=""
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
                  
                  
                 
        </div>
        </>
    )
}