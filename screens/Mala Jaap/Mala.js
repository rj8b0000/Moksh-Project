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

const Mala = () => {
  const flatListRef = useRef(null);
  const imageRef = useRef(null);
  const [currentBeadIndex, setCurrentBeadIndex] = useState(0);
  const [totalJaap, setTotalJaap] = useState(0);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [popupInfoModal, setPopupInfoModal] = useState(true);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [mantras, setMantras] = useState([]);
  const playbackState = usePlaybackState();

  useEffect(() => {
    setModalVisible(true);
  }, []);

  const setMantraJaapAndGoToMalaScreen = () => {
    setModalVisible(false);
    setTimeout(() => {
      setPopupInfoModal(false);
    }, 3000);
  };

  const onButtonPress = () => {
    if (currentBeadIndex === 19) {
      Vibration.vibrate();
      setCurrentBeadIndex(0);
      if (totalJaap != 1) {
        setTotalJaap(totalJaap - 1);
      } else {
        TrackPlayer.pause();
        navigation.navigate('JaapDone');
      }
      // navigation.goBack()
    } else if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentBeadIndex + 1,
      });

      setCurrentBeadIndex(currentBeadIndex + 1);
      imageRef.current.pulse(500).then(() => {
        console.log('Animation completed');
      });
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
      <Pressable style={styles.container} onPress={onButtonPress}>
        <View style={styles.textconteiner}>
          <Text style={{color: '#EF6969', fontSize: 30}}>
            *{currentBeadIndex}*
          </Text>
          <Text style={{color: '#EF6969', fontSize: 20}}>
            Total Jaap - {totalJaap}
          </Text>
        </View>
        <View>
          <Image source={beadImage} style={{height: 100, width: 100}} />
        </View>
        <View>
          <Image source={beadImage} style={{height: 125, width: 125}} />
        </View>
        <View style={{height: 150, width: 150, alignItems: 'center'}}>
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
              length: 150,
              offset: 150 * index,
              index,
            })}
            pagingEnabled
            horizontal={false}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View>
          <Image source={beadImage} style={{height: 125, width: 125}} />
        </View>
        <View>
          <Image source={beadImage} style={{height: 100, width: 100}} />
        </View>
      </Pressable>
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
    </>
  );
};

export default Mala;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // flexDirection: 'column',
      backgroundColor: '#FFF9A1',
    },
    beadContainer: {
      width: 150, // replace with the actual width of your bead image
      height: 150, // replace with the actual height of your bead image
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
