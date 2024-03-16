/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image, Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontFamily, Padding, Border, FontSize, Color} from '../GlobalStyles';
import SearchBar from './common/SearchBar';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { chant_mala, dashboard_mala_img } from './common/AllImages';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [email, getEmail] = useState('');
  const [password, getPassword] = useState('');
  const [name, getName] = useState('');
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    const password = await AsyncStorage.getItem('PASSWORD');
    const name = await AsyncStorage.getItem('NAME');
    getEmail(email);
    getPassword(password);
    getName(name);
  };
  const renderMantra = ({index, item}) => {
    return (
      <Animated.View
        style={{width: width, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.artworkWrapper}>
          <Image
            source={require('../assets/images/mala.jpg')}
            style={styles.artworkImg}
          />
        </View>
      </Animated.View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.userdetails}>
        <Image
          source={require('../assets/noprofile.jpg')}
          style={{width: 40, height: 40, borderRadius: 100, display: 'flex'}}
        />
        <View style={styles.username}>
          <Text style={{color: 'grey'}}>Hello</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'grey'}}>{name}</Text>
        </View>
      </View>
      <View style={styles.searchbar}>
        <SearchBar />
      </View>
      <View style={styles.mantras}>
        <Text style={styles.mantraText}>Popular mantras</Text>
      
      <View style={styles.artworkWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate('MantraHome')}>
          <Image
            source={dashboard_mala_img}
            style={styles.artworkImg}
          />
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.mantras}>
        <Text style={styles.mantraText}>Chant mala</Text>
      
      <View style={styles.artworkWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate('Mala')}>
          <Image
            source={chant_mala}
            style={styles.artworkImg}
          />
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  username: {
    marginLeft: 10,
  },
  userdetails: {
    display: 'flex',
    flexDirection: 'row',
  },
  searchbar: {
    display: 'flex',
    // justifyContent: 'space-between'
  },
  container: {
    padding: 30,
    flex: 1,
    alignItems: 'left',
    backgroundColor: Color.background,
  },
  mantras: {
    marginTop : "5%",
  },
  mantraText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black'
  },
  artworkWrapper: {
    marginTop: '5%',
    width: 250,
    height: 150,
    shadowColor: '#fff',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
  },
  artworkImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
});
export default HomeScreen;
