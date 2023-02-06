import React, { useState, useEffect } from 'react';
import PushNotification, { Importance } from 'react-native-push-notification';
import axios from 'axios';
import env from '../../../env';
import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   Image,
   Alert,
} from 'react-native';


const NotificationComponent = (props) => {

   const handleAccept = async () => {
      try {
         const request = env.IP + 'acceptrequest';
         const { contractid, id, requestyid } = props
         await axios.post(request, {
            contractid: contractid,
            id: id,
            requestyid: requestyid
         }).then(() => {
            console.log('handleAcceptåd')
            props.refresh()
         }).catch((err) => {
            console.log(err.response.data);
         })

      } catch (err) {
         console.log('error in handleAccept: ', err)
      }
   }
   const handleRejected = async () => {
      try {
         const request = env.IP + 'rejectrequest';
         const { contractid, id, requestyid } = props
         await axios.post(request, {
            contractid: contractid,
            id: id,
            requestyid: requestyid
         }).then(() => {
            console.log('handleRejected')
            props.refresh()
         }).catch((err) => {
            console.log(err.response.data);
         })

      } catch (err) {
         console.log('error in handleRejected: ', err)
      }
   }

   return (
      <>
         {props.contractid &&
            <View style={styles.inputView}>
               <View style={styles.textview}>
                  <Text style={styles.email} numberOfLines={1} ellipsizeMode="tail">
                     {props.title}
                  </Text>
                  <Text style={styles.email1} numberOfLines={2} ellipsizeMode="tail">
                     {props.description}
                  </Text>
                  {props.location && <Text style={styles.email1} numberOfLines={1} ellipsizeMode="tail">
                     @ {props.location}
                  </Text>}
               </View>

               <View style={styles.outerbutton}>
                  <Text style={{ position: 'absolute', top: 0, right: 4, color: '#c8c8c8' }}>{props.status}</Text>

                  {!props.status ? (
                     <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.button} onPress={() => { handleRejected() }}>
                           <Text style={styles.text3}> Reject </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => { handleAccept(); }}>
                           <Text style={styles.text3}>Accept </Text>
                        </TouchableOpacity>
                     </View>
                  ) : (
                     <Text style={styles.text3}>{props.status}</Text>
                  )
                  }

               </View>
            </View>
         }
         {!props.contractid &&
            <View style={styles.faltu}>
               <Text style={styles.email} numberOfLines={1} ellipsizeMode="tail">
                  {props.title}
               </Text>
               <Text style={styles.email1} numberOfLines={2} ellipsizeMode="tail">
                  {props.description}
               </Text>
               {props.location && <Text style={styles.email1} numberOfLines={1} ellipsizeMode="tail">
                  @ {props.location}
               </Text>}
            </View>
         }
      </>
   );
};
const styles = StyleSheet.create({
   inputView: {
      flexDirection: 'row',
      height: 80,
   },
   outerbutton: {
      backgroundColor: '#fff',
      width: '40%',
      flexDirection: 'column',
      paddingLeft: 10,
      alignItems: 'center',
      justifyContent: 'center'
   },
   buttonview: {
      paddingLeft: 14,
      backgroundColor: '#fff',
      flexDirection: 'row',
   },
   button: {
      backgroundColor: 'black',
      marginLeft: 10,
      marginTop: 10,
      borderRadius: 10,
   },
   faltu: {
      backgroundColor: '#fff',
      width: '100%',
      flexDirection: 'column',
      paddingLeft: 10,
   },
   textview: {
      backgroundColor: '#fff',
      width: '60%',
      flexDirection: 'column',
      paddingLeft: 10,
   },
   email: {
      fontWeight: 'bold',
      marginLeft: 5,
      color: 'black',
      fontSize: 16,
   },
   email1: {
      marginLeft: 5,
      fontSize: 14,
      color: '#676767',
   },

   text3: {
      fontSize: 14,
      paddingHorizontal: 5,
      paddingVertical: 3,
      color: 'white',
      // fontWeight: 'bold',
   },
});
export default NotificationComponent;
