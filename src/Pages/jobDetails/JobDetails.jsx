import { useEffect, useState } from "react";
import Loader from "../../components/AuthWrapper/Loader"
import NavBar from "../../components/AuthWrapper/NavBar";
import styles from "./JobDetails.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useJobContext } from "../../Context/JobContext";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

function JobDetails() {
  const [token] = useState(localStorage.getItem("token"));
  const { jobId } = useParams();
  const {jobIDS,setJobIDS,isLoading ,setIsLoading} = useJobContext()
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    company: "",
    salary: "",
    jobType: "",
    jobStyle: "",
    location: "",
    about: "",
    additionalInformation: "",
    description: "",
    logoUrl: "",
    skills: [],
  });

  useEffect(() => {
    console.log("jobID : ", jobId);
    getData();
  }, [jobId]);

  const getData = async () => {
    setIsLoading(true);
    const response = await axios.get(`${BACKEND_URL}/details/${jobId}`);
    setJobIDS(jobId);
    console.log(response);
    setIsLoading(false);
    setJobDetails({
      title: response.data.jobDetails[0].jobTitle,
      company: response.data.jobDetails[0].company,
      salary: response.data.jobDetails[0].salary,
      jobType: response.data.jobDetails[0].jobType,
      jobStyle: response.data.jobDetails[0].jobStyle,
      location: response.data.jobDetails[0].location,
      about: response.data.jobDetails[0].about,
      additionalInformation: response.data.jobDetails[0].additionalInformation,
      description: response.data.jobDetails[0].description,
      logoUrl: response.data.jobDetails[0].logo,
      skills: response.data.jobDetails[0].skills,
    });
  };

  const handleEdit = ()=>{
    navigate("/create", { state: { jobDetails } });
  }

  return (
    <>
    {isLoading && <Loader/>}
    <div className={styles.fullContainer}>
      <NavBar />

      <div className={styles.jobDetailsContainer}>
        <div className={styles.jobDetailsContainer1}>
          <h1>
            {jobDetails.title} [{jobDetails.jobType}] at {jobDetails.company}
          </h1>
        </div>
        <div className={styles.jobDetailsContainer2}>
        <div className={styles.jobDetailsFirstSubContainer}>
        <div className={styles.duration}>1w ago</div>
        <div className={styles.jobType}>{jobDetails.jobType}</div>
        <div className={styles.companyDetails}>
        <img className={styles.logo} src={jobDetails.logoUrl}></img>
        </div>
        </div>
        <div className={styles.jobDetailsSecondSubContainer}>
        <div className={styles.semiSubContainer2}>
        <h1 className={styles.jobTitle}>{jobDetails.title}</h1>
        {token?<button className={styles.editBtn} onClick={handleEdit}>Edit job</button>:""}
        </div>
        <div className={styles.location}>{jobDetails.location}</div>
        </div>
        <div className={styles.jobDetailsThirdSubContainer}>
        <div className={styles.stipendContainer}>
        <div className={styles.stipendContainer1}>
        <img src="/money.svg"></img>
        <div>Stipend</div>
        </div>
        <div className={styles.stipendContainer2}>
        </div>
        <div className={styles.salary}>Rs{jobDetails.salary}/month</div>
        </div>
        </div>
        <div className={styles.jobDetailsFourthSubContainer}>
        <div className={styles.about}>
        <h2>About company</h2>
        <div className={styles.aboutData}>{jobDetails.about}</div>
        </div>

        <div className={styles.job}>
        <h2>About the job/internship</h2>
        <div>{jobDetails.description}</div>
        </div>

        <div className={styles.skills}>
        <h2>Skills required</h2>
        <div className={styles.skillContainer}>
        {jobDetails.skills.map((skill)=>(
          <button className={styles.skillBtn} key={skill}>{skill}</button>
        ))}
        </div>
        </div>

        <div className={styles.additionalInformation}>
        <h2>Additional information</h2>
        <div>{jobDetails.additionalInformation}</div>
        </div>
        
        </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default JobDetails;
