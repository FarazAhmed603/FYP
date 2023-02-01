import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import NotificationComponent from '../Components/NotificationComponent';

const Notification = () => {
  return (
    <View>
      <NotificationComponent />
    </View>
  );
};
const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    height: 80,
  },
});

export default Notification;
