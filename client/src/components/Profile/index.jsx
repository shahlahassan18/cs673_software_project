import React, { useState, useEffect } from 'react'
import Navbars from '../Navbar'
import styles from "./profile.module.css"
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';

const Profile = () => {
    const [profilePicture, setprofilePicture] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [title, setTitle] = useState('');
    const [bio, setBio] = useState('');
    const [followersCount, setfollowersCount] = useState('');
    const [experience, setexperience] = useState('');
    const [skills, setskills] = useState('');
    const [interests, setinterests] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userDocRef = doc(db, 'users', currentUser.uid);
      getDoc(userDocRef).then(docSnapshot => {
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
        } else {
          console.error("User document doesn't exist!");
        }
      }).catch(err => {
        console.error("Error fetching user data:", err);
      });
    }
  }, []);

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
                            <img className={styles.banner}
                            src={"https://s3-alpha-sig.figma.com/img/fae2/705f/4ace82cd939d48de82559874ddfb54a0?Expires=1698624000&Signature=TuixT9J-x2d7FwVZLUswmKMi~iHAux8qPuJgxuSiYciqbX48gUH71KLMDAS2uM7YoGaIHin8XEMxVW4ObYFwVVvZBSpsH4jrMzJc5GFuuBdkI9q2xaHWsanLiBmLqHCl0EsZo0GELVlTQ4mOc2QxXfqF-sCi-q7akvk7MLO40xhE2PkYIeGVifUTcDKTQGfGct-1978FpuQCz5SWX8tTPv76bVo1agYHjZZ~BZZW6MxP2nIZU6BiZwP3FMBNLFkzvr9kBX2ZCozvv3jYojFxkWxsNu-9Hy5TT244YSaX2w3q5v3z7a6VIeI9XW49KOalt1E3NlCdsp3rcEWkVE2-bg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"}/>
                        </div>
                        {/* <div className={styles.picContainer}> */}
                        <div className={styles.userTitles}>
                        <img className={styles.pic}
                            src={profilePicture}/>
                        {/* </div> */}
                        <div className={styles.titleContainer}>
                            <h6 className={styles.username}>{firstName} {lastName}</h6>
                            <p className={styles.jobtitle}>{title} </p> 
                        </div>

                        <div className={styles.btns}>
                          <button className={styles.connectBtn}>
                              <img src='./connect.svg' className={styles.icon} />
                              <p className={styles.btnTxt} > Connect</p>
                          </button>
                          <button className={styles.msgBtn}>
                              <img src='./Union.svg' className={styles.icon} />
                              <p className={styles.btnTxt} > Message</p>
                          </button>
                          <button className={styles.moreBtn}>More</button>
                            
                        </div>
                        </div>

                    </div>
                    {/* 2nd SECTION */}
                    <div className={styles.info}>
                        <h6>General Information</h6>
                        <p className={styles.generalText}>
                            {bio}
                        </p>
                    </div>

                    {/* 3rd SECTION */}
                    <div className={styles.activity}>
                          <h6 >Activity</h6>
                          <p className={styles.followers}>{followersCount} folowers</p>
                          <div className={styles.btns}>
                              <button className={styles.btn}>
                                  Posts
                              </button>
                              <button className={styles.btn}>
                                  Activity
                              </button>
                            </div>
                            
                            <div className={styles.showPostsContainer}>
                                <p className={styles.showPosts}> Show all posts 
                                </p>
                                <img src='./Arrow.svg' className={styles.icon}/>
                            </div>
                    </div>

                    {/* 4th SECTION */}
                      <div className={styles.experienceSection}>
                          <h6 >Experience</h6>

                          <div className={styles.experienceContainer}>
                            {/* TODO */}
                            {/* experience.map((item) => ( */}
                              <img  className={styles.companylogo}
                                  src="https://s3-alpha-sig.figma.com/img/3e08/a066/1cd0b7f7060b9c08df97d21d6a1c7904?Expires=1699228800&Signature=mEVmpZKnvT2ic7lS1d~0TiKj~Pb5nDNaDlrxhOwjj7YboWzzkC5SFPc-nk17Urxxul7CFYe-Jm7w3lXBEZ3jnGqutHxzeDt0K2J-HhDjsW0mqteRV0JuH4WtnqooJFaunAaTmKiijybjYWXrpBi1IFvEp8HUfx4r~QIfYMrlQWHD0SE2D2DGJF0unbuGuZCVSLFR0L7t2PhYogqAHK4vmfDEX~xavyPEpHkUaBcBvTKm4YZEGUq0aN~s4ab1E8gtPvVKG6D0LliHh6sTFY~WSCX81jOJmrl4Mb~rZzPveLD8WyTJRDLyK3nSZEezjqT0m2im98zEqoNxMVULpHnz4w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                              <div className={styles.experience}>
                                <p className={styles.job}>Freelance UX/UI designer</p>
                                <p className={styles.jobCompany}>GkC Construction    -India </p>
                                <p className={styles.jobDate}>Jun 2021 — 2022</p>
                                <p className={styles.jobDesc}>
                                As a dedicated UI Designer at GKC, I am responsible for creating visually appealing and intuitive user interfaces that enhance user experience and drive engagement. My role involves collaborating with cross-functional teams, including UX designers, developers, and product managers, to translate complex ideas into elegant, user-friendly designs. I am passionate about crafting seamless digital experiences and thrive in a fast-paced, innovative environment </p>
                              </div>

                          </div>

                      </div>

                      {/* 5th SECTION */}
                    <div className={styles.skillSection}>
                        {/* TODO */}
                        {/* skills.map((item) => ( */}
                          <div className={styles.showPostsContainer}>
                                <p className={styles.showPosts}> Show all skills 
                                </p>
                                <img src='./Arrow.svg' className={styles.icon}/>
                            </div>
                    </div>

                      {/* 6th SECTION */}
                        <div className={styles.interestSection}>
                            <h6 >Interests</h6>
                            <p>Companies</p>
                            {/* TODO */}
                            {/* interests.map((item) => ( */}

                            <div className={styles.interestContainer}>
                                <img className={styles.companylogo}
                                    src="https://s3-alpha-sig.figma.com/img/3e08/a066/1cd0b7f7060b9c08df97d21d6a1c7904?Expires=1699228800&Signature=mEVmpZKnvT2ic7lS1d~0TiKj~Pb5nDNaDlrxhOwjj7YboWzzkC5SFPc-nk17Urxxul7CFYe-Jm7w3lXBEZ3jnGqutHxzeDt0K2J-HhDjsW0mqteRV0JuH4WtnqooJFaunAaTmKiijybjYWXrpBi1IFvEp8HUfx4r~QIfYMrlQWHD0SE2D2DGJF0unbuGuZCVSLFR0L7t2PhYogqAHK4vmfDEX~xavyPEpHkUaBcBvTKm4YZEGUq0aN~s4ab1E8gtPvVKG6D0LliHh6sTFY~WSCX81jOJmrl4Mb~rZzPveLD8WyTJRDLyK3nSZEezjqT0m2im98zEqoNxMVULpHnz4w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                                <div className={styles.experience}>
                                    <p className={styles.job}>Google </p>
                                    <p className={styles.jobCompany}>10.258M followers </p>
                                    <button className={styles.followBtn} >Follow</button>
                                </div>
                            </div>

                            <div className={styles.interestContainer}>
                                <img className={styles.companylogo}
                                    src="https://s3-alpha-sig.figma.com/img/3e08/a066/1cd0b7f7060b9c08df97d21d6a1c7904?Expires=1699228800&Signature=mEVmpZKnvT2ic7lS1d~0TiKj~Pb5nDNaDlrxhOwjj7YboWzzkC5SFPc-nk17Urxxul7CFYe-Jm7w3lXBEZ3jnGqutHxzeDt0K2J-HhDjsW0mqteRV0JuH4WtnqooJFaunAaTmKiijybjYWXrpBi1IFvEp8HUfx4r~QIfYMrlQWHD0SE2D2DGJF0unbuGuZCVSLFR0L7t2PhYogqAHK4vmfDEX~xavyPEpHkUaBcBvTKm4YZEGUq0aN~s4ab1E8gtPvVKG6D0LliHh6sTFY~WSCX81jOJmrl4Mb~rZzPveLD8WyTJRDLyK3nSZEezjqT0m2im98zEqoNxMVULpHnz4w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                                <div className={styles.experience}>
                                    <p className={styles.job}>Google </p>
                                    <p className={styles.jobCompany}>10.258M followers </p>
                                    <button className={styles.followBtn} >Follow</button>
                                </div>
                            </div>


                        </div>

                    </div>
                  

                </div>
                <div className={styles.others}>
                        <img className={styles.background}
                        src='https://s3-alpha-sig.figma.com/img/192a/a226/5d1a38c7c33b24b4844acb8ef691534b?Expires=1699228800&Signature=jq6Zu9fpBtzDPkJNbSme3eypTMsGW~OMS8s9tFYJlBv1WwotMjdyxXYWowksKw2rFU1rTpBqTaNR3UBep7EyHSwrhbWnwP4XarYISEbexpmSI1DoMZfqXlT25pmfrmDlE77ht1FGRLqfd4VaLy4l5gQlhrMDfw2auEyH3E2FfBnfK8F6TECMqeOdcK3M~8Cjw~TbzUOBo1bUjx7Txn95W9Nl63fEGlHQv-lFy91A8dzIAdRMHgflEcn~HJXxld~5tgEPfuzdY3F9qEKRKRAQ9ktcuKvosjhw7R1ssVmnBj9lLauerWUnP4zXnWU2rPfZtYj-GkILqOkJ7zf~s0OI5g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' />
                        <h6>People you may know</h6>
                        <div className={styles.interestContainer}>
                                <img className={styles.companylogo}
                                    src="https://s3-alpha-sig.figma.com/img/459a/4db2/79a67191ca0792fcf6d4e6e8cad7cf4e?Expires=1699228800&Signature=XX6C8~ItRZqqpP3FZRF2qje0byGf6s9DW-oTz-uKYVrJ71gwhhpQWNYC9PZiDJlInJSPeNKkt8WOfmL0jdDCVtGsvyN9bA0SvOrSGGAaWQUbuu5h3osXwWbynBEaBcApv0a6ENY6Gg06NgelNJr0rl9qCyKLZCIAwFGClUwVGdzB4CdQ0SiyVmXex1-Dzc~v7xFnLB5MMLSCX7JgeRHWKjrIH~a8~SbMMj98po45RsOmAVxQzvGBhvJ3BMIcN6UecPyqw9M2KttQN-Gtj~xERv07K567fKaGDMJhtrOUCEZqnoiPvFIcstlRC~yMqRdzozWNucWnd~cTK57tLX4cZg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                                <div className={styles.experience}>
                                    <p className={styles.job}>Shahla Hassan</p>
                                    <p className={styles.jobCompany}>User information </p>
                                    <button className={styles.followBtn} >Connect</button>
                                </div>
                        </div>
                        <div className={styles.interestContainer}>
                                <img className={styles.companylogo}
                                    src="https://s3-alpha-sig.figma.com/img/3e08/a066/1cd0b7f7060b9c08df97d21d6a1c7904?Expires=1699228800&Signature=mEVmpZKnvT2ic7lS1d~0TiKj~Pb5nDNaDlrxhOwjj7YboWzzkC5SFPc-nk17Urxxul7CFYe-Jm7w3lXBEZ3jnGqutHxzeDt0K2J-HhDjsW0mqteRV0JuH4WtnqooJFaunAaTmKiijybjYWXrpBi1IFvEp8HUfx4r~QIfYMrlQWHD0SE2D2DGJF0unbuGuZCVSLFR0L7t2PhYogqAHK4vmfDEX~xavyPEpHkUaBcBvTKm4YZEGUq0aN~s4ab1E8gtPvVKG6D0LliHh6sTFY~WSCX81jOJmrl4Mb~rZzPveLD8WyTJRDLyK3nSZEezjqT0m2im98zEqoNxMVULpHnz4w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                                <div className={styles.experience}>
                                    <p className={styles.job}>Shahla Hassan</p>
                                    <p className={styles.jobCompany}>User information </p>
                                    <button className={styles.followBtn} >Connect</button>
                                </div>
                        </div>
                    </div>
            </div>

        </div>
    )
}

export default Profile
