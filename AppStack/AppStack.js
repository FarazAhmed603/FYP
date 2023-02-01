import React, {useState, useContext} from 'react';
import {StatusBar, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// context
import {AuthContext} from '../Context/AuthContext';
// Client Stack
import Dashboard from './ClientStack/Dashboard/Dashboard';
import CreateContract from './ClientStack/Screen/CreateContract';
import Profile from './ClientStack/Screen/Profile';
import Verification from './ClientStack/Screen/Verification';
import PaymentMethod from './ClientStack/Screen/PaymentMethod';
import EditProfile from './ClientStack/Screen/EditProfile';
import ChangePassword from './ClientStack/Screen/ChangePassword';
import settings from './ClientStack/Dashboard/Settings';
import SkillProviderDetail from './ClientStack/Screen/SkillProviderDetail';
import YourContractDetail from './ClientStack/Screen/YourContractDetail';
import EditContract from './ClientStack/Screen/EditContract';
import Message from './ClientStack/Screen/Message';

// Skill provider stack
import SkillProviderDashboard from './SkillProviderStack/Dashboard/Dashboard';
import ContractDetails from './SkillProviderStack/Screens/ContractDetails';
import UploadSkill from './SkillProviderStack/Screens/UploadSkill';
import SkillProviderProfile from './SkillProviderStack/Screens/Profile';
import SkillProviderPaymentMethod from './SkillProviderStack/Screens/PaymentMethod';
import YourContractDetails from './SkillProviderStack/Screens/YourContractDetails';
import Messages from './SkillProviderStack/Screens/Message';

const Stack = createNativeStackNavigator();
const ClientStack = props => {
  const {change} = useContext(AuthContext);
  const [names, setname] = useState(change);
  const navigation = useNavigation();
  // console.log('value of change from context in appstack', change);
  // console.log('i am here in appstack');
  return (
    <>
      {change ? (
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
            // options={{
            //   headerRight: () => (
            //     <Button
            //       onPress={() => navigation.navigate('Edit')}
            //       title="Edit"
            //       color="grey"
            //     />
            //   ),
            // }}
          />
          <Stack.Screen name="Verification" component={Verification} />
          <Stack.Screen
            name="SkillProviderDetail"
            component={SkillProviderDetail}
          />
          <Stack.Screen name="EditContract" component={EditContract} />
          <Stack.Screen name="Message" component={Message} />
          <Stack.Screen
            name="YourContractDetail"
            component={YourContractDetail}
          />
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
          <Stack.Screen name="ContractDetails" component={ContractDetails} />
          <Stack.Screen
            name="YourContractDetails"
            component={YourContractDetails}
          />
          <Stack.Screen name="UploadSkill" component={UploadSkill} />
          <Stack.Screen name="Profile" component={SkillProviderProfile} />
          <Stack.Screen
            name="PaymentMethod"
            component={SkillProviderPaymentMethod}
            options={{title: 'Payment Method'}}
          />
          <Stack.Screen name="Message" component={Messages} />
        </Stack.Navigator>
      )}
    </>
  );
};
export default ClientStack;
