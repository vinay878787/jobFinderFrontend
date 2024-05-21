import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useJobContext } from "../../Context/JobContext";
import { useState } from "react";

function NavBar() {
  const { userData } = useJobContext();
  const [token] = useState(localStorage.getItem("token"));
  console.log("user data from nav bar :", userData);

  const handleLogout = ()=>{
    localStorage.clear();
  }
  return (
    <div className={styles.navContainer}>
      <NavLink className={styles.navSubContainer1} to="/">Jobfinder</NavLink>
      <div className={styles.navSubContainer2}>
        {userData.token ? (
          <NavLink to="/create" className={styles.navItems}>
            CreateJob
          </NavLink>
        ) : (
          ""
        )}
        <NavLink to="/login" className={styles.navItems}>
          {token ? <div onClick={handleLogout}>Logout</div> : <div>Login</div>}
        </NavLink>
        {localStorage.getItem("token") ? (
          <div className={styles.navItems}>Hello ! {userData.name}</div>
        ) : (
          <NavLink to="/register" className={styles.navItems}>
            Register
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default NavBar;
