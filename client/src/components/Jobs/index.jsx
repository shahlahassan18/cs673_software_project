import React, { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import styles from "./jobs.module.css";
import Navbars from "./../Navbar";
import LeftProfile from "../LeftProfile";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

const JobItem = ({ job, onBookmarkClick, isBookmarked }) => (
  <div className={styles.job}>
    <div className={styles.logo}>
      <img
        className={styles.job_logo}
        src={job.imageUrl}
        alt={`${job.company} logo`}
      />
    </div>
    <div className={styles.details}>
      <h4 className={styles.job_title}>{job.title}</h4>
      <p className={styles.job_company_name}>{job.company}</p>
      <p className={styles.job_location}>{job.location}</p>
    </div>
    <div
      className={styles.save_icon}
      onClick={(e) => {
        e.stopPropagation(); // Prevent event bubbling
        onBookmarkClick(job);
      }}
    >
      {isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
    </div>
  </div>
);

const Jobs = () => {
  const [currentView, setCurrentView] = useState("recommended");
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsSnapshot = await getDocs(collection(db, "jobs"));
        const jobsData = jobsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleBookmarkClick = async (job) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        if (savedJobs.some((j) => j.id === job.id)) {
          // Remove job from saved jobs
          await updateDoc(userDocRef, {
            interests: arrayRemove(job),
          });
          setSavedJobs((prev) => prev.filter((j) => j.id !== job.id));
        } else {
          // Add job to saved jobs
          await updateDoc(userDocRef, {
            interests: arrayUnion(job),
          });
          setSavedJobs((prev) => [...prev, job]);
        }
      }
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  const toggleView = (view) => {
    setCurrentView(view);
  };

  return (
    <>
      <Navbars />
      <div className={styles.jobs_section}>
        <LeftProfile
          className={styles.left}
          onFindJobsClick={() => toggleView("recommended")}
          onSavedJobsClick={() => toggleView("saved")}
        />
        <div className={styles.jobs_container}>
          <input
            className={styles.search_jobs}
            placeholder="Search Jobs"
          ></input>
          {currentView === "recommended" && (
            <div className={styles.recommended}>
              <div className={styles.jobs}>
                {jobs.slice(0, 3).map((job) => (
                  <JobItem
                    key={job.id}
                    job={job}
                    onBookmarkClick={handleBookmarkClick}
                    isBookmarked={savedJobs.some((j) => j.id === job.id)}
                  />
                ))}
              </div>
            </div>
          )}
          {currentView === "saved" && (
            <div className={styles.recommended}>
              <div className={styles.jobs}>
                {savedJobs.map((job) => (
                  <JobItem
                    key={job.id}
                    job={job}
                    onBookmarkClick={handleBookmarkClick}
                    isBookmarked={true}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Jobs;
