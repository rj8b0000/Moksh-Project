/* eslint-disable prettier/prettier */
import {Dimensions, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import { meditating_boy } from '../common/AllImages';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Sound from 'react-native-sound';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';


const {width, height} = Dimensions.get('window');
const RegularJaapDone = () => {
  const ref = useRef();
  const route = useRoute();
  const [imageUri, setImageUri] = useState('')
  // const { count } = route.params;/
  // const { totalJaap } = route.params;
  const { countAndJaap, formattedTime,checkBox1 } = route.params;
  // const totalCounts = countAndJaap.count * countAndJaap.jaap
  const navigation = useNavigation();
  const date = new Date(); // get the current date
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  useEffect(() => {
    ref.current.capture().then(uri => {
      console.log("do something with ", uri);
      setImageUri(uri)
    });
    return () => {
      bell.release();
    };
  }, []);
  var bell = new Sound('bell_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // if loaded successfully
    console.log('duration in seconds: ' + bell.getDuration() + 'number of channels: ' + bell.getNumberOfChannels());
  });
  useEffect(() => {
    setTimeout(() => {
      if(checkBox1 == true)
      {
        bell.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }
      else if(checkBox1 == false)
      {
        Vibration.vibrate(700)
      }
    },100)
  },[])
  const onShareHandler = () => {
    const options  = {
      url : imageUri,
      message : `I am using Moksh app and i am experiencing the powerful effect of repetitive matra jaaps. I have successfully done ${countAndJaap.jaap} counts, You can check out for here - https://bugle.in/`,
    };
    Share.open(options)
  }


  const jaapAgainHandler = () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
    navigation.dispatch(resetAction);
  }
  return (
    <ViewShot ref={ref} style={{width: width, height: height}}
    options={{ fileName: "Jaap_complete", format: "jpg", quality: 0.9 }}
    >
<LinearGradient colors={['#eebb32', '#ec9f33', '#e96d2e']} style={styles.linearGradient}>
      <View style={{
          marginHorizontal: 17, marginVertical: 30,
          flexDirection: 'row',
          justifyContent: 'flex-end',
      }}>
        <Pressable onPress={() => onShareHandler()}>
          <Entypo name='share' size={25} color='#fff'/>
        </Pressable>
      </View>
      <View style={{width: 150, height: 150, borderRadius: 10, alignSelf: 'center', marginTop : height * 0.01}}>
        <Image source={require('../../../assets/mala.png')} style={{width: 150, height: 150, borderRadius: 10}}/>
      </View>
      <View style={{marginHorizontal: 10, alignSelf: 'center'}}>
        <View style={{marginTop: '10%'}}>
            <Text style={{fontFamily: 'Inter-SemiBold', fontSize: 27, color: '#fffefe', textAlign: 'center'}}>{countAndJaap.jaap} Count Completed</Text>
            {/* <Text style={{fontFamily: 'Inter-Regular', fontSize: 20, color:'#feebc0', textAlign: 'center'}}>{item.title}</Text> */}
        </View>
      </View>
      <View style={{width: '100%', height: height * 0.15, marginTop: 20, flexDirection: 'row'}}>
        <View style={{borderColor: '#fff', borderRightWidth: 1, width: '50%', height: height * 0.12, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{marginLeft: 10, marginTop: 8}}>
                <Feather name='watch' size={40}  color='#feebc0'/>
                <Text style={{color: '#feebc0', fontSize: 16, fontFamily: 'Inter-Bold', marginLeft: 3, marginVertical: 3}}>Time Taken</Text>
                <Text style={{color: '#feebc0', fontFamily: 'Inter-Regular', marginTop: -3, marginLeft: 3}}>{formattedTime}</Text>
            </View>
        </View>
        <View style={{width: '50%', height: height * 0.12}}>
            <View style={{marginLeft: 20, marginTop: 8, justifyContent: 'center', alignItems: 'center'}}>
                <Fontisto name='date' size={40}  color='#feebc0'/>
                <Text style={{color: '#feebc0', fontSize: 16, fontFamily: 'Inter-Bold', marginLeft: 3,marginVertical: 3}}>Date</Text>
                <Text style={{color: '#feebc0', fontFamily: 'Inter-Regular', marginTop: -3, marginLeft: 3}}>{formattedDate}</Text>
            </View>
        </View>
      </View>
      <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-around', height: height * 0.12, alignSelf: 'center', marginTop: '15%'}}>
        <Pressable style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={() => jaapAgainHandler()}>
        <View style={{backgroundColor: '#fefdf9', width: '90%', height: '60%', alignItems: 'center',justifyContent: 'center',borderRadius: 30, flexDirection: 'row'}}>
          {/* <Image source={require('../../assets/mala.png') } style={{width: 45, height: 45}}/> */}
          <Text style={{color: '#fe7200', fontSize: 20, fontWeight: 'bold', marginHorizontal: 10}}>Done</Text>
        </View>
        </Pressable>
      </View>
    </LinearGradient>
    </ViewShot>
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#FFF9A1',
    //   }}>
    //   <View>
    //     <Image
    //       source={meditating_boy}
    //       style={{width: 300, height: 300}}
    //     />
    //   </View>
    //   <View>
    //     <Text style={{color: 'black', fontSize: 30, fontWeight: 'bold'}}>
    //       Meditation Complete
    //     </Text>
    //   </View>
    //   <View style={{marginTop: 10}}>
    //     <Text
    //       style={{
    //         color: 'indigo',
    //         fontSize: 20,
    //         textDecorationLine: 'underline',
    //       }}
    //       onPress={() => navigation.navigate('StartMantra')}>
    //       Jaap Again!
    //     </Text>
    //   </View>
    // </View>
  );
};

export default RegularJaapDone;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
});
