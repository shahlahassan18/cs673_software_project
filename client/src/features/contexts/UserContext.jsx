import React, { useState, useContext } from 'react';

const UserContext = React.createContext({
  user: null,
  setUser: () => {}
});

export const useUser = () => {
  return useContext(UserContext);
};

export default UserContext;