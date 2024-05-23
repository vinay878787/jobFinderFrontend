import { createContext, useContext, useState } from "react";

const jobContext = createContext();

const JobContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [jobId, setJobId] = useState();
  const [jobIDS, setJobIDS] = useState();
  const [userData, setUserData] = useState({
    name: localStorage.getItem("name") || null,
    ID: localStorage.getItem("id") || null,
    token: localStorage.getItem("token") || null,
  });

  return (
    <jobContext.Provider
      value={{
        jobId,
        setJobId,
        userData,
        setUserData,
        jobIDS,
        setJobIDS,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </jobContext.Provider>
  );
};
const useJobContext = () => useContext(jobContext);

export { JobContextProvider, useJobContext };
