import { StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import env from '../../env';

const ConfirmationCode = ({ navigation, route }) => {
  const [code, setcode] = useState('');
  const [check, setcheck] = useState(false);
  const [check1, setcheck1] = useState(true);

  const [timeLeft, setTimeLeft] = useState(0.5 * 60); // 5 minutes in seconds

  const timmer = () => {
    setTimeLeft(0.5 * 60);
    sendotp();
    console.log('email', route.params.email);
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft => {
        setcheck1(false);
        if (timeLeft === 0) {
          clearInterval(intervalId);
          setcheck1(true);
          return 0;
        }
        return timeLeft - 1;
      });
    }, 1000);
  };

  const verifyotp = () => {

    const request = env.IP + 'verifyotp';
    try {
      axios
        .put(request, {
          email: route.params.email,
          otp: code,
        })
        .then(function (response) {
          console.log('otp match');
          Alert.alert('Verified', 'Now you can login');
          navigation.navigate('Login');
        })
        .catch(function (error) {
          console.log(error.message);
          Alert.alert('Error', 'OTP not match');
        });
    } catch {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const sendotp = () => {
    console.log();

    const request = env.IP + 'sendotp';
    try {
      axios
        .post(request, {
          email: route.params.email,
        })
        .then(function (response) {
          Alert.alert('Success', 'OTP send');
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const confirmfield = () => {
    setcheck(true);
  };

  const postotp = () => {
    setcheck(false);
    verifyotp();
  };

  return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
        },
      ]}>
      <View style={styles.image}>
        <Text style={styles.text_join}>What's your confirmation code?</Text>

        <View style={styles.inputView}>
          <Icon style={styles.iconimage} name="key" size={23} color="black" />
          <TextInput
            style={styles.TextInput}
            placeholder="Enter confirmation code"
            placeholderTextColor="grey"
            onChangeText={code => setcode(code)}
          />
        </View>
        {check ? (
          <Text style={styles.textFailed}>Enter OTP</Text>
        ) : (
          <Text style={styles.textFailed}> </Text>
        )}
        {code == '' ? (
          <TouchableOpacity style={styles.NextButton} onPress={confirmfield}>
            <Text style={styles.NextText}> Done </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.NextButton} onPress={postotp}>
            <Text style={styles.NextText}> Done </Text>
          </TouchableOpacity>
        )}

        <Text>If you not receive code then press</Text>
        {check1 ? (
          <TouchableOpacity onPress={timmer}>
            <Text style={{ fontWeight: 'bold' }}> Send</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Text style={{ fontWeight: 'bold' }}> Send</Text>
          </TouchableOpacity>
        )}

        <Text>resend otp in {timeLeft} sec</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 200,
  },
  text_join: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },

  NextButton: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: 'black',
  },
  NextText: {
    color: 'white',
  },
  inputView: {
    backgroundColor: 'white',
    width: '70%',
    height: 45,

    borderBottomWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
  },

  TextInput: {
    height: 60,
    color: 'black',
  },
  iconimage: {
    marginTop: 18,
    marginRight: 10,
  },
  textFailed: {
    color: 'red',
  },
});

export default ConfirmationCode;
