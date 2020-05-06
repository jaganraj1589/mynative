import React, {useState, useContext, useEffect, AsyncStorage} from 'react';
import {removeSession} from '../services/storage';

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
  /** Get token value from local storage if exists */
  const [userImage, setUserImage] = useState(false);
  const [isSpeakerLoggedIn, setIsSpeakerLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [deletePop, setDeletePop] = useState(false);

  const [userDetailsState, setUserDetailsState] = useState({
    userProfilePic: '',
    userFollowers: '',
    userName: '',
    userInstaFollowers: '',
    loginUserType: '',
  });

  const sortFollow = () => {
    alert('sortFollow');
  };
  const sortLikes = () => {
    alert('sortLikes');
  };

  const changeUserPermission = async (
    userType,
    profilePic,
    name,
    instaFollowers,
    appFollowers,
  ) => {
    console.log('changeUserPermission');
    if (userType == 'speaker') {
      setUserDetailsState(prevState => ({
        ...prevState,
        userProfilePic: profilePic,
        userFollowers: appFollowers,
        userName: name,
        userInstaFollowers: instaFollowers,
        loginUserType: userType,
      }));
    }
  };

  const userDetails = () => {
    setUserProfile(true);
  };
  const closeuserDetails = () => {
    setUserProfile(false);
  };
  const deleteList = () => {
    setDeletePop(true);
  };
  const logout = () => {
    console.log('logout');
    removeSession();
    closeuserDetails();
    setUserDetailsState(prevState => ({
      ...prevState,
      userProfilePic: '',
      userFollowers: '',
      userName: '',
      userInstaFollowers: '',
      loginUserType: '',
    }));
  };

  useEffect(() => {}, [isSpeakerLoggedIn]);

  return (
    <AppContext.Provider
      value={{
        sortLikes,
        sortFollow,
        userImage,
        userDetails,
        userProfile,
        closeuserDetails,
        isSpeakerLoggedIn,
        logout,
        changeUserPermission,
        userDetailsState,
        setDeletePop,
        deletePop,
        deleteList,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContextValue = () => useContext(AppContext);
