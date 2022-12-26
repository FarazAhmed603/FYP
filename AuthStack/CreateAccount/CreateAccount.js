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

const CreateAccount = ({navigation}) => {
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
        {/* <Image style={{height: 150, width: 150}} source={require('')} /> */}

        <Text style={styles.text_join}>Join Craft</Text>
        <Text>We'll help you to create a new account in a few easy steps.</Text>

        <TouchableOpacity
          style={styles.NextButton}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.NextText}> Next </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text
            style={styles.account_button}
            onPress={() => navigation.navigate('Login')}>
            Already have an Account?
          </Text>
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
    marginTop: 40,
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
  account_button: {
    height: 20,
    marginBottom: 30,
    color: 'black',
  },
});

export default CreateAccount;
