import React, {useEffect} from 'react'
import styles from "./posts.module.css"
import { AiOutlineLike } from "react-icons/ai";
import {BiCommentDetail, BiRepost} from "react-icons/bi";
import {BsFillSendFill} from "react-icons/bs";
import {db} from './../../firebase'
import {
  collection,
  onSnapshot, // Replace getDocs with onSnapshot
  // doc,
  // query,
} from 'firebase/firestore';



const Posts = () => {

  // useEffect(() => { 
  //   db.collection('posts').onSnapshot(snapshot => {
  //     console.log("snap, :\n",snapshot)
  //     // setTodos(snapshot.docs.map(doc => ({id:doc.id, todo:doc.data().todo})))
  //   })
  // }, []);

  useEffect(() => {
    const postsCollection = collection(db, 'posts'); // Reference the 'posts' collection
    onSnapshot(postsCollection, (snapshot) => {
      console.log('snap: \n', snapshot.docs);
      // setTodos(snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo })));
    });
  }, []);

  return (
    // <div className={styles.posts}>
    //   <div className={styles.user}>
    //     <div className={styles.profile}>
    //       <div className={styles.userPhoto}>
    //         <img className={styles.avatar} src="https://cdn.imgbin.com/21/23/1/imgbin-computer-icons-female-user-profile-avatar-material-x1Zz1EDVQQssccaQu0dy0VFGy.jpg" />
    //       </div>
    //       <div className={styles.userDetails}>
    //         <p className={styles.username}>First and Last Name</p>
    //         <p className={styles.title}>Owner of the company</p>
    //         <div className={styles.time}>
    //         <p>Time</p>
    //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" className="mercado-match" width="16" height="16" focusable="false">
    //           <path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011-3l.55.55A1.5 1.5 0 015 6.62v1.07a.75.75 0 00.22.53l.56.56a.75.75 0 00.53.22H7v.69a.75.75 0 00.22.53l.56.56a.75.75 0 01.22.53V13a5 5 0 01-5-5zm6.24 4.83l2-2.46a.75.75 0 00.09-.8l-.58-1.16A.76.76 0 0010 8H7v-.19a.51.51 0 01.28-.45l.38-.19a.74.74 0 01.68 0L9 7.5l.38-.7a1 1 0 00.12-.48v-.85a.78.78 0 01.21-.53l1.07-1.09a5 5 0 01-1.54 9z"></path>
    //         </svg>
    //         </div>
    //       </div>
    //     </div>
    //     <div className={styles.icons}>
    //       <button>X</button>
    //     </div>
    //   </div>
    //   <div className={styles.content}>
    //     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat eius obcaecati dolore minus laudantium. Debitis, porro ratione, corrupti dolor animi laudantium nulla voluptas optio delectus quasi, at sapiente iusto vero?
    //   </div>
    //   <div className={styles.contentImage}>
    //     <img className={styles.contentimg}
    //     src='https://media.licdn.com/dms/image/sync/D5618AQGkVyMI_HcjwA/companyUpdate-article-image-shrink_627_1200/0/1673464860512/LinkedIn_eBook5reasonserrorsslipintoyourSalesforce__1080x1080png?e=1698883200&v=beta&t=yiiFBWOC3dNCLMKTqRum0h6pb4MSCX8eAj2UXXwslP4' />
    //   </div>
    //   <div className={styles.btns}>
    //     <button className={styles.btn}><AiOutlineLike />Like</button>
    //     <button className={styles.btn}><BiCommentDetail />Comment</button>
    //     <button className={styles.btn}><BiRepost />Repost</button>
    //     <button className={styles.btn}><BsFillSendFill/> Send</button>
    //   </div>

    // </div>

    <div className={styles.postContainer}>
      <div className={styles.post}>
        <div className={styles.user}>
          <div className={styles.profilePicContainer}>
            <img className={styles.profilePic}
              src='https://s3-alpha-sig.figma.com/img/d0a7/3619/a7eaeb87169fa6f7361c4c51e67f89ab?Expires=1698019200&Signature=XjynzDMFyeBTJcjBzaDIawi~ESyKcW6XlR~ej5qSZxc2syl8oY12nrlUfVn~xroKHCKw3ZnGVWpWo1zIIELBZrCCNlB4eDGUogleYQ~NIXqoueMBFkEgRK2eOkJY2-wi3x00W-Ts7cORP9pvCb0NrEXIUsikUBJViyk-LtlG-XBo4e54utX6tmlLqx5xU8eMxMbVWsDI75TjY1gVWtNJB-v-quBjsJ5Dm~mo1qSIw-x5xiNIkJZlePP1ML-90qFJBvnlwCDDaJTxUQC94HFhZUhkh6OiXOi8JUQ3~Vi693dOwOJNNmeZ39bsFoQc48tqpY~gRUUZgKVNG7dU2JKpEw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' alt='profile' />
          </div>
          <div className={styles.postUser}>
            <p className={styles.postUserName}>Sai Shirish Katady</p>
            <p className={styles.postUserJobTitle}>Product Designer</p>
            <div className={styles.jobTimer}>
              <img className={styles.jobTimerImg} src="./history-outline.svg" alt="timer" />
              <p className={styles.jobTime}> 1min</p>
            </div>
          </div>
          <div className={styles.addPostSettings}>
          <img className={styles.settingsIcon}
            src='./DotsThree.svg' alt='settings' />
        </div>
        </div>
        <p className={styles.postContent}>New Takeoff webpage for sign in and Join now</p>
        <img alt="image" className={styles.postImg}
        src="https://s3-alpha-sig.figma.com/img/3796/d458/84a37f35de9559168747d7ada8178c4d?Expires=1698019200&Signature=iTDyyjhepoTkhGx8NpgwCyAo-18b6ZPLqapo1RIMU1hq7yWWyp-4rBAvENSBHtiI2HFJsjRxVOYPsZnIaiCHXl2W9jRnM0RDcqinbKkw4xLZ9bTxzh4DP2Y~S0Kz9NpPbeP-H4ysvVv6~aGlcQpPIfwydRv1Pyjg6rvndvFCbpzH43ZvelIiFbxxi0ktp8GFTzu8So91JH1KwhLP17feov8z7l0Ku0YmF5iX6ww5Dx-HDSwBEF0si3DN2-PwMoLP-ZgqoW8Duay9UXrwI4wCbN7e3dd0pd0JY9pJT2vR~Dt5ECAR1e-tcvODQNXecBvtnOKWCYuk91nnIhw3ZFUVBg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
        <div className={styles.btns}>
          <div className={styles.reactionBtns}>
            {/* <div className={styles.avatars}>
              <img className={styles.avatar}
                src='./Ellipse 4.jpg' alt='avatars' />
              <img className={styles.avatar}
                src='./Ellipse 5.jpg' alt='avatars' />
              <img className={styles.avatar}
                src='./Ellipse 4.jpg' alt='avatars' />
              <img className={styles.avatar}
                src='./Ellipse 5.jpg' alt='avatars' />
            </div> */}
            <p className={styles.postComments}>29 comments</p>
          </div>
          <div className={styles.actionBtns}>
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
    </div>


  )
}

export default Posts
