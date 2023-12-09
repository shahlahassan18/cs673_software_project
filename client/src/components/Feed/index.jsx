import React, { useEffect, useState } from 'react'
import AddPost from '../AddPost'
import Banner from '../Banner'
import Posts from '../Posts'
import styles from "./feed.module.css"
import {db} from './../../firebase'
import { collection, getDoc, getDocs, doc, setDoc } from "firebase/firestore"; 
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
            console.log("docSnapshot exists");
            const data = docSnapshot.data();
            if (!data.firstName && !data.lastName) {
              console.log("no name");
              alert("Please create your profile");
              navigate("/create-profile");
            }
          } else {
            console.log("docSnapshot doesn't exist");
            setDoc(userDocRef, {
              userID: currentUser.uid,
              email: currentUser.email,
              firstName: "",
              lastName: "",
              profilePicture: "https://cdn.onlinewebfonts.com/svg/img_383214.png",
              title: "",
              education: "",
              skills: [],
              interests: [],
              bio: "",
              followersCount: 0,
              posts: [],
              comments: [],
              experience: [],
              contacts: [],
              createdAt: new Date(),
              lastLogin: new Date(),
              birthday: "",
            })
            alert("Please create your profile");
            navigate("/create-profile");          }
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

