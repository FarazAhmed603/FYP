import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setisLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [change, setchange] = useState(true);
  const [userInfo, setuserInfo] = useState(null);

  const login = (Email, Password) => {
    setisLoading(true);
    axios
      .post('http://192.168.10.8:4000/login', {
        email: Email,
        password: Password,
      })
      .then(function (response) {
        var token = response.data.Token;
        var decoded = jwt_decode(token);
        if (response && response.data && token) {
          AsyncStorage.setItem('userToken', response.data.Token);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          setUserToken(response.data.Token);
          setuserInfo(JSON.stringify(decoded));
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    setisLoading(false);
  };

  const logout = () => {
    setisLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem(JSON.stringify(userInfo));
    AsyncStorage.removeItem(userToken);
    console.log('aysnc storage clear now');

    setisLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setisLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');

      let userToken = await AsyncStorage.getItem('userToken');
      userInfo = JSON.parse(userInfo);
      console.log('user infoooo in authenticaion', userInfo);
      console.log('user Token in authenticaion', userToken);
      if (userInfo) {
        setUserToken(userToken);
        setuserInfo(userInfo);
      }
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
        change,
        userToken,
        userInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
