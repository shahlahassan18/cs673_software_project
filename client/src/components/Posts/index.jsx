
import React, {useEffect, useState} from 'react'
import styles from "./posts.module.css"
import { AiOutlineLike } from "react-icons/ai";
import {BiCommentDetail, BiRepost} from "react-icons/bi";
import {BsFillSendFill} from "react-icons/bs";
import {db} from '../../firebase'
import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot, doc, query, orderBy, serverTimestamp} from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { MdOutlineDelete } from "react-icons/md";


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
  const [activePost,setActivePost] = useState(null)


   //Comment Form Submission
   const handleCommentSubmit = async(e,postId) =>{
    e.preventDefault()
    const auth = getAuth();
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      console.log("User is NOT Authenticated");
      return;
    }

    const userId = currentUser.uid;
    const postRef = doc(db, 'posts', postId);
    const commentsCollection = collection(postRef, 'comments');
    const newComment = { userId, text: comment, timestamp: serverTimestamp() };
  
    const commentRef = await addDoc(commentsCollection, newComment);

    setComments((prev) => (prev ? [...prev, {id: commentRef.id, postId, comment}] : [{id: commentRef.id, postId, comment}]));
    setComment('');
   } 

   const handleDeleteComment = async (postId, commentId) => {
    const postRef = doc(db, 'posts', postId);
    const commentRef = doc(postRef, 'comments', commentId);
    await deleteDoc(commentRef);
  
    setComments((prev) => {
      const updatedComments = [...prev];
      const index = updatedComments.findIndex((comment) => comment.id === commentId);
      if (index !== -1) {
        updatedComments.splice(index, 1);
      }
      return updatedComments;
    });
  };

  useEffect(() => {
    const postsCollection = collection(db, 'posts');
    const postsQuery = query(postsCollection, orderBy('TimeCreated', 'desc')); // Order by 'createdAt' in descending order
  
    const unsubscribe = onSnapshot(postsQuery, async (snapshot) => {
      console.log('Snapshot received:', snapshot); // Log the received snapshot
      const postsData = await Promise.all(snapshot.docs.map(async (docPost) => {
        const postData = docPost.data();
        const { userId } = postData;
        const userData = await getUserData(userId);
        console.log('Doc data:', docPost.data()); // Log each document's data
        // Fetch comments for the post
        const postRef = doc(db, 'posts', docPost.id);
        const commentsCollection = collection(postRef, 'comments');
        const commentsSnapshot = await getDocs(commentsCollection);
        const commentsData = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return { id: docPost.id, ...postData, ... userData, comments: commentsData };
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
        {post.postCont.split('\n').map((line, index) => (
          <p key={index} className={styles.postContent} style={{margin: 0}}>{line}</p>
        ))}
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
            <div className={styles.actionBtn} onClick={()=>setActivePost(post.id)}>
              <img className={styles.actionIcon} src='./ChatText.svg' alt='comment' />
              <p className={styles.actionText}>Comment {post.comments ? post.comments.length : 0}</p>
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
          {activePost === post.id && 
          (
            <>
            {/* <div className={styles.commentInputContainer}> */}
            <form onSubmit={(e)=>handleCommentSubmit(e,post.id)} className={styles.commentForm}>
              <input type='text' placeholder='Enter Comment' onChange ={(e)=>setComment(e.target.value)} value={comment}
              className={styles.commentInput}></input>
              <button type='submit' className={styles.commentSubmit}>Submit</button>
            </form>
          {/* </div> */}
          
          {post.comments && post.comments
  .sort((a, b) => b.timestamp - a.timestamp) // Sort comments by timestamp in descending order
  .slice(0, 3) // Take the first 3 comments
  .map((comment, index) => (
    <div key={index} className={styles.comments}>
      <p className={styles.commentText}><b>user</b></p>
      <p className={styles.commentText}>{comment.text}</p>
      <MdOutlineDelete onClick={() => handleDeleteComment(post.id, comment.id)} />
    </div>
  ))
}
            </>
          )
          }
        
          
        </div>



      // </div>

      ))}
    </div>
  );
};

export default Posts;
