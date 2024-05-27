/* eslint-disable prettier/prettier */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Vibration,
  Button,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import { beadImage } from '../common/AllImages';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');
const Mala_Mantraplayer = () => {
  const [time, setTime] = useState(new Date());
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const route = useRoute();
  const flatListRef = useRef(null);
  const imageRef = useRef(null);
  const [currentBeadIndex, setCurrentBeadIndex] = useState(0);
  const [totalJaap, setTotalJaap] = useState(0);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [popupInfoModal, setPopupInfoModal] = useState(true);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [artworks, setArtWorks] = useState([]);
  const [currentSong, setCurrentSong] = useState(route.params.index);
  const playbackState = usePlaybackState();
  const ref = useRef();

  useEffect(() => {
    setTimeout(() => {
      ref.current.scrollToIndex({
        animated: true,
        index: currentSong,
      });
    }, 1000);
  }, []);
  useEffect(() => {
    setModalVisible(true);
    fetArtWorks();
  }, []);
  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
      // Check if seconds reach 60 and reset minutes and seconds
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      } else {
        setSeconds(seconds + 1);
      }
    }, 1000); // Update every second

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(timerID);
  }, [seconds, minutes]);

 

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const fetArtWorks = async () => {
    try {
      const response = await axios.get(
        'https://bugle.co.in/moksh/public/api/get-mantra',
      );
      const artworks = response.data;
      setArtWorks(artworks);
      // console.log("The mantra url is ",mantras)
    } catch (error) {
      Alert.alert("An error occured");
    }
  };

  const setMantraJaapAndGoToMalaScreen = () => {
    setModalVisible(false);
    setTimeout(() => {
      setPopupInfoModal(false);
    }, 3000);
  };

  const onButtonPress = () => {
    if (currentBeadIndex === 108) {
      Vibration.vibrate();
      setCurrentBeadIndex(0);
      if (totalJaap != 1) {
        setTotalJaap(totalJaap - 1);
      }
      else {
        TrackPlayer.pause();
        navigation.navigate('JaapDone');
      }
      // navigation.goBack()
    } else if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentBeadIndex + 1,
      });

      setCurrentBeadIndex(currentBeadIndex + 1);
    }
  };
  // const onScroll = useCallback(({ viewableItems }) => {
  //   if (viewableItems.length === 1) {
  //     setCurrentBeadIndex(viewableItems[0].index);
  //     if (flatListRef.current) {
  //       const topBeadIndex = flatListRef.current.getScrollResponder()._scrollViewChildNearestToOffset(0).index + 5;
  //       if (topBeadIndex === currentBeadIndex+ 5) {
  //         scaleAnim.setValue(5);
  //         Animated.spring(scaleAnim, {
  //           toValue: 1.2,
  //            duration: 1000,
  //           useNativeDriver: true,
  //         }).start();
  //       }
  //     }
  //   }
  // }, []);
  const onScroll = useCallback(({viewableItems}) => {
    if (viewableItems.length === 1) {
      console.log(viewableItems);
      setCurrentBeadIndex(viewableItems[0].index);
    }
  }, []);
  const renderBead = ({item, index}) => (
    <View style={styles.beadContainer}>
      <Animatable.Image
        ref={index === currentBeadIndex ? imageRef : null}
        // animation={index === currentBeadIndex ? "pulse" : null}
        duration={1000}
        style={[styles.beadImage, {transform: [{scale: scaleAnim}]}]}
        source={beadImage}
      />
    </View>
  );
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
  return (
    <>
       <View style={styles.container}>
      <LinearGradient
          colors={['#FFB6E6', 'transparent']}
          style={{ width: '100%', height: height * 0.2, position: 'absolute', zIndex: 2 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        <Pressable onPress={onButtonPress} style={{flex: 1, flexDirection: 'row'}}>
        <View style={{marginLeft: 10, width: width * 0.6, height: height * 0.5, justifyContent: 'space-between', marginTop: '25%'}}>
          <View>
          <Text style={{ color: '#F60025', fontSize: 25 }}>
          Total Mala - {totalJaap}
        </Text>
        <Text style={{ color: '#F60025', fontSize: 22 }}>
          Total Time : {formattedTime}
        </Text>
          </View>

          <View>
          <Text style={{ color: '#F60025', fontSize: 32 }}>
          Count - {currentBeadIndex}
          {/* <Button title='Reset Count' onPress={()=>setCurrentBeadIndex(0)}/> */}
        </Text>
          </View>
        
        
        
      </View>
          <View style={{ width: width, height: height, flex: 1}}>

            <FlatList
              ref={flatListRef}
              data={new Array(120).fill('')}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderBead}
              onViewableItemsChanged={onScroll}
              viewabilityConfig={{
                itemVisiblePercentThreshold: 100,
              }}
              getItemLayout={(_, index) => ({
                length: 100,
                offset: 100 * index,
                index,
              })}
              pagingEnabled
              horizontal={false}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />

          </View>
          
         


        </Pressable>
 <LinearGradient
          colors={['transparent', '#FFB6E6']}
          style={{ width: '100%', height: height * 0.2, position: 'absolute', bottom: 0 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
       
      </View>
      <Modal visible={modalVisible} transparent={false}>
        <Text
          style={{color: 'black', marginLeft: 25, marginTop: 30}}
          onPress={() => navigation.goBack()}>
          Back
        </Text>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontSize: 25, color: 'black'}}>
              Choose a number of mala jaap you wanna to do
            </Text>
            <View style={{flexDirection: 'row', marginTop: 25}}>
              <TextInput
                placeholder="Enter the number"
                onChangeText={text => setTotalJaap(text)}
                style={{
                  width: '100%',
                  borderWidth: 0.5,
                  borderRadius: 10,
                  color: 'black',
                }}
                placeholderTextColor={'grey'}
                keyboardType="number-pad"
              />
            </View>
            <View style={{marginTop: 15}}>
              <Button
                title="Set Jaap"
                onPress={() => setMantraJaapAndGoToMalaScreen()}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={popupInfoModal} transparent={true}>
        <View style={styles.popupinfoView}>
          <View style={styles.popupInfoModalView}>
            <Text style={{fontSize: 15, color: 'black'}}>
              You can scroll and jaap anywhere on your screen
            </Text>
          </View>
        </View>
      </Modal>
      <Pressable
        style={{
          backgroundColor: 'yellow',
          width: '90%',
          padding: 10,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: 15,
          position: 'absolute',
          left: 20,
          bottom: 10,
          // justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          height: 100,
          borderRadius: 20,
        }}>
        <FlatList
          horizontal
          ref={ref}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={artworks}
          onScroll={async e => {
            const x = e.nativeEvent.contentOffset.x / width;
            setCurrentSong(parseInt(x.toFixed(0)));
            await TrackPlayer.skip(parseInt(x.toFixed(0)));
            togglePlayback(playbackState);
          }}
          renderItem={({ item, index }) => {
            const prefixUrl =
              'https://bugle.co.in/moksh/public/public/assets/images/mantra_thumbnail/';
            // console.log(`${prefixUrl}${item.artwork}`)
            return (
              <>
                {/* <View style={styles.bannerView}> */}
                  <Image
                    source={{ uri: `${prefixUrl}${item.artwork}` }}
                    style={{width: 90, height: 90}}
                  />
                  {/* <Text style={styles.name}>{item.title}</Text> */}
                {/* </View> */}
              </>
            );
          }}
        />
        {/* <Image
          source={require('../../assets/images/mala.jpg')}
          style={{width: 50, height: 50}}
        /> */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              togglePlayback(playbackState);
            }}>
            {playbackState.state == State.Ready ||
            playbackState.state == State.Paused ? (
              <AntDesign
                name="play"
                size={45}
                color="black"
                style={{margin: 15}}
              />
            ) : (
              <AntDesign
                name="pausecircle"
                size={45}
                color="black"
                style={{margin: 15}}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
          onPress={async () => {
            if (artworks.length - 1 > currentSong) {
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
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff9f1a',
  },
  beadContainer: {
    width: 105, // replace with the actual width of your bead image
    height: 100, // replace with the actual height of your bead image
    // margin: -9,
  },
  beadImage: {
    width: '100%',
    height: '100%',
  },
  textconteiner: {
    // flex: 1,
    marginLeft: 10,
  },
  btnView: {
    width: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    marginLeft: -90,
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // alignItems: 'center'
  },
  popupinfoView: {
    flex: 1,
    alignItems: 'center',
  },
  modalView: {
    height: 300,
    width: '90%',
    backgroundColor: '#FFFEEE',
    padding: 40,
    borderRadius: 20,
    shadowColor: 'black',
    elevation: 5,
    alignItems: 'center',
  },
  popupInfoModalView: {
    height: 80,
    width: '90%',
    backgroundColor: '#FFFEEE',
    borderRadius: 20,
    shadowColor: 'black',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15%',
  },
});

export default Mala_Mantraplayer;
