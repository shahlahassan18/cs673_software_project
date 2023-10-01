import React from 'react'
import styles from "./posts.module.css"
import { AiOutlineLike } from "react-icons/ai";
import {BiCommentDetail, BiRepost} from "react-icons/bi";
import {BsFillSendFill} from "react-icons/bs";


const Posts = () => {
  return (
    <div className={styles.posts}>
      <div className={styles.user}>
        <div className={styles.profile}>
          <div className={styles.userPhoto}>
            <img className={styles.avatar} src="https://cdn.imgbin.com/21/23/1/imgbin-computer-icons-female-user-profile-avatar-material-x1Zz1EDVQQssccaQu0dy0VFGy.jpg" />
          </div>
          <div className={styles.userDetails}>
            <p className={styles.username}>First and Last Name</p>
            <p className={styles.title}>Owner of the company</p>
            <div className={styles.time}>
            <p>Time</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" className="mercado-match" width="16" height="16" focusable="false">
              <path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011-3l.55.55A1.5 1.5 0 015 6.62v1.07a.75.75 0 00.22.53l.56.56a.75.75 0 00.53.22H7v.69a.75.75 0 00.22.53l.56.56a.75.75 0 01.22.53V13a5 5 0 01-5-5zm6.24 4.83l2-2.46a.75.75 0 00.09-.8l-.58-1.16A.76.76 0 0010 8H7v-.19a.51.51 0 01.28-.45l.38-.19a.74.74 0 01.68 0L9 7.5l.38-.7a1 1 0 00.12-.48v-.85a.78.78 0 01.21-.53l1.07-1.09a5 5 0 01-1.54 9z"></path>
            </svg>
            </div>
          </div>
        </div>
        <div className={styles.icons}>
          <button>X</button>
        </div>
      </div>
      <div className={styles.content}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat eius obcaecati dolore minus laudantium. Debitis, porro ratione, corrupti dolor animi laudantium nulla voluptas optio delectus quasi, at sapiente iusto vero?
      </div>
      <div className={styles.contentImage}>
        <img className={styles.contentimg}
        src='https://media.licdn.com/dms/image/sync/D5618AQGkVyMI_HcjwA/companyUpdate-article-image-shrink_627_1200/0/1673464860512/LinkedIn_eBook5reasonserrorsslipintoyourSalesforce__1080x1080png?e=1698883200&v=beta&t=yiiFBWOC3dNCLMKTqRum0h6pb4MSCX8eAj2UXXwslP4' />
      </div>
      <div className={styles.btns}>
        <button className={styles.btn}><AiOutlineLike />Like</button>
        <button className={styles.btn}><BiCommentDetail />Comment</button>
        <button className={styles.btn}><BiRepost />Repost</button>
        <button className={styles.btn}><BsFillSendFill/> Send</button>
      </div>

    </div>
  )
}

export default Posts
