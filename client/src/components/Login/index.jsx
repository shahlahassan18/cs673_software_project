import React from 'react'
import styles from './login.module.css'
import {useForm} from 'react-hook-form'
import {useDispatch } from 'react-redux'
import {GoogleSignInAPIRedirect} from './../../firebase'
import {useNavigate} from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



const Login = () => {

  const {register, handleSubmit, formState} = useForm()
  const {errors} = formState

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (data) =>{
    const auth = getAuth();
  
  signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // Signed in successfully, navigate to /home
      navigate("/");
    })
    .catch((error) => {
      // An error occurred, handle it (e.g., show an error message)
      console.error("Error signing in: ", error.message);
      // Optionally, set an error state to show a user-friendly message
      alert("Error signing in: " + error.message);
    });
  }

  const handleGoogleSignIn = () =>{
    dispatch(GoogleSignInAPIRedirect())
    navigate("/")
  }

  return (
    <div>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
          <label>Email: </label>
          <input type='email' id='email'
           {...register('email',{
            required:{
              value: true,
              message : "Email is required!"
            },
            pattern:{
              value : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message : "Invalid email format" 
            }
           })}></input>
          <p className={styles.errors}>{errors.email?.message}</p>
          <label>Password: </label>
          <input type='password' id='password'
           {...register('password',{
            required:{
              value : true,
              message : "Password is required!"
            },
              minLength:{
                value : 8 ,
                message : "Password must be at least 8 characters long."
              }
            
          })}></input>
          <p className={styles.errors}>{errors.password?.message}</p>
          <button>Login</button>
          </div>
        </form>

        <div className={styles.googleSignIn}>
         <button onClick={handleGoogleSignIn}> Login with Google</button>
        </div>
      
    </div>
  )
}

export default Login

