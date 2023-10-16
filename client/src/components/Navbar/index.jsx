import React, { useContext } from 'react';
import { getAuth, signOut } from "firebase/auth";
import UserContext from '../../features/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import styles from "./navbar.module.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {ImMenu} from "react-icons/im";
import { useState } from 'react';

const Navbars = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false)

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate("/"); // After successful signout, redirect to the first page
    }).catch((error) => {
      console.error("Error signing out: ", error.message);
      alert("Error signing out: " + error.message);
    });
  };

  // return (
  //   <div>
  //     {user && <button onClick={handleLogout}>Logout</button>}
  //   </div>
  // );
  return (
    <>
     <div className={styles.navBar}>
      <div className={styles.logoIcon}>
      <img className={styles.navLogo}
      src="https://s3-alpha-sig.figma.com/img/c286/c76e/9a08ebe78cd93da9cd3ab7a7d8ae9630?Expires=1698019200&Signature=oduQ3~F5ajF2eW9oXDAOmTUCETxrTSxAaff2na52wW4YJoQy8y7cBZysDL26RO3~qpFEvI-Hpffc3WuY6U59mn~Bk-r6~VMziXHkCkrx2LJO4to4dMCD0y~khdELSfKPHo~g4tCLwSQ9hM4cI7X8h1jVQhGO6avRFYg3aMGYRVWUVaNEOT54qBrkcxw9OkkqYAHmpymbAM5WSQsxA8pcGe6E3I-Sy69tIoZkUPSLQzq-hc8uPo~H8Ggni0wmAhiEqDlwtJ7SZvNqfj0WLpJ2X4EKs8qvoFm0mMnF3qvLIe9Ft1r6WLlUhZ6z6Hx-bR82DQ-GjiZZjUk13qkhFaA0~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="logo" />
      <ImMenu size={40} className={styles.menuIcon} onClick={(()=>setIsActive(!isActive))} />
      </div>
      {/* <img className={styles.navLogo}
      src="https://s3-alpha-sig.figma.com/img/c286/c76e/9a08ebe78cd93da9cd3ab7a7d8ae9630?Expires=1698019200&Signature=oduQ3~F5ajF2eW9oXDAOmTUCETxrTSxAaff2na52wW4YJoQy8y7cBZysDL26RO3~qpFEvI-Hpffc3WuY6U59mn~Bk-r6~VMziXHkCkrx2LJO4to4dMCD0y~khdELSfKPHo~g4tCLwSQ9hM4cI7X8h1jVQhGO6avRFYg3aMGYRVWUVaNEOT54qBrkcxw9OkkqYAHmpymbAM5WSQsxA8pcGe6E3I-Sy69tIoZkUPSLQzq-hc8uPo~H8Ggni0wmAhiEqDlwtJ7SZvNqfj0WLpJ2X4EKs8qvoFm0mMnF3qvLIe9Ft1r6WLlUhZ6z6Hx-bR82DQ-GjiZZjUk13qkhFaA0~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="logo" />
      <ImMenu size={40} className={styles.menuIcon} onClick={(()=>setIsActive(!isActive))} /> */}
      <div className={styles.navMenu1}>
        <ul className={styles.navMenu1List}>
          <li className={styles.navMenu1ListItem}>Settings & Privacy</li>
          <li className={styles.navMenu1ListItem}>Help</li>
          <li className={styles.navMenu1ListItem}>Posts & Activity</li>
          <li className={styles.navMenu1ListItem}>Job Posting Account</li>
          <li className={styles.navMenu1ListItem} onClick={handleLogout}>Logout</li>
        </ul>
      </div>
      <div className={styles.navMenu2}>
        <div className={styles.searchBarContainer}>
          <img className={styles.searchIcon}
          src='./search.svg' alt='search' />
          <input type='text' className={styles.searchInput} placeholder="Search" />
        </div>
        <img className={styles.icons}
          src='./layers.svg' alt='layers' />
      <img className={styles.icons}
          src='./notifications_none.svg' alt='notifications' />
      <img className={styles.icons}
          src='./mail.svg' alt='mail' />
      <div className={styles.profilePicContainer}>
      <img className={styles.profilePic}
          src='https://s3-alpha-sig.figma.com/img/4fbc/ef24/2361342c9269270d70d9cd86949ac93b?Expires=1698019200&Signature=acQ0Yar5BqDL7-WqBS0ptH00d4xY8KqUM1tNFATBW1TisBq0XxW4-Cjm5aajlw9XZGYJt7MnBBcMK1lTBJc6NwtNmb6BwLx1ZFS8KLJZtJVgy9hgyN8z3SsAO6RTiQugKaF7Tzw21iqboeTPafwQ6Wgya9d8yxrjTOcJNoRR9JTs01bwfgXXkecMNyCBocAd9l6LHWrjGi4cmRcdFaBlZsE8yTz0cghm3LTjL0UVBv9zlSzFd2OUr-1RbFOFZCXUAQMCifgJwL-kBvTTbcHrMJsxXmPSh6ajDaXh94mtlQgqpA1gbSzW8EFEnDOwTYhGmO5tFrTjLv0Kp2ym2xau4w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' alt='mail' />
      </div>

      </div>

      {isActive && 
      <div className={styles.mobNavBar}>
        <ul className={styles.navMenu1List}>
          <li className={styles.navMenu1ListItem}>Home</li>
          <li className={styles.navMenu1ListItem}>My Network</li>
          <li className={styles.navMenu1ListItem}>Jobs</li>
          <li className={styles.navMenu1ListItem}>Messaging</li>
          <li className={styles.navMenu1ListItem}>For Business</li>
          <li className={styles.navMenu1ListItem}>Settings & Privacy</li>
          <li className={styles.navMenu1ListItem}>Help</li>
          <li className={styles.navMenu1ListItem}>Job Posting Account</li>
          <li className={styles.navMenu1ListItem} onClick={handleLogout}>Logout</li>
        </ul>
        
      </div>}
      
    </div>
    </>
   




  );
}

export default Navbars;
