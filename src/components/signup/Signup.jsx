import "./signup.css"
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import phoneinstagram from "../../assets/images/phoneinstagram.PNG";
import screenshot2 from "../../assets/images/screenshot2.png";
import screenshot3 from "../../assets/images/screenshot3.png";
import screenshot4 from "../../assets/images/screenshot4.png";
import { NavLink} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { fetchData } from "../../helpers/fetchData";
import { snackbbar } from "../../helpers/snackbbar";
export const Signup = ()=>{
  const navigate = useNavigate();
   
    const [loading, setLoading] = useState(false);
    const [connect, setConnect] = useState(true);
    const [formData,setFormData] = useState({
      name:"",
      email:"",
      password:""
    })
    const [error,setError] = useState({
      name:"",
      email:"",
      password:""
    })
    const { register, handleSubmit, formState: { errors,isValid }, watch } = useForm();
    const allScreenshotRef = useRef(null);
   /**function qui gere le defilement de slider pendant un intervalle de temps */
   function changeSlider() {
    let counter = 0;

    function nextSlider() {
      if (allScreenshotRef.current) {
          let allSlider = allScreenshotRef.current.querySelectorAll('.slide');
          if (allSlider.length > 0) {
              allSlider[counter].classList.remove('active');
              counter = (counter + 1) % allSlider.length;
              allSlider[counter].classList.add('active');
          }
      }
  }

  let slideInterval = setInterval(nextSlider, 3000);
}
useEffect(() => {
  if (window.location.pathname === "/") {
    changeSlider();
  }
}, []);
const handleSubmitMobile = (e)=>{
  e.preventDefault()
  const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,30}$/
  const NewErrors ={}
  if(!formData.pseudo){
    NewErrors.pseudo = "veuillez entrer votre nom"
  }
  if(!formData.email){
    NewErrors.email = "veuillez entrer votre email"
  }
  else if(!regexEmail.test(formData.email)){
    NewErrors.email = "mauvaise syntaxe d email"
  }
  if(!formData.password){
    NewErrors.password = "veuillez entrer votre mot de passe"
  }
  else if(!regexPassword.test(formData.password)){
    NewErrors.password = "miniscule,majuscule,chiffre,caractere special,au moins 8 lettres"
  }
  setError(NewErrors)
  setLoading(true)
        setConnect(false)
       
        fetchData("https://changes-social.onrender.com/api/signup",formData).then((result)=>{
         // https://changes-social.onrender.com
         
            console.log(result)
            if(result.message === "Utilisateur créé avec succès"){
              return snackbbar(document.querySelector("#body"), "../../icons/info.svg", result.message, 5000),localStorage.setItem("dataUser",result.userId),navigate("/login")
            }
            else if(result.messageError === 'cet email existe deja veuillez changer d adresse'){
               snackbbar(document.querySelector("#body"), "../../icons/info.svg", result.messageError, 5000)
            }
            else if(result.message === 'Erreur lors de lenvoi de le-mail de confirmation'){
              return alert("probleme de connexion")
            }
            else if(result.message === 'Failed to fetch'){
              return alert("probleme de connexion")
            }
           })
           .catch((error) => {
            //console.log({message:error.message});
            
          }).finally(()=>{
            setLoading(false)
            setConnect(true)
          })

}
const handleChange = (e)=>{
  const {name,value} = e.target;
  setFormData((prevState)=> ({...prevState,[name]:value}))
}
     
 
    const onSubmit = (data) => {
        setLoading(true)
        setConnect(false)
       
        fetchData("https://changes-social.onrender.com/api/signup",data).then((result)=>{
         
            
            if(result.message === "Utilisateur créé avec succès"){
              return snackbbar(document.querySelector("#body"), "../../icons/info.svg", result.message, 5000),localStorage.setItem("dataUser",result.userId),navigate("/login")
            }
            else if(result.messageError === 'cet email existe deja veuillez changer d adresse'){
               snackbbar(document.querySelector("#body"), "../../icons/info.svg", result.messageError, 5000)
            }
            else if(result.message === 'Erreur lors de lenvoi de le-mail de confirmation'){
              return alert("probleme de connexion")
            }
            
           })
           .catch((error) => {
           // console.log({message:error.message});
            
          }).finally(()=>{
            setLoading(false)
            setConnect(true)
          })
    }
    return(
      <>
      {/****mobile signup */}
      <div className="mobile-signup">
      <NavLink to="/login"><h5 className="login">Log In</h5></NavLink>
        <div className="parent-form">
          <h5 className="signup">Sign Up</h5>
          <form className="form-mobile" onSubmit={handleSubmitMobile}>
            <div className="space-form">
              <label htmlFor="email">Your Email</label>
              <input type="text"  name="email"
              value={formData.email}
              onChange={handleChange}
              />
              {error.email && <span className="error">{error.email}</span>}
            </div>
            <div className="space-form">
              <label htmlFor="name">Name</label>
              <input type="text"  name="name" 
              value={formData.name}
              onChange={handleChange}
             />
              {error.pseudo && <span className="error">{error.name}</span>}
            </div>
            <div className="space-form">
              <label htmlFor="password">Password</label>
              <input type="password" name="password"
              value={formData.password}
              onChange={handleChange}
             />
                 {error.password && <span className="error">{error.password}</span>}
            </div>
             {/**** <button className="button-signup-mobile"> Signup</button>*/}
            {connect &&
          <button type="submit" className={`button-signup-mobile ${isValid ? 'valid-form' : ''}`}>Signup</button>}
          {loading &&
          <button type="submit" className={`button-signup-mobile ${isValid ? 'valid-form' : ''}`}>patientez svp ...</button>}
          </form>
          <span className="check-inscription-social">Or sign up with social account</span>
          <div className="select-social">
            <div className="select-social-div">
              <img src="" alt="" />
              <span className="select-social-div-span">Facebook</span>
            </div>
            <div className="select-social-div">
              <img src="" alt="" />
              <span className="select-social-div-span">Twitter</span>
            </div>
          </div>
          <div className="use-social">
            <span>By signing up you agree to our Terms of Use</span>
            <span>and Privacy Policy</span>
          </div>
        </div>
      </div>
       {/****mobile signup */}
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
            {errors.name && <span className="error">{errors.name.message}</span>}
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
                type="password"
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
            <label htmlFor="confirm">Comfirmer mot de passe</label>
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
          {/*<img src={ordinateur} alt=""  />*/}
           <div className="parent-screenshot"ref={allScreenshotRef}>
                    <img src={phoneinstagram} alt="phoneinstagram.PNG" />
                   <div class="all-screenshot">
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
               </div>
        </div>
        
    </div>
    </>
    )
}