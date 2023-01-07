import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const TextView = props => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#c2c2a3',
  },
  itemText: {
    maxWidth: '80%',
  },
});

export default TextView;
