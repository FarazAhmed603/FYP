import React, { useState, useEffect } from 'react';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from 'react-native-push-notification';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';


const NotificationComponent = () => {
  const [checkaction, setcheckaction] = useState(false);

  const decision = () => {
    return (
      <View style={styles.buttonview}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text3}>{/* {props.budget} */} Reject </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text3}>{/* {props.budget} */} Accept </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.inputView}>
      <View style={styles.textview}>
        <Text style={styles.email} numberOfLines={1} ellipsizeMode="tail">
          {/* {props.title} */} Title
        </Text>
        <Text style={styles.email1} numberOfLines={1} ellipsizeMode="tail">
          {/* {props.description} */} description
        </Text>
        <Text style={styles.email1} numberOfLines={1} ellipsizeMode="tail">
          {/* {props.location} */} location
        </Text>
      </View>
      <View style={styles.buttonview}>{decision()}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    height: 80,
  },

  buttonview: {
    width: '50%',
    alignItems: 'center',
    paddingLeft: 14,
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'black',
    marginLeft: 10,
    height: '50%',
    borderRadius: 10,
  },

  textview: {
    backgroundColor: '#fff',
    width: '50%',
    flexDirection: 'column',
    paddingLeft: 10,
  },
  email: {
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 16,
  },
  email1: {
    marginLeft: 5,
    fontSize: 14,
    color: 'grey',
  },

  text3: {
    fontSize: 16,
    paddingHorizontal: 5,
    paddingVertical: 3,
    color: 'white',
    // fontWeight: 'bold',
  },
});
export default NotificationComponent;
