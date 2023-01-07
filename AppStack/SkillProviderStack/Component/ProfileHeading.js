import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Heading = (props, {navigation}) => {
  return (
    <View>
      <View style={styles.heading}>
        <Text style={styles.headtext}>{props.heading}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    backgroundColor: 'lightgrey',
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headtext: {
    fontWeight: 'bold',
    marginLeft: 20,
    fontSize: 16,
  },
  inputView: {
    backgroundColor: 'white',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#c2c2a3',
    alignItems: 'center',
  },
  TextInput: {
    height: 40,
    width: '90%',
    color: 'black',
    padding: 10,
  },
});

export default Heading;
