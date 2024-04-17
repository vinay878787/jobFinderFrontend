import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import loginCover from "../../assets/loginCover.svg";
import styles from "./Login.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useJobContext } from "../../Context/JobContext";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

function Login() {
  const { userData, setUserData } = useJobContext();
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginValues({ ...loginValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!loginValues.email) {
      newErrors.email = "Email is required";
    } else if (loginValues.email.length < 5) {
      newErrors.email = "Email must be at least 5 characters long";
    }

    if (!loginValues.password) {
      newErrors.password = "Password is required";
    } else if (loginValues.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters long";
    } else if (loginValues.password.length > 30) {
      newErrors.password = "Password must be at most 30 characters long";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/auth/login`,
          loginValues
        );
        console.log("response", response);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        console.log(axios.defaults.headers);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("name", response.data.name);
        setUserData({
          name: response.data.name,
          ID: response.data.id,
          token: response.data.token,
        });
        console.log("userData : ", userData);
        console.log("headers : ", axios.defaults.headers);
        toast.success("User logged in...", {
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/");
          setLoginValues({
            email: "",
            password: "",
          });
        }, 2000);
      } catch (error) {
        if (error.response.status === 401) {
          toast.error("Invalid Credentials!");
        } else {
          toast.error("Login Failed. Please try again later.");
        }
        navigate("/login");
        setLoginValues({
          email: "",
          password: "",
        });
        console.error("Login failed:", error);
      }
    } else {
      toast.error("Please fill all the fields correctly");
      navigate("/login");
      setLoginValues({
        email: "",
        password: "",
      });
    }
  };

  return (
    <AuthWrapper>
      <div className={styles.mainContainer}>
        <div className={styles.registerContainer}>
          <div className={styles.subContainer}>
            <h1 className={styles.registerHeading}>Already have an account?</h1>
            <h2 className={styles.registerParagraph}>
              Your personal job finder is here
            </h2>
          </div>

          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <label htmlFor="email">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={loginValues.email}
                onChange={handleInputChange}
                name="email"
              />
              <p className={styles.error}>{errors.email}</p>
            </label>

            <label htmlFor="password">
              <input
                type="password"
                id="password"
                placeholder="password"
                value={loginValues.password}
                onChange={handleInputChange}
                name="password"
              />
              <p className={styles.error}>{errors.password}</p>
            </label>

            <button type="submit" className={styles.btn}>
              Create Account
            </button>
            <ToastContainer />
            <div className={styles.isAccount}>
              Already have an account?
              <NavLink to="/register" className={styles.signinLink}>
                Sign In
              </NavLink>
            </div>
          </form>
        </div>
        <div className={styles.backgroundImgContainer}>
          <h1 className={styles.backgroundImgHeading}>
            Your Personal Job Finder
          </h1>
          <img src={loginCover} className={styles.bgImage} alt="Background" />
        </div>
      </div>
    </AuthWrapper>
  );
}

export default Login;
