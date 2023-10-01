import React from 'react'
import styles from './home.module.css'
import { Link } from 'react-router-dom' 

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src="/public/logo.jpg" alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.loginContainer}>
        <Link to="/register" className={styles.register}>Join now</Link>
        <Link to="/login" className={styles.login}>Sign in</Link>
      </div>
    </div>
  )
}

export default Home
