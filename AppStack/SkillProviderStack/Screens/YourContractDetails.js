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
import ContractHeading from '../Component/ContractHeading';
import axios from 'axios';
import env from '../../../env';

export default function YourContractDetails({navigation, route}) {
  const [press, setpress] = useState(false);
  const [id, setid] = useState(route.params.Uid);
  const [Contractid, setContractid] = useState(route.params.Cid);
  const [userdata, setuserdata] = useState('');
  const [image, setimage] = useState(route.params.profile);

  const getUserName = () => {
    console.log('user id', id);
    const request = env.IP + 'user/' + id;
    let getreq = request;
    axios
      .get(getreq)
      .then(res => {
        setuserdata(res.data);
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
      {text: 'Yes', onPress: () => DelContract()},
    ]);

  const DelContract = () => {
    console.log('contract id', Contractid);
    const request = env.IP + 'deletecontract/' + Contractid;
    try {
      axios
        .delete(request)
        .then(res => {
          console.log('contract deleted');
          navigation.goBack();
        })
        .catch(error => {
          console.log(error, 'error while deleting contract');
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF', margin: 10}}>
      <View
        style={{
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
        <ContractHeading heading="Skill" />
        <Text
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          {route.params.category}
        </Text>

        <ContractHeading heading="Description" />
        <Text style={{marginHorizontal: 10, marginVertical: 10}}>
          {route.params.description}
        </Text>
        <ContractHeading heading="Loction" />
        <Text style={{marginHorizontal: 10, marginVertical: 10}}>
          {route.params.location}
        </Text>

        <ContractHeading heading="Budget" />
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
