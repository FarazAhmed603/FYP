import React, { useState, useEffect, useContext } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
  FlatList
} from 'react-native';
import NotificationComponent from '../Components/NotificationComponent';
import { AuthContext } from '../../../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../../env';
import axios from 'axios';


const Notification = () => {
  const [isLoading, setIsloading] = useState(false);
  const { userInfo, setuserInfo } = useContext(AuthContext);

  const {
    _id,
    firstname,
    lastname,
    email,
    location,
    phone,
    profile,
    skill,
    cnic,
    education,
    description,
    notification,
  } = userInfo;

  const [data, setData] = useState({
    firstname: firstname,
    lastname: lastname,
    email: email,
    phone: phone,
    profile: profile,
    skill: skill,
    cnic: cnic,
    location: location,
    description: description,
    education: education,
    notification: notification,
  });

  // const noti = {
  //   title: notification.title,
  //   body: notification.body,
  //   status: notification.status,
  //   contractid: notification.contractid,
  //   senderid: notification.senderid
  // }

  const [contracts, setContracts] = useState()

  const getcontract = async () => {
    const request = env.IP + 'getcontract';
    setIsloading(true);
    await fetch(request)
      .then(res => {
        console.log("Response: ", res);
        return res.json();
      })
      .then(dataa => {
        console.log("Data: ", dataa);
        setContracts(
          dataa.filter(
            item =>
              item.notification !== ' '
          ),
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    getcontract()
      .then(() => {
        setIsloading(false);
        console.log('.  \n\t\t', contracts[0])
      })
  }, [])


  const updateUserInfo = async () => {
    const request = env.IP + 'updateuser/' + userInfo._id;
    try {
      setIsloading(true);
      const response = await axios.put(request, data).catch(err => {
        console.log('\n Data update error :  ', err.response.data.message);
      });
      await setuserInfo({ ...userInfo, ...data });
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
        .then(setIsloading(false));
      console.log("Notification updated")
    } catch (error) {
      console.log('update error', error);
    }
  };


  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View style={{ margin: 3 }}>
        <NotificationComponent
          description={item.description}
          location={item.location}
          budget={item.budget}
          id={item.userid}
        />

      </View>
    );
  };
  return (
    <View>
      {isLoading ? (<ActivityIndicator size="small" color="lightgrey" animating={isLoading} />) : <></>}
      <NotificationComponent title={contracts} />
      <FlatList
        data={contracts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    height: 80,
  },
});

export default Notification;
