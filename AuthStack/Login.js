import {StatusBar} from 'react-native';
import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../Context/AuthContext';
import Button from './component/Button';
import Input from './component/Input';
import Loader from '../Loader/Loader';

const Login = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const {login} = useContext(AuthContext);
  // console.log('use context data', {isLoading});
  // const handleCheckEmail = text => {
  //   let re = /\S+@\S+\.\S+/;
  //   let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  //   setEmail(text);
  //   if (re.test(text) || regex.test(text)) {
  //     setCheckValidEmail(false);
  //   } else {
  //     setCheckValidEmail(true);
  //   }
  // };
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (password.length < 8) {
      handleError('Min password length of 8 ', 'password');
      isValid = false;
    }

    if (isValid) {
      setLoading(true);
      setTimeout(() => {
        try {
          setLoading(false);
          login(email, password);
        } catch (error) {
          Alert.alert('Error', 'Something went wrong');
        }
      }, 3000);
    }
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
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
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Loader visible={loading} />
        <View style={styles.image}>
          <Image source={require('../resoure/logo.png')} />
        </View>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={email => setemail(email)}
            // onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
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
          <Text
            onPress={() => navigation.navigate('EnterEmail')}
            style={{
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 14,
            }}>
            Forget password ?
          </Text>

          <Button title="Login" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('CreateAccount')}
            style={{
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Signup new account
          </Text>
        </View>
      </SafeAreaView>
    </View>
    //   style={[
    //     styles.container,
    //     {
    //       // Try setting `flexDirection` to `"row"`.
    //       flexDirection: 'column',
    //     },
    //   ]}>
    //   <View style={styles.image}>
    //     <Image source={require('../resoure/logo.png')} />
    //   </View>
    //   <View style={styles.textarea}>
    //     <View style={styles.inputView}>
    //       <Icon style={styles.iconimage} name="email" size={23} color="black" />
    //       <TextInput
    //         style={styles.TextInput}
    //         placeholder="Enter Email                                              "
    //         placeholderTextColor="grey"
    //         onChangeText={text => handleCheckEmail(text)}
    //       />
    //     </View>
    //     {checkValidEmail ? (
    //       <Text style={styles.textFailed}>Wrong format email</Text>
    //     ) : (
    //       <Text style={styles.textFailed}> </Text>
    //     )}
    //     <View style={styles.inputView}>
    //       <Icon style={styles.iconimage} name="lock" size={23} color="black" />
    //       <TextInput
    //         style={styles.TextInput}
    //         placeholder="Enter Password                                          "
    //         placeholderTextColor="grey"
    //         secureTextEntry={true}
    //         onChangeText={password => setPassword(password)}
    //       />
    //     </View>
    //     <TouchableOpacity>
    //       <Text
    //         style={styles.forgot_button}
    //         onPress={() => navigation.navigate('EnterEmail')}>
    //         Forgot Password?
    //       </Text>
    //     </TouchableOpacity>
    //     {email == '' || password == '' || checkValidEmail == true ? (
    //       <TouchableOpacity style={styles.loginBtn}>
    //         <Text style={styles.loginText}> LOGIN </Text>
    //       </TouchableOpacity>
    //     ) : (
    //       <TouchableOpacity
    //         style={styles.loginBtn}
    //         onPress={() => {
    //           login(email, password);
    //         }}>
    //         <Text style={styles.loginText}> LOGIN </Text>
    //       </TouchableOpacity>
    //     )}

    //     <TouchableOpacity>
    //       <Text
    //         style={styles.forgot_button}
    //         onPress={() => navigation.navigate('CreateAccount')}>
    //         Sign up for Account
    //       </Text>
    //     </TouchableOpacity>
    //     {/* <Text>{test}</Text> */}
    //   </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
