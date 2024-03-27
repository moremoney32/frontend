import "./signup.css"
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import ordinateur from "../../images/ordinateur.jpg"
import phoneinstagram from "../../assets/images/phoneinstagram.PNG";
import screenshot1 from "../../assets/images/screenshot1.png";
import screenshot2 from "../../assets/images/screenshot2.png";
import screenshot3 from "../../assets/images/screenshot3.png";
import screenshot4 from "../../assets/images/screenshot4.png";
import { NavLink, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { fetchData } from "../../helpers/fetchData";
import { snackbbar } from "../../helpers/snackbbar";
import { useDispatch} from "react-redux";
import { setUser } from "../../appRedux/features/userSlice";
import { setAuth } from "../../appRedux/features/authSlice";
export const Signup = ()=>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
   
    const [loading, setLoading] = useState(false);
    const [connect, setConnect] = useState(true);
    const { register, handleSubmit, formState: { errors,isValid }, watch } = useForm();
   
     
 //changeSlider()
    const onSubmit = (data) => {
        console.log(data)
        setLoading(true)
        setConnect(false)
       
        fetchData("https://changes-social.onrender.com/api/signup",data).then((result)=>{
         
          console.log(result)
            
            if(result.message === "Utilisateur créé avec succès"){
              return snackbbar(document.querySelector("#body"), "../../icons/info.svg", result.message, 5000),dispatch(setAuth(result.userId)),navigate("/login")
            }
            else if(result.messageError === 'cet email existe deja veuillez changer d adresse'){
               snackbbar(document.querySelector("#body"), "../../icons/info.svg", result.messageError, 5000)
            }
            else if(result.message === 'Erreur lors de lenvoi de le-mail de confirmation'){
              return alert("probleme de connexion")
            }
            
           })
           .catch((error) => {
            console.log({message:error.message});
            
          }).finally(()=>{
            setLoading(false)
            setConnect(true)
          })
    }
    return(
      <>
    <div className="main">
        <div className="main-signup-left">
            <div className="signup-connexion">
                <span className={window.location.pathname === "/"? "signup-connexion-span-hover" : "signup-connexion-span"}><NavLink to="/" className="navlink">S inscrire</NavLink></span>
                <span className={window.location.pathname === "/login"? "signup-connexion-span-hover" : "signup-connexion-span"}><NavLink to="/login" className="navlink">Se connecter</NavLink></span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="space-signup">
            <label htmlFor="name">Speudo</label>
            <input
              type="text"
              name="name"
              {...register("name", { required: "Veuillez entrer votre speudo" })}
            />
            {errors.speudo && <span className="error">{errors.speudo.message}</span>}
          </div>
          <div className="space-signup">
          <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              {...register("email", {
                required: "Veuillez entrer votre adresse e-mail",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Mauvaise syntaxe d'email",
                },
              })}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>
          <div className="space-signup">
          <label htmlFor="password">Password</label>
           
              <input
                type="text"
                name="password"
                className="input"
                {...register("password", {
                  required: "Veuillez entrer votre mot de passe",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,15}$/,
                    message: "miniscule,majuscule,chiffre,caractere special,au moins 8 lettres",
                  },
                })}
              />
              {errors.password && <span className="error">{errors.password.message}</span>}
           

            </div>
            <div className="space-signup">
            <label htmlFor="confirm">Comfirme mot de passe</label>
              <input
                type="text"
                className="input"
                name="confirm"
                {...register("confirmPassword", {
                  required: "Veuillez confirmer votre mot de passe",
                  validate: (value) =>
                    value === watch("password")  || "Les mots de passe ne correspondent pas",
                })}
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
            
            </div>
          <div className="information-condition">
            <input type="checkbox" {...register("acceptTerms", { required: "Veuillez accepter les termes et conditions" })} />
            <span>
              j accepte
               <span className="conditions">les conditions generales</span>
            </span>
            {errors.acceptTerms && <span className="error">{errors.acceptTerms.message}</span>}
          </div>
          {connect &&
          <button type="submit" className={`button-signup ${isValid ? 'valid-form' : ''}`}>Valider Inscription</button>}
          {loading &&
          <button type="submit" className={`button-signup ${isValid ? 'valid-form' : ''}`}>patientez svp ...</button>}
        </form>
        </div>
        <div className="main-signup-right">
          <img src={ordinateur} alt=""  />
           {/*<di>
                    <img src={phoneinstagram} alt="phoneinstagram.PNG" />
                   <div class="all-screenshot">
                         <img
                              src={screenshot1}
                              class="slide active"
                              alt="screenshot1.png"
                         />
                         <img
                              src={screenshot2}
                              class="slide active"
                              alt="screenshot2.png"
                         />
                         <img
                              src={screenshot3}
                              class="slide"
                              alt="screenshot3.png"
                         />
                         <img
                              src={screenshot4}
                              class="slide"
                              alt="screenshot4.png"
                         />
          </div>
               </div>*/}
        </div>
        
    </div>
    </>
    )
}