/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import MusicListItem from '../common/MusicListItem';
import axios from 'axios';

const Home = () => {
  useEffect(() => {
    fetchSongs();
  }, []);
  const [songs, setSongs] = useState([]);
  const fetchSongs = async () => {
    try {
      const response = await axios.get(
        'https://bugle.co.in/moksh/public/api/get-mantra',
      );
      const mantras = response.data;
      setSongs(mantras);
      // console.log("The mantra url is ",mantras)
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>Popular Mantras</Text>
        </View>
        <FlatList
          data={songs}
          renderItem={({item, index}) => {
            return <MusicListItem item={item} index={index} data={songs} />;
          }}
        />
      </View>
    </>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    height: 60,
    width: '100%',
    elevation: 5,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF0D0D',
    marginLeft: 20,
  },
});
