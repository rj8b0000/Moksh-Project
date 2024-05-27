import { useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { View, FlatList, Image, Dimensions, Animated, StyleSheet, Pressable, Text } from 'react-native';

const { width,height } = Dimensions.get('window');
const IMAGE_HEIGHT = 100;
const IMAGE_WIDTH = 100;
const SPACING = 10;

const images = new Array(108).fill().map((_, index) => ({
  id: index.toString(),
  uri: `https://source.unsplash.com/random?sig=${index}`
}));

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
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const setMantraJaapAndGoToMalaScreen = () => {
    setModalVisible(false);
  };
  const handlePress = () => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);

    flatListRef.current.scrollToOffset({
      offset: newIndex * (IMAGE_HEIGHT + SPACING),
      animated: true,
    });
  };
  const countAndJaap = { count : count, jaap : totalNumberOfCounts}
  const sendToJaapCompleteScreen = () => {
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
      <View style={{ marginLeft: 10, width: width * 0.55, height: height * 0.5, marginTop: '25%' }}>
            <View>
              <Text style={{ color: '#F60025', fontSize: 25 }}>
                Total Mala - {totalJaap}
              </Text>
              <Text style={{ color: '#F60025', fontSize: 22 }}>
                Total Time : {formattedTime}
              </Text>
            </View>

            <View style={{marginTop: 10}}>
              <Text style={{ color: '#F60025', fontSize: 32 }}>
                Count - {currentBeadIndex}
              </Text>
            </View>
          </View>
        <Animated.FlatList
          ref={flatListRef}
          data={images}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'flex-end', marginRight: '5%' }}
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
              outputRange: [1, 1.2, 1, 1, 1, 1, 1, 1, 1],
              extrapolate: 'clamp',
            });

            return (
              <View style={{ height: IMAGE_HEIGHT + SPACING }}>
                <Animated.Image
                  source={require('../../assets/rudraksh.png')}
                  style={[
                    styles.image,
                    {
                      transform: [{ scale }],
                    },
                  ]}
                />
              </View>
            );
          }}
        />
        <View style={styles.indexContainer}>
          <Text style={styles.indexText}>{currentIndex + 1}</Text>
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
    top: '50%',
    left: 20,
    // transform: [{ translateY: -50% }],
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




// import { useNavigation, useRoute } from '@react-navigation/native';
// import React, { useState, useRef, useEffect } from 'react';
// import { View, Image, Dimensions, StyleSheet, Pressable, Text, TouchableOpacity, Alert, BackHandler, Vibration, Animated, Modal, TextInput, ScrollView } from 'react-native';
// import Carousel from 'react-native-snap-carousel';
// import { beadImage } from '../common/AllImages';
// import Sound from 'react-native-sound';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

// const Testing = () => {
//   const route = useRoute();
//   // const { count, checkBox1, checkBox2 } = route.params;

// const animation = useRef(new Animated.Value(0)).current;
//   const [activeIndex, setActiveIndex] = useState(0);
//   const carouselRef = useRef(null);
//   const [time, setTime] = useState(new Date());
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);
//   const [totalJaap, setTotalJaap] = useState(0);
//   const [totalJaap2, setTotalJaap2] = useState(0);
//   // const totalNumberOfCounts = count * totalJaap2
//   const navigation = useNavigation();
//   const [modalVisible, setModalVisible] = useState(false);
//   const data = [...Array(25)].map((_, index) => ({
//     id: index.toString(),
//   }));
//   useEffect(() => {
//     const timerID = setInterval(() => {
//       setTime(new Date());
//       if (seconds === 59) {
//         setMinutes(minutes + 1);
//         setSeconds(0);
//       } else {
//         setSeconds(seconds + 1);
//       }
//     }, 1000); 
//     return () => clearInterval(timerID);
//   }, [seconds, minutes]);
//   // useEffect(() => {
//   //       setModalVisible(true);
//   //     }, []);
//   const playSound = () => {
//     var tic = new Sound('tic.mp3', Sound.MAIN_BUNDLE, (error) => {
//       if (error) {
//         console.log('failed to load the sound', error);
//         return;
//       }
//       // loaded successfully
//       console.log('duration in seconds: ' + tic.getDuration() + 'number of channels: ' + tic.getNumberOfChannels());
    
//       // Play the sound with an onEnd callback
//       tic.play((success) => {
//         if (success) {
//           console.log('successfully finished playing');
//         } else {
//           console.log('playback failed due to audio decoding errors');
//         }
//       });
//     });
//   }
//   const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;


//   const renderItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//       <Image source={beadImage} style={styles.image} />
//     </View>
//   );
//   const onNextPress = () => {
//     // if (activeIndex === 10) {
//     //   setActiveIndex(0);
//     //   if (totalJaap != 1) {
//     //     setTotalJaap(totalJaap - 1);
//     //   } else {
//     //     sendToJaapCompleteScreen()
//     //   }
//     // } 
//     // else
//     // {
//       playSound()
//       Vibration.vibrate(100);
//       carouselRef.current.snapToNext();
//     // }
//     // if(activeIndex === count)
//     // {
//     //   Vibration.vibrate();
//     //   setActiveIndex(0)
//     //   if (totalJaap != 1) {
//     //     setTotalJaap(totalJaap - 1);
//     //   } else {
//     //     sendToJaapCompleteScreen()
//     //   }
//     // }

//   };
//   // const countAndJaap = { count : count, jaap : totalNumberOfCounts}
//   const sendToJaapCompleteScreen = () => {
//     navigation.navigate('RegularJaapDone', { countAndJaap, formattedTime, checkBox1, checkBox2 });
//   }
//   const setTotalJaapForMalaCount = (text) => {
//     setTotalJaap(text)
//     setTotalJaap2(text)
//   }
//   const setMantraJaapAndGoToMalaScreen = () => {
//     setModalVisible(false);
//   };
//   const startAnimation = () => {
//     Animated.sequence([
//       Animated.timing(animation, {
//         toValue: 5,
//         duration: 50,
//         useNativeDriver: true,
//       }),
//       // Animated.timing(animation, {
//       //   toValue: -5,
//       //   duration: 100,
//       //   useNativeDriver: true,
//       // }),
//       Animated.timing(animation, {
//         toValue: 0,
//         duration: 50,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }
//   const onSnap = (index) => {
//     setActiveIndex(index)
//   }
//   return (
//     <>
//     {/* <Animated.View style={[styles.container, 
//       {transform : [
//         {
//           translateX: animation 
//         }
//     ]}]}> */}
//     <View style={styles.container}>
//       <Image source={require('../../assets/string.png')} style={{position: 'absolute', marginLeft: 30, zIndex: -10, opacity: 0.5}}/>
//       <View style={{ width: 25, height: 25, position: 'absolute', zIndex: 4, margin: 22}}>
//           <MaterialIcons name='info-outline' size={25} color={'red'}/>
//         </View>
//         <View>
          
//         </View>
//       <View style={{width: '100%', height: screenHeight * 0.1, backgroundColor: '#ffa801', position: 'absolute', zIndex: 3, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
//       <Text style={{ color: '#F60025', fontSize: 32 }}>
//         {activeIndex}
//         </Text>
//       </View>
//       <Pressable onPress = {onNextPress} style={{flex : 1, flexDirection: 'row'}}>
//       {/* <View style={{ marginLeft: 10, width: screenWidth * 0.55, height: screenHeight * 0.5, justifyContent: 'space-between', marginTop: '25%' }}>
//             <View>
//               <Text style={{ color: '#F60025', fontSize: 25 }}>
//                 Total Mala - {totalJaap}
//               </Text>
//               <Text style={{ color: '#F60025', fontSize: 22 }}>
//                 Total Time : {formattedTime}
//               </Text>
//             </View>

//             <View>
//               <Text style={{ color: '#F60025', fontSize: 32 }}>
//                 Count - {activeIndex}
//               </Text>
//             </View>
//           </View> */}
//       <Carousel
//         ref={carouselRef}
//         data={data}
//         renderItem={renderItem}
//         sliderWidth = {screenWidth}
//         sliderHeight={screenHeight}
//         itemWidth={130}
//         itemHeight={125}
//         vertical
//         scrollEnabled = {false}
//         onSnapToItem = {onSnap}
//         loop = {true}
//       />
//       </Pressable>
//       <View style={{width: '100%', height: screenHeight * 0.1, top: screenHeight * 0.9, backgroundColor: '#ffa801', position: 'absolute', zIndex: 3, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>

//       </View>
//       {/* <Text style={styles.indexText}>Bead Index: {activeIndex + 1}</Text> */}
//     </View> 
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffdd59',
//     // alignSelf: 'flex-end',
//   },
//   itemContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     // alignSelf: 'flex-end',
//   },
//   image: {
//     width: 110,
//     height: 105,
//   },
//   paginationContainer: {
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: 'rgba(255, 255, 255, 0.92)',
//   },
//   indexText: {
//     position: 'absolute',
//     top: 20,
//     color: 'black',
//     fontSize: 16,
//   },
//   button: {
//     position: 'absolute',
//     bottom: 20,
//     backgroundColor: 'blue',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//     btnView: {
//     width: 100,
//     backgroundColor: 'red',
//     justifyContent: 'center',
//     marginLeft: -90,
//     flex: 1,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 165, 0, 0.5)',
//     // alignItems: 'center'
//   },
//   popupinfoView: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   modalView: {
//     height: screenHeight * 0.45,
//     width: '90%',
//     backgroundColor: '#FFFEEE',
//     padding: 20,
//     borderRadius: 20,
//     shadowColor: 'black',
//     elevation: 5,
//     alignItems: 'center',
//   },
//   popupInfoModalView: {
//     height: 80,
//     width: '90%',
//     backgroundColor: '#FFFEEE',
//     borderRadius: 20,
//     shadowColor: 'black',
//     elevation: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: '15%',
//   },
// });

// export default Testing;