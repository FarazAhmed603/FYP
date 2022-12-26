import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const VerificationLayout = props => {
  const [verified, setverified] = useState('verified');
  return (
    <View style={{marginBottom: 10}}>
      <View style={styles.inputView}>
        <View style={styles.inputView1}>
          <Icon
            style={styles.iconimage}
            name={props.icon}
            size={50}
            color="black"
          />
        </View>
        <View style={styles.inputView3}>
          <Text style={styles.email}>{props.title}</Text>
          <Text style={styles.email1}>{props.subTitle}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
  },
  inputView1: {
    width: '15%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputView3: {
    backgroundColor: '#fff',
    width: '75%',
    flexDirection: 'column',
  },
  email: {
    fontWeight: 'bold',
    marginLeft: 15,
    fontSize: 16,
  },
  email1: {
    marginLeft: 15,
    fontSize: 14,
    color: 'grey',
  },

  text3: {
    padding: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default VerificationLayout;
