import React, { useState } from 'react';
import { addDoc, collection, doc, updateDoc, deleteDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import './contacts.module.css';

const Contacts = () => {
  const [receiverID, setReceiverID] = useState(''); 
  const auth = getAuth();
  const currentUser = auth.currentUser;


  const sendContactsRequest = async (receiverID) => {
    const senderID = currentUser ? currentUser.uid : null

    const request = {
      senderID: senderID,
      receiverID: receiverID,
      timestamp: new Date(),
    };

    await addDoc(collection(db, "contactsRequests"), request);
  };


  const acceptcontactsRequest = async (requestID, senderID) => {
    const receiverID = getCurrentUserID();

    await updateDoc(doc(db, "users", receiverID), {
      contacts: arrayUnion(senderID),
    });

    await updateDoc(doc(db, "users", senderID), {
      contacts: arrayUnion(receiverID),
    });

    await deleteDoc(doc(db, "contactsRequests", requestID));
  };

  return (
    <div>
      <input 
        type="text" 
        value={receiverID} 
        onChange={(e) => setReceiverID(e.target.value)} 
        placeholder="Enter receiver ID"
      />
      <button onClick={() => sendContactsRequest(receiverID)}>Send Request</button>

    </div>
  );
}

export default Contacts;
