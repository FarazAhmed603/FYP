import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setisLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [change, setchange] = useState(true);
  //   const [userInfo, setuserInfo] = useState(null);

  const login = (email, password) => {
    setisLoading(true);
    // axios
    //   .post('https://api', {
    //     email,
    //     password,
    //   })
    //   .then(res => {
    //     console.log(res);
    //     let userInfo = res.data;
    //     setuserInfo(userInfo);
    //     setUserToken(userInfo.userToken);

    //     AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    //     AsyncStorage.setItem('userToken', userInfo.userToken);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
    setUserToken('1234');
    AsyncStorage.setItem('userToken', '1234');
    setisLoading(false);
  };

  const logout = () => {
    setisLoading(true);
    setUserToken(null);
    // AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');

    setisLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setisLoading(true);
      //   let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      //   userInfo = JSON.parse(userInfo);
      //   if (userInfo) {
      //     setUserToken(userToken);
      //     setuserInfo(userInfo);
      //   }
      setUserToken(userToken);
      setisLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const switchToSkillProvider = () => {
    setchange(false);
  };
  const switchClient = () => {
    setchange(true);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        switchToSkillProvider,
        switchClient,
        isLoading,
        userToken,
        change,
        // userToken,
        // userInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
