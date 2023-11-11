import React , {useState} from 'react'
import styles from "./leftprofile.module.css"
import {Link} from 'react-router-dom';
// import axios from 'axios';

const LeftProfile = ({onFindJobsClick,onSavedJobsClick}) => {

  const [showJobsMenu, setShowJobsMenu] = useState(false);

  const toggleJobsMenu = () => {
    setShowJobsMenu(!showJobsMenu);
  };

  return (
    <div className={styles.left}>
    <div className={styles.user}>
      <img className={styles.userImage}
      src="https://s3-alpha-sig.figma.com/img/d0a7/3619/a7eaeb87169fa6f7361c4c51e67f89ab?Expires=1698019200&Signature=XjynzDMFyeBTJcjBzaDIawi~ESyKcW6XlR~ej5qSZxc2syl8oY12nrlUfVn~xroKHCKw3ZnGVWpWo1zIIELBZrCCNlB4eDGUogleYQ~NIXqoueMBFkEgRK2eOkJY2-wi3x00W-Ts7cORP9pvCb0NrEXIUsikUBJViyk-LtlG-XBo4e54utX6tmlLqx5xU8eMxMbVWsDI75TjY1gVWtNJB-v-quBjsJ5Dm~mo1qSIw-x5xiNIkJZlePP1ML-90qFJBvnlwCDDaJTxUQC94HFhZUhkh6OiXOi8JUQ3~Vi693dOwOJNNmeZ39bsFoQc48tqpY~gRUUZgKVNG7dU2JKpEw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="user"  />
      <p className={styles.name}>Sai Shirish Katady</p>
      <p className={styles.jobTitle}>UI/UX Design</p>
      <button className={styles.viewProfileBtn}>View Profile</button>
    </div>
    <div className={styles.menu}>
    <Link to="/feed" className={styles.menuItemLink}>
      <div className={styles.menuItem}>  
        <img className={styles.icon} src='./home.svg' alt="home"/>
        <p className={styles.menuText}> Home</p>
           
      </div>
      </Link>  

      <Link to="/network" className={styles.menuItemLink}>
      <div className={styles.menuItem}>
        <img className={styles.icon} src='./layers.svg' alt="network"/>
        <p className={styles.menuText}> My Network</p>
      </div>
      </Link>
     
        {/* <Link to="/jobs" className={styles.menuItemLink}> */}

          <div className={styles.JobmenuItem} onClick={() => toggleJobsMenu()}>
            <img className={styles.icon} src='./briefcase.svg' alt="jobs" />
            <p className={styles.menuText}> Jobs</p>
          </div>
          {showJobsMenu &&
          
            <div className={styles.job_tabs}>
              <Link to="/jobs" className={styles.menuItemLink}>
              <div className={styles.jobItem} onClick={onFindJobsClick}>
                <img className={styles.icon} src='./briefcase.svg' alt="jobs" />
                <p className={styles.menuText}> Find Jobs</p>
              </div>
              </Link>
              <Link to="/jobs" className={styles.menuItemLink}>
              <div className={styles.jobItem} onClick={onSavedJobsClick}>
                <img className={styles.icon} src='./briefcase.svg' alt="jobs" />
                <p className={styles.menuText}> Saved Jobs</p>
              </div>
              </Link>
            </div>}

        {/* </Link> */}

     

        {/* <Link to="/messaging" className={styles.menuItemLink}>
          <div className={styles.menuItem}>
            <img className={styles.icon} src='./message-square.svg' alt="Messaging" />
            <p className={styles.menuText}> Messaging</p>
          </div>
        </Link>   */}
       
      {/* <div className={styles.menuItem}>
        <img className={styles.icon} src='./monitor.svg' alt="business"/>
        <p className={styles.menuText}> For Business</p>
      </div> */}

    </div>
    </div>
  )
}

export default LeftProfile
