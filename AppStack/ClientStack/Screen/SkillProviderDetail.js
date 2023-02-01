import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
} from 'react-native';

import ContractHeading from '../Components/ContractHeading';
import env from '../../../env';
import axios from 'axios';
import {AuthContext} from '../../../Context/AuthContext';

export default function SkillProviderDetail({navigation, route}) {
  const {userInfo} = useContext(AuthContext);
  const [press, setpress] = useState(false);
  const [id, setid] = useState(route.params.id);
  const [userdata, setuserdata] = useState('');
  const [contractid, setcontractid] = useState(route.params.Contractid);

  const clientrequest = () => {
    const request = env.IP + 'clientrequest';
    try {
      axios
        .post(request, {
          senderid: userInfo._id,
          contractid: contractid,
        })
        .then(res => {
          Alert.alert('Request send', 'Soon you will get response ');
          console.log(res, 'notification send');
          navigation.goBack();
        })
        .catch(err => {
          console.log(err, 'error while hiring a skill provider');
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getuserdata = async () => {
    const request = env.IP + 'user/' + id;
    try {
      let res = await axios.get(request);
      setuserdata(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuserdata();
  }, []);

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
            uri: userdata.profile,
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
        <ContractHeading heading="About" />
        <Text style={{marginHorizontal: 20, marginVertical: 10}}>
          {userdata.description}
        </Text>
        <ContractHeading heading="Skill" />
        <Text style={{marginHorizontal: 20, marginVertical: 10}}>
          {route.params.category}
        </Text>
        <ContractHeading heading="Description" />
        <Text style={{marginHorizontal: 20, marginVertical: 10}}>
          {route.params.description}
        </Text>
        <ContractHeading heading="Location" />
        <Text style={{marginHorizontal: 20, marginVertical: 10}}>
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
        <TouchableOpacity style={styles.button} onPress={() => clientrequest()}>
          <Text style={{color: 'white'}}>Hire </Text>
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
