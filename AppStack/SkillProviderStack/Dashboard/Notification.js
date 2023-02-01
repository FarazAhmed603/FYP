import React, {useContext} from 'react';
import {View, Text} from 'react-native';

export default function Notification({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        onPress={() => alert('This is the "Home" screen.')}
        style={{fontSize: 26, fontWeight: 'bold'}}>
        Notification Screen
      </Text>
    </View>
  );
}