import React, {useState, createContext, useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from '../AuthStack/AuthStack';
import AppStack from '../AppStack/AppStack';

import {AuthContext} from '../Context/AuthContext';

const Container = () => {
  const {isLoading} = useContext(AuthContext);
  const {userToken} = useContext(AuthContext);
  // console.log('use context data in container', {isLoading});

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Container;
