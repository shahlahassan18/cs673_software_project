import React, { useState, useEffect } from "react";
import Navbars from "../Navbar";
import styles from "./profile.module.css";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { FiPlus } from "react-icons/fi";
import Modal from 'react-modal';
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";


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
  const [experienceModal, setExperienceModal] = useState(false);
  const [skillModal, setSkillModal] = useState(false)
  const [addProfilePicModal, setAddProfilePicModal] = useState(false)
  const [addBannerModal, setAddBannerModal] = useState(false)
  const [infoModal, setInfoModal] = useState(false)
  const [generalInfoInput , setGeneralInfoInput] = useState("")
  const [generalInfo , setGeneralInfo] = useState("")

  //OPEN AND CLOSE MODAL FUNCTIONS
  function openExperienceModal() {
    setExperienceModal(true);
  }

  function closeExperienceModal() {
    setExperienceModal(false);
  }
  function openSkillModal() {
    setSkillModal(true);
  }

  function closeSkillModal() {
    setSkillModal(false);
  }

  function openAddProfilePicModal() {
    setAddProfilePicModal(true);
  }

  function closeAddProfilePicModal() {
    setAddProfilePicModal(false);
  }
  function openAddBannerModal() {
    setAddBannerModal(true);
  }

  function closeAddBannerModal() {
    setAddBannerModal(false);
  }

  function openInfoModal() {
    setInfoModal(true);
  }

  function closeInfoModal() {
    setInfoModal(false);
  }

  //General information form submission
  function handleGeneralInfoSubmit(e){
    e.preventDefault()
    console.log(generalInfoInput)
    setGeneralInfo(generalInfoInput)
    closeInfoModal()
  }

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
              <div className={styles.bannerContainer} onClick={openAddBannerModal}>
                <img className={styles.banner} src={backPicture} />
              </div>
              {/* <div className={styles.picContainer}> */}
              <div className={styles.userTitles}>
                <img className={styles.pic} onClick={openAddProfilePicModal}
                 src={profilePicture} />
                {/* </div> */}
                <div className={styles.titleContainer}>
                  <h6 className={styles.username}>
                    {firstName} {lastName}
                  </h6>
                  <p className={styles.jobtitle}>{title} </p>
                </div>

                {/* ADD PROFILE PICTURE MODAL */}
            <Modal
            isOpen={addProfilePicModal}
            onRequestClose={closeSkillModal}
            ariaHideApp={false}
            contentLabel=" Add Profile Picture Modal">
              <div className={styles.title}>
                <h2 className={styles.addExperienceTitle}>Add Profile Picture</h2>
                <button onClick={closeAddProfilePicModal} className={styles.modalBtn}><IoCloseSharp/></button>
              </div>
              <form className={styles.experienceForm}>
                <input type='file' placeholder="Upload Profile Picture" className={styles.formInput} />
                <div className={styles.btns}>
                  <button className={styles.btn} >Submit</button>
                </div>
              </form>
          </Modal>

             {/* ADD BANNER  MODAL */}
             <Modal
            isOpen={addBannerModal}
            onRequestClose={closeAddBannerModal}
            ariaHideApp={false}
            contentLabel=" Add Banner Modal">
              <div className={styles.title}>
                <h2 className={styles.addExperienceTitle}>Add Banner</h2>
                <button onClick={closeAddBannerModal} className={styles.modalBtn}><IoCloseSharp/></button>
              </div>
              <form className={styles.experienceForm}>
                <input type='file' placeholder="Upload Banner" className={styles.formInput} />
                <div className={styles.btns}>
                  <button className={styles.btn} >Submit</button>
                </div>
              </form>
          </Modal>




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
              <div className={styles.infoContainer}>
              <h6>General Information</h6>
              {generalInfo ? 
              <MdOutlineModeEdit onClick={openInfoModal}/> 
              : 
              <FiPlus onClick={openInfoModal}/>}
              </div>    
              {/* <p className={styles.generalText}>{bio}</p> */}
              {generalInfo &&
              <p>{generalInfo}</p>
              }
            </div>

             {/* ADD /EDIT  GENERAL INFORMATION MODAL */}
             <Modal
            isOpen={infoModal}
            onRequestClose={closeInfoModal}
            ariaHideApp={false}
            contentLabel=" Add/Edit General Information Modal">
              <div className={styles.title}>
                <h2 className={styles.addExperienceTitle}>General Information</h2>
                <button onClick={closeInfoModal} className={styles.modalBtn}><IoCloseSharp/></button>
              </div>
              <form className={styles.experienceForm} onSubmit={handleGeneralInfoSubmit}>
                <textarea type='text' value={generalInfoInput} onChange={e=>setGeneralInfoInput(e.target.value)}
                 placeholder="Enter General Information" className={styles.formInput} />
                <div className={styles.btns}>
                  <button className={styles.btn} >Submit</button>
                </div>
              </form>
          </Modal>

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
              <div className={styles.experienceTitle}>
                <h6>Experience</h6>
                <FiPlus onClick={openExperienceModal} />
              </div>
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
                  <MdOutlineModeEdit />
                </div>
              ))}
            </div>
             {/* ADD EXPERIENCE MODAL */}
            <Modal
            isOpen={experienceModal}
            onRequestClose={closeExperienceModal}
            ariaHideApp={false}
            contentLabel=" Add Experience Modal">
              <div className={styles.title}>
                <h2 className={styles.addExperienceTitle}>Add Experience</h2>
                <button onClick={closeExperienceModal} className={styles.modalBtn}><IoCloseSharp/></button>
              </div>
              <form className={styles.experienceForm}>
                <input type='text' placeholder="Enter Job Title" className={styles.formInput} />
                <input type='text' placeholder="Enter Company Name" className={styles.formInput} />
                <input type='text' placeholder="Enter Date range" className={styles.formInput} />
                <textarea type='text' placeholder="Enter Description" className={styles.formInput} />
                <div className={styles.btns}>
                  <button className={styles.btn} >Submit</button>
                </div>
              </form>
          </Modal>

            {/* 5th SECTION */}
     
            <div className={styles.skillSection}>
            <div className={styles.experienceTitle}>
                <h6>Skills</h6>
                <FiPlus onClick={openSkillModal} />
              </div>
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

           {/* ADD SKILL MODAL */}
            <Modal
            isOpen={skillModal}
            onRequestClose={closeSkillModal}
            ariaHideApp={false}
            contentLabel=" Add Skills Modal">
              <div className={styles.title}>
                <h2 className={styles.addExperienceTitle}>Add Skills</h2>
                <button onClick={closeSkillModal} className={styles.modalBtn}><IoCloseSharp/></button>
              </div>
              <form className={styles.experienceForm}>
                <input type='text' placeholder="Enter Skill" className={styles.formInput} />
                <div className={styles.btns}>
                  <button className={styles.btn} >Submit</button>
                </div>
              </form>
          </Modal>

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
