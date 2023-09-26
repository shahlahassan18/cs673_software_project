import React from 'react'
import styles from './home.module.css'
import { Link } from 'react-router-dom' 

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src="/public/logo.jpg" alt="Your Logo" className={styles.logo} />
      </div>
      <div className={styles.linksContainer}>
        <Link to="/register" className={styles.link}>Join in</Link>
        <Link to="/login" className={styles.link}>Sign up</Link>
      </div>
    </div>
  )
}

export default Home
