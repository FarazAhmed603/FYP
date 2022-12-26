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

export default function EditProfile({navigation}) {
  const [oldPassword, setoldPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View
        style={{
          height: 100,
        }}></View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.text_join}>Update your password </Text>

        <View style={styles.inputView}>
          <Icon
            style={styles.iconimage}
            name="account"
            size={23}
            color="black"
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your old password"
            placeholderTextColor="grey"
            onChangeText={oldPassword => setoldPassword(oldPassword)}
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
            placeholder="New Password"
            placeholderTextColor="grey"
            onChangeText={newPassword => setnewPassword(newPassword)}
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
            placeholder="Re-enter new password "
            placeholderTextColor="grey"
            onChangeText={confirmPassword =>
              setconfirmPassword(confirmPassword)
            }
          />
        </View>
        <TouchableOpacity
          style={styles.NextButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.NextText}> Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

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
