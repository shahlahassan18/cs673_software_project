import React from 'react'
import LeftProfile from "./../LeftProfile"
import Feed from "./../Feed"
import RightNews from "./../RightNews"
import styles from "./home.module.css"

const Home = () => {
  return (
<<<<<<< HEAD
    <div className={styles.home}>
        <LeftProfile />
        <Feed/>
        <RightNews/>
=======
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src="/public/logo.jpg" alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.loginContainer}>
        <Link to="/register" className={styles.register}>Join now</Link>
        <Link to="/login" className={styles.login}>Sign in</Link>
      </div>
>>>>>>> 19b58bd87cfb1fdf0ab480914cbfac4b09190f32
    </div>
  )
}

export default Home
