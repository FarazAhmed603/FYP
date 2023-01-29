import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import Button from './Button';

const Heading = (props, { navigation }) => {
  const { editAble, seteditAble, update } = props;
  return (
    <View>
      <View style={styles.heading}>
        <Text style={styles.headtext}> {props.heading} </Text>
        {
          editAble.body ? (
            <View style={{ marginLeft: 231, marginTop: 8 }}>
              <TouchableOpacity onPress={() => {
                seteditAble({ ...editAble, body: false })
                update()
              }}>
                <Text style={{ fontSize: 15, textDecorationLine: 'underline' }}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ marginLeft: 237, marginTop: 8 }}>
              <TouchableOpacity onPress={() => {
                seteditAble({ ...editAble, body: true })
              }}>
                <Text style={{ fontSize: 15, textDecorationLine: 'underline' }}>Edit</Text>
              </TouchableOpacity>
            </View>
          )
        }

      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  butt: {
    color: 'black'
  },
  heading: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headtext: {
    fontWeight: 'bold',
    marginTop: 8,
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
