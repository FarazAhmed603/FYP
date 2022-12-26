import {StatusBar} from 'react-native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  jugijgk,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EnterEmail = ({navigation}) => {
  const [email, setemail] = useState('');
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
            onChangeText={email => setemail(email)}
          />
        </View>

        <TouchableOpacity
          style={styles.NextButton}
          onPress={() => navigation.navigate('VerificationCode')}>
          <Text style={styles.NextText}> Next </Text>
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
});

export default EnterEmail;
