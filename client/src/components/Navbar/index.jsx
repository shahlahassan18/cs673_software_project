import React, { useContext } from 'react';
import { getAuth, signOut } from "firebase/auth";
import UserContext from '../../features/contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate("/"); // After successful signout, redirect to the first page
    }).catch((error) => {
      console.error("Error signing out: ", error.message);
      alert("Error signing out: " + error.message);
    });
  };

  return (
    <div>
      {user && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
}

export default Navbar;
