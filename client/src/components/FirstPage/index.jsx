import React, { useContext, useEffect } from 'react'
import styles from './firstpage.module.css'
import { Link, useNavigate} from 'react-router-dom' 
import UserContext from '../../features/contexts/UserContext';

const FirstPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/feed');
    }
    
  }, [user, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src="/public/logo.jpg" alt="Your Logo" className={styles.logo} />
      </div>
      <div className={styles.linksContainer}>
        <Link to="/register" className={styles.link}>Join in</Link>
        <Link to="/login" className={styles.link}>Sign up</Link>
      </div>
    </div>
  )
}

export default FirstPage
