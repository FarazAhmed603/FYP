import {StatusBar} from 'react-native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Signup = ({navigation}) => {
  const [firstName, setfirstName] = useState('');
  const [surName, setsurName] = useState('');
  const [email, setemail] = useState('');
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
        <Text style={styles.text_join}>Signup for account</Text>

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
            secureTextEntry={true}
            onChangeText={surName => setsurName(surName)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon style={styles.iconimage} name="email" size={23} color="black" />
          <TextInput
            style={styles.TextInput}
            placeholder="Enter email"
            placeholderTextColor="grey"
            onChangeText={email => setemail(email)}
          />
        </View>

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

        <TouchableOpacity
          style={styles.NextButton}
          onPress={() => navigation.navigate('ConfirmationCode')}>
          <Text style={styles.NextText}> Signup</Text>
        </TouchableOpacity>
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
});

export default Signup;
