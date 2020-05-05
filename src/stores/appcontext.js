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

  return (
    <AppContext.Provider value={{sortLikes, sortFollow}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContextValue = () => useContext(AppContext);
