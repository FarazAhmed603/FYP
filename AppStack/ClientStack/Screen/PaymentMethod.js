import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

// import VerificationLayout from './VerificationComponent/VerificationLayout';
import VerificationComponent from '../Components/VerificationComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';

export default function PaymentMethod({navigation}) {
  const [open, setOpen] = useState(false);
  const [valuepicker, setValuepicker] = useState(null);
  const [Phone, setPhone] = useState();

  const [items, setItems] = useState([
    {value: '1', label: 'EasyPaisa'},
    {value: '2', label: 'Jazzcash'},
  ]);
  return (
    <View style={styles.container}>
      {/* <Verification text="Email" /> */}
      <View style={styles.container1}>
        <Text style={styles.text}>
          Verification helps you to increase your chances of getting selected,
          people will trust you if you have verified badges on your proflie.
        </Text>
        <Text style={styles.text}>
          Verification helps you to increase your chances of getting selected,
          people will trust you if you have verified badges on your proflie.
        </Text>
        <Text style={styles.text1}>Payment Method</Text>
        <DropDownPicker
          open={open}
          value={valuepicker}
          items={items}
          setOpen={setOpen}
          setValue={setValuepicker}
          setItems={setItems}
        />
        {valuepicker && (
          <TextInput
            style={styles.TextInput1}
            placeholder="Enter phone number                                         "
            placeholderTextColor="grey"
            onChangeText={Phone => setPhone(Phone)}
          />
        )}
        {valuepicker && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}>
            <Text style={{color: 'white'}}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 20,
  },
  container1: {
    flex: 1,
    margin: 20,
  },

  text: {
    padding: 10,
    fontSize: 15,
  },
  text1: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  TextInput1: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    width: '100%',
    height: 50,
    padding: 10,
    marginTop: 50,
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
