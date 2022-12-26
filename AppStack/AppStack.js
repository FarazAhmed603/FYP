import React, {useState} from 'react';
import {StatusBar, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Client Stack
import Dashboard from './ClientStack/Dashboard/Dashboard';
import CreateContract from './ClientStack/Screen/CreateContract';
import Profile from './ClientStack/Screen/Profile';
import Verification from './ClientStack/Screen/Verification';
import PaymentMethod from './ClientStack/Screen/PaymentMethod';
import EditProfile from './ClientStack/Screen/EditProfile';
import ChangePassword from './ClientStack/Screen/ChangePassword';
import settings from './ClientStack/Dashboard/Settings';

// Skill provider stack
import SkillProviderDashboard from './SkillProviderStack/Dashboard/Dashboard';
const Stack = createNativeStackNavigator();
const ClientStack = props => {
  const [names, setname] = useState(true);
  const navigation = useNavigation();
  console.log('i am here ');
  return (
    <>
      {names ? (
        <Stack.Navigator>
          <Stack.Screen
            name="dashboard"
            component={Dashboard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateContract"
            component={CreateContract}
            options={{
              headerTitle: 'Create Contract',
            }}
          />
          <Stack.Screen name="Edit" component={EditProfile} />
          <Stack.Screen
            name="settings"
            component={settings}
            initialParams={{setname: setname}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('Edit')}
                  title="Edit"
                  color="grey"
                />
              ),
            }}
          />
          <Stack.Screen name="Verification" component={Verification} />
          <Stack.Screen
            name="PaymentMethod"
            component={PaymentMethod}
            options={{title: 'Payment Method'}}
          />
          {/* <Stack.Screen name="cnic" component={CnicVerification} /> */}
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="dashboard"
            component={SkillProviderDashboard}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </>
  );
};
export default ClientStack;
