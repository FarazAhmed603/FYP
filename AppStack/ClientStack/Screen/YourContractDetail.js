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
} from 'react-native';
import ContractHeading from '../Components/ContractHeading';
import env from '../../../env';
import axios from 'axios';

export default function YourContractDetail({navigation, route}) {
  const [id, setid] = useState(route.params.Uid);
  const [image, setimage] = useState(route.params.profile);
  const [userdata, setuserdata] = useState('');

  const getUserName = () => {
    console.log(id);
    const request = env.IP + 'user/' + id;
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
    Alert.alert('Delete Contract', 'Want to delete permanently', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);

  return (
    <View style={{flex: 1, backgroundColor: '#FFF', margin: 10}}>
      <View
        style={{
          //   backgroundColor: 'yellow',
          //   margin: 10,
          height: '30%',
          alignItems: 'center',
          borderColor: 'lightgrey',
          borderWidth: 5,
          borderRadius: 120,
          marginTop: 15,
          marginHorizontal: 70,
        }}>
        <Image
          source={{
            uri: image,
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
        <ContractHeading heading="Category" />
        <Text style={{marginHorizontal: 20, marginVertical: 10}}>
          {route.params.category}
        </Text>
        <ContractHeading heading="Title" />
        <Text style={{marginHorizontal: 20, marginVertical: 10}}>
          {route.params.title}
        </Text>
        <ContractHeading heading="Description" />
        <Text style={{marginHorizontal: 20, marginVertical: 10}}>
          {route.params.description}
        </Text>
        <ContractHeading heading="Loction" />
        <Text style={{marginHorizontal: 20, marginVertical: 10}}>
          {route.params.location}
        </Text>
        <ContractHeading heading="Date" />
        <Text style={{marginHorizontal: 20, marginVertical: 10}}>
          {route.params.date}
        </Text>
        <ContractHeading heading="Budget" />
        <Text
          style={{
            marginHorizontal: 20,
            marginVertical: 10,
            fontSize: 25,
            fontWeight: 'bold',
          }}>
          {route.params.budget}
        </Text>

        <TouchableOpacity style={styles.button} onPress={ConfirmationAlert}>
          <Text style={{color: 'white'}}>Delete Contract</Text>
        </TouchableOpacity>
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
    borderRadius: 120,
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
