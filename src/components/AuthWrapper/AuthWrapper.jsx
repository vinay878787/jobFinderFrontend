import styles from "./AuthWrapper.module.css"

function AuthWrapper({children}) {
  return (
    <div className={styles.wrapperContainer}>
      {children}
    </div>
  );
}

export default AuthWrapper;
