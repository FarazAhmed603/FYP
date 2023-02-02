import React, { useState, createContext, useContext, useEffect } from 'react';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from 'react-native-push-notification';
import Container from './Container/Container';

import { AuthProvider } from './Context/AuthContext';

export default function App() {
  const createchannel = (channelId) => {
    PushNotification.createChannel(
      {
        channelId: channelId, // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => { console.log(`createChannel returned '${created}'`); } // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }
  const showNotification = (channelId, options) => {
    PushNotification.localNotification({
      channelId: channelId, // (required) channelId, if the channel doesn't exist, notification will not trigger.
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      priority: "high", // (optional) set notification priority, default: high
      title: options.title, // (optional)
      message: options.body,
      invokeApp: true,
      subtitle: "My Notification Subtitle",
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      // visibility: "private",
      repeatType: "day",
    });
  }

  useEffect(() => {

    messaging().getToken(firebase.app().options.messagingSenderId).then((token) => {
      console.log(' \n\n\t\t token ', token)
    });
    const unsub = messaging().onMessage(async remoteMsg => {
      const channelId = Math.random().toString(36).substring(7);
      createchannel(channelId);
      showNotification(channelId, { title: remoteMsg.notification.android.title, body: remoteMsg.notification.body });
      console.log('remoteMsg: ', remoteMsg)
    })
    messaging().setBackgroundMessageHandler(async remoteMsg => {
      console.log('\n\n\t\t remotemsg background: ', remoteMsg)
    })
    return unsub;
  }, [])
  return (
    <AuthProvider>
      <Container />
    </AuthProvider>
  );
}
