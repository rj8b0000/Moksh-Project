import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Dimensions, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
const MokshHome = () => {
    const navigation = useNavigation();
  return (
    <>
    <ScrollView style = {styles.infoScrollView} showsVerticalScrollIndicator={false}>
      <View style={{flex: 1}}>
      <View>
        <ImageBackground source={require('../../assets/sunsetImg.jpg')} resizeMode='cover' style={{flex:1,justifyContent: 'center', width: '100%', height: height * 0.4}}>
        <View>
            <Text style={{color: '#fff', fontSize: 25, textAlign : 'center', fontFamily : 'Inter-Regular'}}>Welcome To Moksh</Text>
            <View>
            <Text style={{color: '#fff', fontSize: 15, textAlign : 'center', fontFamily : 'Inter-Regular', marginTop: 10}}>Create an account to start using the Japa</Text>
            <Text style={{color: '#fff', fontSize: 15, textAlign : 'center', fontFamily : 'Inter-Regular'}}>counter and track your chanting</Text>
            <Text style={{color: '#fff', fontSize: 15, textAlign : 'center', fontFamily : 'Inter-Regular'}}>It's free, just for you, foreever</Text>
            </View>
        </View>
        </ImageBackground>
      </View>
      <View style = {styles.postiveHabitView}>
          <View style={styles.textAndImgView}>
              <Text style={{fontFamily: 'Inter-Regular', color: '#2f3640', textAlign: 'center', fontSize: 23}}>Build A Positive Habit</Text>
              <Image source={require('../../assets/positiveHabitIcon.png')} style={{height: 100, width: 100, marginTop: '10%', marginBottom: '5%'}}/>
              <Text style={{fontFamily: 'Inter-Regular', color: 'grey', textAlign: 'center', fontSize: 15}}>Japa = Repetation</Text>
              <Text style={{fontFamily: 'Inter-Regular', color: 'grey', textAlign: 'center', fontSize: 15}}>Repetation + Tracking = Habit</Text>
              <Text style={{fontFamily: 'Inter-Regular', color: 'grey', textAlign: 'center', fontSize: 15}}>Japa = Repetation</Text>
              <View style={{width: '70%', borderWidth: 1, marginTop: '10%', borderColor: 'grey'}}/>
          </View>
      </View>
      <View style = {styles.powerofRepetativeMantrasView}>
          <View style={styles.textAndImgView}>
              <Text style={{fontFamily: 'Inter-Regular', color: '#2f3640', textAlign: 'center', fontSize: 23}}>The Power of Repetive Mantras</Text>
              <Image source={require('../../assets/electricIcon.png')} style={{height: 100, width: 100, marginTop: '10%', marginBottom: '5%'}}/>
              <Text style={{fontFamily: 'Inter-Regular', color: 'grey', textAlign: 'center', fontSize: 15}}>Mantra's bring the mind to the present moment and help it enter a meditative state, choose from our list or chant your own.</Text>
            <View style={{width: '70%', borderWidth: 1, marginTop: '10%', borderColor: 'grey'}}/>
          </View>
      </View>
      <View style = {styles.trackYourProgressView}>
          <View style={styles.textAndImgView}>
              <Text style={{fontFamily: 'Inter-Regular', color: '#2f3640', textAlign: 'center', fontSize: 23}}>Track your Progress</Text>
              <Image source={require('../../assets/graph.png')} style={{height: 100, width: 100, marginTop: '10%', marginBottom: '5%'}}/>
              <Text style={{fontFamily: 'Inter-Regular', color: 'grey', textAlign: 'center', fontSize: 15}}>See your Japa Current streak, your insightful stats and find the perfect mantra for you to chant</Text>
            <View style={{width: '70%', borderWidth: 1, marginTop: '10%', borderColor: 'grey'}}/>
          </View>
      </View>
      <View style = {styles.jaapCommunityView}>
          <View style={styles.textAndImgViewOfJaapCommunityView}>
              <Text style={{fontFamily: 'Inter-Regular', color: '#2f3640', textAlign: 'center', fontSize: 23}}>The Jaap 108 Community</Text>
              <Image source={require('../../assets/globe.png')} style={{height: 100, width: 100, marginTop: '10%', marginBottom: '5%'}}/>
              <Text style={{fontFamily: 'Inter-Regular', color: 'grey', textAlign: 'center', fontSize: 15}}>View a real-time feed of mantras being chanted and a leaderboard of the top Japa 108 chanters of the week.</Text>
          </View>
      </View>
      <View style = {styles.jaapCommunityView}>
      <View style={{width: '70%', borderWidth: 1,marginBottom: height*0.1, borderColor: 'grey'}}/>
      </View>
      </View>
      
    </ScrollView>
    <LinearGradient
          colors={['transparent', '#fff',]}
          style={{ width: '100%', height: height * 0.2, position: 'absolute', bottom: 0 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
    <View style={{ position: 'absolute', bottom: 25, width: '90%', flexDirection: 'row', justifyContent: 'space-around', height: height * 0.1, alignSelf: 'center',}}>
        <Pressable style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={() => navigation.navigate('LoginScreen')}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#8e2ac2', '#5f43cb']}  style={{backgroundColor: '#8532cb', width: '90%', height: '60%', alignItems: 'center',justifyContent: 'center',borderRadius: 5}}>
          <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Login</Text>
        </LinearGradient>
        </Pressable>
        <Pressable style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={() => navigation.navigate('SignUpScreen')}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#fe6f01', '#fe9500']}  style={{backgroundColor: '#8532cb', width: '90%', height: '60%', alignItems: 'center',justifyContent: 'center',borderRadius: 5}}>
          <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Getting Started</Text>
        </LinearGradient>
        </Pressable>
        
      </View>
      
    </>
  );
}

export default MokshHome;

const styles = StyleSheet.create({
  infoScrollView:{
    flex: 1,
    backgroundColor: '#fff'
  },
  postiveHabitView: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    // height: height * 0.4,
    backgroundColor: '#fff',
    // top : 10
  },
  textAndImgView:{
    // flex: 1,
    alignItems: 'center',
    // margin: 10,
    width: "95%",
    // borderWidth: 1,
    padding: '10%',

    // height: 200
  },
  powerofRepetativeMantrasView:{
    flex: 1,
    alignItems: 'center',
    width: '100%',
    // height: height * 0.4,
    backgroundColor: '#fff',
    // marginBottom: '20%'
  },
  trackYourProgressView:{
    flex: 1,
    alignItems: 'center',
    width: '100%',
    // height: height * 0.4,
    backgroundColor: '#fff',
    // marginBottom: '20%'
  },
  jaapCommunityView: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    bottom: height * 0.04

  },
  textAndImgViewOfJaapCommunityView:{
    alignItems: 'center',
    // margin: 10,
    width: "95%",
    // borderWidth: 1,
    padding: '10%',
  }
})