import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View, TouchableOpacity, Vibration, Modal, TextInput, Button, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Sound from 'react-native-sound';
import Loading from '../common/ProgressBar';



const { width, height } = Dimensions.get('window');
const prefixUrl = "https://bugle.co.in/moksh/public/public/assets/images/mantra_thumbnail/"
const getMantraApi = 'https://bugle.co.in/moksh/public/api/mantra/search/'
const MantraJaapScreen = () => {
  useEffect(() => {
    return () => {
      bell.release();
    };
  }, []);
  useEffect(() => {
    // console.log('Item is : ',item)
    getMantraDetails(item.title)
  }, [])
  const ref = useRef();
  const numbers = ['', 54, 108, 21, 11];
  const [checkBox1, setCheckBox1] = useState(true);
  const [checkBox2, setCheckBox2] = useState(false);
  const [count, setCount] = useState(0)
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const getMantraDetails = async title => {
    const title_ = title
    const title_with_ = title_.replace(/\s/g, '%20');
    const api = `${getMantraApi}${title_with_}`;
    setLoading(true)
    console.log(api)
    fetch(api)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setResults(data);
      }
      )
      .catch(error => console.error(error));
  }
  const renderItem = ({ item }) => {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text style={{ fontSize: 50, color: '#fefefa', fontWeight: 'bold', marginVertical: 20 }}>{item}</Text>
      </View>
    );
  };
  const handleSnapToItem = (index) => {
    // console.log(index)
    const onSnapToItem = index
    if (onSnapToItem == 1) {
      setCount(54)
    }
    else if (onSnapToItem == 2) {
      setCount(108)
    }
    else if (onSnapToItem == 3) {
      setCount(21)
    }
    else {
      setCount(11)
    }
  };
  var bell = new Sound('bell_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });
  const handleCheckBox1 = () => {
    setCheckBox1(!checkBox1);
    if (checkBox1 == false) {
      bell.play((success) => {
        if (success) {
          console.log('successfully finished playing');
          setCheckBox1(true)
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
    setCheckBox2(false)
  };

  const handleCheckBox2 = () => {
    setCheckBox2(!checkBox2);
    if (checkBox2 == false) {
      Vibration.vibrate(700)
      setCheckBox2(true)
    }
    setCheckBox1(false)
  };
  const handleStartJapa = () => {
    navigation.navigate('Mala', { count })
  }
  const handleSetCountFromModal = () => {
    navigation.navigate('Mala', { count, item, checkBox1, checkBox2 })
  }
  const setCustomCounts = (text) => {
    if(text > 108)
    {
      Alert.alert('Please enter custom count number less than 108')
    }
    else
    {
      setCount(parseInt(text))
    }
}
  return (
    <LinearGradient colors={['#ffa701', '#fe8b01', '#fe6f01']} style={styles.linearGradient}>
    {
      loading ? <Loading /> :
        results.length > 0 ?
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
              // flex: 1,
              marginHorizontal: 17, marginVertical: 30,
              alignContent: 'space-between',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <Pressable onPress={() => navigation.goBack()}>
                <AntDesign name='close' size={25} color='#fff' />
              </Pressable>
            </View>
            {
              results.map((item, index) => {
                return (
                  <>
                    <View style={{ width: 150, height: 150, borderRadius: 10, alignSelf: 'center', marginTop: height * 0.05 }}>
                      <Image
                        source={{ uri: `${prefixUrl}${item.artwork}` }}
                        style={{ width: 150, height: 150, borderRadius: 10 }} />
                    </View>
                    <View style={{ marginHorizontal: 10, alignSelf: 'center' }}>
                      <View style={{ marginTop: '10%' }}>
                        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 27, color: '#fffefe', textAlign: 'center' }}>{item.title}</Text>
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 20, color: '#feebc0', textAlign: 'center' }}>{item.mantra_lyrics
                        }</Text>
                      </View>
                    </View>
                    <View style={{ marginHorizontal: 10, alignItems: 'center' }}>
                      <View style={{ marginTop: '10%', alignSelf: 'center' }}>
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 19, color: '#feebc0', textAlign: 'center' }}>How many times do you want to chant?</Text>
                      </View>
                    </View>
                    <View style={{ height: 15 }} />
                    <Carousel
                      data={numbers}
                      renderItem={renderItem}
                      // firstItem={2}
                      sliderWidth={width}
                      itemWidth={100}
                      onSnapToItem={handleSnapToItem}
                    />
                    <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-around', height: height * 0.1, alignSelf: 'center', }}>
                      <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => setModalVisible(true)}>
                        <View style={{ backgroundColor: '#e57300', width: '90%', height: '60%', alignItems: 'center', justifyContent: 'center', borderRadius: 30, flexDirection: 'row' }}>
                          <Text style={{ color: '#feefd2', marginHorizontal: 10, fontFamily: 'Inter-Regular', fontSize: 18 }}>Add Custom Count</Text>
                          <SimpleLineIcons name='arrow-right' size={15} color='#feefd2' />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Modal visible={modalVisible} transparent={true}>
                      <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                          <Text style={{ fontSize: 22, color: 'black', fontFamily: 'Inter-Bold' }}>
                            {item.title}
                          </Text>
                          <Text style={{fontSize: 18, color: 'grey', fontFamily: 'Inter-Regular', textAlign: 'center', width: '80%', marginTop: 25}}>Enter the Japa counts you want to chant</Text>
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
                              onChangeText={(text)=>setCustomCounts(text)}
                              placeholderTextColor={'grey'}
                              keyboardType="number-pad"
                              autoFocus
                              cursorColor={'orange'}
                              selectionColor="orange"
                            />
                          </View>
                          <View style={{ marginHorizontal: 10, alignItems: 'center', width: '70%', alignSelf: 'center' }}>
                      <View style={{ marginTop: '10%', alignSelf: 'center' }}>
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 15, color: '#000', textAlign: 'center' }}>How to you want us to prompt you when your japa ends?</Text>
                      </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', width: '70%', alignSelf: 'center', marginTop: 15 }}>
                      <TouchableOpacity onPress={handleCheckBox1} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, marginRight: 8, borderColor: '#000' }}>
                          {checkBox1 && <View style={{ flex: 1, backgroundColor: 'orange', borderRadius: 10 }} />}
                        </View>
                        <Text style={{ color: '#000' }}>Sound</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleCheckBox2} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, marginRight: 8, borderColor: '#000' }}>
                          {checkBox2 && <View style={{ flex: 1, backgroundColor: 'orange', borderRadius: 10 }} />}
                        </View>
                        <Text style={{ color: '#000' }}>Vibrate</Text>
                      </TouchableOpacity>
                    </View>
                          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fea501', '#ff8804', '#fe6f01']} style={{ width: '80%', height: 45, backgroundColor: '#fe7200', borderRadius: 5, marginTop: 25 }}
                          >
                            <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={()=>handleSetCountFromModal()}>
                              <Text style={{ color: 'white', fontFamily: 'Inter-Bold', fontSize: 14 }}>Set Count</Text>
                            </Pressable>
                          </LinearGradient>
                            <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '80%', borderRadius: 5, marginTop: 7, fontFamily: 'Inter-Medium'}} onPress={()=>setModalVisible(false)}>
                              <Text style={{ color: 'gray', fontFamily: 'Inter-Bold', fontSize: 15 }}>Cancel</Text>
                            </Pressable>
                        </View>
                      </View>
                    </Modal>
                    <View style={{ marginHorizontal: 10, alignItems: 'center', width: '70%', alignSelf: 'center' }}>
                      <View style={{ marginTop: '10%', alignSelf: 'center' }}>
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 15, color: '#feebc0', textAlign: 'center' }}>How to you want us to prompt you when your japa ends?</Text>
                      </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', width: '70%', alignSelf: 'center', marginTop: 15 }}>
                      <TouchableOpacity onPress={handleCheckBox1} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, marginRight: 8, borderColor: '#fff' }}>
                          {checkBox1 && <View style={{ flex: 1, backgroundColor: '#feebc0', borderRadius: 10 }} />}
                        </View>
                        <Text style={{ color: '#feebc0' }}>Sound</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleCheckBox2} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, marginRight: 8, borderColor: '#fff' }}>
                          {checkBox2 && <View style={{ flex: 1, backgroundColor: '#feebc0', borderRadius: 10 }} />}
                        </View>
                        <Text style={{ color: '#feebc0' }}>Vibrate</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-around', height: height * 0.12, alignSelf: 'center', }}>
                      <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Mala', { count, item, checkBox1, checkBox2 })}>
                        <View style={{ backgroundColor: '#fefdf9', width: '90%', height: '60%', alignItems: 'center', justifyContent: 'center', borderRadius: 30, flexDirection: 'row' }}>
                          <Image source={require('../../assets/mala.png')} style={{ width: 45, height: 45 }} />
                          <Text style={{ color: '#fe7200', fontSize: 20, fontWeight: 'bold', marginHorizontal: 10 }}>Start Japa</Text>
                        </View>
                      </Pressable>
                    </View>
                  </>
                )
              })
            }
          </ScrollView>
          : null
    }

  </LinearGradient>

  )
}

export default MantraJaapScreen

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
    height: height * 0.6,
    width: '90%',
    backgroundColor: '#FFFEEE',
    padding: 20,
    borderRadius: 20,
    shadowColor: 'black',
    elevation: 5,
    alignItems: 'center',
  },
})