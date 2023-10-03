import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from '../contexts/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user, isLoadingAuth } = useContext(UserContext);
  if (isLoadingAuth) return null; // or a loading spinner

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
