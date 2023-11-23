import React, { useState, useEffect } from "react";
import Navbars from "../Navbar";
import styles from "./profile.module.css";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";


const Profile = () => {
  const [profilePicture, setprofilePicture] = useState("");
  const [backPicture, setbackPicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [followersCount, setfollowersCount] = useState("");
  const [experience, setexperience] = useState([]);
  const [skills, setskills] = useState([]);
  const [interests, setinterests] = useState([]);
  const [newConnections, setNewConnections] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      getDoc(userDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setprofilePicture(data.profilePicture);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setTitle(data.title);
            setBio(data.bio);
            setfollowersCount(data.followersCount);
            setexperience(data.experience);
            setskills(data.skills);
            setinterests(data.interests);
            setbackPicture(data.backPicture);
          } else {
            console.error("User document doesn't exist!");
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }

    const fetchNewConnections = async () => {
      const connections = await getNewConnections();
      setNewConnections(connections);
    };
    fetchNewConnections();
  }, []);

  const getNewConnections = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      // Get all users
      const usersSnapshot = await getDocs(collection(db, "users"));
      let allUsers = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Get current user's contacts
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      let contacts = [];
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        contacts = userData.contacts || [];
      }

      // Add current user's id to the contacts
      contacts.push(currentUser.uid);

      // Filter out the contacts and the current user from all users
      let newConnections = allUsers.filter(
        (user) => !contacts.includes(user.id)
      );

      return newConnections;
    }
  };

  const shuffled = newConnections.sort(() => 0.5 - Math.random());

  // 获取前三个元素
  const selected = shuffled.slice(0, 3);

  return (
    <div>
      <Navbars />
      <div className={styles.container}>
        <div className={styles.left}></div>
        <div className={styles.profileContainer}>
          <div className={styles.profile}>
            {/* 1st section */}
            <div className={styles.user}>
              <div className={styles.bannerContainer}>
                <img className={styles.banner} src={backPicture} />
              </div>
              {/* <div className={styles.picContainer}> */}
              <div className={styles.userTitles}>
                <img className={styles.pic} src={profilePicture} />
                {/* </div> */}
                <div className={styles.titleContainer}>
                  <h6 className={styles.username}>
                    {firstName} {lastName}
                  </h6>
                  <p className={styles.jobtitle}>{title} </p>
                </div>

                <div className={styles.btns}>
                  <button className={styles.connectBtn}>
                    <img src="./connect.svg" className={styles.icon} />
                    <p className={styles.btnTxt}> Connect</p>
                  </button>
                  <button className={styles.msgBtn}>
                    <img src="./Union.svg" className={styles.icon} />
                    <p className={styles.btnTxt}> Message</p>
                  </button>
                  <button className={styles.moreBtn}>More</button>
                </div>
              </div>
            </div>
            {/* 2nd SECTION */}
            <div className={styles.info}>
              <h6>General Information</h6>
              <p className={styles.generalText}>{bio}</p>
            </div>

            {/* 3rd SECTION */}
            <div className={styles.activity}>
              <h6>Activity</h6>
              <p className={styles.followers}>{followersCount} folowers</p>
              <div className={styles.btns}>
                <button className={styles.btn}>Posts</button>
                <button className={styles.btn}>Activity</button>
              </div>

              <div className={styles.showPostsContainer}>
                <p className={styles.showPosts}> Show all posts</p>
                <img src="./Arrow.svg" className={styles.icon} />
              </div>
            </div>

            {/* 4th SECTION */}
            <div className={styles.experienceSection}>
              <h6>Experience</h6>
              {experience.map((exp, index) => (
                <div key={index} className={styles.experienceContainer}>
                  <img className={styles.companylogo} src={exp.companylogo} />
                  <div className={styles.experience}>
                    <p className={styles.job}>{exp.title}</p>
                    <p className={styles.jobCompany}>{exp.company}</p>
                    <p className={styles.jobDate}>
                      {exp.startDate} - {exp.endDate}
                    </p>
                    <p className={styles.jobDesc}>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 5th SECTION */}
            <div className={styles.skillSection}>
              {skills.map((skills, index) => (
                <div key={index} className={styles.showPostsContainer}>
                  <p>{skills}</p>
                </div>
              ))}
              <div className={styles.showPostsContainer}>
                <p className={styles.showPosts}> Show all skills</p>
                <img src="./Arrow.svg" className={styles.icon} />
              </div>
            </div>

            {/* 6th SECTION */}
            <div className={styles.interestSection}>
              <h6>Interests</h6>
              <p>Companies</p>
              {interests.map((interests, index) => (
                <div key={index} className={styles.interestContainer}>
                  <img
                    className={styles.companylogo}
                    src={interests.imageUrl}
                  />
                  <div className={styles.experience}>
                    <p className={styles.job}>{interests.conpany}</p>
                    <p className={styles.jobCompany}>TODO</p>
                    <button className={styles.followBtn}>TODO</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.others}>
        <img className={styles.background}
                        src='/public/profbackpic.svg' />
                        <h6>People you may know</h6>
          {selected.map((user, index) => (
            <div key={index} className={styles.interestContainer}>
              <img
                src={user.profilePicture}
                alt={user.firstName}
                className={styles.companylogo}
              />
              <div className={styles.experience}>
              <p className={styles.job}>
                {user.firstName} {user.lastName}
              </p>
              <p className={styles.jobCompany}>{user.bio}</p>
              <button className={styles.followBtn}
                onClick={() => handleConnectClick(user.id)}
              >
                Connect
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
