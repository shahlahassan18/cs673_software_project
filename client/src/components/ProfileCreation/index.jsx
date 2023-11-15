import React from 'react'
import styles from "./profilecreation.module.css";
import LogoContainer from '../LogoContainer';
import { useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";

const ProfileCreation = () => {
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
  
  
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        navigate("/feed")
      };

  return (
    <>
     <LogoContainer />
     <div className={styles.registerContainer}>
        <h1>User</h1>
        <h6> To begin, we'll need some basic information from you</h6>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="text">First Name:</label>
            <input
              type="text"
              id="fname"
              {...register('firstName', {
                required: 'First Name is required',
              })}
            />
            <p className={styles.error}>{errors.firstName?.message}</p>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="text">Last Name:</label>
            <input
              type="text"
              id="lname"
              {...register('lastName', {
                required: 'Last Name is required',
              })}
            />
            <p className={styles.error}>{errors.lastName?.message}</p>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              {...register('dateOfBirth', {
                required: 'Date of Birth is required',
              })}
            />
            <p className={styles.error}>{errors.dateOfBirth?.message}</p>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="number">Age: </label>
            <input
              type="number"
              id="age"
              {...register('age', {
                required: 'Age is required',
              })}
            />
            <p className={styles.error}>{errors.age?.message}</p>
          </div>
          
          <Button
            variant="primary"
            size="lg"
            className="registerBtn"
            type="submit"
            style={{ backgroundColor: "#7F61A9" }}
          >
            Register
          </Button>

        </form>
      </div>
    </>
  )
}

export default ProfileCreation
