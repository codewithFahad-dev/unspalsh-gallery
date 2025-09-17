import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();
const accessKey = import.meta.env.VITE_ACCESS_KEY;

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const localDarkMode = JSON.parse(localStorage.getItem("dark-mode"));
  if (localDarkMode === null) {
    return prefersDarkMode;
  }

  return localDarkMode;
};

const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState("cat");

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.body.classList.toggle("dark-theme", newDarkMode);
  };

  const url = `https://api.unsplash.com/search/photos/?client_id=${accessKey}&query=${searchTerm}&per_page=30`;
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: () => axios.get(url),
    keepPreviousData: true,
  });

  const images = data?.data?.results || [];

  useEffect(() => {
    localStorage.setItem("dark-mode", JSON.stringify(isDarkMode));
    document.body.classList.toggle("dark-theme", isDarkMode);
  }, [isDarkMode]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        isDarkMode,
        toggleDarkMode,
        searchTerm,
        setSearchTerm,
        isError,
        error,
        images,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Context not accessible");
  }
  return context;
};

export { AppProvider, useAppContext };
