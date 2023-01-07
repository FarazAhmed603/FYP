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
const NewPassword = ({navigation}) => {
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

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
        <Text style={styles.text_join}>What's your new password?</Text>
        <Text style={styles.text_join1}>
          Enter new password you want to use for login.
        </Text>
        <View style={styles.inputView}>
          <Icon style={styles.iconimage} name="lock" size={23} color="black" />
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="grey"
            onChangeText={password => setpassword(password)}
          />
        </View>

        <View style={styles.inputView}>
          <Icon style={styles.iconimage} name="lock" size={23} color="black" />
          <TextInput
            style={styles.TextInput}
            placeholder="Confirm Password"
            placeholderTextColor="grey"
            onChangeText={confirmPassword =>
              setconfirmPassword(confirmPassword)
            }
          />
        </View>
        {password == '' || confirmPassword == '' ? (
          <TouchableOpacity
            disabled
            style={styles.NextButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.NextText}> Next </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.NextButton}
            onPress={() => navigation.navigate('Login')}>
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
    width: '70%',
    height: 45,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
  },
  iconimage: {
    marginTop: 18,
    marginRight: 10,
  },
  TextInput: {
    height: 60,
    color: 'black',
  },
});

export default NewPassword;
