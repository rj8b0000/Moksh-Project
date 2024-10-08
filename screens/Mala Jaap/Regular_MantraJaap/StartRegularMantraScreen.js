import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View, TouchableOpacity, Vibration, Modal, TextInput, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Sound from 'react-native-sound';


const { width, height } = Dimensions.get('window');
const prefixUrl = "https://bugle.co.in/moksh/public/public/assets/images/mantra_thumbnail/"
const getMantraApi = 'https://bugle.co.in/moksh/public/api/mantra/search/'
const StartRegularMantraScreen = () => {
  useEffect(() => {
    return () => {
      bell.release();
    };
  }, []);

  const numbers = [108];
  const carouselRef = useRef(null);
  const [checkBox1, setCheckBox1] = useState(true);
  const [checkBox2, setCheckBox2] = useState(false);
  const [checkBox3, setCheckBox3] = useState(false);
  const [checkBox4, setCheckBox4] = useState(true);
  const [totalMalaCount, setTotalMalaCount] = useState('');
  const [count, setCount] = useState(10)
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [fixTargetModal, showFixTargetsModal] = useState(false)
  const [targetCounts, setTargetCounts] = useState('');
  const [customCountTextBox, setCustomCountTextBox] = useState(true)
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
  // const onCarouselRef = (ref) => {
  //   carouselRef.current = ref;
  //   carouselRef.current.onSnapToItem(0); // snap to the first item
  // };
  var bell = new Sound('bell_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });
  const handleCheckBox1 = () => {
    setCheckBox1(!checkBox1);
    if (checkBox1 == false) {
      bell.play();
    }
    setCheckBox2(false)
  };

  const handleCheckBox2 = () => {
    setCheckBox2(!checkBox2);
    if (checkBox2 == false) {
      Vibration.vibrate(700)
    }
    setCheckBox1(false)
  };
  const handleCheckBox3 = () => {
    setCheckBox3(!checkBox3);
    if (checkBox3 == false) {
      showFixTargetsModal(true)
    }
    setCheckBox4(false)
  };
  const handleCheckBox4 = () => {
    setCheckBox4(!checkBox4);
    if (checkBox4 == false) {
      setTargetCounts(null)
    }
    setCheckBox3(false)
  };
  const handleSetCountFromModal = () => {
    navigation.navigate('RegularMala', { count, checkBox1, checkBox2 })
  }
  const setCustomCounts = (text) => {
    if (text > 108) {
      Alert.alert('Please enter custom count number less than 108')
    }
    else {
      setCount(parseInt(text))
    }
  }
  const setTotalJaap = () => {
    setModalVisible(false);
    setCount(parseInt(totalMalaCount) * 10);
  }
  const cancelFixTargetsModal = () => {
    showFixTargetsModal(false)
    setCheckBox3(false)
    setCheckBox4(true)
  }
  const setFixTarget = (text) => {
    showFixTargetsModal(false);
    setCount(parseInt(totalMalaCount));
    setCustomCountTextBox(false);
  }
  return (
    <LinearGradient colors={['#ffa701', '#fe8b01', '#fe6f01']} style={styles.linearGradient}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          marginHorizontal: 17, marginVertical: 30,
          alignContent: 'space-between',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name='close' size={25} color='#fff' />
          </Pressable>
        </View>
        <View style={{ width: 250, height: 250, borderRadius: 10, alignSelf: 'center', marginTop: height * 0.05 }}>
          <Image
            source={require('../../../assets/mala.png')}
            style={{ width: '100%', height: '100%', borderRadius: 10 }} />
        </View>
        <View style={{ marginHorizontal: 10, alignSelf: 'center' }}>
          <View style={{ marginTop: '10%' }}>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 27, color: '#fffefe', textAlign: 'center' }}>Mala Jaap</Text>
            {/* <Text style={{ fontFamily: 'Inter-Regular', fontSize: 20, color: '#feebc0', textAlign: 'center' }}>Aum Namah Shivaya</Text> */}
          </View>
        </View>
        {
          totalMalaCount ?
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={{ fontFamily: 'Inter-Regular', fontSize: 19, color: '#feebc0', textAlign: 'center', marginTop: 10 }}>Your custom counts are</Text>
              <Text style={{ fontSize: 40, color: '#fefefa', fontWeight: 'bold', marginVertical: 20 }}>{totalMalaCount}</Text>
            </View> :
            null
        }
        {
          targetCounts ?
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={{ fontFamily: 'Inter-Regular', fontSize: 19, color: '#feebc0', textAlign: 'center', marginTop: 10 }}>Your target counts are</Text>
              <Text style={{ fontSize: 40, color: '#fefefa', fontWeight: 'bold', marginVertical: 20 }}>{targetCounts}</Text>
            </View> :
            null
        }
        {/* <View style={{ marginHorizontal: 10, alignItems: 'center' }}>
                        <View style={{ marginTop: '10%', alignSelf: 'center' }}>
                          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 19, color: '#feebc0', textAlign: 'center' }}>How mala you want to do?</Text>
                        </View>
                      </View>
                      <View style={{ height: 15 }} />
                      <Carousel
                        data={numbers}
                        renderItem={renderItem}
                        sliderWidth={width}
                        itemWidth={100}
                        firstItem={0}
                        onSnapToItem={handleSnapToItem}
                      /> */}
        {
          customCountTextBox ?
            <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-around', height: height * 0.1, alignSelf: 'center', }}>
              <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => setModalVisible(true)}>
                <View style={{ backgroundColor: '#e57300', width: '90%', height: '60%', alignItems: 'center', justifyContent: 'center', borderRadius: 30, flexDirection: 'row' }}>
                  <Text style={{ color: '#feefd2', marginHorizontal: 10, fontFamily: 'Inter-Regular', fontSize: 18 }}>Set Custom Mala</Text>
                  <SimpleLineIcons name='arrow-right' size={15} color='#feefd2' />
                </View>
              </TouchableOpacity>
            </View> :
            null
        }

        {/* <Modal visible={modalVisible} transparent={true}>
                        <View style={styles.centeredView}>
                          <View style={styles.modalView}>
                            <Text style={{ fontSize: 22, color: 'black', fontFamily: 'Inter-Bold' }}>
                              Mala Jaap
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
                      </Modal> */}
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
                  onChangeText={text => setTotalMalaCount(text)}
                  placeholderTextColor={'grey'}
                  keyboardType="number-pad"
                  autoFocus
                  cursorColor={'orange'}
                  selectionColor="orange"
                />
              </View>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fea501', '#ff8804', '#fe6f01']} style={{ width: '80%', height: 45, backgroundColor: '#fe7200', borderRadius: 5, marginTop: 25 }}
              >
                <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => setTotalJaap()}>
                  <Text style={{ color: 'white', fontFamily: 'Inter-Bold', fontSize: 14 }}>Set Count</Text>
                </Pressable>
              </LinearGradient>
              <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '80%', borderRadius: 5, marginTop: 7, fontFamily: 'Inter-Medium', borderColor: 'grey', borderWidth: 1, height: 45 }} onPress={() => setModalVisible(false)}>
                <Text style={{ color: 'gray', fontFamily: 'Inter-Bold', fontSize: 15 }}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal visible={fixTargetModal} transparent={true}>
          <View style={styles.centeredView}>
            <View style={styles.targetModalView}>
              <Text style={{ fontSize: 22, color: 'black', fontFamily: 'Inter-Bold' }}>
                Set Fix Target
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
                  onChangeText={text => setTotalMalaCount(text)}
                  placeholderTextColor={'grey'}
                  keyboardType="number-pad"
                  autoFocus
                  cursorColor={'orange'}
                  selectionColor="orange"
                />
              </View>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fea501', '#ff8804', '#fe6f01']} style={{ width: '80%', height: 45, backgroundColor: '#fe7200', borderRadius: 5, marginTop: 25 }}
              >
                <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => setFixTarget(false)}>
                  <Text style={{ color: 'white', fontFamily: 'Inter-Bold', fontSize: 14 }}>Set Count</Text>
                </Pressable>
              </LinearGradient>
              <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '80%', borderRadius: 5, marginTop: 7, fontFamily: 'Inter-Medium', borderColor: 'grey', borderWidth: 1, height: 25 }} onPress={() => cancelFixTargetsModal(false)}>
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
        <View style={{ marginHorizontal: 10, alignItems: 'center', width: '70%', alignSelf: 'center' }}>
          <View style={{ marginTop: '10%', alignSelf: 'center' }}>
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 15, color: '#feebc0', textAlign: 'center' }}>Would you want to set a fix counts target?</Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', width: '70%', alignSelf: 'center', marginTop: 15 }}>
          <TouchableOpacity onPress={handleCheckBox3} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, marginRight: 8, borderColor: '#fff' }}>
              {checkBox3 && <View style={{ flex: 1, backgroundColor: '#feebc0', borderRadius: 10 }} />}
            </View>
            <Text style={{ color: '#feebc0' }}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCheckBox4} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, marginRight: 8, borderColor: '#fff' }}>
              {checkBox4 && <View style={{ flex: 1, backgroundColor: '#feebc0', borderRadius: 10 }} />}
            </View>
            <Text style={{ color: '#feebc0' }}>No</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-around', height: height * 0.11, alignSelf: 'center', }}>
          <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('RegularMala', { count, checkBox1, checkBox2 })}>
            <View style={{ backgroundColor: '#fefdf9', width: '90%', height: '60%', alignItems: 'center', justifyContent: 'center', borderRadius: 30, flexDirection: 'row' }}>
              <Image source={require('../../../assets/mala.png')} style={{ width: 45, height: 45 }} />
              <Text style={{ color: '#fe7200', fontSize: 20, fontWeight: 'bold', marginHorizontal: 10 }}>Start Japa</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default StartRegularMantraScreen

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
    height: 390,
    width: '90%',
    backgroundColor: '#FFFEEE',
    padding: 20,
    borderRadius: 20,
    shadowColor: 'black',
    elevation: 5,
    alignItems: 'center',
  },
  targetModalView: {
    height: 270,
    width: '90%',
    backgroundColor: '#FFFEEE',
    padding: 20,
    borderRadius: 20,
    shadowColor: 'black',
    elevation: 5,
    alignItems: 'center',
  },
})