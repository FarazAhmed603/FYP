import React, {useState, createContext, useContext} from 'react';

import Container from './Container/Container';

import {AuthProvider} from './Context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Container />
    </AuthProvider>
  );
}
