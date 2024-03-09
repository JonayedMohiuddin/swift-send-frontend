import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Create the context provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // Load the user's authentication state from localStorage on component mount
  useEffect(() => {
    const isLoggedInFromStorage = localStorage.getItem('isLoggedIn');
    const userTypeFromStorage = localStorage.getItem('userType');
    const userIdFromStorage = localStorage.getItem('userId');
    const userNameFromStorage = localStorage.getItem('userName');
    const imageUrlFromStorage = localStorage.getItem('imageUrl');

    if (isLoggedInFromStorage === 'true') {
      setIsLoggedIn(true);
      setUserType(userTypeFromStorage);
      setUserId(userIdFromStorage);
      setUserName(userNameFromStorage);
      setImageUrl(imageUrlFromStorage);
    }
  }, []);

  // Function to handle login
  const login = (userType, userId, userName, imageUrl) => {
    setIsLoggedIn(true);
    setUserType(userType);
    setUserId(userId);
    setUserName(userName);
    setImageUrl(imageUrl);

    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userType', userType);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
    localStorage.setItem('imageUrl', imageUrl);
  };

  // Function to handle logout
  const logout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setUserId(null);
    setUserName(null);
    setImageUrl(null);

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('imageUrl');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, userId, userName, imageUrl, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};