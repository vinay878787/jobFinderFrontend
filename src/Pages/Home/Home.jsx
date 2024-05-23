import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/AuthWrapper/NavBar";
import { IoSearchOutline } from "react-icons/io5";
import { DEFAULT_SKILLS } from "../../utils/constants";
import Loader from "../../components/AuthWrapper/Loader"
import JobPost from "../../components/AuthWrapper/JobPost";
import styles from "./Home.module.css";
import { useJobContext } from "../../Context/JobContext";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
function Home() {
  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState([]);
  const [jobs, setJobs] = useState([]);
  const {isLoading , setIsLoading} = useJobContext()
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSkills = (e) => {
    if (!skills.includes(e.target.value)) {
      setSkills([...skills, e.target.value]);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  const getAllJobs = async () => {
    setIsLoading(true);
    var response = await axios.get(
      `${BACKEND_URL}/all/?title=${search}&skills=${skills}`
    );
    setIsLoading(false)
    console.log(response.data.message);
    setJobs(response.data.message);
    if (response.data.message.length === 0) {
      setJobs([]);
    } else {
      console.log("error while filtering data");
    }
  };

  const deleteSkill = (selectedSkill) => {
    console.log(selectedSkill);
    const newSkills = skills.filter((skill) => skill !== selectedSkill);
    setSkills([...newSkills]);
  };
  const handleClearBtn = () => {
    setSkills([]);
    setSearch("");
  };

  return (
    <>
    {isLoading && <Loader/>}
    <div>
      <NavBar />
      <div className={styles.filterWrapper}>
        <div className={styles.filterContainer}>
          <div className={styles.searchBar}>
            <IoSearchOutline className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Type any job title"
              name="search"
              value={search}
              onChange={handleSearch}
              className={styles.searchBars}
            />
          </div>
          <div className={styles.filterSkills}>
            <select
              className={styles.inputSelect}
              name="skills"
              value={skills.length > 0 ? skills[skills.length - 1] : ""}
              onChange={handleSkills}
            >
              <option value="" disabled>
                Skills
              </option>
              {DEFAULT_SKILLS.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>

            <div className={styles.selectedSkills}>
              {skills.map((skill) => (
                <div key={skill} className={styles.filteredSkill}>
                  {skill}
                  <div
                    className={styles.deleteFilter}
                    onClick={() => deleteSkill(skill)}
                  >
                    X
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.filterBtn} onClick={() => getAllJobs()}>
              Apply Filter
            </button>
            <button
              className={styles.clearBtn}
              onClick={() => handleClearBtn()}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      <JobPost posts={jobs} />
    </div>
    </>
  );
}

export default Home;
