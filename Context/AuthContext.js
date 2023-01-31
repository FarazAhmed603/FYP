import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import env from '../env';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setisLoading] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [change, setchange] = useState(true);
  const [userInfo, setuserInfo] = useState('');
  const [ID, setID] = useState();

  const login = (Email, Password) => {
    //console.log('in login fun authContext');
    setisLoading(true);
    const request = env.IP + 'login';
    axios
      .post(request, {
        email: Email,
        password: Password,
      })
      .then(response =>
        setresponse(response).then(() => {
          setisLoading(false);
        }),
      )
      .catch(function (error) {
        console.log(error);
      });

    setisLoading(false);
  };

  const setresponse = async response => {
    //console.log('response in login function in authContext');
    let token = response.data.Token;
    let decoded = await jwt_decode(token);
    if (decoded) {
      setisLoading(true);
      await setUserToken(response.data.Token);
      await setuserInfo(decoded);
      await AsyncStorage.setItem('userToken', response.data.Token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(decoded));
      //console.log('decoded', decoded);
    }
  };

  const logout = async () => {
    //console.log('in logout function in authContext');
    await setisLoading(true);
    await setUserToken(null);
    AsyncStorage.removeItem('userInfo').then(() =>
      AsyncStorage.removeItem('userToken').then(() =>
        AsyncStorage.clear().then(() => {
          setuserInfo();
          setUserToken();
        }),
      ),
    );
    // AsyncStorage.clear();

    await setisLoading(false);
  };

  const isLoggedIn = async () => {
    //console.log('isLogIn function in AuthContext for checking login status');
    try {
      setisLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      //console.log('without stringify...........', await userInfo);
      userInfo = JSON.parse(userInfo);
      //console.log('user info in login function in authcontext', userInfo);
      //console.log('user Token in login function in authcontext\n\t\t', userToken);
      if (userToken) {
        setUserToken(userToken);
        setuserInfo(userInfo);
        //console.log('user info..................................', userInfo);
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
        setisLoading,
        setuserInfo,
        isLoading,
        change,
        userToken,
        userInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
