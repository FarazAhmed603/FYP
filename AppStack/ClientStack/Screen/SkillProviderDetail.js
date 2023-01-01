import * as React from 'react';
import {View, Text} from 'react-native';

export default function SkillProviderDetail({navigation, route}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        onPress={() => alert('This is the "Home" screen.')}
        style={{fontSize: 26, fontWeight: 'bold'}}>
        SkillProviderDetail Screen
      </Text>
      <Text>{route.params.id}</Text>
      <Text>{route.params.title}</Text>
    </View>
  );
}
