import React from 'react'
import AddPost from '../AddPost'
import Banner from '../Banner'
import Posts from '../Posts'
import styles from "./feed.module.css"

const Feed = () => {
  return (
    <div className={styles.feed}>
      <Banner />
      <AddPost />
      <Posts />
    </div>
  )
}

export default Feed
