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

  const [mediaModal, setMediaModal] = useState(false);
  const [articleModal, setArticleModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedFile, setSelectedFile] = useState([]);
  
  function openMediaModal() {
    setMediaModal(true);
  }

  function closeMediaModal() {
    setMediaModal(false);
  }

  function openArticleModal(){
    setArticleModal(true);
  }

  function closeArticleModal(){
    setArticleModal(false);
  }
  
  const getFileCategory = (file) => {
    const fileCategories = {
      image: ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp'],
      video: ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.webm'],
    };

    const fileExt = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);

    for (const category in fileCategories) {
      if (fileCategories[category].includes(`.${fileExt}`)) {
        return category;
      }
    }
    // Other types not listed (Prob need to manually add it into fileCategories)
    return 'other';

  };

  const handleMultiFiles = (e) => {
    const files = Array.from(e.target.files);

    // Combine newly selected files + existing selected files (else it will override & destroy)
    setSelectedFile((prevSelectedFiles) => [...prevSelectedFiles, ...files]);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("User is NOT Authenticated");
      return;
    }

    const userId = currentUser.uid;
    // Initialize array to store upload-promise(s)
    const postPromises = [];
    const uploadCounter = selectedFile.length;

    if (uploadCounter === 0) {
      // NO media files, create post without media
      postPromises.push(
        addDoc(collection(db, 'posts'), {
          userId: userId,
          postCont: postContent,
          TimeCreated: serverTimestamp()
        })
      );
    } 
    else {
      // Media files included
      selectedFile.forEach((file) => {
        // ID if its image or video file type
        const fileGrp = getFileCategory(file);
        // Set the directory path from the Ext
        const dir = `media/${userId}/${fileGrp}`;
        const storageRef = ref(storage, `${dir}/${file.name}`);
        const uploadPromise = uploadBytes(storageRef, file).then(() => {
          return getDownloadURL(storageRef);
        });
        // Add each upload-promise to array
        postPromises.push(uploadPromise);
      });

      // Wait for ALL media uploads to finish
      Promise.all(postPromises)
        .then((mediaURLs) => {
          const mediaData = mediaURLs.map((url, index) => ({
            url,
            type: selectedFile[index].type
          }));
          return addDoc(collection(db, 'posts'), {
            userId: userId,
            postCont: postContent,
            media: mediaData,
            TimeCreated: serverTimestamp()
          });
        })
        .then(() => {
          console.log("Posts added with media");
          setPostContent("");
          setSelectedFile([]);
          closeMediaModal();
          // End part is just to deal with grammar (1 = file but 2,3,4,5 = fileS)
          alert(`Uploaded ${uploadCounter} media file${uploadCounter === 1 ? '' : 's'}!`);
        })
        .catch((error) => {
          console.error("Error adding post with media:", error);
        });
    }
  };

  return (
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

        <div className={styles.addPostBtn} onClick={openArticleModal}>
          <img className={styles.icon}
            src='./Article.svg' alt='search' />
          <p className={styles.btnText}>Write Article</p>
        </div>

        <div className={styles.inputPostContainer}>
          <Modal
            isOpen={articleModal}
            onRequestClose={closeArticleModal}
            ariaHideApp={false}
            contentLabel="Article Modal">
            <div>
              <h2>Write your Article</h2>
              <textarea className={styles.articleInput} placeholder="Start writing your article..." onChange={(e) => setPostContent(e.target.value)}></textarea>
              <button className={styles.closeButton} onClick={closeArticleModal}>Close</button>
              <button className={styles.submitButton} onClick={handlePostSubmit}>Submit</button>
            </div>
          </Modal>
        </div>

        <div className={styles.addPostBtn} onClick={openMediaModal}>
          <img className={styles.icon}
            src='./play-circle.svg' alt='search' />
          <p className={styles.btnText}>Media</p>
        </div>

        <div className={styles.inputPostContainer}>
          <Modal
            isOpen={mediaModal}
            onRequestClose={closeMediaModal}
            ariaHideApp={false}
            contentLabel="Media Modal">
            <div>
              <h2>Attach Media Files</h2>
              <input type="file" multiple onChange={handleMultiFiles}/>
            </div>
            <div>
            <h2>Preview</h2>
              {selectedFile.length > 0 && (
                <div>
                  {selectedFile.map((file, index) => (
                    <div key={index}>
                      {file.type.includes('image') ? (
                        <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
                      ) : (
                        <video src={URL.createObjectURL(file)} controls />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <h2>Add Caption</h2>
              <input type="text" className={styles.captionInput} placeholder="Enter caption" onChange={(e) => setPostContent(e.target.value)}/>
            </div>
            <button className={styles.closeButton} onClick={closeMediaModal}>Close</button>
            <button className={styles.submitButton} onClick={handlePostSubmit}>Submit</button>
          </Modal>
        </div>

        <button className={styles.postBtn}
            onClick={handlePostSubmit}>
          Post
        </button>

      </div>

    </div>
  )
}

export default AddPost
