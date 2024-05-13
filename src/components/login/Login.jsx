import  "./login.css"
import { useForm } from 'react-hook-form';
import { useContext, useRef, useState } from 'react';
import ordinateur from "../../images/ordinateur.jpg"
import { snackbbar } from "../../helpers/snackbbar";
import { NavLink, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { fetchData } from "../../helpers/fetchData";
import { UidContext } from "../UidContext";
export const Login = ()=>{
    const [loading, setLoading] = useState(false);
    const [connect, setConnect] = useState(true);
    const [formData,setFormData] = useState({
      email:"",
      password:""
    })
    const [error,setError] = useState({
      email:"",
      password:""
    })
    const handleSubmitMobile = (e) =>{
      e.preventDefault()
      const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,30}$/
      const NewErrors ={}
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
      console.log(formData)
      setConnect(false)
      setLoading(true)
      fetchData("https://changes-social.onrender.com/api/login",formData).then((result)=>{
       
        console.log(result)
          
          if(result.message === "connexion reussi"){
            return snackbbar(document.querySelector("#body"), "../../icons/info.svg", result.message, 5000),navigate("/profile")
          }
          else if(result.messageError === 'mot de passe invalide ou email invalide'){
             snackbbar(document.querySelector("#body"), "../../icons/info.svg", result.messageError, 5000)
          }
          else if(result.message === 'probleme de connexion'){
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
    const handleChange = (e) =>{
      const {name,value} = e.target
      setFormData((prevData)=>({...prevData,[name]:value,}))
    }
    const { register, handleSubmit, formState: { errors,isValid }, watch } = useForm();
    const uid = useContext(UidContext)
    const navigate = useNavigate();
    
    const onSubmit = (data) => {
        console.log(data)
        setConnect(false)
        setLoading(true)
        fetchData("https://changes-social.onrender.com/api/login",data).then((result)=>{
         
          console.log(result)
            
            if(result.message === "connexion reussi"){
              return snackbbar(document.querySelector("#body"), "../../icons/info.svg", result.message, 5000),navigate("/profile")
            }
            else if(result.messageError === 'mot de passe invalide ou email invalide'){
               snackbbar(document.querySelector("#body"), "../../icons/info.svg", result.messageError, 5000)
            }
            else if(result.message === 'probleme de connexion'){
              return alert("probleme de connexion")
            }
            else if(result.message === 'Failed to fetch'){
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
      {/****mobile login */}
      <div className="mobile-signup">
        <h5 className="login">Sign Up</h5>
        <div className="parent-form">
          <h5 className="signup">Log In</h5>
          <form className="form-mobile" onSubmit={handleSubmitMobile}>
            <div className="space-form">
              <label htmlFor="email">Your Email</label>
              <input type="text" 
              name="email"
              value= {formData.email}
              onChange={handleChange}/>
                  {error.email && <span className="error">{error.email}</span>}
            </div>
            <div className="space-form">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" value= {formData.password} onChange={handleChange}/>
                    {error.password && <span className="error">{error.password}</span>}
            </div>
            {connect &&
          <button type="submit" className={`button-signup-mobile ${isValid ? 'valid-form' : ''}`}>Login</button>}
          {loading &&
          <button type="submit" className={`button-signup-mobile ${isValid ? 'valid-form' : ''}`}>patientez svp ...</button>}
          </form>
          <span className="check-inscription-social">Or login with social account</span>
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
        </div>
      </div>
       {/****mobile login */}
    <div className="main">
        <div className="main-signup-left">
            <div className="signup-connexion">
                <span className={window.location.pathname === "/"? "signup-connexion-span-hover" : "signup-connexion-span"}><NavLink to="/" className="navlink">S inscrire</NavLink></span>
                <span className={window.location.pathname === "/login"? "signup-connexion-span-hover" : "signup-connexion-span"}><NavLink to="/login" className="navlink">Se connecter</NavLink></span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
          
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
           
          
          {connect &&
          <button type="submit" className={`button-signup ${isValid ? 'valid-form' : ''}`}>Valider Inscription</button>}
          {loading &&
          <button type="submit" className={`button-signup ${isValid ? 'valid-form' : ''}`}>patientez svp ...</button>}
        </form>
        </div>
        <div className="main-signup-rights">
          <img src={ordinateur} alt="" />
        </div>
        
    </div>
    </>
    )
}