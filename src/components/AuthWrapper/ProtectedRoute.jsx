import { Navigate } from "react-router-dom";
import { useJobContext } from "../../Context/JobContext";

function ProtectedRoute({ Component }) {
  const {userData} = useJobContext()  
  return <div>{userData.token ? <Component /> : <Navigate to="/login" />}</div>;
}

export default ProtectedRoute;
