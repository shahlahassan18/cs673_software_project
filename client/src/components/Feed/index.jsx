import React, { useEffect, useState } from 'react'
import AddPost from '../AddPost'
import Banner from '../Banner'
import Posts from '../Posts'
import styles from "./feed.module.css"
import {db} from './../../firebase'
import { collection, getDoc, getDocs, doc, query } from "firebase/firestore"; 

const Feed = () => {

  async function readdocs() {
    const queryallDocs = await getDocs(collection(db, 'posts'))
    queryallDocs.forEach(element => {
      console.log(element.id, " => ", element.data())
    });
  }
  readdocs()
  const [posts, setPosts] = useState([]);
  /* 
  const fetchPosts = async () => {
    const req = await db.collection("posts").orderBy("TimeCreated", "desc").get();
    console.log(req)
  }

  useEffect(() => {
    fetchPosts();
  }, [])
  */

  return (
    <div className={styles.feed}>
      <Banner />
      <AddPost />
      <Posts />
    </div>
  )
}

export default Feed

