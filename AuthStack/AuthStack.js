import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './Login';
import EnterEmail from './ForgetPassword/EnterEmail';
import VerificationCode from './ForgetPassword/VerificationCode';
import NewPassword from './ForgetPassword/NewPassword';
import CreateAccount from './CreateAccount/CreateAccount';
import Signup from './CreateAccount/Signup';
import ConfirmationCode from './CreateAccount/ConfirmationCode';

const Stack = createNativeStackNavigator();
const AuthStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="EnterEmail"
        component={EnterEmail}
        options={{title: 'Email'}}
      />
      <Stack.Screen
        name="VerificationCode"
        component={VerificationCode}
        options={{title: 'Verification'}}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{title: 'Password'}}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{title: 'Create Account'}}
      />
      <Stack.Screen name="Signup" component={Signup} />

      <Stack.Screen
        name="ConfirmationCode"
        component={ConfirmationCode}
        options={{title: 'Confirmation'}}
      />
    </Stack.Navigator>
  );
};
export default AuthStack;
