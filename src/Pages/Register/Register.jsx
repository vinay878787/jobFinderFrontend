import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import styles from "./Register.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

function Register() {
  const [registerValues, setRegisterValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    isChecked: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    isChecked: "",
  });

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setRegisterValues({ ...registerValues, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    console.log(registerValues);
    e.preventDefault();
    const newErrors = {};

    // Validate name
    if (!registerValues.name) {
      newErrors.name = "Name is required";
    } else if (registerValues.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }

    // Validate email
    if (!registerValues.email) {
      newErrors.email = "Email is required";
    } else if (registerValues.email.length < 5) {
      newErrors.email = "Email must be at least 5 characters long";
    }

    // Validate phone
    if (!registerValues.phone) {
      newErrors.phone = "Phone number is required";
    } else if (registerValues.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 characters long";
    } else if (registerValues.phone.length > 15) {
      newErrors.phone = "Phone number must be at most 15 characters long";
    }

    // Validate password
    if (!registerValues.password) {
      newErrors.password = "Password is required";
    } else if (registerValues.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters long";
    } else if (registerValues.password.length > 30) {
      newErrors.password = "Password must be at most 30 characters long";
    }

    if (!registerValues.isChecked) {
      newErrors.isChecked = "Please accept the terms and conditions";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        var response = await axios.post(
          `${BACKEND_URL}/auth/register`,
          registerValues
        );
        console.log("response", response);

        toast.success("User registered successfully");
        setTimeout(() => {
          navigate("/login");
          setRegisterValues({
            name: "",
            email: "",
            phone: "",
            password: "",
            isChecked: false,
          });
        }, 2000);
      } catch (error) {
        if (error.response.status === 409) {
          toast.error("User already exists!");
        } else {
          toast.error("Registration Failed. Please try again later.");
        }
        navigate("/register");
        setRegisterValues({
          name: "",
          email: "",
          phone: "",
          password: "",
          isChecked: false,
        });
        console.error("Registration failed:", error);
      }
    } else {
      toast.error("Please fill all the fields correctly");
      navigate("/register");
      setRegisterValues({
        name: "",
        email: "",
        phone: "",
        password: "",
        isChecked: false,
      });
    }
  };

  return (
    <AuthWrapper>
      <div className={styles.mainContainer}>
        <div className={styles.registerContainer}>
          <div className={styles.subContainer}>
            <h1 className={styles.registerHeading}>Create an account</h1>
            <h2 className={styles.registerParagraph}>
              Your personal job finder is here
            </h2>
          </div>

          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <label htmlFor="name">
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={registerValues.name}
                onChange={handleInputChange}
                name="name"
                className={styles.input}
              />
              <p className={styles.error}>{errors.name}</p>
            </label>
            <label htmlFor="email">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={registerValues.email}
                onChange={handleInputChange}
                name="email"
                className={styles.input}
              />
              <p className={styles.error}>{errors.email}</p>
            </label>
            <label htmlFor="phone">
              <input
                type="tel"
                id="phone"
                placeholder="Mobile"
                value={registerValues.phone}
                onChange={handleInputChange}
                name="phone"
                className={styles.input}
              />
              <p className={styles.error}>{errors.phone}</p>
            </label>
            <label htmlFor="password">
              <input
                type="password"
                id="password"
                placeholder="password"
                value={registerValues.password}
                onChange={handleInputChange}
                name="password"
                className={styles.input}
              />
              <p className={styles.error}>{errors.password}</p>
            </label>
            <label htmlFor="checkbox">
              <input
                type="checkbox"
                id="checkbox"
                name="isChecked"
                checked={registerValues.isChecked}
                onChange={handleInputChange}
                className={styles.input}
              />
              By creating an account, I agree to our terms of use and privacy
              policy
              <p className={styles.error}>{errors.isChecked}</p>
            </label>
            <button type="submit" className={styles.btn}>
              Create Account
            </button>
            <ToastContainer />
            <div className={styles.isAccount}>
              Already have an account?
              <NavLink to="/login" className={styles.signinLink}>
                Sign In
              </NavLink>
            </div>
          </form>
        </div>
        <div className={styles.backgroundImgContainer}>
          <h1 className={styles.backgroundImgHeading}>
            Your Personal Job Finder
          </h1>
          <img src="/loginCover.png" className={styles.bgImage} alt="Background" />
        </div>
      </div>
    </AuthWrapper>
  );
}

export default Register;
