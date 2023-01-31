import * as React from 'react';
import {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  multiline,
  ScrollView,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import env from '../../../env';
import axios from 'axios';
import {AuthContext} from '../../../Context/AuthContext';

export default function UploadSkill({navigation}) {
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [valuepicker, setValuepicker] = useState(null);
  const [address, setaddress] = useState();
  const [description, setdescription] = useState('');
  const [isValid, setisValid] = useState(false);
  const {userInfo} = useContext(AuthContext);
  const [id, setid] = useState(userInfo._id);
  const [budget, setbudget] = useState('');

  const [items, setItems] = useState([
    {value: 'painter', label: 'painter'},
    {value: 'plumber', label: 'plumber'},
    {value: 'writer', label: 'writer'},
    {value: 'gardener', label: 'gardener'},
    {value: 'developer', label: 'developer'},
    {value: 'teacher', label: 'teacher'},
    {value: 'electrition', label: 'electrition'},
    {value: 'housekeeper', label: 'housekeeper'},
  ]);

  const validate = () => {
    console.log('validating');
    Keyboard.dismiss();
    let isValid = true;
    if (!valuepicker) {
      handleError('choose a Skill first', 'valuepicker');
      isValid = false;
      setisValid(true);
    }

    if (!description) {
      handleError('Write some description', 'description');
      isValid = false;
      setisValid(true);
    }
    if (!budget) {
      handleError('Enter your budget', 'budget');
      isValid = false;
      setisValid(true);
    }
    if (!address) {
      handleError('Enter your address', 'address');
      isValid = false;
      setisValid(true);
    }

    if (isValid) {
      createcontract();
    }
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const createcontract = async () => {
    console.log(
      'data..........',
      id,
      '.....',
      valuepicker,
      '.....',
      description,
      '....',
      address,
      '.....',
      budget,
    );
    const request = env.IP + 'newcontract';
    try {
      await axios
        .post(request, {
          createdby: 'skprovider',
          userid: id,
          category: valuepicker,
          description: description,
          location: address,
          budget: budget,
        })
        .then(res => {
          console.log('contract created........... ', res);
          navigation.goBack();
        })
        .catch(err => {
          console.log(
            err.response.data.message,
            '..........................................',
          );
        });
    } catch (e) {
      console.log('/n kuch be', e);
    }
  };

  return (
    <View style={styles.container}>
      {isValid ? (
        <Text style={{color: 'red'}}>Fill all credential</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}

      <Text style={styles.categoryTitle}>Skills</Text>

      <DropDownPicker
        open={open}
        value={valuepicker}
        items={items}
        setOpen={setOpen}
        setValue={setValuepicker}
        setItems={setItems}
      />
      <ScrollView>
        <Text style={styles.categoryTitle}>Description</Text>
        <Text>max 200 letters</Text>
        <TextInput
          style={styles.TextInput2}
          placeholder="e.g Clean 2 rooms                                          "
          placeholderTextColor="grey"
          multiline={multiline || true}
          maxLength={200}
          onChangeText={description => setdescription(description)}
        />

        <Text style={styles.categoryTitle}>Address</Text>
        <TextInput
          style={styles.TextInput1}
          placeholder="e.g house xyz                                         "
          placeholderTextColor="grey"
          onChangeText={address => setaddress(address)}
        />
        <Text style={styles.categoryTitle}>Budget</Text>
        <TextInput
          style={styles.TextInput1}
          placeholder="Enter budget in ruppees                                         "
          placeholderTextColor="grey"
          onChangeText={budget => setbudget(budget)}
        />
        <TouchableOpacity style={styles.button} onPress={validate}>
          <Text style={{color: 'white'}}>Add SKill</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    elevation: 2,
    padding: 20,
  },
  TextInput1: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    width: '100%',
    height: 50,
    padding: 10,
  },
  TextInput2: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    width: '100%',
    height: 150,
    padding: 10,
    textAlignVertical: 'top',
  },
  radioContainer: {
    flexDirection: 'row',
  },
  title: {
    marginTop: 7,
  },
  categoryTitle: {
    marginBottom: 10,
    fontSize: 20,
    marginTop: 10,
    color: 'black',
  },
  date: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  inputView: {
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  TextInput: {
    height: 40,
    width: '90%',
    color: 'black',
    padding: 10,
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
