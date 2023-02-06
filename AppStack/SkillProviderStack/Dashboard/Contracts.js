import React, { useState, useEffect, useContext, useCallback } from 'react';
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
  ActivityIndicator,
  RefreshControl
} from 'react-native';

// import Task from '../Components/ContractComponent';
import env from '../../../env';
import ContractComponent from '../Component/ContractComponent';
import { AuthContext } from '../../../Context/AuthContext';

export default function Contracts({ navigation }) {
  const { userInfo } = useContext(AuthContext);
  const [isLoading, setIsloading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const request = env.IP + 'getcontract';
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const filtereddata = async () => {
    setIsloading(true)
    await fetch(request)
      .then(response => response.json())
      .then(responseJson => {
        setFilteredDataSource(
          responseJson.filter(
            item => item.userid === userInfo._id && item.createdby === 'skprovider',
          ),
        );
        // setMasterDataSource(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    filtereddata()
      .then(() => { setIsloading(false) })
  }, [refreshing])

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View style={{ margin: 3 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.push('YourContractDetails', {
              Uid: item.userid,
              Cid: item._id,
              category: item.category,
              description: item.description,
              location: item.location,
              budget: item.budget,
              profile: userInfo.profile,
            })
          }>
          <ContractComponent
            category={item.category}
            description={item.description}
            location={item.location}
            budget={item.budget}
            profile={userInfo.profile}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {isLoading ? (<ActivityIndicator size="small" color="lightgrey" animating={isLoading} />) : <></>}
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TouchableOpacity onPress={() => navigation.push('UploadSkill')}>
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
