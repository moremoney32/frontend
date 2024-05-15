import { useSelector } from "react-redux"
import "./profilemenu.css"
import close from "../../icons/close.svg"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../appRedux/features/userSlice";
import { setUserData } from "../../appRedux/features/allUserSlice"
import { formatTime } from "../../helpers/formatTime";
import { NavLink } from "react-router-dom";
import axios from "axios"
import { fetchToken } from "../../helpers/fetchToken";


export const ProfileMenu = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [isEditable, setIsEditable] = useState(true);
  const [masque, setMasque] = useState(false);
  const [userInfos, setUserInfos] = useState(useSelector(state => state?.userInfos))
  const [etatFollowing, setEtatFollowing] = useState(false);
  const [etatFollowers, setEtatFollowers] = useState(false);
  const[userId,setUserId] = useState(null)
  const [lock, setLock] = useState(true);
  const [connect, setConnect] = useState(true);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    const fetchToken = async()=>{
      await axios({
        method:'get',
        url:"https://changes-social.onrender.com/jwt",
        withCredentials:true
      }).then((response)=>{
        //console.log(response)
        setUserId(response?.data)
      }).catch((err)=>console.log("no token"))
    }
    fetchToken()
  },[userId])
 
  console.log(userId)
  useEffect(() => {
    
    if(userId !== null){
      setLoading(false)
      fetchToken(`https://changes-social.onrender.com/api/infoinfocontrollers/${userId}`).then((result)=>{
        console.log(result.data)
        return dispatch(setUser(result.data)), setUserInfos(result.data)
      })
      /*fetch(`https://changes-social.onrender.com/api/infoinfocontrollers/${userId}`).then((response) => {
        return response.json()
      }).then((result) => {
        console.log(result.data)
        return dispatch(setUser(result.data)), setUserInfos(result.data)
      })*/
    }
    
  }, [userId])
  console.log(userInfos)
  const handleAllUsers = () => {
    setMasque(true)
    fetchToken("https://changes-social.onrender.com/api").then((result)=>{
        console.log(result)
        return dispatch(setUserData(result))
      })
    /*fetch("https://changes-social.onrender.com/api").then((response) => {
      return response.json()
    }).then((result) => {
      //console.log(result)
      return dispatch(setUserData(result))
    })*/
  }
  const allDatas = useSelector(state => state?.allUserDatas)
  //console.log(allDatas.allUserData)
  const handleChangeInput = (e) => {
   // console.log(e.target.value)
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  }
  const sendHandleBio = async () => {
    //console.log(inputValue)
    try {
      const response = await fetch(`https://changes-social.onrender.com/api/updateinfousers/${userInfos._id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputValue),
        credentials: "include"

      });
      if (!response.ok) {
        throw new Error('echec de l envoi');
      }
      const data = await response.json();
      //console.log(data);
      if (data.message === "mise a jour reussie") {
        alert("mise a jour reussie");
        setIsEditable(false);
        setIsValid(false);
      }

    } catch (error) {
      console.error('echec de la mise a jour:', error.message);

    }
  }
  const handleEditBio = () => {
    setIsEditable(true);
    setIsValid(true);
  };

  const handlePictureChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const TypesImages = ["image/jpeg", "image/png", "image/jpg"];
      if (TypesImages.includes(selectedFile.type)) {
        console.log(selectedFile)
        setFile(selectedFile);
      } else {
        alert("Veuillez sélectionner un fichier au format .jpg, .jpeg ou .png.");
      }
    }
  };

  const handlePictureUpload = async () => {
    if (file) {
      console.log(file)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userInfos._id);
      formData.append("name", userInfos.name);
      //console.log(formData)
      try {
        const response = await fetch('https://changes-social.onrender.com/api/upload', {
          method: 'POST',
          body: formData,
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error('echec du telechargement');
        }
        const data = await response.json();
        //console.log('telechargement reussi:', data);
        if (data.message === "Fichier téléchargé et utilisateur mis à jour avec succès") {
          alert("photo de profil enregistree")
        }

      } catch (error) {
        console.error('error lors du telechargement:', error.message);
        alert("photo trop lourde veuillez changer  d image")

      }
    } else {
      alert("Veuillez d'abord sélectionner une image.");
    }
  };
  const changesStatutFollow = async (e, userId) => {
    e.target.textContent = "Abonnements";
    let followingValue = { idToFollow: userId };

    try {
      const response = await fetch(`https://changes-social.onrender.com/api/follower/${userInfos._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(followingValue),
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error('echec de l envoi');
      }
      const data = await response.json();
      //console.log(data);
      if (data.message === "personne ajoute dans mes following") {
        alert("personne ajoute dans mes following");
      }

    } catch (error) {
      console.error('echec de la mise a jour:', error.message);

    }
  }
  const changesStatutFollowers = async (e, userId) => {
    e.target.textContent = "Abonnes";
    let followingValue = { idToFollow: userId };

    try {
      const response = await fetch(`https://changes-social.onrender.com/api/follower/${userInfos._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(followingValue),
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error('echec de l envoi');
      }
      const data = await response.json();
      //console.log(data);
      if (data.message === "personne ajoute dans mes following") {
        alert("personne ajoute dans mes following");
      }

    } catch (error) {
      console.error('echec de la mise a jour:', error.message);

    }
  }
  const closeArrayFollower = () => {
    //setClosse(false)
    fetchToken(`https://changes-social.onrender.com/api/infoinfocontrollers/${userInfos._id}`).then((result) =>{
      return dispatch(setUser(result.data)), setMasque(false), setEtatFollowing(false), setEtatFollowers(false), setUserInfos(result.data), console.log(userInfos)
    })
    /*fetch(`https://changes-social.onrender.com/api/infoinfocontrollers/${userInfos._id}`).then((response) => {
      return response.json()
    }).then((result) => {
      //console.log(result.data)
      return dispatch(setUser(result.data)), setMasque(false), setEtatFollowing(false), setEtatFollowers(false), setUserInfos(result.data), console.log(userInfos)
    })*/
  }
  const removeStatutFollow = async (e, userId) => {
    e.target.textContent = "Desabonnés";
    let followingValue = { idToUnfollow: userId };

    try {
      const response = await fetch(`https://changes-social.onrender.com/api/unfollower/${userInfos._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(followingValue),
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error('echec de l envoi');
      }
      const data = await response.json();
      //console.log(data);
      if (data.message === "Personne retirée de mes following") {
        alert("Personne retirée de mes following");
      }

    } catch (error) {
      console.error('echec de la mise a jour:', error.message);

    }
  }
  const handleEtatFollowing = () => {
    setMasque(true)
    setEtatFollowing(true)
  }
  const handleEtatFollowers = () => {
    setMasque(true)
    setEtatFollowers(true)
  }


  return (
    <>
    {loading?(<div>CHARGEMENT...........</div>):(
    <div className="profile-menu">
    {masque && <div id="masque"></div>}
    {/*div en absolute qui montre les propositions*/}
    {masque && <div id="proposition">
      <div className="sous-parent-proposition">
        <h5>Suivre</h5>
        {lock ?<img src={close} alt="" className="proposition-close" onClick={closeArrayFollower} />:<span className="proposition-closse">Patientez ...</span>}
      </div>
      <div className="check-following">
        {
          allDatas.allUserData.map((data) => (
            <div className="children-check-following" key={data._id}>
              <div className="children-check-following-left">
                <img src={data.picture} alt="" />
                <span>{data.name}</span>
              </div>
              <span
                className="children-check-following-right"
                data-id={data._id}
                onClick={(e) => {
                  if (!userInfos.following.includes(data._id)) {
                    changesStatutFollow(e, data._id);
                  }
                }}
              >
                {userInfos.following.includes(data._id) ? 'Abonnements' : 'Suggestions'}
              </span>
            </div>
          ))

        }
      </div>

    </div>}
    <h1 className="profile-menu-h1">Profil de {userInfos?.name}</h1>
    <div className="left-navbar">
      <span onClick={handleAllUsers} className="suivre-followers">Click Me</span>
    </div>
    <div className="profile-menu-section">
      <div className="profile-menu-section1">
        <h3 className="profile-menu-section1-h3">photo de profil</h3>
        {file ? <img src={URL.createObjectURL(file)} alt="" /> : <img src={userInfos?.picture} alt="" />}
        <label className="custom-file-input update-image">
          <input type="file" accept=".jpg,.jpeg,.png" name="file" onChange={handlePictureChange} />
          Choisir  l'image
        </label>
        {connect ?<button className="send-image" onClick={handlePictureUpload}>Enregistrer</button>:<button className="send-image">Patientez svp</button>}
      </div>
      <div className="profile-menu-section2">
        <h2 className="profile-menu-section2-h2">Description</h2>
        <div className="profile-menu-section2-parent-input" style={{ backgroundColor: isEditable ? 'white' : '#fce9ef' }}>
          <input type="text" className="profile-menu-section2-input" name="bio"
            value={inputValue.bio ?? userInfos?.bio} onChange={handleChangeInput} disabled={!isEditable} style={{ backgroundColor: isEditable ? 'white' : '#fce9ef' }} />
        </div>
        <div className="parent-edit">
          {isValid ? <span className="edit-bio" onClick={sendHandleBio}>Valider Bio</span> : <span className="edit-bio" onClick={handleEditBio}>Modifier Bio</span>}
        </div>
        <div className="parent-time">
          <div className="date-time">
            <h4 className="date-time-h4-1">Membre depuis le :{formatTime(userInfos?.timeCode)?.date}</h4>
            <h4 className="date-time-h4-2"> a {formatTime(userInfos?.timeCode)?.time}</h4>
          </div>
          <div className="parent-follow">
            <span className="follow" onClick={handleEtatFollowing}>Abonnements:{userInfos?.following?.length} </span>
            <span className="follow" onClick={handleEtatFollowers}> Tes Abonnes:{userInfos?.followers?.length}</span>
          </div>
          {etatFollowing && masque && <div id="proposition">
            <div className="sous-parent-proposition">
              <h5> Tes Abonnements</h5>
              <img src={close} alt="" className="proposition-close" onClick={closeArrayFollower} />
            </div>
            <div className="check-following">
              {
                allDatas?.allUserData?.map((data) => {
                  if (userInfos.following.includes(data._id)) {
                    return (
                      <div className="children-check-following" key={data._id}>
                        <div className="children-check-following-left">
                          <img src={data.picture} alt="" />
                          <span>{data.name}</span>
                        </div>
                        <span
                          className="children-check-following-right"
                          data-id={data._id}
                          onClick={(e) => {
                            console.log(true)
                            if (userInfos.following.includes(data._id)) {
                              removeStatutFollow(e, data._id);
                            }
                          }}

                        >
                          Abonnements
                        </span>
                      </div>

                    )
                  }

                })




              }
            </div>

          </div>}
          {/****followers***/}
          {etatFollowers && masque && <div id="proposition">
            <div className="sous-parent-proposition">
              <h5> Tes Abonnes</h5>
              <img src={close} alt="" className="proposition-close" onClick={closeArrayFollower} />
            </div>
            <div className="check-following">
              {
                allDatas.allUserData.map((data) => {
                  if (userInfos.followers.includes(data._id) && userInfos.following.includes(data._id)) {
                    return (
                      <div className="children-check-following" key={data._id}>
                        <div className="children-check-following-left">
                          <img src={data.picture} alt="" />
                          <span>{data.name}</span>
                        </div>
                        <span
                          className="children-check-following-right"
                          data-id={data._id}
                          onClick={(e) => {
                            console.log(true)

                          }}

                        >
                          Abonnes
                        </span>
                      </div>

                    )
                  } else if (userInfos.followers.includes(data._id)) {
                    return (
                      <div className="children-check-following" key={data._id}>
                        <div className="children-check-following-left">
                          <img src={data.picture} alt="" />
                          <span>{data.name}</span>
                        </div>
                        <span
                          className="children-check-following-right"
                          data-id={data._id}
                          onClick={(e) => {
                            console.log(true)
                            if (userInfos.followers.includes(data._id)) {
                              changesStatutFollowers(e, data._id);
                            }
                          }}

                        >
                          Abonne Toi en Retour
                        </span>
                      </div>

                    )
                  }

                })




              }
            </div>

          </div>}


        </div>


      </div>

    </div>
    <NavLink to="/menu"><span className="suivant">Suivant</span></NavLink>
  </div>)}
  </>
  )
}
