import { createContext, useContext ,useState} from "react";

const jobContext = createContext();

const JobContextProvider = ({children}) => {
  const [jobId, setJobId] = useState({});
  const [userData , setUserData] = useState({name:localStorage.getItem("name"), ID:localStorage.getItem("id"),token:localStorage.getItem("token")})
  
  return (
    <jobContext.Provider value={{ jobId, setJobId , userData , setUserData}}>
      {children}
    </jobContext.Provider>
  );
};
const useJobContext = () => useContext(jobContext)

export {JobContextProvider,useJobContext}