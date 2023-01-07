import {StatusBar} from 'react-native';
import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../Context/AuthContext';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState(false);

  const {login} = useContext(AuthContext);
  // console.log('use context data', {isLoading});
  const handleCheckEmail = text => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
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
        <Image source={require('../resoure/logo.png')} />
      </View>
      <View style={styles.textarea}>
        <View style={styles.inputView}>
          <Icon style={styles.iconimage} name="email" size={23} color="black" />
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Email                                              "
            placeholderTextColor="grey"
            onChangeText={text => handleCheckEmail(text)}
          />
        </View>
        {checkValidEmail ? (
          <Text style={styles.textFailed}>Wrong format email</Text>
        ) : (
          <Text style={styles.textFailed}> </Text>
        )}
        <View style={styles.inputView}>
          <Icon style={styles.iconimage} name="lock" size={23} color="black" />
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Password                                          "
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
          />
        </View>
        <TouchableOpacity>
          <Text
            style={styles.forgot_button}
            onPress={() => navigation.navigate('EnterEmail')}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        {email == '' || password == '' || checkValidEmail == true ? (
          <TouchableOpacity
            disabled
            style={styles.loginBtn}
            onPress={() => {
              login(email, password);
            }}>
            <Text style={styles.loginText}> LOGIN </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              login(email, password);
            }}>
            <Text style={styles.loginText}> LOGIN </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity>
          <Text
            style={styles.forgot_button}
            onPress={() => navigation.navigate('CreateAccount')}>
            Sign up for Account
          </Text>
        </TouchableOpacity>
        {/* <Text>{test}</Text> */}
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
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textarea: {
    flex: 3,
    alignItems: 'center',
  },
  iconimage: {
    marginTop: 18,
    marginRight: 10,
  },
  inputView: {
    backgroundColor: 'white',
    width: '70%',
    height: 45,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
  },

  TextInput: {
    height: 60,
    color: 'black',
  },
  forgot_button: {
    height: 20,
    marginBottom: 30,
    color: 'black',
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: 'black',
  },
  loginText: {
    color: 'white',
  },
  login: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
    borderWidth: 1,
  },
  textFailed: {
    color: 'red',
  },
});

export default Login;
