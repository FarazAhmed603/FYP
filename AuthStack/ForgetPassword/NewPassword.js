import {StatusBar} from 'react-native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Input from '../component/Input';

const NewPassword = ({navigation, route}) => {
  const [password, setpassword] = useState('');
  const [errors, setErrors] = useState({});

  const newpass = () => {
    console.log(route.params);
    try {
      axios
        .put('http://192.168.10.8:4000/forgetpassword', {
          email: route.params.email,
          newPassword: password,
        })
        .then(res => {
          console.log(res);
          navigation.navigate('Login');
        })
        .catch(error => {
          console.log(error);
          Alert.alert('Server Error', 'Try again later');
        });
    } catch {
      Alert.alert('Server Error', 'Try again later');
    }
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (password.length < 8) {
      handleError('Min password length of 8', 'password');
      isValid = false;
    }

    if (isValid) {
      newpass();
    }
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={styles.text_join}>What's your new password?</Text>
        <Text style={styles.text_join1}>
          Enter new password you want to use for login.
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={password => setpassword(password)}
            // onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />

          <TouchableOpacity style={styles.NextButton} onPress={validate}>
            <Text style={styles.NextText}> Next </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text_join: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  text_join1: {
    marginBottom: 30,
  },
  NextButton: {
    width: '100%',
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
});

export default NewPassword;
