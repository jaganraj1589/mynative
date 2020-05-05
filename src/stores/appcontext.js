import React, {useState, useContext, useEffect} from 'react';

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
  /** Get token value from local storage if exists */
  const sortFollow = () => {
    alert('sortFollow');
  };
  const sortLikes = () => {
    alert('sortLikes');
  };

  const [userImage, setUserImage] = useState(true);
  const [userProfile, setUserProfile] = useState(false);

  const userDetails = () => {
    setUserProfile(true);
  };
  const closeuserDetails = () => {
    setUserProfile(false);
  };

  return (
    <AppContext.Provider
      value={{
        sortLikes,
        sortFollow,
        userImage,
        userDetails,
        userProfile,
        closeuserDetails,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContextValue = () => useContext(AppContext);
