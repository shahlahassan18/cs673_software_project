import React, {useState} from 'react'
import styles from "./addpost.module.css"
import {MdOutlinePermMedia} from "react-icons/md";
import {FaSuitcase} from "react-icons/fa";
import {RiArticleLine} from "react-icons/ri";
import Modal from 'react-modal';
import { db, storage } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getAuth } from 'firebase/auth'

const AddPost = () => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(); // Get the authentication instance
    const currentUser = auth.currentUser;
    if(!currentUser){
      console.log("User is NOT Authenticated")
    }
    else{
      const userId = currentUser.uid
      console.log("selectedFile ", selectedFile)
      let mediaURL = null;
      if(selectedFile == null){
        const docRef = addDoc(collection(db, 'posts'),{
          userId: userId,
          postCont: postContent,
          TimeCreated: serverTimestamp()
        });
        console.log("Posts added ID: ", docRef)
      }
      else{
        //Create a reference to the media file in Storage
        const storageRef = ref(storage, `media/${userId}/${selectedFile.name}`);
        await uploadBytes(storageRef, selectedFile).then(() => {
          alert('Uploaded media file!!!')
        });
        mediaURL = await getDownloadURL(storageRef);
        const docRef = addDoc(collection(db, 'posts'),{
          userId: userId,
          postCont: postContent,
          mediaURL: mediaURL,
          TimeCreated: serverTimestamp()
        });
        console.log("Posts added ID: ", docRef)
      }
      setPostContent("");
      setSelectedFile(null);
      closeModal();
    }
     
  };

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
        <input type="text" className={styles.addPostInput} value={postContent} onChange={(e) => setPostContent(e.target.value)}/>
        {/* </div> */}


      </div>
      <div className={styles.addPostBtns}>
        <div className={styles.addPostBtn}>
          <img className={styles.icon}
            src='./Article.svg' alt='search' />
          <p className={styles.btnText}>Write Article</p>
        </div>
        <div className={styles.addPostBtn} onClick={openModal}>
          <img className={styles.icon}
            src='./play-circle.svg' alt='search' />
          <p className={styles.btnText}>Media</p>
        </div>
        <div className={styles.inputPostContainer}>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            contentLabel="Media Modal"
          >
            <div>
              <h2>Attach Media Files</h2>
              <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])}/>
            </div>
            <div>
              <h2>Preview</h2>
              {selectedFile && (
              <div>
                {selectedFile.type.includes('image') ? (
                <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
                ) : (
                <video src={URL.createObjectURL(selectedFile)} controls />
                )}
              </div>
              )}
              </div>
            <div>
              <h2>Add Caption</h2>
              <input type="text" className={styles.captionInput} placeholder="Enter caption" onChange={(e) => setPostContent(e.target.value)}/>
            </div>
            <button className={styles.closeButton} onClick={closeModal}>Close</button>
            <button className={styles.submitButton} onClick={handlePostSubmit}>Submit</button>
          </Modal>
        </div>
        {/* 
        <div className={styles.addPostBtn}>
          <img className={styles.icon}
            src='./image.svg' alt='search' />
          <p className={styles.btnText}>Photo</p>
        </div>
        */} 
        <button className={styles.postBtn} //If no content, cannot submit
            onClick={handlePostSubmit}>
          Post
        </button>
      </div>

    </div>
  )
}

export default AddPost
