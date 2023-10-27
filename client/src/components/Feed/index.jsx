import React, { useEffect, useState } from 'react'
import AddPost from '../AddPost'
import Banner from '../Banner'
import Posts from '../Posts'
import styles from "./feed.module.css"
import {db} from './../../firebase'
import { collection, getDoc, getDocs, doc } from "firebase/firestore"; 

const Feed = () => {

  const test = doc(db, 'posts/ZethHPqeT13c434HNMBV')

  async function readdocs() {
    const snapshot = await getDoc(test);
    if(snapshot.exists()){
      const docdata = snapshot.data();
      console.log(`My data is ${JSON.stringify(docdata)}`);
    }
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

