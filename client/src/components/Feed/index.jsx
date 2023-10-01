import React from 'react'
import AddPost from '../AddPost'
import Posts from '../Posts'
import styles from "./feed.module.css"

const Feed = () => {
  return (
    <div className={styles.feed}>
      <AddPost />
      <Posts />
    </div>
  )
}

export default Feed
