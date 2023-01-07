import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setisLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = () => {
    setUserToken('1234');
    setisLoading(false);
  };

  const logout = () => {
    setUserToken(null);
    setisLoading(false);
  };

  return (
    <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
      {children}
    </AuthContext.Provider>
  );
};
