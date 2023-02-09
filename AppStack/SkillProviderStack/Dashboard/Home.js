import React, { useState, useEffect, useContext, useCallback } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl
} from 'react-native';

import HomeComponent from '../Component/HomeComponent';
import Icon from 'react-native-vector-icons/Fontisto';
import env from '../../../env';
import { AuthContext } from '../../../Context/AuthContext';

export default function Home({ navigation }) {
  const { userInfo } = useContext(AuthContext);
  const request = env.IP + 'getcontract';
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [errror, seterrror] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const fetchusers = async () => {
    setIsloading(true);
    await fetch(request)
      .then(response => response.json())
      .then(responseJson => {
        setFilteredDataSource(
          responseJson.filter(
            item => item.userid !== userInfo._id && item.createdby === 'client',
          ),
        );
        setMasterDataSource(
          responseJson.filter(
            item => item.userid !== userInfo._id && item.createdby === 'client',
          ),
        );
      })
      .catch(error => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchusers().then(() => {
      setIsloading(false);
    });
  }, [refreshing, userInfo._id]);

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.category
          ? item.category.toUpperCase()
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

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View style={{ margin: 3 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.push('ContractDetails', {
              category: item.category,
              title: item.title,
              description: item.description,
              location: item.location,
              date: item.jobdate,
              budget: item.budget,
              id: item.userid,
              Contractid: item._id,
            })
          }>
          <HomeComponent
            title={item.title}
            description={item.description}
            location={item.location}
            budget={item.budget}
            category={item.category}
            id={item.userid}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const getItem = item => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  return (
    <SafeAreaView
      style={{ flex: 1 }}>
      {!errror && (
        <View style={{ flex: 1 }}>
          <View style={styles.textInputStyle}>
            <Icon
              style={{ marginRight: 10, marginTop: 6 }}
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
          {isLoading ? (
            <ActivityIndicator size="small" color="lightgrey" animating={isLoading} />
          ) : (
            <></>
          )}
          {filteredDataSource[0] && (
            <FlatList
              style={{ flex: 1 }}
              data={filteredDataSource}
              keyExtractor={(item, index) => index.toString()}
              renderItem={ItemView}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
          )}
          {!filteredDataSource[0] && (
            <FlatList
              style={{ flex: 1 }}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              data={[
                { key: '1', value: 'No Contracts' }
              ]}
              renderItem={({ item }) => (
                <View style={{ flex: 1 }}>
                  <Text style={{ flex: 1, alignSelf: 'center', paddingTop: '80%', fontSize: 17, fontWeight: 'bold' }} >{item.value}</Text>
                </View>
              )}
            />
          )}
        </View>
      )}
      {errror && (
        <View>
          <Text>Check your internet connection</Text>
        </View>
      )}
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
