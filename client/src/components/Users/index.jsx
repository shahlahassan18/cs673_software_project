import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { collection, query, where, doc, addDoc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import styles from "./users.module.css"

const Users = ({ type }) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
    const [contacts, setContacts] = useState([]);
    const [newConnections, setNewConnections] = useState([]);

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

      const fetchNewConnections = async () => {
        const connections = await getNewConnections();
        setNewConnections(connections);
      };
    
      fetchNewConnections();

      const userDocRef = doc(db, "users", currentUser.uid);

      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          fetchData();
          fetchNewConnections();
        } else {
          console.log("No such document!");
        }
      });

      return () => unsubscribe();
    }, []);

      const handleConnectClick = async (contactId) => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
      
        if (currentUser) {
          const connectionsQuery = query(
            collection(db, "connections"),
            where("userId", "==", currentUser.uid),
            where("contactId", "==", contactId)
          );
          const querySnapshot = await getDocs(connectionsQuery);
      
          if (!querySnapshot.empty) {
            console.log("Connection request already exists");
            return;
          }
      
          const newConnection = {
            userId: currentUser.uid,
            contactId: contactId,
            timestamp: new Date(),
            status: "requested"
          };
      
          try {
            const docRef = await addDoc(collection(db, "connections"), newConnection);
            console.log("Document written with ID: ", docRef.id);
            alert("Connection request sent!");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      };

      const getNewConnections = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
          // Get all users
          const usersSnapshot = await getDocs(collection(db, "users"));
          let allUsers = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          // Get current user's contacts
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          let contacts = [];
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            contacts = userData.contacts || [];
          }

          // Add current user's id to the contacts
          contacts.push(currentUser.uid);

          // Filter out the contacts and the current user from all users
          let newConnections = allUsers.filter(user => !contacts.includes(user.id));

          return newConnections;
        }
      };
      
      if (type === "new-connections") {
        return (
          <div className={styles.users}>
            {newConnections.map((user, index) => (
              <div key={index} className={styles.user}>
                <img
                  src={user.profilePicture}
                  alt={user.firstName}
                  className={styles.userImage}
                />
                <p className={styles.userName}>
                  {user.firstName} {user.lastName}
                </p>
                <button onClick={() => handleConnectClick(user.id)} className={styles.connectBtn}>
                  Connect
                </button>
              </div>
            ))}
          </div>
        );
      } else if (type === "contacts") {
        return (
          <div className={styles.users}>
            {contacts.map((contact, index) => (
              <div key={index} className={styles.user}>
                <img
                  src={contact.profilePicture}
                  alt={contact.firstName}
                  className={styles.userImage}
                />
                <p className={styles.userName}>
                  {contact.firstName} {contact.lastName}
                </p>
                <button className={styles.connectBtn}>Connected</button>
              </div>
            ))}
          </div>
        );
      } else if (type ==='requests'){
        return(
          <div className={styles.user}>
               <div className={styles.imgContainer}>
               <img
                  src={"https://andthegeekshall.files.wordpress.com/2014/03/request-icon.jpg"}
                  alt={"requests"}
                  className={styles.userImage}
                />
                <p className={styles.userName}>
                  {/* {"firstName"} {"lastName"} */}
                  Testing Requests
                </p>
               </div>
                
                <div className={styles.btns}>
                <button className={styles.acceptBtn}>Accept</button>
                <button className={styles.acceptBtn}>Ignore</button>
                </div>
          </div>
        )
      }
}

export default Users
