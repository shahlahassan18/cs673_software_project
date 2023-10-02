import React from 'react'
import LeftProfile from "./../LeftProfile"
import Feed from "./../Feed"
import RightNews from "./../RightNews"
import styles from "./home.module.css"

const Home = () => {
  return (

    <div className={styles.home}>
        <LeftProfile />
        <Feed/>
        <RightNews/>
    </div>
  )
}

export default Home
