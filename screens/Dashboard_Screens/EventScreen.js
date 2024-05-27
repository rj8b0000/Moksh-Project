import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Modal, Dimensions, TouchableOpacity, Pressable, Vibration, Animated, FlatList } from 'react-native';
import { app } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
import database from '@react-native-firebase/database';
// import { firebase } from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';
// import * as Animatable from 'react-native-animatable';
// import { beadImage } from '../common/AllImages';

// const auth = getAuth(app);
const { width, height } = Dimensions.get('window');
const EventScreen = () => {
    const navigation = useNavigation();
  const [roomCode, setRoomCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
//   const [roomCreated, setRoomCreated] = useState(false);
//   const [userCount, setUserCount] = useState(0);
//   const [roomExists, setRoomExists] = useState(false);

//   useEffect(() => {
//     // Listen for changes in user count when joining a room
//     if (roomCode) {
//       const roomRef = database().ref(`rooms/${roomCode}`);
//       roomRef.on('value', (snapshot) => {
//         const roomData = snapshot.val();
//         if (roomData) {
//           setUserCount(Object.keys(roomData.participants || {}).length);
//           setRoomExists(true);
//         } else {
//           setUserCount(0);
//           setRoomExists(false);
//         }
//       });
//       return () => roomRef.off();
//     }
//   }, [roomCode]);
  const createCode = () => {
    const newRoomCode = generateRoomCode();
    setRoomCode(newRoomCode);
  }
  const startGroupJaap = () => {
    navigation.navigate('Community', roomCode )
  }

//   const createRoom = () => {
//     const userId = auth?.currentUser?.uid;
//     console.log('Uid is', userId)

//     firebase.app().database().ref(`rooms/${roomCode}`).set({
//       createdBy: userId,
//       count: 0,
//       participants: {
//         [userId]: true
//       }
//     })
//       .then(() => {
//         setRoomCode(roomCode);
//         setUserCount(1);
//         setRoomCreated(true)
//         console.log('New room code setted')
//       }).catch(error => {
//         console.error("Error creating room:", error);
//         Alert.alert("Error", "Failed to create room. Please try again.");
//       });
//   };
//   const joinRoom = () => {
//     const userId = firebase.auth().currentUser.uid;

//     database().ref(`rooms/${roomCode}`).transaction((room) => {
//       if (room) {
//         room.participants[userId] = true;
//         return room;
//       } else {
//         Alert.alert("Error", "Room does not exist.");
//       }
//     }).catch(error => {
//       console.error("Error joining room:", error);
//       Alert.alert("Error", "Failed to join room. Please try again.");
//     });
//   };

//   const updateCount = () => {
//     database().ref(`rooms/${roomCode}/count`).transaction(count => count + 1)
//   };

  const generateRoomCode = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  return (
    <LinearGradient colors={['#ffa601', '#ff8f00', '#fe6d01']} style={styles.linearGradient}>
      {
        roomCode ?
          // <Modal visible={true} transparent={true}>
          <View style={styles.centeredView}>
            <View style={styles.codeSharingView}>
              <Text style={{ fontSize: 22, color: 'black', fontFamily: 'Inter-Bold' }}>
                Share your code to others
              </Text>
              <Text style={{ fontSize: 18, color: 'grey', fontFamily: 'Inter-Regular', textAlign: 'center', width: '80%', marginTop: 25 }}>Your room code is</Text>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', marginTop: 25, width: 'auto', borderWidth: 0.5, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10, borderColor: '#fe6d01' }}>
                  <Text style={{ color: '#fe6d01', fontSize: 22, marginHorizontal: 10 }}>{roomCode}</Text>
                  {/* <MaterialIcons name='share' color='#000' size={25} style={{marginRight : 10}}/> */}
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 25, width: 'auto', borderWidth: 0.5, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderColor: 'green' }}
                  onPress={() => {
                    const options = {
                      message: `Rudraksh Jani has sent you invitation for group mantra jaaps on occassion of Punyatithi. Please join mantra jaap on moksh app using this code ${roomCode}`,
                    };
                    Share.open(options)
                  }}
                >
                  {/* <Text style={{color: 'black', fontSize: 22, marginLeft: 35}}>XFA345</Text> */}
                  <MaterialIcons name='share' color='green' size={25} style={{ marginHorizontal: 5 }} />
                </TouchableOpacity>

              </View>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fea501', '#ff8804', '#fe6f01']} style={{ width: '80%', height: 45, backgroundColor: '#fe7200', borderRadius: 5, marginTop: '23%' }}
              >
                <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => startGroupJaap()}>
                  <Text style={{ color: 'white', fontFamily: 'Inter-Bold', fontSize: 14 }}>Create a Jaap</Text>
                </Pressable>
              </LinearGradient>
              <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '80%', borderRadius: 5, fontFamily: 'Inter-Medium', marginTop: 7 }} onPress={() => setRoomCode('')}>
                <Text style={{ color: 'gray', fontFamily: 'Inter-Bold', fontSize: 15 }}>Cancel</Text>
              </Pressable>
            </View>
          </View>
          :
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
                              onChangeText={(text)=>setRoomCode(text)}
                              placeholderTextColor={'grey'}
                              autoFocus
                              cursorColor={'orange'}
                              selectionColor="orange"
                            />
                          </View>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fea501', '#ff8804', '#fe6f01']} style={{ width: '80%', height: 45, backgroundColor: '#fe7200', borderRadius: 5, marginTop: '10%' }}
              >
                 <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => startGroupJaap()}>
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
                <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => createCode()}>
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
  );
};

export default EventScreen;

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
    height: height * 0.42,
    width: '100%',
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
})