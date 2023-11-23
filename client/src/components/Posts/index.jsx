
import React, {useEffect, useState} from 'react'
import styles from "./posts.module.css"
import { AiOutlineLike } from "react-icons/ai";
import {BiCommentDetail, BiRepost} from "react-icons/bi";
import {BsFillSendFill} from "react-icons/bs";
import {db} from '../../firebase'
import { collection, getDoc, updateDoc, onSnapshot, doc, query, orderBy} from 'firebase/firestore';
import { getAuth } from 'firebase/auth'


const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const postsCollection = collection(db, 'posts');
    const postsQuery = query(postsCollection, orderBy('TimeCreated', 'desc')); // Order by 'createdAt' in descending order
  
    const unsubscribe = onSnapshot(postsQuery, async (snapshot) => {
      console.log('Snapshot received:', snapshot); // Log the received snapshot
      const postsData = await Promise.all(snapshot.docs.map(async (doc) => {
        const postData = doc.data();
        const { userId } = postData;
        const userData = await getUserData(userId);
        console.log('Doc data:', doc.data()); // Log each document's data
        return { id: doc.id, ...postData, ... userData };
      }));
  
      console.log('Posts data:', postsData); // Log the mapped posts data
      setPosts(postsData);
    });
  
    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLike = async (postId) => {
    const postRef = doc(db, 'posts', postId);
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("User is NOT Authenticated");
      return;
    }
    // Get the current user's ID
    const userId = currentUser.uid;
  
    // Get the current likes
    const postSnapshot = await getDoc(postRef);
    const currentLikes = postSnapshot.data().likes;
  
    // Add or remove the user's ID from the likes
    const newLikes = currentLikes.includes(userId)
      ? currentLikes.filter(id => id !== userId) // Remove the user's ID
      : [...currentLikes, userId]; // Add the user's ID
  
    // Update the likes in Firestore
    await updateDoc(postRef, { likes: newLikes });
  };

  const getUserData = async (userId) => {
    if (!userId) {
      console.log('No userId provided!');
      return null;
    }
    const userRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const { firstName, lastName, profilePicture } = userData; // Replace 'firstName' and 'lastName' with your actual field names
      return { firstName, lastName, profilePicture };
    } else {
      console.log('No such user!');
      return null;
    }
  } 

  return (


    <div className={styles.postContainer}>
      {posts.map((post) => (

      <div className={styles.post} key = {post.id}>
        <div className={styles.user}>
          <div className={styles.profilePicContainer}>
            <img className={styles.profilePic}
              src={post.profilePicture} alt='profile' />
          </div>
          <div className={styles.postUser}>
            <p className={styles.postUserName}>{post.firstName} {post.lastName}</p>
            <p className={styles.postUserJobTitle}>Product Designer</p>
            <div className={styles.jobTimer}>
              <img className={styles.jobTimerImg} src="./history-outline.svg" alt="timer" />
              <p className={styles.jobTime}>{post.TimeCreated ? post.TimeCreated.toDate().toLocaleString() : 'Loading...'}</p>
            </div>
          </div>
          <div className={styles.addPostSettings}>
            <img className={styles.settingsIcon}
              src='./DotsThree.svg' alt='settings' />
          </div>
        </div>
        <p className={styles.postContent}>{post.postCont}</p>
        <div className={styles.postMedia}>
          {post.media && post.media.map((urlObject, index) =>
            <img key={index} src={urlObject.url} alt={urlObject.url} />
          )}
        </div>
        <div className={styles.btns}>
          <div className={styles.actionBtns}>
            <div className={styles.actionBtn} onClick={() => handleLike(post.id)}>

              <img className={styles.actionIcon}
                src='./ThumbsUp.svg' alt='search' />
              <p className={styles.actionText}>Like {post.likes && post.likes.length}</p>
            </div>
            <div className={styles.actionBtn}>
              <img className={styles.actionIcon}
                src='./ChatText.svg' alt='search' />
              <p className={styles.actionText}>Comment</p>
            </div>
            <div className={styles.actionBtn}>
              <img className={styles.actionIcon}
                src='./ShareNetwork.svg' alt='search' />
              <p className={styles.actionText}>Repost</p>
            </div>
            <div className={styles.actionBtn}>
              <img className={styles.actionIcon}
                src='./Star.svg' alt='search' />
              <p className={styles.actionText}>Favourites</p>
            </div>
            </div>
          </div>
        </div>



      // </div>

      ))}
    </div>
  );
};

export default Posts;




//------
// import React, {useEffect} from 'react'
// import styles from "./posts.module.css"
// import { AiOutlineLike } from "react-icons/ai";
// import {BiCommentDetail, BiRepost} from "react-icons/bi";
// import {BsFillSendFill} from "react-icons/bs";
// import {db} from './../../firebase'
// import {
//   collection,
//   onSnapshot, // Replace getDocs with onSnapshot
//   // doc,
//   // query,
// } from 'firebase/firestore';
// import { useState } from 'react';



// const Posts = () => {

// const [posts, setPosts] = useState(null)

//   useEffect(() => {
//     const postsCollection = collection(db, 'posts'); // Reference the 'posts' collection
//     onSnapshot(postsCollection, (snapshot) => {
//       // console.log('snap: \n', snapshot.docs);
//       // console.log('snap: \n', )
//       setPosts(snapshot.docs.map((doc) => ({ id: doc.id, posts: doc.data() })));
//     });
//   }, []);

//   console.log('snap: \n', posts)

//   return (
    

//     <div className={styles.postContainer}>
//       <div className={styles.post}>
//         <div className={styles.user}>
//           <div className={styles.profilePicContainer}>
//             <img className={styles.profilePic}
//               src='https://s3-alpha-sig.figma.com/img/d0a7/3619/a7eaeb87169fa6f7361c4c51e67f89ab?Expires=1698019200&Signature=XjynzDMFyeBTJcjBzaDIawi~ESyKcW6XlR~ej5qSZxc2syl8oY12nrlUfVn~xroKHCKw3ZnGVWpWo1zIIELBZrCCNlB4eDGUogleYQ~NIXqoueMBFkEgRK2eOkJY2-wi3x00W-Ts7cORP9pvCb0NrEXIUsikUBJViyk-LtlG-XBo4e54utX6tmlLqx5xU8eMxMbVWsDI75TjY1gVWtNJB-v-quBjsJ5Dm~mo1qSIw-x5xiNIkJZlePP1ML-90qFJBvnlwCDDaJTxUQC94HFhZUhkh6OiXOi8JUQ3~Vi693dOwOJNNmeZ39bsFoQc48tqpY~gRUUZgKVNG7dU2JKpEw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' alt='profile' />
//           </div>
//           <div className={styles.postUser}>
//             <p className={styles.postUserName}>Sai Shirish Katady</p>
//             <p className={styles.postUserJobTitle}>Product Designer</p>
//             <div className={styles.jobTimer}>
//               <img className={styles.jobTimerImg} src="./history-outline.svg" alt="timer" />
//               <p className={styles.jobTime}> 1min</p>
//             </div>
//           </div>
//           <div className={styles.addPostSettings}>
//           <img className={styles.settingsIcon}
//             src='./DotsThree.svg' alt='settings' />
//         </div>
//         </div>
//         <p className={styles.postContent}>New Takeoff webpage for sign in and Join now</p>
//         <img alt="image" className={styles.postImg}
//         src="https://s3-alpha-sig.figma.com/img/3796/d458/84a37f35de9559168747d7ada8178c4d?Expires=1698019200&Signature=iTDyyjhepoTkhGx8NpgwCyAo-18b6ZPLqapo1RIMU1hq7yWWyp-4rBAvENSBHtiI2HFJsjRxVOYPsZnIaiCHXl2W9jRnM0RDcqinbKkw4xLZ9bTxzh4DP2Y~S0Kz9NpPbeP-H4ysvVv6~aGlcQpPIfwydRv1Pyjg6rvndvFCbpzH43ZvelIiFbxxi0ktp8GFTzu8So91JH1KwhLP17feov8z7l0Ku0YmF5iX6ww5Dx-HDSwBEF0si3DN2-PwMoLP-ZgqoW8Duay9UXrwI4wCbN7e3dd0pd0JY9pJT2vR~Dt5ECAR1e-tcvODQNXecBvtnOKWCYuk91nnIhw3ZFUVBg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
//         <div className={styles.btns}>
//           <div className={styles.reactionBtns}>

//             <p className={styles.postComments}>29 comments</p>
//           </div>
//           <div className={styles.actionBtns}>
//             <div className={styles.actionBtn}>
//               <img className={styles.actionIcon}
//                 src='./ThumbsUp.svg' alt='search' />
//               <p className={styles.actionText}>Like</p>
//             </div>
//             <div className={styles.actionBtn}>
//               <img className={styles.actionIcon}
//                 src='./ChatText.svg' alt='search' />
//               <p className={styles.actionText}>Comment</p>
//             </div>
//             <div className={styles.actionBtn}>
//               <img className={styles.actionIcon}
//                 src='./ShareNetwork.svg' alt='search' />
//               <p className={styles.actionText}>Repost</p>
//             </div>
//             <div className={styles.actionBtn}>
//               <img className={styles.actionIcon}
//                 src='./Star.svg' alt='search' />
//               <p className={styles.actionText}>Favourites</p>
//             </div>


//           </div>

//         </div>

//       </div>
//     </div>


//   )
// }

// export default Posts
