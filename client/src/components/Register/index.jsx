import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./register.module.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LogoContainer from "./../LogoContainer"
import Button from 'react-bootstrap/Button';
import Divider from "../Divider";
// import "font-awesome/css/font-awesome.min.css";

const Register = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const auth = getAuth();
    const { email, password } = data;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // The user was registered successfully
        const user = userCredential.user;
        console.log("Registered successfully!", user);
        alert("Registered successfully! ");
        navigate("/login");
      })
      .catch((error) => {
        // An error occurred during registration
        console.error("Error registering:", error.message);
        alert("Error registering: " + error.message);
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleGoogleSignIn = () =>{
    console.log("Registered")
  }

  return (
    <>
    <LogoContainer/>
    <div className={styles.registerContainer}>
      <h1>Elevate Your Professional Journey</h1>
      <h6>Let’s start with a few details from you</h6>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
          />
          <p className={styles.error}>{errors.email?.message}</p>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required!",
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/,
                  message:
                    "Password must contain at least one lowercase letter, one uppercase letter, one special character, and at least 8 digits without spaces.",
                },
              })}
              className={styles.passwordInput}
            />
          </div>
          <p className={styles.error}>{errors.password?.message}</p>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              validate: (value) =>
                value === document.getElementById("password").value ||
                "Passwords do not match.",
            })}
          />
          <p className={styles.error}>{errors.confirmPassword?.message}</p>
        </div>
          <Button variant="primary" size="lg" className="registerBtn" type="submit">
            Register
          </Button>

          <Divider />

          <div className={styles.googleSignIn}>
            <img src='/public/flat-color-icons_google.svg' alt='google logo' />
            <button onClick={handleGoogleSignIn}> Sign in with Google</button>
          </div>




      </form>
    </div>
    </>
   
  );
};

export default Register;
