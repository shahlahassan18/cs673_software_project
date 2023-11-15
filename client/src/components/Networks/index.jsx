import React, { useState } from 'react';
import styles from './networks.module.css';
import Navbars from '../Navbar';
import Users from '../Users';

const Networks = () => {
  const [activeTab, setActiveTab] = useState("Connections");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Navbars />
      <div className={styles.networks_section}>
        <div className={styles.manage_network_section}>
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
            {/* <p className={styles.txt}>1277</p> */}
          </div>
        </div>
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


