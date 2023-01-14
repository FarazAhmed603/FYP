import {StatusBar} from 'react-native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const EnterEmail = ({navigation}) => {
  const [email, setemail] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState(false);

  const handleCheckEmail = text => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setemail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const endpoint = 'http://192.168.10.8:4000/verifyemail/' + email;
  const verifyEmail = () => {
    try {
      axios
        .get(endpoint)
        .then(res => {
          console.log(res);
          navigation.navigate('VerificationCode', {
            email: email,
          });
        })
        .catch(error => {
          console.log(error);
          Alert.alert('Error', 'Email not found');
        });
    } catch {
      Alert.alert('Server Error', 'Something went wrong');
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
        <Text style={styles.text_join}>What's your email adddress?</Text>
        <Text style={styles.text_join1}>
          Enter the email address you use in professional work.
        </Text>

        <View style={styles.inputView}>
          <Icon style={styles.iconimage} name="email" size={23} color="black" />
          <TextInput
            style={styles.TextInput}
            placeholder="Enter email"
            placeholderTextColor="grey"
            onChangeText={text => handleCheckEmail(text)}
          />
        </View>
        {checkValidEmail ? (
          <Text style={styles.textFailed}>Wrong format email</Text>
        ) : (
          <Text style={styles.textFailed}> </Text>
        )}
        {email == '' || checkValidEmail == true ? (
          <TouchableOpacity style={styles.NextButton}>
            <Text style={styles.NextText}> Next </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.NextButton} onPress={verifyEmail}>
            <Text style={styles.NextText}> Next </Text>
          </TouchableOpacity>
        )}
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
  text_join1: {
    marginBottom: 30,
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
    flexDirection: 'row',
    width: '70%',
    height: 45,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: 'black',
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

export default EnterEmail;
