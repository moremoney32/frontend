import  "./login.css"
import "../signup/signup.css"
import { useForm } from 'react-hook-form';
import { useContext, useRef, useState } from 'react';
import ordinateur from "../../images/ordinateur.jpg"
import { snackbbar } from "../../helpers/snackbbar";

import eyesLock from "../../icons/eyesLock.svg";
import { NavLink, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { fetchData } from "../../helpers/fetchData";
import { UidContext } from "../UidContext";
export const Login = ()=>{
    const [loading, setLoading] = useState(false);
    const [connect, setConnect] = useState(true);
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
            
           })
           .catch((error) => {
            console.log({message:error.message});
            
          }).finally(()=>{
            setLoading(false)
            setConnect(true)
          })
    }
    return( 
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
        <div className="main-signup-right">
          <img src={ordinateur} alt="" />
        </div>
        
    </div>
    )
}