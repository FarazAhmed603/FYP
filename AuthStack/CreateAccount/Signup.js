import {StatusBar} from 'react-native';
import React, {useState} from 'react';
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
const Signup = ({navigation}) => {
  const [firstName, setfirstName] = useState('');
  const [surName, setsurName] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [passCheck, setpassCheck] = useState(false);

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

  const confirmPass = text => {
    if (passCheck) {
    }
    if (text !== password) {
      setpassCheck(false);
    } else {
      setpassCheck(true);
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
      <ScrollView>
        <View style={styles.image}>
          <Text style={styles.text_join}>Signup for account</Text>
          <Text style={{color: 'black'}}>
            All fields are required for next step
          </Text>

          <View style={styles.inputView}>
            <Icon
              style={styles.iconimage}
              name="account"
              size={23}
              color="black"
            />
            <TextInput
              style={styles.TextInput}
              placeholder="First Name"
              placeholderTextColor="grey"
              onChangeText={firstName => setfirstName(firstName)}
            />
          </View>

          <View style={styles.inputView}>
            <Icon
              style={styles.iconimage}
              name="account"
              size={23}
              color="black"
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Surname"
              placeholderTextColor="grey"
              onChangeText={surName => setsurName(surName)}
            />
          </View>
          <View style={styles.inputView}>
            <Icon
              style={styles.iconimage}
              name="phone"
              size={23}
              color="black"
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Mobile Number"
              placeholderTextColor="grey"
              maxLength={11}
              keyboardType="numeric"
              onChangeText={phoneNumber => setphoneNumber(phoneNumber)}
            />
          </View>
          <View style={styles.inputView}>
            <Icon
              style={styles.iconimage}
              name="email"
              size={23}
              color="black"
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Enter email"
              placeholderTextColor="grey"
              onChangeText={text => handleCheckEmail(text)}
            />
          </View>

          <View style={styles.inputView}>
            <Icon
              style={styles.iconimage}
              name="lock"
              size={23}
              color="black"
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="grey"
              secureTextEntry={true}
              onChangeText={password => setpassword(password)}
            />
          </View>

          <View style={styles.inputView}>
            <Icon
              style={styles.iconimage}
              name="lock"
              size={23}
              color="black"
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password"
              placeholderTextColor="grey"
              secureTextEntry={true}
              onChangeText={confirmPassword =>
                setconfirmPassword(confirmPassword)
              }
            />
          </View>
          {firstName == '' ||
          surName == '' ||
          phoneNumber == '' ||
          email == '' ||
          password == '' ||
          confirmPassword == '' ||
          passCheck == true ||
          checkValidEmail == true ? (
            <TouchableOpacity
              disabled
              style={styles.NextButton}
              onPress={() => navigation.navigate('ConfirmationCode')}>
              <Text style={styles.NextText}> Signup</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.NextButton}
              onPress={() => navigation.navigate('ConfirmationCode')}>
              <Text style={styles.NextText}> Signup</Text>
            </TouchableOpacity>
          )}

          {checkValidEmail ? (
            <Text style={styles.textFailed}>Wrong format email</Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}
          {passCheck ? (
            <Text style={styles.textFailed}>Passwords do not match</Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}
        </View>
      </ScrollView>
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
    marginTop: 40,
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
    marginBottom: 20,
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

export default Signup;
