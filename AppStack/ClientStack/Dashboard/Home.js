import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import ContractComponent from '../Components/ContractComponent';
import HomeComponent from '../Components/HomeComponent';
import Icon from 'react-native-vector-icons/Fontisto';

export default function Home({navigation}) {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responseJson => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <View style={{margin: 3}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SkillProviderDetail', {
              id: item.id,
              title: item.title,
            })
          }>
          <HomeComponent title={item.id} description={item.title} />
        </TouchableOpacity>
      </View>
      // <Text style={styles.itemStyle} onPress={() => getItem(item)}>
      //   {item.id}
      //   {'.'}
      //   {item.title.toUpperCase()}
      // </Text>
    );
  };

  const getItem = item => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <View style={styles.textInputStyle}>
          <Icon
            style={{marginRight: 10, marginTop: 6}}
            name="search"
            size={23}
            color="black"
          />
          <TextInput
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />
        </View>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    marginHorizontal: 2,
    borderColor: 'grey',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
    alignContent: 'center',
  },
});
