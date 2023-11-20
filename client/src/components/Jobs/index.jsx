import React, { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  setDoc,
  serverTimestamp,
  onSnapshot
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import styles from "./jobs.module.css";
import Navbars from "./../Navbar";
import LeftProfile from "../LeftProfile";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import Modal from 'react-modal';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const JobItem = ({ job, onBookmarkClick, isBookmarked, onClick }) => (
  <div className={styles.job} onClick={onClick}>
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
        onClick();
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
  const [createJobOpen, setcreateJobOpen] = useState(false);
  // Store input data to create job listing
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  const OpenCreateJobModal = () => {
    setcreateJobOpen(true);
  };

  const CloseCreateJobModal = () => {
    setcreateJobOpen(false);
  };

  useEffect(() => {
    const jobsCol = collection(db, "jobs");
      
    const unsubscribe = onSnapshot(jobsCol, (snapshot) => {
      const jobsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setJobs(jobsData);
    });
  
    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("User is NOT Authenticated");
      return;
    }

    const jobsColRef = collection(db, "jobs");
    const newJobDoc = doc(jobsColRef);
    await setDoc(newJobDoc, {
      title: jobTitle,
      company: companyName,
      type: jobType,
      salary: salary,
      location: jobLocation,
      description: jobDescription,
      requirements: requirements,
      'posted On': serverTimestamp(),
      'posted By': currentUser.uid
    });
    // Clear form fields
    setJobTitle("")
    setCompanyName("");
    setJobType("");
    setJobLocation("");
    setJobDescription("");
    setRequirements("");
    // Close modal
    CloseCreateJobModal();
  };

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
        <div className={styles.right}>
          <div className={styles.search_post}>
            <input
              className={styles.search_jobs}
              placeholder="Search Jobs"
            ></input>
            <button className={styles.create_job} onClick={OpenCreateJobModal}>Post a Job</button>
            <Modal
              isOpen={createJobOpen}
              onRequestClose={CloseCreateJobModal}
              ariaHideApp={false}
              contentLabel="Job Posting Modal"
            >
              <h2>Post a Job</h2>
              <input
                type="text"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
              />
              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
              />
              <select
                name="jobType"
                id="jobType"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="fullTime">Full Time</option>
                <option value="partTime">Part Time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
                <option value="temporary">Temporary</option>
                <option value="volunteer">Volunteer</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                placeholder="Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
              <input
                type="text"
                placeholder="Job Location"
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
              />
              <textarea
                placeholder="Job Description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <textarea
                placeholder="Requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
              />
              <button onClick={CloseCreateJobModal}>Close</button>
              <button onClick={handleSubmit}>Submit</button>
            </Modal>
          </div>
          <div className={styles.jobs_container}>
            {currentView === "recommended" && (
              <div className={styles.recommended}>
                <div className={styles.jobs}>
                  {jobs.map((job) => (
                    <JobItem
                      key={job.id}
                      job={job}
                      onBookmarkClick={handleBookmarkClick}
                      isBookmarked={savedJobs.some((j) => j.id === job.id)}
                      onClick={() => setSelectedJob(job)}
                    />
                  ))}
                </div>
                {selectedJob && (
                  <div className={styles.job_details}>
                    <h2>{selectedJob.title}</h2>
                    <p>{selectedJob.company}</p>
                    <p>{selectedJob.location}</p>
                    {/* Add more details as needed */}
                  </div>
                )}
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
      </div>
    </>
  );
};

export default Jobs;
