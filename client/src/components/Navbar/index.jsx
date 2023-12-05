import React, { useContext, useState, useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";
import UserContext from '../../features/contexts/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from "./navbar.module.css"
import {ImMenu} from "react-icons/im";
import { doc, getDoc, collection, query, where , getDocs} from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { getDownloadURL, ref } from '@firebase/storage';


const Navbars = ({onFindJobsClick,onSavedJobsClick, handleTabClick}) => {
  const [showJobsMenu, setShowJobsMenu] = useState(false);
  const [showNetWorksMenu, setShowNetWorksMenu] = useState(false);


  const toggleJobsMenu = () => {
    setShowJobsMenu(!showJobsMenu);
  };

  const toggleNetorkMenu = () => {
    setShowNetWorksMenu(!showNetWorksMenu);
  };

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false)
  const [profilePicture, setprofilePicture] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [searchName, setSearchName] = useState("")
  const [searchResults, setSearchResults] = useState([])


  useEffect(() => {
    if (currentUser) {
      const userDocRef = doc(db, 'users', currentUser.uid);
      getDoc(userDocRef).then(docSnapshot => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setprofilePicture(data.profilePicture);
        } else {
          console.error("User document doesn't exist!");
        }
      }).catch(err => {
        console.error("Error fetching user data:", err);
      });
    }
    const loadImage = async () => {
      const url = await fetchImageURL('media/logo.jpg');
      setImageUrl(url);
    };

    loadImage();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate("/"); // After successful signout, redirect to the first page
    }).catch((error) => {
      console.error("Error signing out: ", error.message);
      alert("Error signing out: " + error.message);
    });
  };

  const fetchImageURL = async (imagePath) => {
    try {
      const imageRef = ref(storage, imagePath);
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.error("Error fetching image URL: ", error);
      return null;
    }
  };

  
//SEARCH USERS FUNCTIONALITY
  const handleChangeSearch = (e) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    const handleSearch = async () => {
      //Clearing out the search results
      // if(searchName===""){
      //   setSearchName(null)
      // }
      try {
            const usersCollection = collection(db, "users");
        
            const firstNameQuery = query(
              usersCollection,
              where("firstName", ">=", searchName),
              where("firstName", "<=", searchName + "\uf8ff")
            );
        
            const lastNameQuery = query(
              usersCollection,
              where("lastName", ">=", searchName),
              where("lastName", "<=", searchName + "\uf8ff")
            );
        
            const [firstNameSnapshot, lastNameSnapshot] = await Promise.all([
              getDocs(firstNameQuery),
              getDocs(lastNameQuery),
            ]);
        
            const firstNameResults = firstNameSnapshot.docs.map((doc) => ({
              id: doc.id,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
            }));
        
            const lastNameResults = lastNameSnapshot.docs.map((doc) => ({
              id: doc.id,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
            }));
        
            const results = [...firstNameResults, ...lastNameResults];
            
            setSearchResults(results);
            // console.log("res +", results);
          } catch (error) {
            console.error("Error searching users:", error);
          }
    };

    handleSearch();
  }, [searchName]);
  
  

  // console.log("res +", searchResults);



  
  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.logoIcon}>
          <img className={styles.navLogo}
            src={imageUrl} alt="logo" />
          
          {!isActive &&
          <div className={styles.menu}>
          <div className={styles.menuItem}>
          <Link to="/feed" className={styles.menuItemLink}>
            <img className={styles.icon} src='./home.svg' alt="home" style={{ fill: '#9F9BB9' }} />
          </Link>
          </div>
          <div className={styles.menuItem}>
          <Link to="/network" className={styles.menuItemLink}>
            <img className={styles.icon} src='./layers.svg' alt="network" />
            </Link>
          </div>
          <div className={styles.menuItem}>
          <Link to="/jobs" className={styles.menuItemLink}>
            <img className={styles.icon} src='./briefcase.svg' alt="jobs" />
          </Link>
          </div>
          {/* <div className={styles.menuItem}>
            <img className={styles.icon} src='./message-square.svg' alt="Messaging" />
          </div> */}
          {/* <div className={styles.menuItem}>
            <img className={styles.icon} src='./monitor.svg' alt="business" />
          </div> */}
        </div> }
          <ImMenu size={40} className={styles.menuIcon} onClick={(() => setIsActive(!isActive))} />
        </div>
        {/* <img className={styles.navLogo}
      src="https://s3-alpha-sig.figma.com/img/c286/c76e/9a08ebe78cd93da9cd3ab7a7d8ae9630?Expires=1698019200&Signature=oduQ3~F5ajF2eW9oXDAOmTUCETxrTSxAaff2na52wW4YJoQy8y7cBZysDL26RO3~qpFEvI-Hpffc3WuY6U59mn~Bk-r6~VMziXHkCkrx2LJO4to4dMCD0y~khdELSfKPHo~g4tCLwSQ9hM4cI7X8h1jVQhGO6avRFYg3aMGYRVWUVaNEOT54qBrkcxw9OkkqYAHmpymbAM5WSQsxA8pcGe6E3I-Sy69tIoZkUPSLQzq-hc8uPo~H8Ggni0wmAhiEqDlwtJ7SZvNqfj0WLpJ2X4EKs8qvoFm0mMnF3qvLIe9Ft1r6WLlUhZ6z6Hx-bR82DQ-GjiZZjUk13qkhFaA0~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="logo" />
      <ImMenu size={40} className={styles.menuIcon} onClick={(()=>setIsActive(!isActive))} /> */}
      <div className={styles.navMenu1}>
        <ul className={styles.navMenu1List}>
          {/* <li className={styles.navMenu1ListItem}>Settings & Privacy</li>
          <li className={styles.navMenu1ListItem}>Help</li>
          <li className={styles.navMenu1ListItem}>Posts & Activity</li>
          <li className={styles.navMenu1ListItem}>Job Posting Account</li> */}
          {/* <li className={styles.navMenu1ListItem} onClick={handleLogout}>Logout</li> */}
        </ul>
      </div>
      <div className={styles.navMenu2}>
        <div className={styles.searchBarContainer}>
          <img className={styles.searchIcon}
          src='./search.svg' alt='search' />
          <input type='text' className={styles.searchInput} onChange={e=>handleChangeSearch(e)}
          placeholder="Search" value={searchName} />
        </div>
        
        {searchName!=="" && searchResults.length >0 && 
        <div  className={styles.searchResults}>
        { searchResults.map((ele,i)=>(
            <p key={i} onClick={()=>navigate(`/:${ele.id}`)}
            className={styles.searchResult}>{ele.firstName} {" "} {ele.lastName}</p>
         
        ))}
        </div>
        }
       
        {/* <img className={styles.icons}
          src='./layers.svg' alt='layers' />
      <img className={styles.icons}
          src='./notifications_none.svg' alt='notifications' />
      <img className={styles.icons}
          src='./mail.svg' alt='mail' /> */}
      <div className={styles.navMenu1ListItem} onClick={handleLogout}>Logout</div>
      <div className={styles.profilePicContainer}>
      <img className={styles.profilePic}
          src={profilePicture} alt='mail' />
      </div>

      </div>

      {isActive && 
      <div className={styles.mobNavBar}>
        <ul className={styles.navMenu1List}>
          <li className={styles.navMenu1ListItem} onClick={()=>navigate("/feed")}>Home</li>
          <li className={styles.navMenu1ListItem} onClick={()=>toggleNetorkMenu()}>My Network</li>
          {showNetWorksMenu &&   
          <div className={styles.job_tabs}>
            <Link to="/network" className={styles.menuItemLink}>
              {/* <li className={styles.navMenu1ListItem} onClick={() => handleTabClick("Connections")}> New Connections</li>  */}
              <li className={styles.navMenu1ListItem} onClick={() => navigate("/network")}> New Connections</li> 
            </Link>
            <Link to="/network" className={styles.menuItemLink}>
              {/* <li className={styles.navMenu1ListItem} onClick={() => handleTabClick("Contacts")}> Contacts</li> */}
              <li className={styles.navMenu1ListItem} onClick={() => navigate("/network")}> Contacts</li>
            </Link>
            <Link to="/network" className={styles.menuItemLink}>
              {/* <li className={styles.navMenu1ListItem} onClick={() => handleTabClick("Contacts")}> Contacts</li> */}
              <li className={styles.navMenu1ListItem} onClick={() => navigate("/network")}> Requests</li>
            </Link>
          </div>
          }
          <li className={styles.navMenu1ListItem} onClick={() => toggleJobsMenu()}>Jobs</li>
          {showJobsMenu &&   
          <div className={styles.job_tabs}>
            <Link to="/jobs" className={styles.menuItemLink}>
              <li className={styles.navMenu1ListItem} onClick={onFindJobsClick}> Find Jobs</li> 
            </Link>
            <Link to="/jobs" className={styles.menuItemLink}>
              <li className={styles.navMenu1ListItem} onClick={onSavedJobsClick}> Saved Jobs</li>
            </Link>
          </div>
          }
          {/* <li className={styles.navMenu1ListItem}>Messaging</li>
          <li className={styles.navMenu1ListItem}>For Business</li>
          <li className={styles.navMenu1ListItem}>Settings & Privacy</li>
          <li className={styles.navMenu1ListItem}>Help</li>
          <li className={styles.navMenu1ListItem}>Job Posting Account</li> */}
          <li className={styles.navMenu1ListItem} onClick={()=>navigate("/profile")}>Profile</li>
          <li className={styles.navMenu1ListItem} onClick={handleLogout}>Logout</li>
        </ul>
        
      </div>}
      
    </div>
    </>
   




  );
}

export default Navbars;


