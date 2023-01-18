import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setisLoading] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [change, setchange] = useState(true);
  const [userInfo, setuserInfo] = useState('');

  const login = (Email, Password) => {
    console.log('in login fun authContext');
    setisLoading(true);
    axios
      .post('http://192.168.10.9:4000/login', {
        email: Email,
        password: Password,
      })
      .then(function (response) {
        console.log('response in login function in authContext');
        let token = response.data.Token;
        let decoded = jwt_decode(token);
        if (decoded) {
          setUserToken(response.data.Token);
          setuserInfo(JSON.stringify(decoded));
          AsyncStorage.setItem('userToken', response.data.Token);
          AsyncStorage.setItem('userInfo', JSON.stringify(decoded));
          console.log('decoded', decoded);

          console.log('user info while login', userInfo);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    setisLoading(false);
  };

  const logout = () => {
    console.log('in logout function in authContext');
    setisLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
    // AsyncStorage.clear();
    console.log('aysnc storage clear now');
    setisLoading(false);
  };

  const isLoggedIn = async () => {
    console.log('isLogIn function in AuthContext for checking login status');
    try {
      setisLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      console.log('without stringify...........', userInfo);
      userInfo = JSON.parse(userInfo);
      console.log('user info in login function in authcontext', userInfo);
      console.log('user Token in login function in authcontext', userToken);
      if (userToken) {
        setUserToken(userToken);
        setuserInfo(userInfo);
        console.log('user info..................................', userInfo);
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
