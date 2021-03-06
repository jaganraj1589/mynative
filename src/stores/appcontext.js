import React, {useState, useContext, useEffect, AsyncStorage} from 'react';
import {removeSession} from '../services/storage';

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
  /** Get token value from local storage if exists */
  const [userImage, setUserImage] = useState(false);
  const [isSpeakerLoggedIn, setIsSpeakerLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(false);

  const [deletePop, setDeletePop] = useState(false);
  const [canFeedReload, setCanFeedReload] = useState(false);

  
  const [feedDeleteDetails, setFeedDeleteDetails] = useState({
    id: null,
    speakerId: null
  });


  const [feedFilterState, setFeedFilterState] = useState({
    filter_by_contry: null,
    filter_by_lang: null
  });
  
  const [userDetailsState, setUserDetailsState] = useState({
    userProfilePic: null,
    userFollowers: null,
    userName: null,
    userInstaFollowers: null,
    loginUserType: null,
    userId: null
  });


  const [countryList, setCountryList] = useState({
    country: [
      {id: 1, value: 'india', isChecked: false},
      {id: 2, value: 'france', isChecked: false},
      {id: 3, value: 'singapore', isChecked: false},
      {id: 4, value: 'honkong', isChecked: false},
    ],
  });
  const [languageList, setLanguageList] = useState({
    language: [
      {id: 1, value: 'english', isChecked: false},
      {id: 2, value: 'french', isChecked: false},
      {id: 3, value: 'tamil', isChecked: false},
      {id: 4, value: 'chinese', isChecked: false},
    ],
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
    userId
  ) => {
    if (userType == 'speaker') {
      setUserDetailsState(prevState => ({
        ...prevState,
        userProfilePic: profilePic,
        userFollowers: appFollowers,
        userName: name,
        userInstaFollowers: instaFollowers,
        loginUserType: userType,
        userId: userId
      }));
    }
  };

  const userDetails = () => {
    setUserProfile(true);
  };
  const canFeedReloadFn = () => {
    setCanFeedReload(!canFeedReload);
  };
  const closeuserDetails = () => {
    setUserProfile(false);
  };
  const deleteList = (data) => {
    setDeletePop(data.isPressed);
    setFeedDeleteDetails(prevState => ({
      ...prevState,
      id: data.feedId,
      speakerId: data.speakerId
    }));
  };
  const logout = () => {
    removeSession();
    closeuserDetails();
    setUserDetailsState(prevState => ({
      ...prevState,
      userProfilePic: null,
      userFollowers: null,
      userName: null,
      userInstaFollowers: null,
      loginUserType: null,
      userId:null
    }));
  }

  const feedByLCFilter = (data) => {
    setFeedFilterState(prevState => ({
      ...prevState,
      filter_by_contry: data.country,
      filter_by_lang: data.language
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
        feedByLCFilter,
        feedFilterState,
        feedDeleteDetails,
        canFeedReloadFn,
        canFeedReload,
        countryList,
        setCountryList,
        languageList,
        setLanguageList
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContextValue = () => useContext(AppContext);
