import {StatusBar} from 'react-native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EditProfile({navigation}) {
  const [Description, setDescription] = useState('');
  const [Location, setLocation] = useState('');
  const [Phone, setPhone] = useState('');
  const [Education, setEducation] = useState('');
  const [Skill, setSkill] = useState('');
  const [Language, setLanguage] = useState('');
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View
        style={{
          height: 100,
        }}></View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.text_join}>Update your profile </Text>
        <View style={styles.inputView}>
          <Icon
            style={styles.iconimage}
            name="account"
            size={23}
            color="black"
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Description"
            placeholderTextColor="grey"
            onChangeText={Description => setDescription(Description)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon
            style={styles.iconimage}
            name="account"
            size={23}
            color="black"
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Location"
            placeholderTextColor="grey"
            onChangeText={Location => setLocation(Location)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon
            style={styles.iconimage}
            name="account"
            size={23}
            color="black"
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Phone no"
            placeholderTextColor="grey"
            onChangeText={Phone => setPhone(Phone)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon
            style={styles.iconimage}
            name="account"
            size={23}
            color="black"
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Education"
            placeholderTextColor="grey"
            onChangeText={Education => setEducation(Education)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon
            style={styles.iconimage}
            name="account"
            size={23}
            color="black"
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Skill"
            placeholderTextColor="grey"
            onChangeText={Skill => setSkill(Skill)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon
            style={styles.iconimage}
            name="account"
            size={23}
            color="black"
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Language"
            placeholderTextColor="grey"
            onChangeText={Language => setLanguage(Language)}
          />
        </View>
        <TouchableOpacity
          style={styles.NextButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.NextText}> Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 200,
  },
  text_join: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  NextButton: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: 'black',
  },
  NextText: {
    color: 'white',
  },
  inputView: {
    backgroundColor: 'white',
    width: '70%',
    height: 45,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
  },

  TextInput: {
    height: 60,
    color: 'black',
  },
  iconimage: {
    marginTop: 18,
    marginRight: 10,
  },
});
