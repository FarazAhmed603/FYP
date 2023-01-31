import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Task = props => {
  const [image, setimage] = useState(props.profile);
  return (
    <View style={{borderRadius: 10}}>
      <View style={styles.inputView}>
        <View style={styles.inputView1}>
          <TouchableOpacity
            style={styles.avatar1}
            onPress={() => Alert.alert('image clicked')}>
            <Image
              source={{
                uri: image,
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputView3}>
          <Text style={styles.email} numberOfLines={1} ellipsizeMode="tail">
            {props.category}
          </Text>
          <Text style={styles.email1} numberOfLines={1} ellipsizeMode="tail">
            {props.description}
          </Text>
          <Text style={styles.email1} numberOfLines={1} ellipsizeMode="tail">
            {props.location}
          </Text>
        </View>
        <View style={styles.inputView2}>
          <View>
            <Text style={styles.text3}>{props.budget}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    height: 70,
  },
  inputView2: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  inputView1: {
    width: '20%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputView3: {
    backgroundColor: '#fff',
    width: '55%',
    flexDirection: 'column',
    paddingRight: 20,
  },
  email: {
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 16,
  },
  email1: {
    marginLeft: 5,
    fontSize: 14,
    color: 'grey',
  },

  text3: {
    padding: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'center',
  },
  avatar1: {
    width: 60,
    height: 60,
    borderRadius: 33,
  },
});
export default Task;
