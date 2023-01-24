import * as React from 'react';
import {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  multiline,
  ScrollView,
  Keyboard,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {AuthContext} from '../../../Context/AuthContext';
import env from '../../../env';
import axios from 'axios';

export default function CreateContract({navigation}) {
  const http = `http://${env.IP}:4000/`;
  const {userInfo} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [valuepicker, setValuepicker] = useState(null);
  const [value, setValue] = useState(null);
  const [description, setdescription] = useState('');
  const [title, settitle] = useState('');
  const [address, setaddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [opendate, setOpendate] = useState(false);
  const [budget, setbudget] = useState('');
  const [id, setid] = useState(userInfo._id);
  const [errors, setErrors] = useState({});
  const [isValid, setisValid] = useState(false);

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

  const createcontract = async () => {
    console.log('createcontract called');
    console.log(
      'data..........',
      id,
      '.....',
      valuepicker,
      '.....',
      title,
      '.....',
      description,
      '.....',
      value,
      '.....',
      date,
      '.....',
      budget,
      '....',
      address,
    );
    const request = http + 'newcontract';
    try {
      await axios
        .post(request, {
          userid: id,
          category: valuepicker,
          title: title,
          description: description,
          worktype: value,
          jobdate: date,
          budget: budget,
          location: address,
        })
        .then(res => {
          console.log('contract created ', res);
          navigation.goBack();
        })
        .catch(err => {
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const validate = () => {
    console.log('validating');
    Keyboard.dismiss();
    let isValid = true;
    if (!valuepicker) {
      handleError('choose a category first', 'valuepicker');
      isValid = false;
      setisValid(true);
    }
    if (!title) {
      handleError('Enter title', 'title');
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
  return (
    <View style={styles.container}>
      {isValid ? (
        <Text style={{color: 'red'}}>Fill are credential</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}
      <Text style={styles.categoryTitle}>Category</Text>
      <DropDownPicker
        open={open}
        value={valuepicker}
        items={items}
        setOpen={setOpen}
        setValue={setValuepicker}
        setItems={setItems}
      />
      <ScrollView>
        <Text style={styles.categoryTitle}>Title</Text>
        <TextInput
          style={styles.TextInput1}
          maxLength={30}
          placeholder="e.g Clean house                                         "
          placeholderTextColor="grey"
          onChangeText={title => settitle(title)}
        />
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

        <RadioButton.Group
          onValueChange={newValue => setValue(newValue)}
          value={value}>
          <Text style={styles.categoryTitle}>Select Work Type:</Text>
          <View style={styles.radioContainer}>
            <RadioButton value="Physical" />
            <Text style={styles.title}>Physical</Text>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton value="Online" />
            <Text style={styles.title}>Online</Text>
          </View>
        </RadioButton.Group>
        <Text style={styles.categoryTitle}>Address</Text>
        <TextInput
          style={styles.TextInput1}
          placeholder="e.g house xyz                                         "
          placeholderTextColor="grey"
          onChangeText={address => setaddress(address)}
        />
        <Text style={styles.categoryTitle}>Date</Text>
        <View style={styles.date}>
          <Text style={{width: '85%'}}>{date.toUTCString()}</Text>
          <DatePicker
            modal
            open={opendate}
            date={date}
            onConfirm={date => {
              setOpendate(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpendate(false);
            }}
          />
          <Button
            title="Date"
            color="black"
            onPress={() => setOpendate(true)}
          />
        </View>
        <Text style={styles.categoryTitle}>Budget</Text>
        <TextInput
          style={styles.TextInput1}
          placeholder="Enter budget in ruppees                                         "
          placeholderTextColor="grey"
          onChangeText={budget => setbudget(budget)}
        />
        <TouchableOpacity style={styles.button} onPress={validate}>
          <Text style={{color: 'white'}}>Add</Text>
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
