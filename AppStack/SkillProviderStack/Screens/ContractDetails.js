import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import ProfileHeading from '../Component/ProfileHeading';
import axios from 'axios';
import env from '../../../env';
export default function ContractDetails({navigation, route}) {
  const http = `http://${env.IP}:4000/`;
  const [press, setpress] = useState(false);
  const [id, setid] = useState(route.params.id);
  const [userdata, setuserdata] = useState('');

  const getUserName = () => {
    console.log(id);
    const request = http + 'user/' + id;
    let getreq = request;
    axios
      .get(getreq)
      .then(res => {
        setuserdata(res.data);
        console.log(userdata);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserName();
  }, []);

  const ConfirmationAlert = () =>
    Alert.alert('Accept Contract', 'Want to work on contract', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => setpress(true)},
    ]);
  const dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${' + userdata.phone + '}';
    } else {
      phoneNumber = 'telprompt:${' + userdata.phone + '}';
    }

    Linking.openURL(phoneNumber);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#FFF', margin: 10}}>
      <View
        style={{
          height: '30%',
          alignItems: 'center',
          borderColor: 'lightgrey',
          borderWidth: 5,
          borderRadius: 25,
          marginTop: 15,
          marginHorizontal: 70,
        }}>
        <Image
          source={{
            uri: 'https://bootdey.com/img/Content/avatar/avatar6.png',
            // uri: image.uri,
            // uri: 'data:image/jpeg;base64,' + image,
          }}
          style={styles.avatar}
        />
      </View>

      <View
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 25}}>
          {userdata.firstname} {userdata.lastname}
        </Text>
      </View>
      <ScrollView>
        <ProfileHeading heading="Category" />
        <Text
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          {route.params.category}
        </Text>
        <ProfileHeading heading="Title" />
        <Text style={{marginHorizontal: 10, marginVertical: 10}}>
          {route.params.title}
        </Text>
        <ProfileHeading heading="Description" />
        <Text style={{marginHorizontal: 10, marginVertical: 10}}>
          {route.params.description}
        </Text>
        <ProfileHeading heading="Loction" />
        <Text style={{marginHorizontal: 10, marginVertical: 10}}>
          {route.params.location}
        </Text>
        <ProfileHeading heading="Date" />
        <Text style={{marginHorizontal: 10, marginVertical: 10}}>
          {route.params.date}
        </Text>
        <ProfileHeading heading="Budget" />
        <Text
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
            fontWeight: 'bold',
            fontSize: 25,
          }}>
          {route.params.budget}
        </Text>
        <TouchableOpacity style={styles.button} onPress={ConfirmationAlert}>
          <Text style={{color: 'white'}}>Accept </Text>
        </TouchableOpacity>
        {press && (
          <Text
            style={{
              marginHorizontal: 20,
              marginVertical: 10,
              fontWeight: 'bold',
              fontSize: 30,
            }}>
            {userdata.phone}
          </Text>
        )}
        {press && (
          <TouchableOpacity style={styles.button} onPress={dialCall}>
            <Text style={{color: 'white'}}>Call Now</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    height: '100%',
    // flex: 1,
    borderWidth: 5,
    borderRadius: 20,
    alignSelf: 'center',
    position: 'absolute',
  },
  descriptionhead: {
    backgroundColor: 'green',
    height: 100,
    borderBottomWidth: 1,
    borderColor: '#c2c2a3',

    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  button: {
    width: '100%',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'black',
  },
});
