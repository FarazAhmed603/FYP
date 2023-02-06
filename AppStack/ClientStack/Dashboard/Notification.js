import React, { useState, useEffect, useContext, useCallback } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
  FlatList,
  RefreshControl
} from 'react-native';
import NotificationComponent from '../Components/NotificationComponent';
import { AuthContext } from '../../../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../../env';
import axios from 'axios';

const Notification = () => {
  const [isLoading, setIsloading] = useState(false);
  const { userInfo, isLoggedIn } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const {
    notification,
  } = userInfo;

  // const noti = {
  // title: notification.title,
  // body: notification.body,
  // status: notification.status,
  // contractid: notification.contractid,
  // senderid: notification.senderid
  // }

  useEffect(() => {
    isLoggedIn();
  }, [refreshing])


  const ItemView = ({ item }) => {
    // notification.find(noti => { if (item._id === noti.contractid) { return noti.title } }).title
    return (
      // Flat List Item
      <View style={{ margin: 3 }}>
        <NotificationComponent
          title={item.title}
          description={item.body}
          location={item.location}
          status={item.status}
          id={item._id}
          contractid={item.contractid}
          requestyid={item.senderid}
          refresh={onRefresh}
        />
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (<ActivityIndicator size="small" color="lightgrey" animating={isLoading} />) : <></>}
      {notification[0] && (
        <FlatList
          style={{ flex: 1 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          data={notification}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />
      )}
      {!notification[0] && (
        <FlatList
          style={{ flex: 1 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          data={[
            { key: '1', value: 'No notifications' }
          ]}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <Text style={{ flex: 1, alignSelf: 'center', paddingTop: 300, fontSize: 17, fontWeight: 'bold' }} >{item.value}</Text>
            </View>
          )}

        />
      )}
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
