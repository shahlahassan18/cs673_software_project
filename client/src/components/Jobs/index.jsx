import React, { useState, useEffect, useRef } from "react";
import { getDoc,deleteDoc, collection, updateDoc, doc, arrayUnion, arrayRemove, setDoc, serverTimestamp, onSnapshot, query, where, orderBy, limit } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db,storage } from "../../firebase";
import styles from "./jobs.module.css";
import Navbars from "./../Navbar";
import LeftProfile from "../LeftProfile";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import Modal from 'react-modal';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { IoCloseSharp } from "react-icons/io5";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const JobItem = ({ job, onBookmarkClick, isBookmarked, onJobClick , onEditClick,onDeleteClick,scrollToJob}) => {

  
 
  const handleOnJobClick = job =>{
    onJobClick(job)
    scrollToJob()
    
  }

 
  return(
  <div className={styles.job}   onClick={() => handleOnJobClick(job)}>
    <div className={styles.logo}>
      <img
        className={styles.job_logo}
        src={job.imageUrl}
        alt={`${job.company} logo`}
      />
    </div>
    <div className={styles.details}  >
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
      <MdOutlineModeEdit onClick={()=>onEditClick()} />
      <MdOutlineDelete onClick={(e)=>{e.stopPropagation();onDeleteClick(job.id)}} />
    </div>
  </div>
)};

const JobDetails = ({ job, jobRef }) => (
  <div className={styles.job_details} ref={jobRef}>
    <h2>{job.title}</h2>
    <h3>{job.company}</h3>
    <p>{job.location}</p>
    <button className={styles.btn} >Apply</button>
    <p>{job.description}</p>
    <p>{job.requirements}</p>
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
  const [editJobOpen, setEditJobOpen] = useState(false);
  const [editingJob, setEditingJob] = useState({
    title: "",
    company: "",
    type: "",
    salary: "",
    location: "",
    description: "",
    requirements: ""
  });
const [logo, setLogo] = useState("")
const [logoFile, setLogoFile] = useState(null);


  const OpenCreateJobModal = () => {
    setcreateJobOpen(true);
  };

  const CloseCreateJobModal = () => {
    setcreateJobOpen(false);
  };

  const OpenEditJobModal = () => {
    setEditJobOpen(true);
  };

  const CloseEditJobModal = () => {
    setEditJobOpen(false);
  };

  const handleJobClick = (job) => () => {
    setSelectedJob(job);
    console.log("Handle Job Click function !@#")
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
  
      if (currentUser) {
        const jobDocRef = doc(db, "jobs", jobId);
        await deleteDoc(jobDocRef);
  
        // If the job was saved, also remove it from the user's saved jobs
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, {
          interests: arrayRemove(jobId),
        });
  
        // Update the state to reflect the changes
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
        setSavedJobs((prevSavedJobs) => prevSavedJobs.filter((job) => job.id !== jobId));
  
        // If the deleted job was the selected job, clear the selectedJob state
        if (selectedJob && selectedJob.id === jobId) {
          setSelectedJob(null);
        }
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  
  const handleLogoUpload = async (file) => {
    if (!file) return;

    const fileRef = ref(storage, `logos/${file.name}`);

    try {
      const snapshot = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Error uploading logo: ", error);
    }
  };

  const handleLogoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const logoUrl = await handleLogoUpload(file);
      console.log(logoUrl)
      setLogoFile(file); // Set the file state
      setLogo(logoUrl);
    }
  };

  // useEffect(() => {
  //   const jobsCol = collection(db, "jobs");
      
  //   const unsubscribe = onSnapshot(jobsCol, (snapshot) => {
  //     const jobsData = snapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setJobs(jobsData);

  //     if (searchTerm) {
  //       // Filter jobs based on the search term
  //       console.log("search", searchTerm)
  //       const filteredJobs = jobsData.filter((job) =>
  //         job.title.toLowerCase().includes(searchTerm.toLowerCase())
  //       );

  //       setJobs(filteredJobs);

  //     }

  //     // Check for duplicate job IDs
  //     const jobIds = jobsData.map(job => job.id);
  //     const hasDuplicateJobIds = jobIds.length !== new Set(jobIds).size;
  //     console.log('Has duplicate job IDs:', hasDuplicateJobIds);
  //   }, [searchTerm]);
  
  //   // Clean up the listener when the component is unmounted
  //   return () => unsubscribe();
  // }, [searchTerm]);

  useEffect(() => {
    const jobsCol = collection(db, "jobs");
  
    const unsubscribe = onSnapshot(
      query(jobsCol, orderBy("posted On", "desc")), // Sort by "posted On" in descending order
      (snapshot) => {
        const jobsData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setJobs(jobsData);
  
        if (searchTerm) {
          // Filter jobs based on the search term
          const filteredJobs = jobsData.filter((job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
  
          setJobs(filteredJobs);
        }
  
        // Check for duplicate job IDs
        const jobIds = jobsData.map((job) => job.id);
        const hasDuplicateJobIds = jobIds.length !== new Set(jobIds).size;
        console.log("Has duplicate job IDs:", hasDuplicateJobIds);
      },
      [searchTerm]
    );
  
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
  
    // Upload the logo first
    const logoUrl = await handleLogoUpload(logoFile);
  
    // Now, you can use the logoUrl when creating the job
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
      'posted By': currentUser.uid,
      imageUrl: logoUrl, // Add the logo URL to the job data
    });
  
    // Clear form fields
    setJobTitle("");
    setCompanyName("");
    setJobType("");
    setSalary("");
    setJobLocation("");
    setJobDescription("");
    setRequirements("");
    setLogoFile(null); // Clear the logo file
    setLogo(""); // Clear the logo URL
  
    // Close modal
    CloseCreateJobModal();
  };
  


  

  // const handleEditSubmit = async (event) => {
  //   event.preventDefault();
  //   const auth = getAuth();
  //   const currentUser = auth.currentUser;
  
  //   if (!currentUser || !editingJob) {
  //     console.log("User is NOT Authenticated or editingJob is undefined");
  //     return;
  //   }
  
  //   // Upload the logo first
  //   const logoUrl = await handleLogoUpload(logoFile);
  
  //   // Now, you can use the logoUrl when updating the job
  //   const jobsColRef = collection(db, "jobs");
  //   const editedJobDoc = doc(jobsColRef, editingJob.id);
  
  //   await updateDoc(editedJobDoc, {
  //     title: editingJob.title,
  //     company: editingJob.company,
  //     type: editingJob.type,
  //     salary: editingJob.salary,
  //     location: editingJob.location,
  //     description: editingJob.description,
  //     requirements: editingJob.requirements,
  //     imageUrl: logoUrl, // Add the logo URL to the job data
  //   });
  
  //   setEditingJob(null); // Clear the editing job state
  
  //   // Clear form fields (optional, depending on your requirements)
  //   setJobTitle("");
  //   setCompanyName("");
  //   setJobType("");
  //   setSalary("");
  //   setJobLocation("");
  //   setJobDescription("");
  //   setRequirements("");
  //   setLogoFile(null); // Clear the logo file
  //   setLogo(""); // Clear the logo URL
  
  //   // Close modal
  //   CloseEditJobModal();
  // };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    const currentUser = auth.currentUser;
  
    if (!currentUser || !editingJob) {
      console.log("User is NOT Authenticated or editingJob is undefined");
      return;
    }
  
    // Check if a new logo is selected
    let logoUrl = editingJob.imageUrl; // Use the existing imageUrl by default
  
    if (logoFile) {
      // Upload the new logo if available
      logoUrl = await handleLogoUpload(logoFile);
    }
  
    // Now, you can use the logoUrl when updating the job
    const jobsColRef = collection(db, "jobs");
    const editedJobDoc = doc(jobsColRef, editingJob.id);
  
    await updateDoc(editedJobDoc, {
      title: editingJob.title,
      company: editingJob.company,
      type: editingJob.type,
      salary: editingJob.salary,
      location: editingJob.location,
      description: editingJob.description,
      requirements: editingJob.requirements,
      imageUrl: logoUrl, // Use the updated logoUrl
    });
  
    setEditingJob(null); // Clear the editing job state
  
    // Clear form fields (optional, depending on your requirements)
    setJobTitle("");
    setCompanyName("");
    setJobType("");
    setSalary("");
    setJobLocation("");
    setJobDescription("");
    setRequirements("");
    setLogoFile(null); // Clear the logo file
    setLogo(""); // Clear the logo URL
  
    // Close modal
    CloseEditJobModal();
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

  const handleEditJobClick = (job) => {
    console.log("Edit Job :", job)
    setEditingJob(job);
    OpenEditJobModal();
 };

 const handleInputChangeEditJob = (event) => {
  const { name, value } = event.target;
  if (event.target.type === "file") {
    event.target.value = "";
  }
  setEditingJob((prevEditingJob) => ({
    ...prevEditingJob,
    [name]: value,
  }));
};

const jobRef = useRef();

const scrollToJob = () => {
  if (jobRef.current) {
    jobRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
};

//HANDLING LEFT NAVIGATION BAR FOR SMALL SIZES
const [showLeftProfile, setShowLeftProfile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowLeftProfile(window.innerWidth > 800);
    };
    window.addEventListener("resize", handleResize);   
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Navbars />
      <div className={styles.jobs_section}>
      
        {showLeftProfile && (
        <LeftProfile
          onFindJobsClick={() => toggleView("recommended")}
          onSavedJobsClick={() => toggleView("saved")}
        />
      )}
        <div className={styles.right}>
          <div className={styles.search_post}>
            <input
              className={styles.search_jobs}
              placeholder="Search Jobs"
              value={searchTerm}
              onChange={e=> setSearchTerm(e.target.value)}
            ></input>
            <button className={styles.create_job} onClick={OpenCreateJobModal}>Post a Job</button>
            {/* ADD A JOB POSTING */}
            <Modal
              isOpen={createJobOpen}
              onRequestClose={CloseCreateJobModal}
              ariaHideApp={false}
              contentLabel="Add Job Posting Modal"
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
              <input
                type="file"
                placeholder="Upload Company Logo"
                className={styles.formInput}
                name="logo"
                // value={logoFile ? logoFile.name : ""}
                onChange={(event) => handleLogoChange(event)}
              />
              <div className={styles.btns}>
                <button className={styles.btn} onClick={CloseCreateJobModal}>Close</button>
                <button className={styles.btn} onClick={handleSubmit}>Submit</button>
              </div>
            </Modal>

            {/* EDIT A JOB POSTING */}
            <Modal
              isOpen={editJobOpen}
              onRequestClose={CloseEditJobModal}
              ariaHideApp={false}
              contentLabel=" Edit Job Posting Modal"
            >
              {/* <h2>Post a Job</h2> */}
              <div className={styles.title}>
                <h2 className={styles.addExperienceTitle}> Edit a Job Posting</h2>
                <button onClick={CloseEditJobModal} className={styles.modalBtn}><IoCloseSharp/></button>
              </div>
              <input
                type="text"
                placeholder="Job Title"
                className={styles.formInput}
                // value={jobTitle}
                name="title"
                value={editingJob?.title}
                onChange={(event) => handleInputChangeEditJob(event)}
              />
              <input
                type="text"
                placeholder="Company Name"
                className={styles.formInput}
                // value={companyName}
                name="company"
                value={editingJob?.company}
                onChange={(event) => handleInputChangeEditJob(event)}
              />
              <select
                name="jobType"
                id="jobType"
                className={styles.formInput}
                // value={jobType}
                
                value={editingJob?.type}
                onChange={(event) => handleInputChangeEditJob(event)}
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
                // value={salary}
                name="salary"
                value={editingJob?.salary}
                onChange={(event) => handleInputChangeEditJob(event)}
              />
              <input
                type="text"
                placeholder="Job Location"
                className={styles.formInput}
                // value={jobLocation}
                name="location"
                value={editingJob?.location}
                onChange={(event) => handleInputChangeEditJob(event)}
              />
              <textarea
                placeholder="Job Description"
                // value={jobDescription}
                value={editingJob?.description}
                className={styles.formInput}
                name="description"
                onChange={(event) => handleInputChangeEditJob(event)}
              />
              <textarea
                placeholder="Requirements"
                // value={requirements}
                value={editingJob?.requirements}
                className={styles.formInput}
                name="requirements"
                onChange={(event) => handleInputChangeEditJob(event)}
              />
              <input
                type="file"
                placeholder="Upload Company Logo"
                className={styles.formInput}
                // value={jobLocation}
                name="logo"
                // value={editingJob?.logo}
                onChange={(event) => handleLogoChange(event)}
              />
              <div className={styles.btns}>
                <button className={styles.btn} onClick={CloseEditJobModal}>Close</button>
                <button className={styles.btn} onClick={handleEditSubmit}>Submit</button>
              </div>
              
            </Modal>
          </div>
          <div className ={styles.jobsMain}style={{display: 'flex'}}>
            <div className={styles.jobs_container} >
              {currentView === "recommended" && (
                <div className={styles.recommended}>
                  <div className={styles.jobs}>
                  {jobs.map((job) => {
                    return (
                      // <JobItem
                      //   key={job.id}
                      //   job={job}
                      //   onBookmarkClick={handleBookmarkClick}
                      //   isBookmarked={savedJobs.some((j) => j.id === job.id)}
                      //   onJobClick={handleJobClick(job)}
                      // />
                      <JobItem
                        key={job.id}
                        job={job}
                        onBookmarkClick={handleBookmarkClick}
                        isBookmarked={savedJobs.some((j) => j.id === job.id)}
                        onJobClick={handleJobClick(job)}
                        onEditClick={() => handleEditJobClick(job)}
                        onDeleteClick={handleDeleteJob}
                        scrollToJob={scrollToJob}
                        jobRef={jobRef}
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
                        onEditClick={() => handleEditJobClick(job)}
                        onDeleteClick={handleDeleteJob}
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
                <JobDetails job={selectedJob} jobRef={jobRef} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
