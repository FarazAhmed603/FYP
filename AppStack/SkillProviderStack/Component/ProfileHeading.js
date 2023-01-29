import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Heading = (props, {navigation}) => {
  const {editAble, seteditAble, update} = props;
  return (
    <View>
      <View style={styles.heading}>
        <Text style={styles.headtext}> {props.heading} </Text>
        {editAble.body ? (
          <View
            style={{
              marginLeft: 237,
              borderRadius: 4,
              borderColor: '#808080',
              margin: 5,
              borderWidth: 4,
              backgroundColor: '#808080',
              alignContent: 'center',
              justifyContent: 'center',
              paddingLeft: 5,
              paddingRight: 5,
              paddingBottom: 5,
            }}>
            <TouchableOpacity
              onPress={() => {
                seteditAble({...editAble, body: false});
                update();
              }}>
              <Text style={{fontSize: 15, color: 'white'}}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              marginLeft: 237,
              borderRadius: 4,
              borderColor: '#808080',
              margin: 5,
              borderWidth: 4,
              backgroundColor: '#808080',
              alignContent: 'center',
              justifyContent: 'center',
              paddingLeft: 8,
              paddingRight: 8,
              paddingBottom: 5,
            }}>
            <TouchableOpacity
              onPress={() => {
                seteditAble({...editAble, body: true});
              }}>
              <Text style={{fontSize: 15, color: 'white'}}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  butt: {
    color: 'black',
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
