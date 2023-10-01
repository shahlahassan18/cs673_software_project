import React, {useState} from 'react'
import styles from "./addpost.module.css"
import {MdOutlinePermMedia} from "react-icons/md";
import {FaSuitcase} from "react-icons/fa";
import {RiArticleLine} from "react-icons/ri";
import Modal from 'react-modal';

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
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className={styles.addPost}>
      <div className={styles.startPost}>
        <div className={styles.user}>
          <img className={styles.avatar} src="https://cdn.imgbin.com/21/23/1/imgbin-computer-icons-female-user-profile-avatar-material-x1Zz1EDVQQssccaQu0dy0VFGy.jpg" />
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
