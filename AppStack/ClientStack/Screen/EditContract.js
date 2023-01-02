import * as React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  multiline,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EditContact({navigation}) {
  const [open, setOpen] = useState(false);
  const [valuepicker, setValuepicker] = useState(null);
  const [value, setValue] = useState(null);
  const [description, setdescription] = useState('');
  const [title, settitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [opendate, setOpendate] = useState(false);
  const [budget, setbudget] = useState('');

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
    <View style={styles.container}>
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
        <View style={styles.inputView}>
          <Text style={styles.TextInput}>Location</Text>
          <TouchableOpacity>
            <Icon
              style={{marginRight: 20}}
              name="map-marker"
              size={23}
              color="black"
            />
          </TouchableOpacity>
        </View>
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={{color: 'white'}}>Confirm</Text>
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
