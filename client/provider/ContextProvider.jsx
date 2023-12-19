"use client";

import { useContext, useState, createContext } from "react";

const userContext = createContext();

export const ContextProvider = function ({ children }) {
  const [user, setUser] = useState(JSON.parse(typeof window !== 'undefined' ? localStorage?.getItem("User") : null));
  const [projects, setProjects] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [generalConfiguration, setGeneralConfiguration] = useState(null);
  const [displayConfiguration, setDisplayConfiguration] = useState(null);
  const updateUser = function (userData) {
    localStorage?.setItem("User", JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <userContext.Provider
      value={{
        user,
        updateUser,
        projects,
        setProjects,
        episodes,
        setEpisodes,
        generalConfiguration,
        setGeneralConfiguration,
        displayConfiguration,
        setDisplayConfiguration,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = function () {
  return useContext(userContext);
};