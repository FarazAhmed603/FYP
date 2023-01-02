import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';

import Task from '../Components/ContractComponent';
import ContractComponent from '../Components/ContractComponent';

export default function Contracts({navigation}) {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responseJson => {
        setFilteredDataSource(responseJson);
        // setMasterDataSource(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <View style={{margin: 3}}>
        <TouchableOpacity
          onPress={() =>
            navigation.push('YourContractDetail', {
              id: item.id,
              title: item.title,
            })
          }>
          <ContractComponent title={item.id} description={item.title} />
        </TouchableOpacity>
      </View>
      // <Text style={styles.itemStyle} onPress={() => getItem(item)}>
      //   {item.id}
      //   {'.'}
      //   {item.title.toUpperCase()}
      // </Text>
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TouchableOpacity onPress={() => navigation.push('CreateContract')}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 10,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginRight: 15,
  },
  addText: {
    // fontWeight: 'bold',
    fontSize: 40,
  },
});
