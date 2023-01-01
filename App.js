import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './AuthStack/AuthStack';
import AppStack from './AppStack/AppStack';

export default function App() {
  const [auth, setauth] = useState(true);

  return (
    <NavigationContainer>
      {auth ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
