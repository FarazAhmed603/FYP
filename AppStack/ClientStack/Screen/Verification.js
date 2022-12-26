import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

// import VerificationLayout from './VerificationComponent/VerificationLayout';
import VerificationComponents from '../Components/VerificationComponent';

export default function Verification({navigation}) {
  const [cnic, setcnic] = useState(null);
  const [press, setpress] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        {/* <Verification text="Email" /> */}

        <Text style={styles.text}>
          Verification helps you to increase your chances of getting selected,
          people will trust you if you have verified badges on your proflie.
        </Text>
        <Text style={styles.text}>
          Verification helps you to increase your chances of getting selected,
          people will trust you if you have verified badges on your proflie.
        </Text>
        <Text style={styles.text1}>ID Verification</Text>

        <VerificationComponents
          icon="card-account-details-outline"
          title="CNIC"
          subTitle="Give members a reason to choose you knowing that your identity is verified with NADRA CNIC."
          button="Add"
        />
        <TouchableOpacity style={styles.button} onPress={() => setpress(true)}>
          <Text style={{color: 'white'}}>Add CNIC</Text>
        </TouchableOpacity>

        {press && (
          <TextInput
            style={styles.TextInput1}
            placeholder="Enter CNIC number"
            placeholderTextColor="grey"
            maxLength={13}
            keyboardType={'numeric'}
            onChangeText={cnic => setcnic(cnic)}
          />
        )}
        {press && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}>
            <Text style={{color: 'white'}}>Verify</Text>
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
  button: {
    width: '100%',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'black',
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
});
