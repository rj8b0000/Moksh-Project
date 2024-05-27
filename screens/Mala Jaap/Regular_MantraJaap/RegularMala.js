import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Image, Dimensions, Animated, StyleSheet, Pressable, Text, Modal, TextInput, Vibration } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';

const { width,height } = Dimensions.get('window');
const IMAGE_HEIGHT = 100;
const IMAGE_WIDTH = 110;
const SPACING = 20;

const RegularMala = () => {
  const route = useRoute();
  const animation = useRef(new Animated.Value(0)).current;
  const { count, checkBox1, checkBox2 } = route.params;
  const [time, setTime] = useState(new Date());
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalJaap, setTotalJaap] = useState(0);
  const [totalJaap2, setTotalJaap2] = useState(0);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const totalNumberOfCounts = count * totalJaap2
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    setModalVisible(true);
  }, []);
  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      } else {
        setSeconds(seconds + 1);
      }
    }, 1000); 
    return () => clearInterval(timerID);
  }, [seconds, minutes]);
  const images = new Array(count + 5).fill().map((_, index) => ({
    id: index.toString(),
    uri: `https://source.unsplash.com/random?sig=${index}`
  }));
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const setMantraJaapAndGoToMalaScreen = () => {
    setModalVisible(false);
  };
  const playSound = () => {
    var tic = new Sound('tic.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      // console.log('duration in seconds: ' + tic.getDuration() + 'number of channels: ' + tic.getNumberOfChannels());
    
      // Play the sound with an onEnd callback
      tic.play((success) => {
        if (success) {
          // console.log('successfully finished playing');
      tic.release();
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  }
  const updateUserCount = async (email, totalNumberOfCounts) => {
    try {
      const response = await fetch(`https://bugle.co.in/moksh/public/api/user-management/get_profile_data/update_user_count_and_minutes/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mantra_total_count: totalNumberOfCounts, mantra_duration : minutes + 1 }),
      }); 
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      } catch (error) {
        console.error('Error updating user count:', error);
        throw error;
      }
  };
  const handlePress = () => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    if(newIndex == count)
    {
      Vibration.vibrate();
      setCurrentIndex(0);
      if (totalJaap != 1) {
        setTotalJaap(totalJaap - 1);
      } else {
        sendToJaapCompleteScreen()
      }
    }
    else if(flatListRef.current)
    {
      flatListRef.current.scrollToOffset({
        offset: newIndex * (IMAGE_HEIGHT + SPACING),
        animated: true,
      });
      setCurrentIndex(newIndex);
      playSound();
      Vibration.vibrate(100)
    }
  };
  const countAndJaap = { count : count, jaap : totalNumberOfCounts}
  const sendToJaapCompleteScreen = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    updateUserCount(email,totalNumberOfCounts);
    navigation.navigate('RegularJaapDone', { countAndJaap, formattedTime, checkBox1, checkBox2 });
  }
  const setTotalJaapForMalaCount = (text) => {
    setTotalJaap(text)
    setTotalJaap2(text)
  }

  return (
    <>
    <Pressable style={styles.pressable} onPress={handlePress}>
   
      <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Image source={require('../../../assets/string.png')} style={{height: height, marginRight: '12%'}}/>
        </View>
        <Animated.FlatList
          ref={flatListRef}
          data={images}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'flex-end', marginRight: '8%'}}
          snapToInterval={IMAGE_HEIGHT + SPACING}
          decelerationRate="fast"
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEnabled = {false}
          onMomentumScrollEnd={(e) => {
            const offsetY = e.nativeEvent.contentOffset.y;
            const newIndex = Math.floor(offsetY / (IMAGE_HEIGHT + SPACING));
            setCurrentIndex(newIndex);
          }}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 4) * (IMAGE_HEIGHT + SPACING),
              (index - 3) * (IMAGE_HEIGHT + SPACING),
              (index - 2) * (IMAGE_HEIGHT + SPACING),
              (index - 1) * (IMAGE_HEIGHT + SPACING),
              index * (IMAGE_HEIGHT + SPACING),
              (index + 1) * (IMAGE_HEIGHT + SPACING),
              (index + 2) * (IMAGE_HEIGHT + SPACING),
              (index + 3) * (IMAGE_HEIGHT + SPACING),
              (index + 4) * (IMAGE_HEIGHT + SPACING),
            ];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1.1, 1, 1, 1, 1, 1, 1, 1],
              extrapolate: 'clamp',
            });

            return (
              <View style={{ height: IMAGE_HEIGHT + SPACING }}>
                <FastImage
                source={require('../../../assets/rudraksh.png')}
                style={[
                  styles.image,
                  // {
                  //   transform: [{ scale }],
                  // },
                ]}
                resizeMode={FastImage.resizeMode.cover}
                />
                {/* <Animated.Image
                  source={require('../../../assets/rudraksh.png')}
                  style={[
                    styles.image,
                    {
                      transform: [{ scale }],
                    },
                  ]}
                /> */}
              </View>
            );
          }}
        />
        <View style={styles.indexContainer}>
        <View>
              <Text style={styles.indexText}>
                Total Mala - {totalJaap}
              </Text>
              <Text style={styles.indexText}>
                Total Time : {formattedTime}
              </Text>
            </View>
          <Text style={styles.indexText}>Total Counts - {currentIndex + 1}</Text>
        </View>
      </View>
    </Pressable>
    <Modal visible={modalVisible} transparent={true}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={{ fontSize: 22, color: 'black', fontFamily: 'Inter-Bold' }}>
          Set Mala Jaap
        </Text>
        <Text style={{ fontSize: 18, color: 'grey', fontFamily: 'Inter-Regular', textAlign: 'center', width: '80%', marginTop: 25 }}>Choose a number of mala jaap you want to do. i.e Total counts = No of mala jaap * selected counts</Text>
        <View style={{ flexDirection: 'row', marginTop: 25 }}>
          <TextInput
            style={{
              width: '90%',
              color: 'black',
              borderBottomWidth: 2,
              textAlign: 'center',
              borderColor: '#fe6f01',
              fontSize: 22
            }}
            onChangeText={text => setTotalJaapForMalaCount(text)}
            placeholderTextColor={'grey'}
            keyboardType="number-pad"
            autoFocus
            cursorColor={'orange'}
            selectionColor="orange"
          />
        </View>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fea501', '#ff8804', '#fe6f01']} style={{ width: '80%', height: 45, backgroundColor: '#fe7200', borderRadius: 5, marginTop: 25 }}
        >
          <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => setMantraJaapAndGoToMalaScreen()}>
            <Text style={{ color: 'white', fontFamily: 'Inter-Bold', fontSize: 14 }}>Start Jaap</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  </Modal>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ff9f1a',
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 10,
  },
  pressable: {
    flex: 1,
  },
  indexContainer: {
    position: 'absolute',
    top: '5%',
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  indexText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 165, 0, 0.5)',
    // alignItems: 'center'
  },
  
  modalView: {
    height: height * 0.45,
    width: '90%',
    backgroundColor: '#FFFEEE',
    padding: 20,
    borderRadius: 20,
    shadowColor: 'black',
    elevation: 5,
    alignItems: 'center',
  },
});

export default RegularMala;
