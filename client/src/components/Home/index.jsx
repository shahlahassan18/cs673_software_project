import React from 'react'
import Navbars from '../Navbar'
import LeftProfile from "./../LeftProfile"
import Feed from "./../Feed"
import RightNews from "./../RightNews"
import styles from "./home.module.css"

const Home = () => {
  return (
    <div>
      <Navbars />
      <div className={styles.home}>
          <LeftProfile />
          <Feed/>
          <RightNews/>
      </div>
    </div>
  )
}

export default Home
