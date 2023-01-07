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
import DropDownPicker from 'react-native-dropdown-picker';
import ProfileHeading from '../Component/ProfileHeading';

export default function Profile({navigation}) {
  const [open, setOpen] = useState(false);
  const [valuepicker, setValuepicker] = useState(null);
  const [items, setItems] = useState([
    {value: '1', label: 'painter'},
    {value: '2', label: 'plumber'},
    {value: '3', label: 'writer'},
    {value: '4', label: 'gardener'},
    {value: '5', label: 'developer'},
    {value: '6', label: 'teacher'},
    {value: '7', label: 'electrition'},
    {value: '8', label: 'housekeeper'},
  ]);
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

        <Image
          source={{
            uri: 'https://bootdey.com/img/Content/avatar/avatar6.png',
            //uri: image.uri,
            // uri: 'data:image/jpeg;base64,' + image,
          }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.body}>
        <ProfileHeading heading="Skill" />
        <DropDownPicker
          open={open}
          value={valuepicker}
          items={items}
          setOpen={setOpen}
          setValue={setValuepicker}
          setItems={setItems}
        />
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
    marginTop: 80,
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
