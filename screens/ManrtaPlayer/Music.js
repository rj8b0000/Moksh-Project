/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useReducer, useRef, useState} from 'react';
import {
  CurrentRenderContext,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
// import songs from '../MusicData';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import axios from 'axios';
import { mala_jaap } from '../common/AllImages';

const {width, height} = Dimensions.get('window');
const Music = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const progress = useProgress();
  const playbackState = usePlaybackState();
  const [currentSong, setCurrentSong] = useState(route.params.index);
  const [mantras, setMantras] = useState([]);
  const ref = useRef();

  useEffect(() => {
    setTimeout(() => {
      ref.current.scrollToIndex({
        animated: true,
        index: currentSong,
      });
    }, 500);
  }, []);
  useEffect(() => {
    fetchSongs();
    setUpPlayer();
  }, []);

  const setUpPlayer = async () => {
    // console.log("setup player called")
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
    });
    const prefixAudioUrl =
      'https://bugle.co.in/moksh/public/public/assets/Audio/mantra_audio/';
    try {
      const response = await axios.get(
        'https://bugle.co.in/moksh/public/api/get-mantra',
      );
      const data = response.data;
      const tracks = data.map(track => ({
        id: track.id,
        url: `${prefixAudioUrl}${track.url}`,
        title: track.title,
        artwork: track.artwork,
      }));
      // console.log(tracks.url)
      await TrackPlayer.add(tracks);
      await TrackPlayer.skip(currentSong);
      togglePlayback(playbackState);
    } catch (err) {
      console.log('Error in while adding track is ', err);
    }
  };

  const togglePlayback = async playbackState => {
    // console.log(playbackState.state)
    if (
      playbackState.state === State.Paused ||
      playbackState.state === State.Ready
    ) {
      await TrackPlayer.play();
      // console.log("if condition vadu log",playbackState.state)
    } else {
      await TrackPlayer.pause();
      // console.log("else condition vadu log",playbackState.state)
    }
  };
  const fetchSongs = async () => {
    try {
      const response = await axios.get(
        'https://bugle.co.in/moksh/public/api/get-mantra',
      );
      const mantras = response.data;
      setMantras(mantras);
      // console.log("The mantra url is ",mantras)
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => navigation.navigate('Mala')}>
          <Image
            source={mala_jaap}
            style={{width: 50, height: 50, marginTop: 5}}
          />
          <View style={{justifyContent: 'center'}}>
            <Text style={{justifyContent: 'center', color: 'black'}}>
              Let's Jaap Mala
            </Text>
          </View>
        </TouchableOpacity>
        <FlatList
          horizontal
          ref={ref}
          showsHorizontalScrollIndicator={false}
          pagingEnabled 
          data={mantras}
          onScroll={async e => {
            const x = e.nativeEvent.contentOffset.x / width;
            setCurrentSong(parseInt(x.toFixed(0)));
            await TrackPlayer.skip(parseInt(x.toFixed(0)));
            togglePlayback(playbackState);
          }}
          renderItem={({item, index}) => {
            const prefixUrl =
              'https://bugle.co.in/moksh/public/public/assets/images/mantra_thumbnail/';
            // console.log(`${prefixUrl}${item.artwork}`)
            return (
              <>
                <View style={styles.bannerView}>
                  <Image
                    source={{uri: `${prefixUrl}${item.artwork}`}}
                    style={styles.banner}
                  />
                  <Text style={styles.name}>{item.title}</Text>
                </View>
              </>
            );
          }}
        />
      </View>
      {/* <Text style={styles.name}>{route.params.data.artist}</Text> */}
      <View style={styles.sliderView}>
        <Slider
          value={progress.position}
          maximumValue={progress.duration}
          minimumValue={0}
          thumbStyle={{width: 20, height: 20}}
          thumbTintColor="#000"
          onValueChange={async value => {
            await TrackPlayer.seekTo(value);
          }}
        />
      </View>
      <View style={styles.btnArea}>
        <TouchableOpacity
          onPress={async () => {
            if (currentSong > 0) {
              setCurrentSong(currentSong - 1);
              ref.current.scrollToIndex({
                animated: true,
                index: currentSong - 1,
              });
              await TrackPlayer.skipToPrevious();
              togglePlayback(playbackState);
            }
          }}>
          <Foundation
            name="previous"
            size={45}
            color="black"
            style={{margin: 15}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            // await TrackPlayer.skip(1)
            togglePlayback(playbackState);
          }}>
          {playbackState.state == State.Ready ||
          playbackState.state == State.Paused ? (
            <AntDesign
              name="play"
              size={55}
              color="black"
              style={{margin: 15}}
            />
          ) : (
            <AntDesign
              name="pausecircle"
              size={55}
              color="black"
              style={{margin: 15}}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            if (mantras.length - 1 > currentSong) {
              setCurrentSong(currentSong + 1);
              ref.current.scrollToIndex({
                animated: true,
                index: parseInt(currentSong) + 1,
              });
              await TrackPlayer.skipToNext();
              togglePlayback(playbackState);
            }
          }}>
          <Foundation
            name="next"
            size={45}
            color="black"
            style={{margin: 15}}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity>
                <AntDesign name="pausecircle" size={55} color="black"  style={{margin: 10}}/>
                </TouchableOpacity> */}
      </View>
      <View style={styles.btnArea2}>
        <TouchableOpacity>
          <Entypo name="shuffle" size={35} color="black" style={{margin: 10}} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather name="repeat" size={35} color="black" style={{margin: 10}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Music;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerView: {
    width: width,
    height: height / 2 - 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 50,

    marginBottom: 10,
  },
  banner: {
    width: '90%',
    height: '100%',
    borderRadius: 10,
  },
  name: {
    // marginTop: 20,
    marginBottom: 30,
    fontSize: 20,
    marginLeft: 20,
    fontWeight: '700',
    color: '#000',
  },
  sliderView: {
    marginTop: 30,
    alignSelf: 'center',
    width: '90%',
  },
  btnArea: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  btnArea2: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
