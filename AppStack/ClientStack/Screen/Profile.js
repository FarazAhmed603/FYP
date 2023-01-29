
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from './Button';

const Heading = (props, { navigation }) => {
  const { editAble, seteditAble, update } = props;
  return (
    <View>
      <View style={styles.heading}>
        <Text style={styles.headtext}> {props.heading} </Text>
        {
          editAble.body ? (
            <View style={{
              marginLeft: 237, borderRadius: 4, borderColor: '#808080', margin: 5,
              borderWidth: 4, backgroundColor: '#808080', alignContent: 'center', justifyContent: 'center',
              paddingLeft: 5, paddingRight: 5, paddingBottom: 5
            }}>
              <TouchableOpacity onPress={() => {
                seteditAble({ ...editAble, body: false })
                update()
              }}>
                <Text style={{ fontSize: 15, color: 'white' }}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{
              marginLeft: 237, borderRadius: 4, borderColor: '#808080', margin: 5,
              borderWidth: 4, backgroundColor: '#808080', alignContent: 'center', justifyContent: 'center',
              paddingLeft: 8, paddingRight: 8, paddingBottom: 5
            }}>
              <TouchableOpacity onPress={() => {
                seteditAble({ ...editAble, body: true })
              }}>
                <Text style={{ fontSize: 15, color: 'white' }}>Edit</Text>
              </TouchableOpacity>
            </View>
          )
        }

      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  butt: {
    color: 'black'
  },
  heading: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headtext: {
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 16,
  },
  inputView: {
    backgroundColor: 'white',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#c2c2a3',
    alignItems: 'center',
  },
  TextInput: {
    height: 40,
    width: '90%',
    color: 'black',
    padding: 10,
  },
});

export default Heading;
import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
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
import { AuthContext } from '../../../Context/AuthContext';
import ProfileHeading from '../Components/ProfileHeading';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../../env';
import axios from 'axios';

export default function Profile({ navigation }) {
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
  const [isEditMode, setIsEditMode] = useState({ name: false, body: false });

  let val = 60;
  if (description) {
    if ((description.length / 35) * 22 > 60) {
      val = (description.length / 35) * 22;
    } else {
      val = 60;
    }
  }
  const [height, setHeight] = useState(val);

  //---------------update data---------------
  const updateUserInfo = async () => {
    try {
      const response = await axios.put(request, data)
        .catch((err) => {
          console.log("\n Data update error :  ", err.response.data.message)
        });
      await setuserInfo({ ...userInfo, ...data });
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
          let { uri } = res.assets[0];
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

  // useEffect(() => {
  //   console.log(height);
  // }, [height]);

  //--------picker end---------
  const createTwoButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);


  //----------------skills-------------------

  const [items, setItems] = useState([
    { label: 'painter', selected: userInfo.skill.includes('painter') },
    { label: 'plumber', selected: userInfo.skill.includes('plumber') },
    { label: 'writer', selected: userInfo.skill.includes('writer') },
    { label: 'gardener', selected: userInfo.skill.includes('gardener') },
    { label: 'developer', selected: userInfo.skill.includes('developer') },
    { label: 'teacher', selected: userInfo.skill.includes('teacher') },
    { label: 'electrition', selected: userInfo.skill.includes('electrition') },
    { label: 'housekeeper', selected: userInfo.skill.includes('housekeeper') },
  ]);

  let count;
  const checkcount = async () => {
    count = 0
    await items.map((item) => {
      if (item.selected && count < 3) {
        count++;
      }
    })
    return count < 3 ? true : false
  }

  useEffect(() => {
    setData(prevData => {
      return {
        ...prevData,
        skill: items.filter(item => item.selected).map(item => item.label)
      }
    });
  }, [items])

  //-----------------------render starts here---------------------------------------------------------------------------------------------

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView keyboardDismissMode='on-drag' >
        <View style={styles.header}>
          {/*-----------------name---------------*/}

          <View style={{ borderBottomColor: 'black' }}>
            {isEditMode.name ? (
              <View style={styles.headerbody}>
                <Icon
                  style={{ marginTop: 8 }}
                  name="account"
                  size={23}
                  color="black"
                />
                <View style={styles.inputouter}>
                  {/* --------------input name----------- */}
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
                <View style={{ marginTop: 10, direction: 'ltr' }}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsEditMode({ ...isEditMode, name: false });
                      updateUserInfo();
                    }}>
                    <Icon name="pencil-outline" size={23} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.headerbody}>
                <Icon
                  style={{ marginTop: 8 }}
                  name="account"
                  size={23}
                  color="black"
                />
                <Text style={styles.text}>
                  {userInfo.firstname} {userInfo.lastname}
                </Text>

                <View
                  style={{ marginLeft: 180, marginTop: 10, direction: 'ltr' }}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsEditMode({ ...isEditMode, name: true });
                    }}>
                    <Icon name="pencil" size={23} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {/*-----------------email---------------*/}
          <View style={styles.headerbody}>
            <Icon style={{ marginTop: 8 }} name="email" size={23} color="black" />
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
            <View style={styles.inputView}>
              <View style={{ flexDirection: 'column' }}>
                <Icon
                  style={{ marginHorizontal: 20, marginTop: 5 }}
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
              {isEditMode.body ? (
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
              ) : (
                <Text style={styles.TextInput}> {userInfo.phone}</Text>
              )}
            </View>
          </View>

          {/*-----------------description---------------*/}
          <View>
            <View
              style={{
                flex: 1,
                height: height,
                borderBottomWidth: 1,
                borderColor: '#c2c2a3',
                flexDirection: 'row',
                marginTop: 3,
                marginLeft: 10,
              }}>
              <View style={{ flexDirection: 'column' }}>
                <Material
                  style={{ marginHorizontal: 20, marginTop: 15 }}
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

              {isEditMode.body ? (
                <TextInput
                  style={{
                    marginRight: 15,
                    backgroundColor: '#FFF',
                    borderRadius: 10,
                    borderColor: '#C0C0C0',
                    borderWidth: 1,
                    width: 300,
                    height: height,
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
                    if (description) {
                      if ((description.length / 35) * 22 >= 60) {
                        val = (description.length / 35) * 20;
                      } else {
                        val = 60;
                      }
                    }
                    setHeight(val);
                  }}
                />
              ) : (
                <Text
                  style={{
                    marginTop: 6,
                    height: height,
                    width: 300,
                    color: 'black',
                  }}>
                  {userInfo.description}
                </Text>
              )}
            </View>
          </View>
          {/*-----------------location---------------*/}
          <View>
            <View style={styles.inputView}>
              <View style={{ flexDirection: 'column' }}>
                <Icon
                  style={{ marginHorizontal: 20, marginTop: 4 }}
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

              {isEditMode.body ? (
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
              ) : (
                <Text style={styles.TextInput}> {userInfo.location}</Text>
              )}
            </View>
          </View>
          {/*--------------------CNIC---------------------- */}

          <View>
            <View style={styles.inputView}>
              <View style={{ flexDirection: 'column' }}>
                <Icon
                  style={{ marginHorizontal: 20, marginTop: 4 }}
                  name="card-account-details-outline"
                  size={23}
                  color="black"
                />
                <Text
                  style={{
                    color: 'black',
                    fontSize: 8,
                    fontWeight: 'bold',
                    marginLeft: 22,
                  }}>
                  CNIC
                </Text>
              </View>
              {isEditMode.body ? (

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
                  placeholder="CNIC"
                  value={data.cnic}
                  onChangeText={e =>
                    setData({
                      ...data,
                      cnic: e,
                    })
                  }
                />
              ) : (

                <Text style={styles.TextInput}> {userInfo.cnic}</Text>

              )}
            </View>
          </View>
          {/*-----------------education---------------*/}
          <View>
            <View style={styles.inputView}>
              <View style={{ flexDirection: 'column' }}>
                <Icon
                  style={{ marginRight: 20, marginLeft: 20, marginTop: 4 }}
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
              {isEditMode.body ? (
                <TextInput
                  style={{
                    marginRight: 15,
                    backgroundColor: '#FFF',
                    borderRadius: 10, borderColor: '#C0C0C0', borderWidth: 1,
                    width: 300, height: 36,
                  }}
                  placeholder="Your education"
                  value={data.education}
                  onChangeText={e => setData({ ...data, education: e, })}
                />
              ) : (
                <Text style={styles.TextInput}> {userInfo.education}</Text>
              )}
            </View>
          </View>
          {/*-----------------skills---------------*/}
          <View style={{
            height: 70, marginHorizontal: 10,
            overflow: 'scroll', flexDirection: 'row'
          }}>
            <View style={{ flexDirection: 'column' }}>
              <Icon
                style={{ marginHorizontal: 20, marginTop: 10 }}
                name="emoticon-cool-outline"
                size={23}
                color="black"
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 8,
                  fontWeight: 'bold',
                  marginLeft: 21,
                }}>
                skills
              </Text>
            </View>
            {isEditMode.body ? (
              //<View style={{ flexDirection: 'column' }}>
              <FlatList
                nestedScrollEnabled={true}
                style={{ marginTop: 13 }}
                horizontal
                data={items}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.label}
                renderItem={({ item }) => {
                  // if (item.selected) {
                  return (
                    <TouchableOpacity onPress={() => {
                      checkcount()
                        .then((res) => {
                          if (res || item.selected == true) {
                            setItems(
                              items.map(i => i.label === item.label ? { ...i, selected: !item.selected } : i)
                            );
                          }
                        })
                    }}>
                      <View
                        style={{
                          marginRight: 5,
                          paddingVertical: 5, paddingHorizontal: 10,
                          borderWidth: 1,
                          borderColor: item.selected ? 'white' : '#808080',
                          backgroundColor: item.selected ? '#808080' : 'white',
                          borderRadius: 40,
                        }}>
                        <Text style={{ color: item.selected ? 'white' : '#808080', fontWeight: '400', fontSize: 13 }}>
                          {item.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                  // }
                  // else { return }
                }}
              />
              //</View>
            ) : (
              <View style={{ flexDirection: 'row' }}>
                {data.skill.map((item, index) => {
                  return <Text
                    key={index}
                    style={styles.skills}>{item}{data.skill[index + 1] ? "," : ""} </Text>
                })}
              </View>
            )}


          </View>

        </View>
      </ScrollView >

    </View >
  );
}
const styles = StyleSheet.create({
  skills: {
    height: 30, marginTop: 10, marginLeft: 3,
    paddingTop: 5,
    color: 'black',
    // borderBottomWidth: 1, borderColor: 'black'
  },
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

    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
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
