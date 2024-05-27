import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Modal, Dimensions, TouchableOpacity, Pressable, Vibration, Animated, FlatList, BackHandler } from 'react-native';
import { app } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-share';
import * as Animatable from 'react-native-animatable';
import { beadImage } from '../common/AllImages';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth(app);
const { width, height } = Dimensions.get('window');
const RoomScreen = () => {
  const count = 19;
  const navigation = useNavigation();
  const [roomCode, setRoomCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [preRoomCode, setPreRoomCode] = useState('')
  const [preJoinCode, setPreJoinCode] = useState('');
  const [roomCreated, setRoomCreated] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [roomExists, setRoomExists] = useState(false);
  const [time, setTime] = useState(new Date());
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const flatListRef = useRef(null);
  const imageRef = useRef(null);
  const [currentBeadIndex, setCurrentBeadIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [totalCount, setTotalCount] = useState(0)
  const [uid, setUid] = useState('');
  useEffect(() => {
    if (roomCode) {
      const roomRef = database().ref(`rooms/${roomCode}`);
      roomRef.on('value', (snapshot) => {
        const roomData = snapshot.val();
        if (roomData) {
          setUserCount(Object.keys(roomData.participants || {}).length);
          setRoomExists(true);
        } else {
          setUserCount(0);
          setRoomExists(false);
        }
      });
      return () => roomRef.off();
    }
  }, [roomCode]);

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
  //     return true;
  //   });
  //   return () => {
  //     backHandler.remove();
  //   };
  // }, []);

  useEffect(async()=>{
    const uid = await AsyncStorage.getItem('UID');
    setUid(uid);
  },[])


  const onButtonPress = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentBeadIndex + 1,
      });

      setCurrentBeadIndex(currentBeadIndex + 1);
    }
    updateCount();
  };
  const onScroll = useCallback(({ viewableItems }) => {
    if (viewableItems.length === 1) {
      console.log(viewableItems);
      setCurrentBeadIndex(viewableItems[0].index);
    }
  }, []);
  const renderBead = ({ item, index }) => (
    <View style={styles.beadContainer}>
      <Animatable.Image
        ref={index === currentBeadIndex ? imageRef : null}
        duration={1000}
        style={[styles.beadImage, { transform: [{ scale: scaleAnim }] }]}
        source={beadImage}
      />
    </View>
  );
  const createRoom = () => {
    const newRoomCode = generateRoomCode();
    const userId = uid;
    firebase.app().database().ref(`rooms/${newRoomCode}`).set({
      createdBy: userId,
      count: 0,
      participants: {
        [userId]: true
      }
    })
      .then(() => {
        setUserCount(1);
        setRoomCode(newRoomCode)
        setRoomCreated(true)
        console.log('New room code setted')
      }).catch(error => {
        console.error("Error creating room:", error);
        Alert.alert("Error", "Failed to create room. Please try again.");
      });
  };
  const joinRoom = () => {
    const userId = uid;
    console.log(userId)
    console.log(typeof (preJoinCode))
    database().ref(`rooms/${preJoinCode}`).transaction((room) => {
      if (room) {
        room.participants[userId] = true;
        setUserCount(Object.keys(room.participants).length);
        setRoomCode(preJoinCode)
        return room;
      }
    })
      // .then(()=>{
      //   setRoomCode(preJoinCode)
      // })
      .catch(error => {
        console.error("Error joining room:", error);
        Alert.alert("Error", "Failed to join room. Please try again.");
      });
  };

  const updateCount = () => {
    database().ref(`rooms/${roomCode}/count`).transaction(count => count + 1)
    totalCounts()
  };

  const generateRoomCode = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const totalCounts = () => {
    const dbRef = database().ref(`rooms/${roomCode}/count`);

    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setTotalCount(data);
    });
  }
  const handleLeaveRoom = () => {
    const userId = uid;
    const dbRef = database().ref(`rooms/${roomCode}/participants/${userId}`);
    dbRef.remove()
    .then(()=>{
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      navigation.dispatch(resetAction);
    })
  }
  const handleDeleteRoom = () => {
    const dbRef = database().ref(`rooms/${roomCode}`);
    dbRef.remove()
    .then(() => {
      const resetAction = CommonActions.reset({
        index: 0,
        routes : [{name : 'Home'}],
      });
      navigation.dispatch(resetAction);
    })
  }
  const handleParticipantsOnDeleteRoom = () => {
    setRoomCode(null)
    setUserCount(0)
    const resetAction = CommonActions.reset({
      index: 0,
      routes : [{name : 'Home'}],
    });
    navigation.dispatch(resetAction);
    Alert.alert('Room has been deleted by host');
  }
  return (
    !roomCode ? (
      <LinearGradient colors={['#ffa601', '#ff8f00', '#fe6d01']} style={styles.linearGradient}>
        {
          (joinCode ?
            <View style={styles.centeredView}>
              <View style={styles.codeJoinView}>
                <Text style={{ fontSize: 22, color: 'black', fontFamily: 'Inter-Bold' }}>
                  Enter the Joining Code
                </Text>
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
                    value={preJoinCode}
                    onChangeText={setPreJoinCode}
                    placeholderTextColor={'grey'}
                    autoFocus
                    cursorColor={'orange'}
                    selectionColor="orange"
                  />
                </View>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fea501', '#ff8804', '#fe6f01']} style={{ width: '80%', height: 45, backgroundColor: '#fe7200', borderRadius: 5, marginTop: '10%' }}
                >
                  <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => joinRoom()}>
                    <Text style={{ color: 'white', fontFamily: 'Inter-Bold', fontSize: 14 }}>Join Jaap</Text>
                  </Pressable>
                </LinearGradient>
                <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '80%', borderRadius: 5, fontFamily: 'Inter-Medium', marginTop: 7 }} onPress={() => setJoinCode('')}>
                  <Text style={{ color: 'gray', fontFamily: 'Inter-Bold', fontSize: 15 }}>Cancel</Text>
                </Pressable>
              </View>
            </View>
            :
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{ fontSize: 22, color: 'black', fontFamily: 'Inter-Bold' }}>
                  Group Mantra Jaap
                </Text>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fea501', '#ff8804', '#fe6f01']} style={{ width: '80%', height: 45, backgroundColor: '#fe7200', borderRadius: 5, marginTop: 25 }}
                >
                  <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => createRoom()}>
                    <Text style={{ color: 'white', fontFamily: 'Inter-Bold', fontSize: 14 }}>Create a Jaap</Text>
                  </Pressable>
                </LinearGradient>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fea501', '#ff8804', '#fe6f01']} style={{ width: '80%', height: 45, backgroundColor: '#fe7200', borderRadius: 5, marginTop: 25 }}
                >
                  <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => setJoinCode(true)}>
                    <Text style={{ color: 'white', fontFamily: 'Inter-Bold', fontSize: 14 }}>Join a Jaap</Text>
                  </Pressable>
                </LinearGradient>
              </View>
            </View>
          )

        }
      </LinearGradient>
    ) :
      <View style={styles.container}>
        <LinearGradient
          colors={['#FFB6E6', 'transparent']}
          style={{ width: '100%', height: height * 0.2, position: 'absolute', zIndex: 2 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        {
          roomCreated?
          <View style={{position: 'absolute', width: '60%', zIndex: 4, justifyContent: 'center',alignSelf: 'flex-start', height: 50, marginLeft: 10, marginTop: 20}}>
          <TouchableOpacity style={{position: 'absolute', width: 'auto', height: 50, backgroundColor: '#44bd32', justifyContent: 'center', alignSelf: 'flex-start',alignItems: 'center', borderRadius: 10}} onPress={() => setModalVisible(true)}>
          <Text style={{fontFamily: 'Inter-Bold', color: '#fff', padding: 5}}>Add others</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{position: 'absolute', width: 'auto', height: 50, backgroundColor: '#e84118', justifyContent: 'center',alignItems: 'center', alignSelf: 'flex-end', borderRadius: 10}} onPress={() => handleDeleteRoom()}>
          <Text style={{fontFamily: 'Inter-Bold', color: '#fff', padding: 5}}>Delete Room</Text>
          </TouchableOpacity>
          </View>
          :
          <View style={{position: 'absolute', width: '92%', zIndex: 4, justifyContent: 'center',alignSelf: 'flex-start', height: 50, marginLeft: 10, marginTop: 20}}>
            <TouchableOpacity style={{position: 'absolute', width: 'auto', height: 50, backgroundColor: '#e84118', justifyContent: 'center', alignSelf: 'flex-start', marginRight: 20, zIndex: 3, borderRadius: 10}} onPress={() => handleLeaveRoom()}>
          <Text style={{fontFamily: 'Inter-Bold', color: '#fff', padding: 6}}>Leave Room</Text>
          </TouchableOpacity>
          </View>
        }
        {
          userCount > 0?
<Pressable onPress={onButtonPress} style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ marginLeft: 10, width: width * 0.6, height: height * 0.5, justifyContent: 'space-between', marginTop: '25%' }}>
            <View>
              <Text style={{ color: '#F60025', fontSize: 25 }}>
                {/* Total Counts - 10000  */}
                Room Code - {roomCode}
              </Text>
              <Text style={{ color: '#F60025', fontSize: 22 }}>
                Total Counts : {totalCount}
              </Text>
              <Text style={{ color: '#F60025', fontSize: 22 }}>
                Total Users : {userCount}
              </Text>
            </View>

            <View>
              <Text style={{ color: '#F60025', fontSize: 28 }}>
                Your Count - {currentBeadIndex}
              </Text>
            </View>



          </View>
          <View style={{ width: width, height: height, flex: 1 }}>

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
            {
              roomCreated ? 
              <Modal visible={modalVisible} transparent={true}>
            <View style={styles.centeredView}>
              <View style={styles.codeSharingView}>
                <Text style={{ fontSize: 22, color: 'black', fontFamily: 'Inter-Bold' }}>
                  Share your code to others
                </Text>
                <Text style={{ fontSize: 18, color: 'grey', fontFamily: 'Inter-Regular', textAlign: 'center', width: '80%', marginTop: 25 }}>Your room code is</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'row', marginTop: 25, width: '50%', borderWidth: 0.5, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10, borderColor: '#fe6d01' }}>
                    <Text style={{ color: '#fe6d01', fontSize: 22, marginHorizontal: 10 }}>{roomCode}</Text>
                  </View>
                  <TouchableOpacity style={{ flexDirection: 'row', marginTop: 25, width: 'auto', borderWidth: 0.5, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderColor: 'green' }}
                    onPress={() => {
                      const options = {
                        message: `Rudraksh Jani has sent you invitation for group mantra jaaps on occassion of Punyatithi. Please join mantra jaap on moksh app using this code ${roomCode}`,
                      };
                      Share.open(options)
                    }}
                  >
                    <MaterialIcons name='share' color='green' size={25} style={{ marginHorizontal: 5 }} />
                  </TouchableOpacity>

                </View>
                <Pressable style={{justifyContent: 'center', alignItems: 'center', width: '70%', borderRadius: 5, fontFamily: 'Inter-Medium', borderWidth: 0.5, height: 50}} onPress={() => setModalVisible(false)}>
                  <Text style={{ color: 'gray', fontFamily: 'Inter-Bold', fontSize: 15 }}>Cancel</Text>
                </Pressable>
              </View>
            </View>
            </Modal> : null
      
            }
            

          </View>
        </Pressable>
        :
        handleParticipantsOnDeleteRoom()
        }
        
        <LinearGradient
          colors={['transparent', '#FFB6E6']}
          style={{ width: '100%', height: height * 0.2, position: 'absolute', bottom: 0 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

      </View>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 165, 0, 0.5)',
  },
  modalView: {
    height: height * 0.3,
    width: '100%',
    backgroundColor: '#FFFEEE',
    padding: 20,
    borderRadius: 20,
    shadowColor: 'black',
    elevation: 5,
    alignItems: 'center',
  },
  codeSharingView: {
    height: height * 0.35,
    width: '90%',
    backgroundColor: '#FFFEEE',
    padding: 20,
    borderRadius: 20,
    shadowColor: 'black',
    elevation: 5,
    alignItems: 'center',
  },
  codeJoinView: {
    height: height * 0.35,
    width: '100%',
    backgroundColor: '#FFFEEE',
    padding: 20,
    borderRadius: 20,
    shadowColor: 'black',
    elevation: 5,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ff9f1a',
  },
  beadContainer: {
    width: 105, 
    height: 100, 
  },
  beadImage: {
    width: '100%',
    height: '100%',
  },
})