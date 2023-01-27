//   const data = {
//     firstname: firstName,
//     lastname: surName,
//     phone: phoneNumber,
//     email: email,
//     password: password,
//   };

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';

import Button from '../component/Button';
import Input from '../component/Input';
import Loader from '../../Loader/Loader';
import axios from 'axios';
import env from '../../env';

const Signup = ({ navigation }) => {
  const request = env.IP + 'signup';
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const createuser = () => {
    try {
      axios
        .post(request, {
          firstname: firstName,
          lastname: lastName,
          phone: phoneNumber,
          email: email,
          password: password,
        })
        .then(function (response) {
          console.log('user created');
        })
        .catch(function (error) {
          console.log(error);
          Alert.alert('Server Error', 'Not able to user this time');
        });
    } catch {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!firstName) {
      handleError('Enter first name', 'firstname');
      isValid = false;
    }
    if (!lastName) {
      handleError('Please input last name', 'lastname');
      isValid = false;
    }

    if (!email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (phoneNumber.length < 11) {
      handleError('Phone number must be 11 digits', 'phone');
      isValid = false;
    }

    if (!password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (password.length < 8) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        createuser();

        navigation.navigate('ConfirmationCode', {
          email: email,
        });
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 3000);
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: 'black', fontSize: 40, fontWeight: 'bold' }}>
          Register
        </Text>
        <Text style={{ color: 'grey', fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Register
        </Text>
        <View style={{ marginVertical: 20 }}>
          {/* <Input
            onChangeText={text => inputs.fullname(text)}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullname}
          /> */}
          <Input
            onChangeText={text => setfirstName(text)}
            iconName="account-outline"
            label="First Name"
            placeholder="Enter first name"
            error={errors.firstName}
          />

          <Input
            onChangeText={lastName => setlastName(lastName)}
            // onFocus={() => handleError(null, 'fullname')}
            iconName="account-outline"
            label="Last Name"
            placeholder="Enter your last name"
            error={errors.fullname}
          />
          <Input
            onChangeText={email => setemail(email)}
            // onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <Input
            keyboardType="numeric"
            maxLength={11}
            onChangeText={phoneNumber => setphoneNumber(phoneNumber)}
            // onFocus={() => handleError(null, 'phone')}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
          />
          <Input
            onChangeText={password => setpassword(password)}
            // onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />

          <Button title="Register" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Already have account ?Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
