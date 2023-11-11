import React, {useState} from 'react'
import styles from "./jobs.module.css"
import Navbars from './../Navbar'
import LeftProfile from '../LeftProfile'
import {BsBookmark, BsBookmarkFill} from 'react-icons/bs'

const Jobs = () => {
    const [showRecommendedJobs, setShowRecommendedJobs] = useState(true);
  const [showSavedJobs, setShowSavedJobs] = useState(false);

  const handleFindJobsClick = () => {
    setShowRecommendedJobs(!showRecommendedJobs);
    setShowSavedJobs(!showSavedJobs);
  };

  const handleSavedJobsClick = () => {
    setShowRecommendedJobs(!showRecommendedJobs);
    setShowSavedJobs(!showSavedJobs);
  };
  return (
    <>
    <Navbars />
    <div className={styles.jobs_section}>
      
        <LeftProfile className ={styles.left} onFindJobsClick={handleFindJobsClick} onSavedJobsClick={handleSavedJobsClick}/>


        {showRecommendedJobs && (
       <div className={styles.jobs_container}>
       <input className={styles.search_jobs} placeholder='Search Jobs'></input>
       <div className={styles.recommended}>
           <h4 className={styles.title}>
              Recommended Jobs 
           </h4>
           <div className={styles.jobs}>
               <div className={styles.job}>
                   <div className={styles.logo}>
                       <img className={styles.job_logo}
                       src="https://s3-alpha-sig.figma.com/img/d0a7/3619/a7eaeb87169fa6f7361c4c51e67f89ab?Expires=1700438400&Signature=BAJvqavXjvmoPHPxSWvkrzPDvt-OXHNcyGC1pIyT32aL7LB~Ul9yKKtbS6487o0fyVdA1tU5KPqchc6Vtgkr1quLYKlyAaXy~IFYNqOuzPsh9mmlbJa3mMQUvv9VSQMJbkuCVpxTrF7f1wy7s428qg901fkqJpdkVssJ8Tjc~5JqspxbIBmtg5CrVA1G3R1OJUknJejW~9oZjRfPDkN498pWn7s-j3e8yoy3o2srKSl858BuRG2I0xDlkhWoSqEXQpoxujSC8rkksINRIHAMYUzT6jdetLjDcJMUMQZC9zVzB-FdyxyKwQ~Zwj0GD8qPakLC-WWF5Trf51EbQQkZNA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                   </div>
                   <div className={styles.details}>
                       <h3 className={styles.job_title}>Software Engineer Internship</h3>
                       <p className={styles.job_company_name}>ABC Company</p>
                       <p className={styles.job_location}>New York, USA</p>
                   </div>
                   <div className={styles.save_icon}>
                         <BsBookmark />
                   </div>     
               </div>

               <div className={styles.job}>
                   <div className={styles.logo}>
                       <img className={styles.job_logo}
                       src="https://s3-alpha-sig.figma.com/img/d0a7/3619/a7eaeb87169fa6f7361c4c51e67f89ab?Expires=1700438400&Signature=BAJvqavXjvmoPHPxSWvkrzPDvt-OXHNcyGC1pIyT32aL7LB~Ul9yKKtbS6487o0fyVdA1tU5KPqchc6Vtgkr1quLYKlyAaXy~IFYNqOuzPsh9mmlbJa3mMQUvv9VSQMJbkuCVpxTrF7f1wy7s428qg901fkqJpdkVssJ8Tjc~5JqspxbIBmtg5CrVA1G3R1OJUknJejW~9oZjRfPDkN498pWn7s-j3e8yoy3o2srKSl858BuRG2I0xDlkhWoSqEXQpoxujSC8rkksINRIHAMYUzT6jdetLjDcJMUMQZC9zVzB-FdyxyKwQ~Zwj0GD8qPakLC-WWF5Trf51EbQQkZNA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                   </div>
                   <div className={styles.details}>
                       <h3 className={styles.job_title}>Software Engineer Internship</h3>
                       <p className={styles.job_company_name}>ABC Company</p>
                       <p className={styles.job_location}>New York, USA</p>
                   </div>
                   <div className={styles.save_icon}>
                         <BsBookmark />
                   </div>     
               </div>
           </div>
       </div>
   </div>    

        ) }


        {showSavedJobs && (
       <div className={styles.jobs_container}>
       <input className={styles.search_jobs} placeholder='Search Jobs'></input>
       <div className={styles.recommended}>
           <h4 className={styles.title}>
              Saved Jobs 
           </h4>
           <div className={styles.jobs}>
               <div className={styles.job}>
                   <div className={styles.logo}>
                       <img className={styles.job_logo}
                       src="https://s3-alpha-sig.figma.com/img/d0a7/3619/a7eaeb87169fa6f7361c4c51e67f89ab?Expires=1700438400&Signature=BAJvqavXjvmoPHPxSWvkrzPDvt-OXHNcyGC1pIyT32aL7LB~Ul9yKKtbS6487o0fyVdA1tU5KPqchc6Vtgkr1quLYKlyAaXy~IFYNqOuzPsh9mmlbJa3mMQUvv9VSQMJbkuCVpxTrF7f1wy7s428qg901fkqJpdkVssJ8Tjc~5JqspxbIBmtg5CrVA1G3R1OJUknJejW~9oZjRfPDkN498pWn7s-j3e8yoy3o2srKSl858BuRG2I0xDlkhWoSqEXQpoxujSC8rkksINRIHAMYUzT6jdetLjDcJMUMQZC9zVzB-FdyxyKwQ~Zwj0GD8qPakLC-WWF5Trf51EbQQkZNA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                   </div>
                   <div className={styles.details}>
                       <h3 className={styles.job_title}>Software Engineer Internship</h3>
                       <p className={styles.job_company_name}>ABC Company</p>
                       <p className={styles.job_location}>New York, USA</p>
                   </div>
                   <div className={styles.save_icon}>
                         <BsBookmark />
                   </div>     
               </div>

               <div className={styles.job}>
                   <div className={styles.logo}>
                       <img className={styles.job_logo}
                       src="https://s3-alpha-sig.figma.com/img/d0a7/3619/a7eaeb87169fa6f7361c4c51e67f89ab?Expires=1700438400&Signature=BAJvqavXjvmoPHPxSWvkrzPDvt-OXHNcyGC1pIyT32aL7LB~Ul9yKKtbS6487o0fyVdA1tU5KPqchc6Vtgkr1quLYKlyAaXy~IFYNqOuzPsh9mmlbJa3mMQUvv9VSQMJbkuCVpxTrF7f1wy7s428qg901fkqJpdkVssJ8Tjc~5JqspxbIBmtg5CrVA1G3R1OJUknJejW~9oZjRfPDkN498pWn7s-j3e8yoy3o2srKSl858BuRG2I0xDlkhWoSqEXQpoxujSC8rkksINRIHAMYUzT6jdetLjDcJMUMQZC9zVzB-FdyxyKwQ~Zwj0GD8qPakLC-WWF5Trf51EbQQkZNA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                   </div>
                   <div className={styles.details}>
                       <h3 className={styles.job_title}>Software Engineer Internship</h3>
                       <p className={styles.job_company_name}>ABC Company</p>
                       <p className={styles.job_location}>New York, USA</p>
                   </div>
                   <div className={styles.save_icon}>
                         <BsBookmark />
                   </div>     
               </div>
           </div>
       </div>
   </div>    

        )}

         {/* {/* --Recommended JOB SECTION */}
 


        {/* --SAVED JOB SECTION */}
        {/* <div className={styles.jobs_container}>
            <input className={styles.search_jobs} placeholder='Search Jobs'></input>
            <div className={styles.recommended}>
                <h4 className={styles.title}>
                   Saved Jobs 
                </h4>
                <div className={styles.jobs}>
                    <div className={styles.job}>
                        <div className={styles.logo}>
                            <img className={styles.job_logo}
                            src="https://s3-alpha-sig.figma.com/img/d0a7/3619/a7eaeb87169fa6f7361c4c51e67f89ab?Expires=1700438400&Signature=BAJvqavXjvmoPHPxSWvkrzPDvt-OXHNcyGC1pIyT32aL7LB~Ul9yKKtbS6487o0fyVdA1tU5KPqchc6Vtgkr1quLYKlyAaXy~IFYNqOuzPsh9mmlbJa3mMQUvv9VSQMJbkuCVpxTrF7f1wy7s428qg901fkqJpdkVssJ8Tjc~5JqspxbIBmtg5CrVA1G3R1OJUknJejW~9oZjRfPDkN498pWn7s-j3e8yoy3o2srKSl858BuRG2I0xDlkhWoSqEXQpoxujSC8rkksINRIHAMYUzT6jdetLjDcJMUMQZC9zVzB-FdyxyKwQ~Zwj0GD8qPakLC-WWF5Trf51EbQQkZNA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                        </div>
                        <div className={styles.details}>
                            <h3 className={styles.job_title}>Software Engineer Internship</h3>
                            <p className={styles.job_company_name}>ABC Company</p>
                            <p className={styles.job_location}>New York, USA</p>
                        </div>
                        <div className={styles.save_icon}>
                              <BsBookmark />
                        </div>     
                    </div>

                    <div className={styles.job}>
                        <div className={styles.logo}>
                            <img className={styles.job_logo}
                            src="https://s3-alpha-sig.figma.com/img/d0a7/3619/a7eaeb87169fa6f7361c4c51e67f89ab?Expires=1700438400&Signature=BAJvqavXjvmoPHPxSWvkrzPDvt-OXHNcyGC1pIyT32aL7LB~Ul9yKKtbS6487o0fyVdA1tU5KPqchc6Vtgkr1quLYKlyAaXy~IFYNqOuzPsh9mmlbJa3mMQUvv9VSQMJbkuCVpxTrF7f1wy7s428qg901fkqJpdkVssJ8Tjc~5JqspxbIBmtg5CrVA1G3R1OJUknJejW~9oZjRfPDkN498pWn7s-j3e8yoy3o2srKSl858BuRG2I0xDlkhWoSqEXQpoxujSC8rkksINRIHAMYUzT6jdetLjDcJMUMQZC9zVzB-FdyxyKwQ~Zwj0GD8qPakLC-WWF5Trf51EbQQkZNA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                        </div>
                        <div className={styles.details}>
                            <h3 className={styles.job_title}>Software Engineer Internship</h3>
                            <p className={styles.job_company_name}>ABC Company</p>
                            <p className={styles.job_location}>New York, USA</p>
                        </div>
                        <div className={styles.save_icon}>
                              <BsBookmark />
                        </div>     
                    </div>
                </div>
            </div>
        </div>   */}
    </div>
    </>
    
  )
}

export default Jobs
