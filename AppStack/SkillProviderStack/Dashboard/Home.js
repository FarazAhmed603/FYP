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

import HomeComponent from '../Component/HomeComponent';
import Icon from 'react-native-vector-icons/Fontisto';
import env from '../../../env';

export default function Home({navigation}) {
  const http = `http://${env.IP}:4000/`;
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    const request = http + 'getcontract';
    fetch(request)
      .then(response => response.json())
      .then(responseJson => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
        console.log(
          responseJson,
          'response in getting all contract from client ',
        );
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
            navigation.navigate('ContractDetails', {
              category: item.category,
              title: item.title,
              description: item.description,
              location: item.location,
              date: item.jobdate,
              budget: item.budget,
              id: item.userid,
            })
          }>
          <HomeComponent
            title={item.title}
            description={item.description}
            location={item.location}
            budget={item.budget}
          />
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
