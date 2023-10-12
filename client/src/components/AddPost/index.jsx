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
    <div className={styles.addPost}>
      <div className={styles.startPost}>
        <div className={styles.user}>
          <img className={styles.avatar} src="https://cdn.imgbin.com/21/23/1/imgbin-computer-icons-female-user-profile-avatar-material-x1Zz1EDVQQssccaQu0dy0VFGy.jpg" />
        </div>
        <div className={styles.inputPostContainer}>
          <input type="text" className={styles.inputPost} onClick={openModal}
            placeholder="Start Post"
            value={postContent} // Bind input value to state
            onChange={(e) => setPostContent(e.target.value)} // Update postContent state 
            />
            <button 
            disabled={!postContent} //If no content, cannot submit
            onClick={handlePostSubmit}>Post</button> {/* Add a "Post" button */}
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
      </div>
      <div className={styles.btnOptions}>
        <button className={styles.option}><MdOutlinePermMedia />Media</button>
        <button className={styles.option}><FaSuitcase />Job</button>
        <button className={styles.option}><RiArticleLine />Write Article</button>
      </div>
    </div>
  )
}

export default AddPost
