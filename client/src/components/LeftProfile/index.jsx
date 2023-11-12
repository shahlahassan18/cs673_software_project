import React, { useState, useEffect } from 'react'
import styles from "./leftprofile.module.css"
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';

const LeftProfile = () => {
  const [profilePicture, setprofilePicture] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');

  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate("/profile");
  }


  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userDocRef = doc(db, 'users', currentUser.uid);
      getDoc(userDocRef).then(docSnapshot => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setprofilePicture(data.profilePicture);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setTitle(data.title);
          console.log(`Full Name: ${data.firstName} ${data.lastName}`);
        } else {
          console.error("User document doesn't exist!");
        }
      }).catch(err => {
        console.error("Error fetching user data:", err);
      });
    }
  }, []);

  return (
    <div className={styles.left}>
    <div className={styles.user}>
      <img className={styles.userImage}
      src={profilePicture} alt="user"  />
      <p className={styles.name}>{firstName} {lastName}</p>
      <p className={styles.jobTitle}>{title}</p>
      <button className={styles.viewProfileBtn} onClick={handleViewProfile}>View Profile</button>    </div>
    <div className={styles.menu}>
      <div className={styles.menuItem}>
        <img className={styles.icon} src='./home.svg' alt="home"/>
        <p className={styles.menuText}> Home</p>
      </div>
      <div className={styles.menuItem}>
        <img className={styles.icon} src='./layers.svg' alt="network"/>
        <p className={styles.menuText}> My Network</p>
      </div>
      <div className={styles.menuItem}>
        <img className={styles.icon} src='./briefcase.svg' alt="jobs"/>
        <p className={styles.menuText}> Jobs</p>
      </div>
      <div className={styles.menuItem}>
        <img className={styles.icon} src='./message-square.svg' alt="Messaging"/>
        <p className={styles.menuText}> Messaging</p>
      </div>
      <div className={styles.menuItem}>
        <img className={styles.icon} src='./monitor.svg' alt="business"/>
        <p className={styles.menuText}> For Business</p>
      </div>

    </div>
    </div>
  )
}

export default LeftProfile
