import React, {useState, useEffect, useContext} from 'react';
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
import Material from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../../../Context/AuthContext';
import ProfileHeading from '../Components/ProfileHeading';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../../env';
import axios from 'axios';

export default function Profile({navigation}) {
  const {userInfo, setuserInfo} = useContext(AuthContext);
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
  });

  const request = env.IP + 'updateuser/' + userInfo._id;
  const [isEditMode, setIsEditMode] = useState({name: false, body: false});

  let val = 60;
  if ((description.length / 35) * 22 > 60) {
    val = (description.length / 35) * 22;
  } else {
    val = 60;
  }
  const [height, setHeight] = useState(val);

  //---------------update data---------------
  const updateUserInfo = async () => {
    try {
      const response = await axios.put(request, data);
      await setuserInfo({...userInfo, ...data});
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (error) {
      console.log('update error', error);
    }
  };

  useEffect(() => {
    updateUserInfo();
  }, [data]);

  //--------api end------------

  //-----------image picker--------------
  var options = {
    title: 'Select Image',

    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const picker = async () => {
    try {
      const res = await launchImageLibrary(options).then(res => {
        if (res.didCancel) {
          console.log('\n User cancelled image picker');
        } else if (res.error) {
          console.log('\n ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('\n User tapped custom button: ', res.customButton);
        } else {
          let {uri} = res.assets[0];
          console.log('\n uri value', uri);
          setData({
            ...data,
            profile: uri,
          });
        }
      });
    } catch (error) {
      console.log('\n Error while handling image picker:', error);
    }
  };

  useEffect(() => {
    updateUserInfo();
  }, [data.profile]);

  //--------picker end---------
  const createTwoButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  // useEffect(() => {
  //   updateUserInfo
  // }, [isEditMode.phone])

  //-----------------------render starts here---------------------------------------------------------------------------------------------

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={styles.header}>
          {/*-----------------name---------------*/}

          <View style={{borderBottomColor: 'black'}}>
            {isEditMode.name ? (
              <View style={styles.headerbody}>
                <Icon
                  style={{marginTop: 8}}
                  name="account"
                  size={23}
                  color="black"
                />
                <View style={styles.inputouter}>
                  {/* --------------sadasdasd----------- */}
                  <TextInput
                    style={styles.inputInner}
                    placeholder="First name"
                    value={data.firstname}
                    onChangeText={e =>
                      setData({
                        ...data,
                        firstname: e,
                      })
                    }
                  />
                  <TextInput
                    style={styles.inputInner}
                    placeholder="Last name"
                    value={data.lastname}
                    onChangeText={e =>
                      setData({
                        ...data,
                        lastname: e,
                      })
                    }
                  />
                </View>
                <View style={{marginTop: 10, direction: 'ltr'}}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsEditMode({...isEditMode, name: false});
                      updateUserInfo();
                    }}>
                    <Icon name="pencil-outline" size={23} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.headerbody}>
                <Icon
                  style={{marginTop: 8}}
                  name="account"
                  size={23}
                  color="black"
                />
                <Text style={styles.text}>
                  {userInfo.firstname} {userInfo.lastname}
                </Text>

                <View
                  style={{marginLeft: 180, marginTop: 10, direction: 'ltr'}}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsEditMode({...isEditMode, name: true});
                    }}>
                    <Icon name="pencil" size={23} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {/*-----------------email---------------*/}
          <View style={styles.headerbody}>
            <Icon style={{marginTop: 8}} name="email" size={23} color="black" />
            <Text style={styles.text}>{userInfo.email} </Text>
          </View>
          {/*-----------------image---------------*/}
          <Image
            source={{
              uri: userInfo.profile,
            }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.body}>
          {/*-----------------change imgae---------------*/}
          <TouchableOpacity
            style={{
              alignContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}
            onPress={picker}>
            <Text>Edit profile picture</Text>
          </TouchableOpacity>

          {/*-----------------userInfo body---------------*/}
          <ProfileHeading
            heading="About"
            editAble={isEditMode}
            seteditAble={setIsEditMode}
            update={updateUserInfo}
          />
          {/*-----------------phone---------------*/}

          <View>
            {isEditMode.body ? (
              <View style={styles.inputView}>
                <View style={{flexDirection: 'column'}}>
                  <Icon
                    style={{marginRight: 20, marginLeft: 20, marginTop: 5}}
                    name="phone"
                    size={23}
                    color="black"
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 8,
                      fontWeight: 'bold',
                      marginLeft: 18,
                    }}>
                    Phone #
                  </Text>
                </View>
                <TextInput
                  style={styles.inputInner}
                  placeholder="phone number"
                  value={data.phone}
                  onChangeText={e =>
                    setData({
                      ...data,
                      phone: e,
                    })
                  }
                />
              </View>
            ) : (
              <View style={styles.inputView}>
                <View style={{flexDirection: 'column'}}>
                  <Icon
                    style={{marginRight: 20, marginLeft: 20, marginTop: 5}}
                    name="phone"
                    size={23}
                    color="black"
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 8,
                      fontWeight: 'bold',
                      marginLeft: 18,
                    }}>
                    Phone #
                  </Text>
                </View>
                <Text style={styles.TextInput}> {userInfo.phone}</Text>
              </View>
            )}
          </View>
          {/*-----------------skills---------------*/}

          {/*-----------------description---------------*/}
          <View>
            {isEditMode.body ? (
              <View
                style={{
                  flex: 1,
                  height: 70,
                  borderBottomWidth: 1,
                  borderColor: '#c2c2a3',
                  flexDirection: 'row',
                  marginTop: 3,
                  marginLeft: 10,
                }}>
                <View style={{flexDirection: 'column'}}>
                  <Material
                    style={{marginRight: 20, marginLeft: 20, marginTop: 15}}
                    name="description"
                    size={23}
                    color="black"
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 8,
                      fontWeight: 'bold',
                      marginLeft: 10,
                    }}>
                    Description
                  </Text>
                </View>

                <TextInput
                  style={{
                    marginRight: 15,
                    backgroundColor: '#FFF',
                    borderRadius: 10,
                    borderColor: '#C0C0C0',
                    borderWidth: 1,
                    width: 300,
                    height: 60,
                    alignSelf: 'center',
                  }}
                  multiline={true}
                  numberOfLines={0}
                  placeholder="description"
                  value={data.description}
                  onChangeText={e => {
                    setData({
                      ...data,
                      description: e,
                    });
                    let val = 60;
                    if ((description.length / 35) * 22 >= 60) {
                      val = (description.length / 35) * 22;
                    } else {
                      val = 60;
                    }

                    setHeight(val);
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  height: height,
                  borderBottomWidth: 1,
                  borderColor: '#c2c2a3',
                  flexDirection: 'row',
                  marginTop: 10,
                  marginLeft: 10,
                }}>
                <View style={{flexDirection: 'column'}}>
                  <Material
                    style={{marginRight: 20, marginLeft: 20, marginTop: 5}}
                    name="description"
                    size={23}
                    color="black"
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 8,
                      fontWeight: 'bold',
                      marginLeft: 10,
                    }}>
                    Description
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: 6,
                    height: 100,
                    width: 300,
                    color: 'black',
                  }}>
                  {userInfo.description}{' '}
                </Text>
              </View>
            )}
          </View>
          {/*-----------------location---------------*/}
          <View>
            {isEditMode.body ? (
              <View style={styles.inputView}>
                <View style={{flexDirection: 'column'}}>
                  <Icon
                    style={{marginRight: 20, marginLeft: 20, marginTop: 4}}
                    name="map-marker-account"
                    size={23}
                    color="black"
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 8,
                      fontWeight: 'bold',
                      marginLeft: 16,
                    }}>
                    Location
                  </Text>
                </View>

                <TextInput
                  style={{
                    marginRight: 15,
                    backgroundColor: '#FFF',
                    borderRadius: 10,
                    borderColor: '#C0C0C0',
                    borderWidth: 1,
                    width: 300,
                    height: 36,
                  }}
                  placeholder="enter location"
                  value={data.location}
                  onChangeText={e =>
                    setData({
                      ...data,
                      location: e,
                    })
                  }
                />
              </View>
            ) : (
              <View style={styles.inputView}>
                <View style={{flexDirection: 'column'}}>
                  <Icon
                    style={{marginRight: 20, marginLeft: 20, marginTop: 4}}
                    name="map-marker-account"
                    size={23}
                    color="black"
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 8,
                      fontWeight: 'bold',
                      marginLeft: 16,
                    }}>
                    Location
                  </Text>
                </View>
                <Text style={styles.TextInput}> {userInfo.location}</Text>
              </View>
            )}
          </View>
          {/*-----------------education---------------*/}
          <View>
            {isEditMode.body ? (
              <View style={styles.inputView}>
                <View style={{flexDirection: 'column'}}>
                  <Icon
                    style={{marginRight: 20, marginLeft: 20, marginTop: 4}}
                    name="book-education-outline"
                    size={23}
                    color="black"
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 8,
                      fontWeight: 'bold',
                      marginLeft: 14,
                    }}>
                    Education
                  </Text>
                </View>
                <TextInput
                  style={{
                    marginRight: 15,
                    backgroundColor: '#FFF',
                    borderRadius: 10,
                    borderColor: '#C0C0C0',
                    borderWidth: 1,
                    width: 300,
                    height: 36,
                  }}
                  placeholder="Your education"
                  value={data.education}
                  onChangeText={e =>
                    setData({
                      ...data,
                      education: e,
                    })
                  }
                />
              </View>
            ) : (
              <View style={styles.inputView}>
                <View style={{flexDirection: 'column'}}>
                  <Icon
                    style={{marginRight: 20, marginLeft: 20, marginTop: 4}}
                    name="book-education-outline"
                    size={23}
                    color="black"
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 8,
                      fontWeight: 'bold',
                      marginLeft: 14,
                    }}>
                    Education
                  </Text>
                </View>
                <Text style={styles.TextInput}> {userInfo.education}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    //backgroundColor: '',
    height: 200,
    margin: 10,
    padding: 10,
    borderColor: '#c2c2a3',
    borderWidth: 2,
    borderRadius: 20,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: '#c2c2a3',
    marginTop: 120,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'white',
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
    flex: 1,
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#c2c2a3',
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
  },
  TextInput: {
    marginTop: 6,
    height: 43,
    color: 'black',
  },
  inputouter: {
    height: 44,
    flexDirection: 'row',
    marginLeft: 17,
  },
  inputInner: {
    marginRight: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 110,
    height: 36,
  },
  // descriptionhead: {
  //   backgroundColor: 'white',
  //   height: 50,
  //   borderBottomWidth: 1,
  //   borderColor: '#c2c2a3',

  //   justifyContent: 'center',
  //   alignItems: 'flex-start',
  // },
  // descriptiontext: {
  //   height: 40,
  //   width: '90%',
  //   color: 'black',
  //   padding: 10,
  //   marginLeft: 20,
  // },
});
