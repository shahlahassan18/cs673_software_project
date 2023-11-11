import React, { useEffect, useState } from 'react';
import styles from './posts.module.css';
import { AiOutlineLike } from 'react-icons/ai';
import { BiCommentDetail, BiRepost } from 'react-icons/bi';
import { BsFillSendFill } from 'react-icons/bs';
import { db } from './../../firebase';
import {
  collection,
  onSnapshot,
  getDoc,
  doc,
} from 'firebase/firestore';

const Posts = () => {
  const [posts, setPosts] = useState([]); // State to store the fetched posts

  useEffect(() => {
    const postsCollection = collection(db, 'posts');

    const unsubscribe = onSnapshot(postsCollection, async (snapshot) => {
      const postsData = [];
      for (const doc1 of snapshot.docs) {
        const postData = doc1.data();
        const userId = postData.userId;

        // Check if userId is defined
        if (userId) {
          // Construct the user document reference
          const userDocRef = doc(db, 'users', userId);

          // Fetch user data from Firestore
          const userDocSnapshot = await getDoc(userDocRef);
          const userData = userDocSnapshot.data();

          if (userData) {
            postsData.push({
              id: doc1.id,
              post: postData,
              user: userData,
            });
          }
        }
      }
      setPosts(postsData);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.postContainer}>
      {posts.map((post) => (
        <div key={post.id} className={styles.post}>
          {/* Render user information for the post */}
          <div className={styles.user}>
            <div className={styles.profilePicContainer}>
              <img
                className={styles.profilePic}
                src={post.user.profilePicture} // Use the correct field for the profile picture
                alt='profile'
              />
            </div>
            <div className={styles.postUser}>
              <p className={styles.postUserName}>
                {post.user.firstName} {post.user.lastName}
              </p>
              <p className={styles.postUserJobTitle}>{post.user.title}</p>
              <div className={styles.jobTimer}>
                {/* Render the post's timestamp */}
                <img
                  className={styles.jobTimerImg}
                  src='./history-outline.svg'
                  alt='timer'
                />
                <p className={styles.jobTime}>
                  {/* Format and display the post's timestamp here */}
                </p>
              </div>
            </div>
          </div>
          {/* Render post data from Firestore here */}
          <p className={styles.postContent}>{post.post.postCont}</p>
          {/* Render images and buttons */}
          {post?.post?.media?.map((mediaItem, index) => (
            <img
              key={index}
              alt={`image${index}`}
              className={styles.postImg}
              src={mediaItem.url}
            />
          ))}
          <div className={styles.btns}>
            <div className={styles.reactionBtns}>
              {/* Render the number of comments */}
              <p className={styles.postComments}>29 comments</p>
            </div>
            <div className={styles.actionBtns}>
              {/* Render Like, Comment, Repost, and Favourites buttons */}
                           <div className={styles.actionBtn}>
              <img className={styles.actionIcon}
                src='./ThumbsUp.svg' alt='search' />
              <p className={styles.actionText}>Like</p>
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
