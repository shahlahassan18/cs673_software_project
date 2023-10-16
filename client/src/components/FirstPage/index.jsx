import React, { useContext, useEffect, useState } from 'react'
import styles from './firstpage.module.css'
import { Link, useNavigate } from 'react-router-dom' 
import UserContext from '../../features/contexts/UserContext';
import LoadingComponent from '../LoadingContainer'; 

const FirstPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    if (user) {
      navigate('/feed');
    } else {
      setIsLoading(false); 
    }
  }, [user, navigate]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <LoadingComponent /> 
      ) : (
        <>
            <div className={styles.nav}>
              <div className={styles.logoContainer}>
                <img src="/public/logo.jpg" alt="Your Logo" className={styles.logo} />
                <div className={styles.logoTitle}>
                  <h1>TAKE OFF</h1>
                </div>
              </div>
              <div className={styles.linksContainer}>
                <button className={styles.linkBtn}><Link to="/register" className={styles.link}>JOIN NOW</Link></button>
                <button className={styles.linkBtn}><Link to="/login" className={styles.link}>SIGN IN</Link></button>
                {/* <Link to="/register" className={styles.link}>Join Now</Link>
                <Link to="/login" className={styles.link}>Sign In</Link> */}
              </div>
            </div>
     
           <div className={styles.homeImgContainer}>
             <img alt='home' className={styles.homeImg}
              src="https://s3-alpha-sig.figma.com/img/344e/3717/e001ba5428e0c3813dba5fbf4ea9a6ac?Expires=1698019200&Signature=P9TkhoLoT1ZHmTQvmUoOLOOfyCkm7JJ1F81BStNlvsU2HKXXr8rWhT~1n1sLudWeiKV8xpLIl~dJjEQAMVe-zPkumEDLYFDWGcCBz8t~5J0RpsCTpQcGJW-u0icRioktOEHc3AG9MARSsPsAQlJaaf3NOr6QGfFIek~czFk0QL647xZbffn~HQyLBYi9-ffmkBS1N8f0F7jjWpTLhieUzGGMvs~FZr7pJd0PZ-FUka-Gv9ibWIUi8ItFmn1z1sx9w4OD27Hed5806Iih4EP7JoeDH2q0tRz5SAgI2cwgUi9x8q-9b9~rez-whD4ItPFwpJkiR3QBZ7kosfH~Lbi6fQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            />
           </div>
           
          </>
      )}
    </div>
  )
}

export default FirstPage