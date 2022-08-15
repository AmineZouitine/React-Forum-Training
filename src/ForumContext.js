import React, { createContext, useContext, useEffect, useState } from "react";

const Forum  = createContext();

const ForumContext = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userName, setUserName] = useState(null);

  return (
    <Forum.Provider value={{ userToken, setUserToken, userName, setUserName}}>
      {children}
    </Forum.Provider>
  );
};

export default ForumContext;

export const ForumState = () => {
  return useContext(Forum);
};
