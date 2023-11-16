import React, { useEffect, useState } from 'react'
import AddPost from '../AddPost'
import Banner from '../Banner'
import Posts from '../Posts'
import styles from "./feed.module.css"
import {db} from './../../firebase'
import { collection, getDoc, getDocs, doc } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Feed = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    let isMounted = true;
  
    if (currentUser) {
      const userDocRef = doc(db, 'users', currentUser.uid);
      getDoc(userDocRef).then(docSnapshot => {
        if (isMounted) {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            if (!data.firstName && !data.lastName) {
              alert("Please create your profile");
              navigate("/create-profile");
            }
          } else {
            console.error("User document doesn't exist!");
          }
        }
      }).catch(err => {
        console.error("Error fetching user data:", err);
      });
    }
  
    return () => {
      isMounted = false;
    };
  }, []);
  

  async function readdocs() {
    const queryallDocs = await getDocs(collection(db, 'posts'))
    queryallDocs.forEach(element => {

      // console.log(element.id, " => ", element.data())

      //console.log(element.id, " => ", element.data())

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

