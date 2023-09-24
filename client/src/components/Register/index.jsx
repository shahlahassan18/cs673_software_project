import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './register.module.css';

const Register = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    // Send data to the server or perform registration logic here
    console.log(data);
  };

  return (
    <div className={styles.registerContainer}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required!',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email format',
              },
            })}
          />
          <p className={styles.error}>{errors.email?.message}</p>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register('password', {
                required: 'Password is required!',
                pattern: {
                value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/,
                message:
                    'Password must contain at least one lowercase letter, one uppercase letter, and one special character.',
                },
            })}
          />
          <p className={styles.error}>{errors.password?.message}</p>
        {/* Comment for Regex:  (?=.*[0-9]) means that the password must contain a single digit from 1 to 9
                                (?=.*[a-z]) means that the password must contain one lowercase letter
                                (?=.*[A-Z]) means that the password must contain one uppercase letter
                                (?=.*\W) means that the password must contain one special character
                                (?!.* ) means that the password must NOT contain spaces
                                .{8,} means that the password must be at least 8 characters long */}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', {
              validate: (value) =>
                value === document.getElementById('password').value ||
                'Passwords do not match.',
            })}
          />
          <p className={styles.error}>{errors.confirmPassword?.message}</p>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
