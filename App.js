import React, { useState, createContext, useContext, useEffect } from 'react';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

import Container from './Container/Container';

import { AuthProvider } from './Context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Container />
    </AuthProvider>
  );
}
