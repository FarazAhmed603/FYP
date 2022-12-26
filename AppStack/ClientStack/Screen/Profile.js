import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
  TouchableHighlight,
  Alert,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfileHeading from '../Components/ProfileHeading';

import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';

export default function Profile({navigation}) {
  const [image, setimage] = useState(null);

  var options = {
    title: 'Select Image',
    customButtons: [
      {
        name: 'customOptionKey',
        title: 'Choose Photo from Custom Option',
      },
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const picker = () => {
    console.log('im in image picker');
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setFilePath(response);
      }
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <View style={styles.headerbody}>
          <Icon style={{marginTop: 8}} name="account" size={23} color="black" />
          <Text style={styles.text}>Faraz Ahmed</Text>
        </View>
        <View style={styles.headerbody}>
          <Icon style={{marginTop: 8}} name="email" size={23} color="black" />
          <Text style={styles.text}>fa628804@gmail.com</Text>
        </View>
        <TouchableOpacity
          // style={styles.avatar1}
          onPress={() => {
            picker;
          }}>
          <Image
            source={{
              uri: 'https://bootdey.com/img/Content/avatar/avatar6.png',
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <ProfileHeading heading="About" />
        <View style={styles.descriptionhead}>
          <Text style={styles.descriptiontext}>Description</Text>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.TextInput}>Location</Text>
        </View>
        <View style={styles.inputView}>
          <Icon
            style={{marginRight: 20, marginLeft: 20}}
            name="phone"
            size={23}
            color="black"
          />
          <Text style={styles.TextInput}>0300-1113207</Text>
        </View>

        <ProfileHeading heading="Education" />
        <View style={styles.descriptionhead}>
          <Text style={styles.descriptiontext}>Education</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    // backgroundColor: '#00BFFF',
    height: 150,
    margin: 20,
    padding: 10,
    borderColor: '#c2c2a3',
    borderWidth: 3,
    borderRadius: 25,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#c2c2a3',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
  },
  body: {
    marginTop: 50,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  text: {
    marginLeft: 20,
    marginTop: 10,
  },
  headerbody: {
    width: '70%',
    height: 30,
    flexDirection: 'row',
  },
  title: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    backgroundColor: '#c2c2a3',
  },
  inputView: {
    backgroundColor: 'white',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#c2c2a3',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  TextInput: {
    height: 40,
    width: '90%',
    color: 'black',
    padding: 10,
  },
  descriptionhead: {
    backgroundColor: 'white',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#c2c2a3',

    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  descriptiontext: {
    height: 40,
    width: '90%',
    color: 'black',
    padding: 10,
    marginLeft: 20,
  },
});
