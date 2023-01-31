import React, { useState, createContext, useContext, useEffect } from 'react';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

import Container from './Container/Container';

import { AuthProvider } from './Context/AuthContext';

export default function App() {
  useEffect(() => {
    messaging().getToken(firebase.app().options.messagingSenderId).then((token) => {
      console.log('\n \t\tTooken:  ', token)
    })
  }, [])
  return (
    <AuthProvider>
      <Container />
    </AuthProvider>
  );
}
