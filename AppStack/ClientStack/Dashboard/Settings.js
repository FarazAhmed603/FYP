import React, {useState} from 'react';
import {View, TouchableOpacity, Switch, StyleSheet, Text} from 'react-native';

import SettingComponent from '../Components/SettingComponent';

export default function Settings({navigation, route}) {
  const [isEnabled, setisEnabled] = useState(true);
  console.log('i an ub setting');
  const toggleSwitch = () => {
    setisEnabled(previousState => !previousState);
    if (isEnabled) {
      // navigation.navigate('AppStack', {data: isEnabled});
      console.log('true', isEnabled);
      // route.params.setState(false);
      // route.setname(false);
    } else {
      // navigation.navigate('Home', {data: isEnabled});
      console.log(isEnabled);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      {/* <Text
        onPress={() => alert('This is the "Home" screen.')}
        style={{fontSize: 26, fontWeight: 'bold'}}>
        Setting Screen
      </Text> */}
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <SettingComponent text="Profile" />
      </TouchableOpacity>

      <TouchableOpacity>
        <SettingComponent text="Payment Histroy" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push('PaymentMethod')}>
        <SettingComponent text="Payment methods" />
      </TouchableOpacity>
      <TouchableOpacity>
        <SettingComponent text="Notifications" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push('ChangePassword')}>
        <SettingComponent text="Change Password" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push('Verification')}>
        <SettingComponent text="Verifications" />
      </TouchableOpacity>
      <TouchableOpacity>
        <SettingComponent text="About us" />
      </TouchableOpacity>
      <TouchableOpacity>
        <SettingComponent text="Community Guidelines" />
      </TouchableOpacity>
      <TouchableOpacity>
        <SettingComponent text="Term & Conditions" />
      </TouchableOpacity>
      <TouchableOpacity>
        <SettingComponent text="Privacy Policy" />
      </TouchableOpacity>
      <TouchableOpacity>
        <SettingComponent text="Contact Us" />
      </TouchableOpacity>
      <TouchableOpacity
      // onPress={() => navigation.navigate('Login')}
      >
        <SettingComponent text="Logout" />
      </TouchableOpacity>
      <View style={styles.item1}>
        <View style={styles.item}>
          <Text style={styles.itemText}>Switch to seller mode</Text>
        </View>
        <Switch
          trackColor={{false: 'lightgreen', true: 'lightgrey'}}
          thumbColor={isEnabled ? 'grey' : 'grey'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    alignContent: 'center',
    width: '80%',
  },
  item1: {
    backgroundColor: '#FFF',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#c2c2a3',
    flexDirection: 'row',
  },
  itemText: {
    maxWidth: '80%',
    fontWeight: 'bold',
  },
});
