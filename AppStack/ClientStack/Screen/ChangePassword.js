// import {StatusBar} from 'react-native';
// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// export default function EditProfile({navigation}) {
//   const [oldPassword, setoldPassword] = useState('');
//   const [newPassword, setnewPassword] = useState('');
//   const [confirmPassword, setconfirmPassword] = useState('');

//   return (
//     <ScrollView style={{backgroundColor: 'white'}}>
//       <View
//         style={{
//           height: 100,
//         }}></View>
//       <View
//         style={{
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//         <Text style={styles.text_join}>Update your password </Text>

//         <View style={styles.inputView}>
//           <Icon
//             style={styles.iconimage}
//             name="account"
//             size={23}
//             color="black"
//           />
//           <TextInput
//             style={styles.TextInput}
//             placeholder="Enter your old password"
//             placeholderTextColor="grey"
//             onChangeText={oldPassword => setoldPassword(oldPassword)}
//           />
//         </View>
//         <View style={styles.inputView}>
//           <Icon
//             style={styles.iconimage}
//             name="account"
//             size={23}
//             color="black"
//           />
//           <TextInput
//             style={styles.TextInput}
//             placeholder="New Password"
//             placeholderTextColor="grey"
//             onChangeText={newPassword => setnewPassword(newPassword)}
//           />
//         </View>
//         <View style={styles.inputView}>
//           <Icon
//             style={styles.iconimage}
//             name="account"
//             size={23}
//             color="black"
//           />
//           <TextInput
//             style={styles.TextInput}
//             placeholder="Re-enter new password "
//             placeholderTextColor="grey"
//             onChangeText={confirmPassword =>
//               setconfirmPassword(confirmPassword)
//             }
//           />
//         </View>
//         <TouchableOpacity
//           style={styles.NextButton}
//           onPress={() => navigation.goBack()}>
//           <Text style={styles.NextText}> Save</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   image: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 200,
//   },
//   text_join: {
//     marginBottom: 10,
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
//   NextButton: {
//     width: '80%',
//     borderRadius: 25,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 40,
//     backgroundColor: 'black',
//   },
//   NextText: {
//     color: 'white',
//   },
//   inputView: {
//     backgroundColor: 'white',
//     width: '70%',
//     height: 45,
//     marginBottom: 20,
//     borderBottomWidth: 1,
//     borderColor: 'black',
//     flexDirection: 'row',
//   },

//   TextInput: {
//     height: 60,
//     color: 'black',
//   },
//   iconimage: {
//     marginTop: 18,
//     marginRight: 10,
//   },
// });
//   const data = {
//     firstname: firstName,
//     lastname: surName,
//     phone: phoneNumber,
//     email: email,
//     password: password,
//   };

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';

import {AuthContext} from '../../../Context/AuthContext';
import Button from '../Components/Button';
import Input from '../Components/Input';
import Loader from '../../../Loader/Loader';
import axios from 'axios';

const ChangePassword = ({navigation}) => {
  const [password, setpassword] = useState('');
  const [oldpassword, setoldpassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const {userInfo} = useContext(AuthContext);

  console.log('userinfo in change password', userInfo.email);

  const createuser = () => {
    try {
      axios
        .put('http://192.168.43.212:4000/forgetpassword', {
          email: userInfo.email,
          newPassword: password,
        })
        .then(res => {
          console.log(res);
          navigation.goBack();
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
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        createuser();
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 3000);
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: 'grey', fontSize: 18, marginVertical: 10}}>
          Change Password
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={oldpassword => setoldpassword(oldpassword)}
            // onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Old Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Input
            onChangeText={password => setpassword(password)}
            // onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="New Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />

          <Button title="Confirm" onPress={validate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
