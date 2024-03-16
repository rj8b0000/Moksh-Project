import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput,
   View, Image, Modal, SafeAreaView, Dimensions, Animated, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  ADD_TO_QUEUE
} from "react-native-track-player"
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import axios from 'axios';
import SongItem from './SongItem';
import { useNavigation } from '@react-navigation/native';
import { Player } from '../PlayerContext';
import { Audio, Video } from 'expo-av';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";

import BottomModal from 'react-native-modals';
import ModalContent from 'react-native-modals';
import  {pause, play } from 'react-native-track-player/lib/trackPlayer';




const { width, height } = Dimensions.get('window')

const AudioList = (props) => {
  const navigation = useNavigation();
  const { currentTrack, setCurrentTrack } = useContext(Player)
  const [modalVisible, setModalVisible] = useState(false)
  const [input, setInput] = useState("")
  const [savedTracks, setSavedTracks] = useState([])
  const [currentSound, setCurrentSound] = useState(null)
  const prefixImageUrl = "https://bugle.co.in/moksh/public/public/assets/images/mantra_thumbnail/"
  const prefixAudioUrl = "https://bugle.co.in/moksh/public/public/assets/Audio/mantra_audio/"
  const progress = useProgress();
  const scrollx = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState([0])
  const playBackstate = usePlaybackState();
  const [repeatMode, setRepeatMode] = useState('off')
  const [isPlaying, setIsPlaying] = useState(false);

  const songSlider = useRef(null)


  async function getSavedTracks() {
    const response = await axios.get('https://bugle.co.in/moksh/public/api/get-mantra');
    const data = response.data
    const tracks = data.map((track) => ({
      id: track.id,
      url: `${prefixAudioUrl}${track.url}`,
      title: track.title,
      artwork: `${prefixImageUrl}${track.artwork}`
    }))
    setSavedTracks(tracks)

  }
  const setUpPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop
      ]
    });
    const prefixAudioUrl = "https://bugle.co.in/moksh/public/public/assets/Audio/mantra_audio/"
    try {
      const response = await axios.get("https://bugle.co.in/moksh/public/api/get-mantra");
      const data = response.data
      const tracks = data.map((track) => ({
        id: track.id,
        url: `${prefixAudioUrl}${track.url}`,
        title: track.title,
        artwork: track.artwork
      }))
      // console.log(tracks)
      TrackPlayer.add(tracks)

    }
    catch (err) {
      console.log("Error in while adding track is ", err)
    }

  }
  const onPause = async () => {
    if (State.Playing) {
      await TrackPlayer.pause()
    }
  }

  useEffect(() => {
    setUpPlayer();
    getSavedTracks();
    scrollx.addListener(({ value }) => {
      const index = Math.round(value / width)
      skipTo(index)
      setSongIndex(index)
      console.log('Indx', index)
    });
    return () => {
      scrollx.removeAllListeners()
    }

  }, [])
  // console.log("SAVED TRCKS",savedTracks)
  const playTrack = async () => {
    setCurrentTrack(savedTracks[0])
    TrackPlayer.play(savedTracks[0])
    setIsPlaying(State.Playing)
    setCurrentSound(State.Playing)
    // togglePlayback(playBackstate)
    // await play(savedTracks[0])
  }
  // const play = async (nextTrack) => {
  //   // console.log(" The next track is ",nextTrack)
  //   const preview_url = nextTrack.url;
  //   const currentTrack = await TrackPlayer.getActiveTrack()

  //       if(currentTrack !== null)
  //       {
  //           if(State.Ready ||State.Paused)
  //           {
  //               await TrackPlayer.play()
  //               console.log("play called")
  //           }
  //           else{
  //               onPause()
  //           }
  //       }
  // }
  const handlePlayPause = async () => {
    if (State.Playing) {
      await TrackPlayer.pause()
    }
    else {
      await TrackPlayer.play()
      setIsPlaying(!isPlaying)

    }
  }
  const togglePlayback = async (playBackstate) => {
    const currentTrack = await TrackPlayer.getActiveTrack()

    if (currentTrack !== null) {
      if (State.Ready || State.Paused) {
        await TrackPlayer.play()
        console.log("play called")
      }
      else {
        onPause()
      }
    }

  }
  const renderArtwork = ({ index, item }) => {
    return (
      <Animated.View style={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.artworkWrapper}>
          <Image source={{ uri: item.artwork }}
            style={styles.artworkImg}
          />
        </View>
        <View>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </Animated.View>

    )
  }


  const repeatIcon = () => {
    if (repeatMode == 'off') {
      return 'repeat-off'
    }
    if (repeatMode == 'track') {
      return 'repeat-once'
    }
    if (repeatMode == 'repeat') {
      return 'repeat'
    }
  }

  const changeRepeatMode = async () => {
    if (repeatMode == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    }
    if (repeatMode == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat');
    }
    if (repeatMode == 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode('off');
    }
  }
  const skipTo = async (trackId) => {
    await TrackPlayer.skip(trackId)
  }

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    })
  }

  const skipToPrevious = () => {
    // console.warn("Skip to prev")
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    })
  }
  const functPlay = (item) => {
    console.log(item)
  }
  return (
    <>
      <View>
        {/* <Text>dfgdf</Text> */}
        <ScrollView>
          <Pressable style={{ marginHorizontal: 10 }}>
            <AntDesign name="arrowleft" size={35} color={'#1dac92'} />
          </Pressable>

          <Pressable style={{
            marginHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 9
          }}>
            <Pressable style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              flex: 1,
              borderRadius: 3,
              height: 38,
              borderWidth: 1,
              paddingLeft: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <AntDesign name="search1" size={20} color={'black'} />
              <TextInput value={input}
                onChangeText={(text) => setInput(text)}
                placeholder='Find Mantras'
              />
            </Pressable>

            <Pressable
              style={{
                marginHorizontal: 10,
                borderWidth: 1,
                padding: 10,
                borderRadius: 3,
                height: 38,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text>Sort</Text>
            </Pressable>

          </Pressable>
          <View style={{ height: 50 }} />
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Popular Mantras</Text>
            <Text style={{ color: 'white', fontSize: 13, marginTop: 5, color: 'black' }}>100+ Mantras</Text>
          </View>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10 }}>
            <Pressable>
              <Feather name="download" size={30} color={'#1dac92'} />
            </Pressable>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10
            }}>
              <MaterialCommunityIcons name="cross-bolnisi" size={30} color={'#1dac92'} />
              <Pressable
                onPress={playTrack}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 35,
                  backgroundColor: '#1dac92',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Entypo name="controller-play" size={40} color={'white'} />
              </Pressable>
            </View>
          </Pressable>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={savedTracks}
            renderItem={({ item, index }) => (
              // console.log((item))
              <SongItem
                item={item}
                isPlaying={currentSound}
              />
            )}
          />
        </ScrollView>
      </View>
      {
        currentTrack ? (
          <>
            <Pressable
              // onPress={() => navigation.navigate("MusicPlayer",{currentTrack})}
              onPress={() => setModalVisible(true)}
              style={{
                backgroundColor: '#5072A7',
                width: "90%",
                padding: 10,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 15,
                position: 'absolute',
                left: 20,
                bottom: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Image style={{ width: 40, height: 40 }} source={{ uri: currentTrack.artwork }} />
                <Text numberOfLines={1} style={{ fontSize: 13, width: 220, color: 'white', fontWeight: 'bold' }}>
                  {currentTrack.title}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <EvilIcons name="heart" size={35} color={'white'} />
                <Pressable>
                  <AntDesign name="pausecircle" size={30} color={'white'} />

                </Pressable>
              </View>
            </Pressable>


            <Modal
              visible={modalVisible}
            >
              <SafeAreaView style={styles.container}>
                <View style={styles.mainContainer}>
                  <View style={{marginTop: 10}}>
                  <AntDesign name="down" size={24} color="white" onPress={() => setModalVisible(false)} />
                  </View>
                  <View style={{ width: width }}>
                    <FlatList
                      ref={songSlider}
                      data={savedTracks}
                      renderItem={renderArtwork}
                      keyExtractor={(item) => item.id}
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      scrollEventThrottle={16}
                      onScroll={Animated.event(
                        [{
                          nativeEvent: {
                            contentOffset: { x: scrollx }
                          }
                        }]
                      )}
                    />
                  </View>


                  <View>
                    <Slider
                      style={styles.progressContainer}
                      value={progress.position}
                      minimumValue={0}
                      maximumValue={progress.duration}
                      thumbTintColor="#ffd369"
                      minimumTrackTintColor="#ffd369"
                      maximumTrackTintColor="#fff"
                      onSlidingComplete={async (value) => {
                        await TrackPlayer.seekTo(value)
                      }}
                    />
                    <View style={styles.progressLabelContainer}>
                      <Text style={styles.ProgressLabelText}>
                        {new Date(progress.position * 1000).toISOString().substring(14, 19)}
                      </Text>
                      <Text style={styles.ProgressLabelText}>
                        {new Date((progress.duration - progress.position) * 1000).toISOString().substring(14, 19)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.musicControlls}>
                    <TouchableOpacity onPress={skipToPrevious}>
                      <Ionicons name="play-skip-back-outline" size={35} color={'#ffd369'} style={{ marginTop: 25 }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      // onPress={()=>{onPause(playBackstate)}}
                      onPress={togglePlayback}
                    >

                      <Ionicons
                        name="play-circle-sharp"
                        size={75} color={'#ffd369'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onPause}>
                      <Ionicons
                        name="pause-circle-sharp"
                        size={75} color={'#ffd369'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={skipToNext}>
                      <Ionicons name="play-skip-forward-outline" size={35} color={'#ffd369'} style={{ marginTop: 25 }} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.bottomContainer}>
                  <View style={styles.bottomControls}>
                    <TouchableOpacity onPress={() => { }}>
                      <Ionicons name="heart-outline" size={30} color={'#777'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={changeRepeatMode}>
                      <MaterialCommunityIcons name={`${repeatIcon()}`} size={30} color={repeatMode != 'off' ? '#FFD369' : '#777'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                      <Ionicons name="share-outline" size={30} color={'#777'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                      <Ionicons name="ellipsis-horizontal" size={30} color={'#777'} />
                    </TouchableOpacity>
                  </View>

                </View>
              </SafeAreaView>
            </Modal>
          </>
        ) : null
      }


      {/* <BottomModal visible = {modalVisible} 
    onHardwareBackPress = {() => setModalVisible(false)}
    swipeDirection = {["up","down"]}
    swipeThreshold = {200}
    >
      <ModalContent style={{height: "100%", width: "100%", backgroundColor: '#5072A7'}}>
        <View style={{height: "100%", width: "100%", marginTop: 40}}>
          <Pressable style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <AntDesign name="down" size={24} color="white" />
            <Text>{currentTrack.title}</Text>
            <Entypo name="dots-three-vertical" size={24} color="black"/>
          </Pressable>
        </View>
      </ModalContent>
    </BottomModal> */}
    </>
  )
}

export default AudioList

const styles = StyleSheet.create({
  progressContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row'
  },
  progressLabelContainer: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ProgressLabelText: {
    color: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  artworkWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
    shadowColor: '#fff',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5
  },
  artworkImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#eee'
  },
  artist: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: '#eee'
  },
  musicControlls: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginTop: 15
  },
  bottomContainer: {
    borderTopColor: '#393E46',
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  }
})