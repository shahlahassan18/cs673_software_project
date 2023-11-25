import React, { useState, useEffect } from "react";
import { getDoc, collection, updateDoc, doc, arrayUnion, arrayRemove, setDoc, serverTimestamp, onSnapshot, query, where, orderBy, limit } from "firebase/firestore";
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
import { IoCloseSharp } from "react-icons/io5";

const JobItem = ({ job, onBookmarkClick, isBookmarked, onJobClick }) => (
  <div className={styles.job} onClick={() => onJobClick(job)}>
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
    <div className={styles.save_icon}>
      {isBookmarked ? 
        <BsBookmarkFill   onClick={(e) => {
          e.stopPropagation(); // Prevent event bubbling
          onBookmarkClick(job);
        }}/> 
        : 
        <BsBookmark       onClick={(e) => {
          e.stopPropagation(); // Prevent event bubbling
          onBookmarkClick(job);
        }}/>
      }
    </div>
  </div>
);

const JobDetails = ({ job }) => (
  <div className={styles.job_details}>
    <h2>{job.title}</h2>
    <h3>{job.company}</h3>
    <p>{job.location}</p>
    <p>{job.description}</p>
    {/* Add more fields as needed */}
  </div>
);

const Jobs = () => {
  const [currentView, setCurrentView] = useState("recommended");
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [createJobOpen, setcreateJobOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleJobClick = (job) => () => {
    setSelectedJob(job);
    console.log("Handle Job Click function !@#")
  };

  useEffect(() => {
    const jobsCol = collection(db, "jobs");
      
    const unsubscribe = onSnapshot(jobsCol, (snapshot) => {
      const jobsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setJobs(jobsData);

      if (searchTerm) {
        // Filter jobs based on the search term
        console.log("search", searchTerm)
        const filteredJobs = jobsData.filter((job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setJobs(filteredJobs);

      }

      // Check for duplicate job IDs
      const jobIds = jobsData.map(job => job.id);
      const hasDuplicateJobIds = jobIds.length !== new Set(jobIds).size;
      console.log('Has duplicate job IDs:', hasDuplicateJobIds);
    }, [searchTerm]);
  
    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, [searchTerm]);

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
  
      if (currentUser && job.id) { // Check if job.id is defined
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        const userSavedJobs = userDoc.data().interests;
  
        if (userSavedJobs.includes(job.id)) {
          // Remove job from saved jobs
          await updateDoc(userDocRef, {
            interests: arrayRemove(job.id),
          });
          setSavedJobs((prevJobs) => {
            const updatedJobs = prevJobs.filter((j) => j.id !== job.id);
            return updatedJobs;
          });
          console.log("Removed");
        } else {
          // Add job to saved jobs
          await updateDoc(userDocRef, {
            interests: arrayUnion(job.id),
          });
          setSavedJobs((prevJobs) => {
            const isJobAlreadySaved = prevJobs.find((j) => j.id === job.id);
            const updatedJobs = isJobAlreadySaved ? prevJobs : [...prevJobs, job];
            return updatedJobs;
          });
          console.log("Added");
        }
      }
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  useEffect(() => {
    const fetchSavedJobs = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
    
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
    
        if (userDoc.exists()) {
          const userSavedJobIds = userDoc.data().interests;
          const userSavedJobs = await Promise.all(
            userSavedJobIds.map(async (jobId) => {
              const jobDoc = await getDoc(doc(db, "jobs", jobId));
              return { id: jobId, ...jobDoc.data() };
            })
          );
          setSavedJobs(userSavedJobs);
        }else{
          setSavedJobs([]);
        }
        
        if (searchTerm) {
          // Filter jobs based on the search term
          console.log("search", searchTerm)
          const filteredJobs = savedJobs.filter((job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
  
          setSavedJobs(filteredJobs);
  
        }

      }
    };
  
    fetchSavedJobs();
  }, [currentView]);

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
              value={searchTerm}
              onChange={e=> setSearchTerm(e.target.value)}
            ></input>
            <button className={styles.create_job} onClick={OpenCreateJobModal}>Post a Job</button>
            <Modal
              isOpen={createJobOpen}
              onRequestClose={CloseCreateJobModal}
              ariaHideApp={false}
              contentLabel="Job Posting Modal"
            >
              {/* <h2>Post a Job</h2> */}
              <div className={styles.title}>
                <h2 className={styles.addExperienceTitle}>Post A Job</h2>
                <button onClick={CloseCreateJobModal} className={styles.modalBtn}><IoCloseSharp/></button>
              </div>
              <input
                type="text"
                placeholder="Job Title"
                className={styles.formInput}
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
              />
              <input
                type="text"
                placeholder="Company Name"
                className={styles.formInput}
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
              />
              <select
                name="jobType"
                id="jobType"
                className={styles.formInput}
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
                className={styles.formInput}
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
              <input
                type="text"
                placeholder="Job Location"
                className={styles.formInput}
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
              />
              <textarea
                placeholder="Job Description"
                value={jobDescription}
                className={styles.formInput}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <textarea
                placeholder="Requirements"
                value={requirements}
                className={styles.formInput}
                onChange={(e) => setRequirements(e.target.value)}
              />
              <div className={styles.btns}>
                <button className={styles.btn} onClick={CloseCreateJobModal}>Close</button>
                <button className={styles.btn} onClick={handleSubmit}>Submit</button>
              </div>
            </Modal>
          </div>
          <div style={{display: 'flex'}}>
            <div className={styles.jobs_container}>
              {currentView === "recommended" && (
                <div className={styles.recommended}>
                  <div className={styles.jobs}>
                  {jobs.map((job) => {
                    return (
                      <JobItem
                        key={job.id}
                        job={job}
                        onBookmarkClick={handleBookmarkClick}
                        isBookmarked={savedJobs.some((j) => j.id === job.id)}
                        onJobClick={handleJobClick(job)}
                      />
                    );
                  })}
                  </div>
                </div>
              )}
              {currentView === "saved" && (
                <div className={styles.recommended}>
                  <div className={styles.jobs}>
                  {savedJobs.length>0 ? savedJobs.map((job) => {
                    console.log('Job:', job);
                    return (
                      <JobItem
                        key={job.id ? job.id.toString() : ''}
                        job={job}
                        isBookmarked={true}
                        onBookmarkClick={handleBookmarkClick}
                        onJobClick={handleJobClick(job)}
                      />
                    );
                  }) : <h3>No Saved Jobs</h3>
                }
                  </div>
                </div>
              )}
            </div>   
            {selectedJob && (
              <div className={styles.job_details_column}>
                <JobDetails job={selectedJob} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
