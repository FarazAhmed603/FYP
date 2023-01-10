import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setisLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [change, setchange] = useState(true);
  const [userInfo, setuserInfo] = useState(null);

  const login = (Email, Password) => {
    setisLoading(true);
    axios
      .post('http://192.168.10.10:4000/login', {
        email: Email,
        password: Password,
      })
      .then(function (response) {
        console.log(JSON.stringify(response.data.Token));
        setUserToken(response.data.Token);
      })
      .catch(function (error) {
        console.log(error);
      });
    // axios
    //   .get('http://192.168.10.10:4000/login', {
    //     params: {
    //       email,
    //       password,
    //     },
    //   })
    //   .then(res => {
    //     console.log(res);
    // let userInfo = res.data;
    // setuserInfo(userInfo);
    // setUserToken(userInfo.userToken);

    // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    // AsyncStorage.setItem('userToken', userInfo.userToken);
    // })
    // .catch(e => {
    //   console.log(e);
    // });
    // setUserToken('1234');
    // AsyncStorage.setItem('userToken', '1234');
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

  // const verityjwttoken = () => {
  //   const token = '';
  //   const secret = 'my-secret-key';

  //   try {
  //     const decoded = jwt.verify(token, secret);
  //     console.log(decoded);
  //     // Output: { sub: '1234567890', name: 'John Doe', iat: 1516239022 }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
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
