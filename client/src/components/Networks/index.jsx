import React, { useState, useEffect } from 'react';
import styles from './networks.module.css';
import Navbars from '../Navbar';
import Users from '../Users';
import { getAuth } from 'firebase/auth';
import { doc,getDoc, updateDoc, arrayUnion, collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import LeftProfile from '../LeftProfile';

const Networks = () => {
  const [activeTab, setActiveTab] = useState("Connections");
  const [requests, setRequests] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const currentUserId = currentUser.uid;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (currentUser) {
      const connectionsCollectionRef = collection(db, "connections");
      const q = query(connectionsCollectionRef, where("contactId", "==", currentUser.uid));
  
      getDocs(q).then(querySnapshot => {
        const incomingRequests = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            requesterId: doc.data().userId,
            status: doc.data().status,
            ...doc.data()
          }))
          .filter(request => request.status == "requested");
  
        setRequests(incomingRequests);
      }).catch(error => {
        console.error("Error fetching incoming friend requests: ", error);
      });
    }
  }, [currentUser]);

  const acceptFriendRequest = async (id, requesterId, currentUserId) => {
    const requestDocRef = doc(db, "connections", id);
  
    try {
      // 更新好友请求状态为"accepted"
      await updateDoc(requestDocRef, {
        status: "accepted"
      });
  
    } catch (error) {
      console.error("Error updating friend request status: ", error);
    }
  };

  const rejectFriendRequest = async (id, requesterId, currentUserId) => {
    const requestDocRef = doc(db, "connections", id);
  
    try {
      // 更新好友请求状态为"rejected"
      await updateDoc(requestDocRef, {
        status: "rejected"
      });
  
    } catch (error) {
      console.error("Error updating friend request status: ", error);
    }
  };

  const updateUserContacts = async (currentUserId, requesterId) => {
    const userDocRef = doc(db, "users", currentUserId);
    const senderDocRef = doc(db, "users", requesterId);
  
    try {
      // 将发起人的UID添加到当前用户的contacts数组中
      await updateDoc(userDocRef, {
        contacts: arrayUnion(requesterId)
      });

      // 将当前用户的UID添加到发起人的contacts数组中
      await updateDoc(senderDocRef, {
        contacts: arrayUnion(currentUserId)
      });
  
    } catch (error) {
      console.error("Error updating user contacts: ", error);
    }
  };

  const handleAccept = async (id, requesterId) => {
    console.log("Accept request from:", requesterId);
    await acceptFriendRequest(id, requesterId, currentUserId);
    await updateUserContacts(currentUserId, requesterId);
    setRequests(prevRequests => prevRequests.filter(request => request.id !== id));
  };

  const handleReject = async (id, requesterId) => {
    console.log("Reject request from:", requesterId);
    await rejectFriendRequest(id, requesterId, currentUserId);
    setRequests(prevRequests => prevRequests.filter(request => request.id !== id));
  };

  const handleIgnore = (id) => {
    console.log("Ignore request from:", id);
    setRequests(prevRequests => prevRequests.filter(request => request.id !== id));
  };

  const FriendRequest = ({ request, onAccept, onReject, onIgnore }) => {
    const [firstName, setFirstName] = useState('');
    useEffect(() => {
      const fetchFirstName = async () => {
        const name = await getUserFirstName(request.requesterId);
        setFirstName(name);
      };
  
      fetchFirstName();
    }, [request.requesterId]);

    return (
      <div>
        <p>Contacts Request from: {firstName || 'Loading...'}</p>
        <button onClick={() => onAccept(request.id, request.requesterId)}>Accept</button>
        <button onClick={() => onReject(request.id, request.requesterId)}>Reject</button>
        <button onClick={() => onIgnore(request.id)}>Ignore</button>
      </div>
    );
  };

  const getUserFirstName = async (requesterId) => {
    try {
      const userDocRef = doc(db, "users", requesterId);
      const docSnap = await getDoc(userDocRef);
  
      if (docSnap.exists()) {
        console.log("User data:", docSnap.data());
        return docSnap.data().firstName; // 确保字段名与 Firestore 中的一致
      } else {
        // 用户文档不存在
        console.log("No such user!");
        return null;
      }
    } catch (error) {
      console.error("Error getting user data: ", error);
      return null;
    }
  };
  
  


  return (
    <>
      <Navbars />
      {requests.length > 0 && (
      <div className={styles.RequestContainer}>
        <div className={styles.contactRequests}>
          {requests.map(request => (
            <FriendRequest
              key={request.id}
              request={request}
              onAccept={handleAccept}
              onReject={handleReject}
              onIgnore={handleIgnore}
            />
          ))}
        </div>
      </div>
    )}
      <div className={styles.networks_section}>
        {/* <div className={styles.manage_network_section}>
          <h6>Manage your networks</h6>
          <div
            className={`${styles.connection} ${activeTab === "Connections" ? styles.active : ""}`}
            onClick={() => handleTabClick("Connections")}
          >
            <p className={styles.txt}>New Connections</p>
          </div>
          <div
            className={`${styles.contacts} ${activeTab === "Contacts" ? styles.active : ""}`}
            onClick={() => handleTabClick("Contacts")}
          >
            <p className={styles.txt}>Contacts</p>
          </div>
        </div> */}
        <LeftProfile handleTabClick={handleTabClick}/>
        <div className={styles.users}>
                          {activeTab === "Connections" ?
                      <div className={styles.title}>
                           <h3>New Connections</h3>
                           <Users type="new-connections"/>
                       </div>
                       :
                       <div className={styles.title}>
                           <h3>Contacts</h3>
                           <Users type="contacts"/>
                       </div>}
          </div>
        </div>
      
    </>
  );
};

export default Networks;


