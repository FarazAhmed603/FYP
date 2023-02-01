import {StatusBar, Button} from 'react-native';
import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Contracts from './Contracts';
import Home from './Home';
import Settings from './Settings';
import Notification from './Notification';

const Tab = createBottomTabNavigator();

const homeName = 'Home';
const myContractsName = 'Contracts';
const settingsName = 'Settings';
const notification = 'Notification';

const Dashboard = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'list' : 'list-outline';
          } else if (rn === myContractsName) {
            iconName = focused ? 'clipboard' : 'clipboard-outline';
          } else if (rn === settingsName) {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (rn === notification) {
            iconName = focused ? 'notifications' : 'notifications-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      // tabBarOptions={{
      //   activeTintColor: 'black',
      //   inactiveTintColor: 'black',
      //   showLabel: false,
      //   labelStyle: {paddingBottom: 10, fontSize: 10},
      //   style: {padding: 10, height: 70},
      // }}
    >
      <Tab.Screen name={homeName} component={Home} />
      <Tab.Screen
        name={myContractsName}
        component={Contracts}
        options={{
          headerTitle: 'Contracts',
          // headerRight: () => (
          //   <Button
          //     onPress={() => navigation.navigate('CreateContract')}
          //     title="Add Contract"
          //     color="black"
          //   />
          // ),
        }}
      />
      <Tab.Screen name={notification} component={Notification} />
      <Tab.Screen name={settingsName} component={Settings} />
    </Tab.Navigator>
  );
};

export default Dashboard;
