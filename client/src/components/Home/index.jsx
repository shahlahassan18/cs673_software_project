import React from 'react'
import Navbar from '../Navbar'
import LeftProfile from "./../LeftProfile"
import Feed from "./../Feed"
import RightNews from "./../RightNews"
import styles from "./home.module.css"

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.home}>
          <LeftProfile />
          <Feed/>
          <RightNews/>
      </div>
    </div>
  )
}

export default Home
