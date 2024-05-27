import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loading from '../common/ProgressBar';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

const { width, height } = Dimensions.get('window');
const getMantraApi = 'https://bugle.co.in/moksh/public/api/mantra/get_mantra_data/'
const prefixUrl = "https://bugle.co.in/moksh/public/public/assets/images/mantra_thumbnail/"
const StartMantraScreen = () => {
  const ref = useRef();
  const navigation = useNavigation();
  const [mantra, setMantra] = useState({})
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const { params: item } = useRoute();
  const [imageUri, setImageUri] = useState('')
  useEffect(() => {
    getMantraDetails()
  }, [])
  // useEffect(()=> {
  //   setTimeout(() => {
  //     ref.current.capture().then(uri => {
  //       // console.log("do something with ", uri);
  //       setImageUri(uri)
  //     });
  //   }, 3000)

  // },[])
  const getMantraDetails = () => {
    // const title_ = title
    // const title_with_ = title_.replace(/\s/g, '%20');
    const id = item.mantra_id
    const api = `${getMantraApi}${id}`;
    // setLoading(true)
    console.log(api)
    fetch(api)
      .then(response => response.json())
      .then(data => {
        console.log('Mantra details : ',data);
        setLoading(false);
        setResults(data);
        // console.log(results)
      }
      )
      .catch(error => console.error(error));
  }
  const onShareHandler = () => {

  }
  return (
    <LinearGradient colors={['#fea900', '#fe8e00', '#fe6d01']} style={styles.linearGradient}>
      {
        loading ? <Loading /> :
          results ?
            <ScrollView showsVerticalScrollIndicator={false}>
              {
                    <>
                      <View style={{
                        marginHorizontal: 17, marginVertical: 30,
                        alignContent: 'space-between',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                        <Pressable onPress={() => navigation.goBack()}>
                          <MaterialIcons name='arrow-back-ios' size={25} color='#fff' />
                        </Pressable>
                        <View style={{ flexDirection: 'row' }}>
                          <MaterialIcons name='share' color='#fff' size={25} style={{ marginLeft: 20 }} onPress={() => {
                            const options = {
                              url: imageUri,
                              message: `Check out ${item.title} available on the Moksh App bugle.com`,
                            };
                            Share.open(options)
                          }} />
                        </View>
                      </View>
                      <ViewShot ref={ref} style={{ width: 150, height: 150, borderRadius: 10, alignSelf: 'center', marginTop: height * 0.05 }}
                        options={{ fileName: "Jaap_complete", format: "jpg", quality: 0.9 }}
                      >
                        <View style={{ width: 150, height: 150, borderRadius: 10, alignSelf: 'center' }}>
                          <Image source={{ uri: `${prefixUrl}${results.image}` }} style={{ width: 150, height: 150, borderRadius: 10 }} />
                        </View>
                      </ViewShot>
                      <View style={{ marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ marginTop: '10%' }}>
                          <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 30, color: '#fffefe' }}>{results.mantra_text}</Text>
                          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 23, color: '#feebc0' }}>{results.mantra_lyrics}</Text>
                        </View>
                    {/* <View style={{ marginTop: '15%' }}>
                      <AntDesign name='play' size={45} color='#fff' />
                    </View> */}
                      </View>
                      <View style={{ width: '100%', height: height * 0.12, marginTop: 10, flexDirection: 'row' }}>
                        <View style={{ borderColor: '#fff', borderRightWidth: 1, width: '50%', height: height * 0.12 }}>
                          <View style={{ marginLeft: 10, marginTop: 8 }}>
                            <Feather name='check-circle' size={40} color='#feebc0' />
                            <Text style={{ color: '#feebc0', fontSize: 16, fontFamily: 'Inter-Bold', marginLeft: 3 }}>1826</Text>
                            <Text style={{ color: '#feebc0', fontFamily: 'Inter-Regular', marginTop: -3, marginLeft: 3 }}>Total Count</Text>
                          </View>
                        </View>
                        <View style={{ width: '50%', height: height * 0.12 }}>
                          <View style={{ marginLeft: 20, marginTop: 8 }}>
                            <Feather name='target' size={40} color='#feebc0' />
                            <Text style={{ color: '#feebc0', fontSize: 16, fontFamily: 'Inter-Bold', marginLeft: 3 }}>{results.usage_count}</Text>
                            <Text style={{ color: '#feebc0', fontFamily: 'Inter-Regular', marginTop: -3, marginLeft: 3 }}>Your Count</Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 21, color: '#feebc0' }}>Description</Text>
                        <Text style={{ fontSize: 16.5, marginVertical: 10, color: '#feebc0' }}>
                          {results.mantra_description}
                        </Text>
                        <View style={{ height: height * 0.11 }} />
                      </View> 
                    </>
              }

            </ScrollView>
            : <Loading />
      }

      <View style={{ position: 'absolute', bottom: 25, width: '80%', flexDirection: 'row', justifyContent: 'space-around', height: height * 0.12, alignSelf: 'center', }}>
        <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.push('MantraJaapScreen', item)}>
          <View style={{ backgroundColor: '#fefdf9', width: '90%', height: '60%', alignItems: 'center', justifyContent: 'center', borderRadius: 30, flexDirection: 'row' }}>
            <Image source={require('../../assets/mala.png')} style={{ width: 45, height: 45 }} />
            <Text style={{ color: '#fe7200', fontSize: 20, fontWeight: 'bold', marginHorizontal: 10 }}>Start Japa</Text>
          </View>
        </Pressable>
      </View>
    </LinearGradient>

  )
}

export default StartMantraScreen

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
})

