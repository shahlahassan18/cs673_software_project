import React, {useState} from 'react'
import styles from "./addpost.module.css"
import {MdOutlinePermMedia} from "react-icons/md";
import {FaSuitcase} from "react-icons/fa";
import {RiArticleLine} from "react-icons/ri";
import Modal from 'react-modal';
import { addPostToFirestore } from '../../firebase';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const AddPost = () => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // Use async with const allows us to wait for the Promise returned by addPostToFireStore (avoids callback hell)
  const handlePostSubmit = async () => {
    if (!postContent) return; // If content is empty, cannot submit

    try {
      await addPostToFirestore(firebase.auth().currentUser, postContent);
      closeModal(); // Close the modal after posting
      setPostContent(''); // Clear out input on submit
    } catch (error) {
      console.error(error);
      alert('Error adding post');  
    }
  };

  function handlePostSubmit() {
    if (!postContent) return;
    // Call the function to add the post to Firestore
    addPostToFirestore(firebase.auth().currentUser, postContent); // Use the currentUser property. If a user isn’t signed in, currentUser == null
    closeModal(); // Close the modal after posting
  }

  return (
    // <div className={styles.addPost}>
    //   <div className={styles.startPost}>
    //     <div className={styles.user}>
    //       <img className={styles.avatar} src="https://cdn.imgbin.com/21/23/1/imgbin-computer-icons-female-user-profile-avatar-material-x1Zz1EDVQQssccaQu0dy0VFGy.jpg" />
    //     </div>
    //     <div className={styles.inputPostContainer}>
    //       <input type="text" className={styles.inputPost} onClick={openModal}
    //         placeholder="Start Post" />
    //       <Modal
    //         isOpen={modalIsOpen}
    //         onRequestClose={closeModal}
    //         ariaHideApp={false}
    //         style={customStyles}
    //         contentLabel="Example Modal"
    //       >
    //         <h2>Hello</h2>
    //         <button onClick={closeModal}>X</button>
    //         <div>I am a modal</div>
    //         <form>
    //           <input />
    //           <button>tab navigation</button>
    //           <button>stays</button>
    //           <button>inside</button>
    //           <button>the modal</button>
    //         </form>
    //       </Modal>
    //     </div>
    //   </div>
    //   <div className={styles.btnOptions}>
    //     <button className={styles.option}><MdOutlinePermMedia />Media</button>
    //     <button className={styles.option}><FaSuitcase />Job</button>
    //     <button className={styles.option}><RiArticleLine />Write Article</button>
    //   </div>
    // </div>
    <div className={styles.addPostContainer}>
      <div className={styles.addPostInputContainer}>
        <div className={styles.profilePicContainer}>
          <img className={styles.profilePic}
            src='https://s3-alpha-sig.figma.com/img/d0a7/3619/a7eaeb87169fa6f7361c4c51e67f89ab?Expires=1698019200&Signature=XjynzDMFyeBTJcjBzaDIawi~ESyKcW6XlR~ej5qSZxc2syl8oY12nrlUfVn~xroKHCKw3ZnGVWpWo1zIIELBZrCCNlB4eDGUogleYQ~NIXqoueMBFkEgRK2eOkJY2-wi3x00W-Ts7cORP9pvCb0NrEXIUsikUBJViyk-LtlG-XBo4e54utX6tmlLqx5xU8eMxMbVWsDI75TjY1gVWtNJB-v-quBjsJ5Dm~mo1qSIw-x5xiNIkJZlePP1ML-90qFJBvnlwCDDaJTxUQC94HFhZUhkh6OiXOi8JUQ3~Vi693dOwOJNNmeZ39bsFoQc48tqpY~gRUUZgKVNG7dU2JKpEw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' alt='profile' />
        </div>
        {/* <div className={styles.addPostInput}> */}
        <input type="text" className={styles.addPostInput} />
        {/* </div> */}


      </div>
      <div className={styles.addPostBtns}>
        <div className={styles.addPostBtn}>
          <img className={styles.icon}
            src='./Article.svg' alt='search' />
          <p className={styles.btnText}>Write Article</p>
        </div>
        <div className={styles.addPostBtn}>
          <img className={styles.icon}
            src='./play-circle.svg' alt='search' />
          <p className={styles.btnText}>Video</p>
        </div>
        <div className={styles.inputPostContainer}>
          <input type="text" className={styles.inputPost} onClick={openModal}
            placeholder="Start Post" />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2>Hello</h2>
            <button onClick={closeModal}>X</button>
            <div>I am a modal</div>
            <form>
              <input />
              <button>tab navigation</button>
              <button>stays</button>
              <button>inside</button>
              <button>the modal</button>
            </form>
          </Modal>
        </div>
        <div className={styles.addPostBtn}>
          <img className={styles.icon}
            src='./image.svg' alt='search' />
          <p className={styles.btnText}>Photo</p>
        </div>

        <button className={styles.postBtn} disabled={!postContent} //If no content, cannot submit
            onClick={handlePostSubmit}>
          Post
        </button>
      </div>

    </div>
  )
}

export default AddPost
