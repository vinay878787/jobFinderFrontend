import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./JobPost.module.css";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
function JobPost() {
  const navigate = useNavigate();
  const [createDetails, setCreateDetails] = useState({
    company: "",
    logo: "",
    jobTitle: "",
    salary: "",
    jobType: "",
    jobStyle: "",
    location: "",
    description: "",
    about: "",
    skills: [],
    additionalInformation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "skills" && !createDetails.skills.includes(value)) {
      // Append the selected skill to the existing array of skills
      setCreateDetails((prevState) => ({
        ...prevState,
        skills: [...prevState.skills, value],
      }));
    } else {
      // For other fields, directly update the state
      setCreateDetails({ ...createDetails, [name]: value });
    }
  };

  const deleteSkill = (skillToDelete) => {
    const updatedSkills = createDetails.skills.filter(
      (skill) => skill !== skillToDelete
    );
    setCreateDetails({ ...createDetails, skills: updatedSkills });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("headers", axios.defaults.headers);
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.post(`${BACKEND_URL}/create`, createDetails);
      console.log(response);
      setCreateDetails({
        company: "",
        logo: "",
        jobTitle: "",
        salary: "",
        jobType: "",
        jobStyle: "",
        location: "",
        description: "",
        about: "",
        skills: [],
        additionalInformation: "",
      });
      navigate("/");
    } catch (error) {
      console.log("error posting the data!");
    }
  };

  return (
    <div className={styles.createContainer}>
      <div className={styles.createForm}>
        <h1>Add job description </h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.createSubContainer}>
            <label htmlFor="company">Company Name </label>
            <input
              type="text"
              placeholder="Enter your company name here"
              id="company"
              className={styles.resultElement}
              name="company"
              value={createDetails.company}
              onChange={handleChange}
            />
          </div>

          <div className={styles.createSubContainer}>
            <label htmlFor="logo">Add logo URL</label>
            <input
              type="text"
              placeholder="Enter the link"
              id="logo"
              className={styles.resultElement}
              name="logo"
              value={createDetails.logo}
              onChange={handleChange}
            />
          </div>

          <div className={styles.createSubContainer}>
            <label htmlFor="jobTitle">Job position</label>
            <input
              type="text"
              placeholder="Enter the job position"
              id="jobTitle"
              className={styles.resultElement}
              name="jobTitle"
              value={createDetails.jobTitle}
              onChange={handleChange}
            />
          </div>

          <div className={styles.createSubContainer}>
            <label htmlFor="salary">Monthly salary</label>
            <input
              type="text"
              placeholder="Enter Amount in rupees"
              id="salary"
              className={styles.resultElement}
              name="salary"
              value={createDetails.salary}
              onChange={handleChange}
            />
          </div>

          <div className={styles.createSubContainer}>
            <label htmlFor="jobType">Job type</label>
            <select
              id="jobType"
              className={styles.resultElement}
              name="jobType"
              value={createDetails.jobType}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select
              </option>
              <option>Intern</option>
              <option>Part Time</option>
              <option>Full Time</option>
            </select>
          </div>

          <div className={styles.createSubContainer}>
            <label htmlFor="office">Remote/Office</label>
            <select
              id="office"
              name="jobStyle"
              value={createDetails.jobStyle}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select
              </option>
              <option>Remote</option>
              <option>Office</option>
            </select>
          </div>

          <div className={styles.createSubContainer}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              placeholder="Enter the location"
              id="location"
              className={styles.resultElement}
              name="location"
              value={createDetails.location}
              onChange={handleChange}
            />
          </div>

          <div className={styles.createSubContainer}>
            <label htmlFor="description">Job Description</label>
            <textarea
              type="text"
              placeholder="Type the Job description"
              id="description"
              className={styles.resultElement}
              name="description"
              value={createDetails.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className={styles.createSubContainer}>
            <label htmlFor="About">About Company</label>
            <textarea
              type="text"
              placeholder="Type about your company"
              id="About"
              className={styles.resultElement}
              name="about"
              value={createDetails.about}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className={styles.createSubContainer}>
            <label htmlFor="Skills">Skills Required</label>
            <select
              id="Skills"
              className={styles.resultElement}
              name="skills"
              value={createDetails.skills[createDetails.skills.length - 1]}
              onChange={handleChange}
            >
              <option disabled>Enter the must-have skills</option>
              <option>Html</option>
              <option>Css</option>
              <option>Javascript</option>
              <option>React</option>
            </select>
            
              <div className={styles.selectedSkills}>
                {createDetails.skills.map((skill) => (
                  <div key={skill} className={styles.filteredSkill}>
                    {skill}
                    <span
                      className={styles.deleteFilter}
                      onClick={() => deleteSkill(skill)}
                    >
                      X
                    </span>
                  </div>
                ))}
              </div>
            </div>

          <div className={styles.createSubContainer}>
            <label htmlFor="information">Additional information </label>
            <input
              type="text"
              placeholder="Enter the additional information"
              id="information"
              className={styles.resultElement}
              name="additionalInformation"
              value={createDetails.additionalInformation}
              onChange={handleChange}
            />
          </div>

          <div className={styles.createBtn}>
            <button className={styles.cancelBtn}>Cancel</button>
            <button className={styles.addBtn}>+Add Job</button>
          </div>
        </form>
      </div>

      <div className={styles.createImg}>
        <h1 className={styles.createHeading}>Recruiter add job details here</h1>
        <img src="/create.png" alt="Create job details" />
      </div>
    </div>
  );
}

export default JobPost;
