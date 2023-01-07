import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import ProfileHeading from '../Components/ProfileHeading';
export default function SkillProviderDetail({navigation, route}) {
  const [press, setpress] = useState(false);

  const dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${+923001113207}';
    } else {
      phoneNumber = 'telprompt:${+923001113207}';
    }

    Linking.openURL(phoneNumber);
  };
  return (
    // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //   <Text
    //     onPress={() => alert('This is the "Home" screen.')}
    //     style={{fontSize: 26, fontWeight: 'bold'}}>
    //     SkillProviderDetail Screen
    //   </Text>
    //   <Text>{route.params.id}</Text>
    //   <Text>{route.params.title}</Text>
    // </View>
    <View style={{flex: 1, backgroundColor: '#FFF', margin: 10}}>
      <View
        style={{
          //   backgroundColor: 'yellow',
          //   margin: 10,
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
        <Text style={{fontWeight: 'bold', fontSize: 25}}>Faraz Ahmed</Text>
      </View>
      <ScrollView>
        <ProfileHeading heading="About" />
        <Text style={{marginHorizontal: 20, marginVertical: 10}}>
          {route.params.title}
        </Text>
        <ProfileHeading heading="Skill" />
        <Text style={{marginHorizontal: 20, marginVertical: 10}}>
          {route.params.title}
        </Text>
        <ProfileHeading heading="Description" />
        <Text style={{marginHorizontal: 20, marginVertical: 10}}>
          {route.params.title}
        </Text>
        <ProfileHeading heading="Location" />
        <Text style={{marginHorizontal: 20, marginVertical: 10}}>
          {route.params.title}
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => setpress(true)}>
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
            03001113207
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