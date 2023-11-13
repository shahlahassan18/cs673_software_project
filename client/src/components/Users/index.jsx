import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import styles from "./users.module.css"

const Users = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const auth = getAuth();
          const currentUser = auth.currentUser;
    
          if (currentUser) {
            const userDocRef = doc(db, 'users', currentUser.uid);
            const userDocSnapshot = await getDoc(userDocRef);
    
            if (userDocSnapshot.exists) {
              const userData = userDocSnapshot.data();
              const contactsData = userData.contacts || [];
    
              // Fetch each contact's details
              const contactsDetails = [];
              for (let contactUID of contactsData) {
                const contactDocRef = doc(db, 'users', contactUID);
                const contactDocSnapshot = await getDoc(contactDocRef);
                if (contactDocSnapshot.exists) {
                  contactsDetails.push(contactDocSnapshot.data());
                }
              }
    
              setContacts(contactsDetails);
            }
          }
        };
    
        fetchData();
      }, []);
      
  return (
    <div className={styles.users}>
            {contacts.map((contact, index) => (
                <div key={index}  className={styles.user}>
                <img src={contact.profilePicture} alt={contact.firstName} className={styles.userImage} />
                <p className={styles.userName}>{contact.firstName} {contact.lastName}</p>
                <button className={styles.connectBtn}>Connect</button>
                </div>
            ))}
    </div>
  )
}

export default Users
