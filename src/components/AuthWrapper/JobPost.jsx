import { useState } from "react";
import { useJobContext } from "../../Context/JobContext";
import styles from "./JobPost.module.css";
import { useNavigate } from "react-router-dom";

function JobPost({ posts }) {
  const { jobId, setJobId} = useJobContext();
  const navigate = useNavigate();

  const handleViewDetails = (jobID) => {
    console.log("JOBS ID :", jobID);
    setJobId(jobID);
    console.log("JOBS ID (Updated):", jobID); // Updated jobId value
    navigate(`/jobDetails/${jobID}`); // Use jobID here instead of jobId
  };
  
  return (
    <div className={styles.jobContainerWrapper}>
      {Array.isArray(posts) && posts.length === 0 ? (
        <h1>No Jobs!</h1>
      ) : (
        posts.map((post) => (
          <div className={styles.jobContainer} key={post._id}>
            <div className={styles.firstSubJobContainer}>
              <img src={post.logo} alt="logo" />
              <h3>{post.jobTitle}</h3>
              <p>{post.description}</p>
              <div className={styles.skills}>
                {post.skills.map((skill, index) => (
                  <span key={index} className={styles.skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.secondSubJobContainer}>
              <span>₹{post.salary}</span>
              <img src="/flag.svg" alt="flag" />
              <span>{post.location}</span>
            </div>
            <div className={styles.thirdSubJobContainer}>
              <div className={styles.jobStylesContainer}>
                <div>{post.jobType}</div>
                <div>{post.jobStyle}</div>
              </div>
              <div>
                <button
                  className={styles.detailsBtn}
                  onClick={() => handleViewDetails(post._id)}
                >
                  View details
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default JobPost;
