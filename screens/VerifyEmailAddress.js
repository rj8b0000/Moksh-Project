import React,{useContext, useEffect, useRef, useState} from "react";
import { Text, StyleSheet, View, TextInput,Pressable, Alert, ScrollView, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { FontFamily, Padding, Border, FontSize, Color } from "../GlobalStyles";
import { getAuth, sendEmailVerification, emailVerified } from "firebase/auth";
import { useNavigation,StackActions } from "@react-navigation/native";
import { ProgressBar } from "@react-native-community/progress-bar-android";
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from "@react-native-async-storage/async-storage";



const VerifyEmailAddress = () => {
  const navigation = useNavigation()
  const [email,setEmail] = useState('')
  const [emailVerified, setEmailVerified] = useState(false);
  const [progressBarVisible, setProgressBarVisible] = React.useState(false)
  const [progress, setProgress] = React.useState(0);
  const auth = getAuth()
  // const {user, setUser} = useContext(auth.currentUser)


  const scrollViewRef = useRef(null);
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };
  const progressProps = {
    styleAttr : "Horizontal",
    indeterminate: true,
    color: '#b33939',
    height: 50,
    width: '90%',
    marginHorizontal: 10,
    // flex: 1,
    alignItems: 'center',
    borderRadius: 10,
  }
  const loaderFunction = () => {
    function updateProgress() {
      setProgress((currentProgress) => {
        if (currentProgress < 1) {
          setTimeout(updateProgress, 500)
        };
        return currentProgress + 0.01;
      })
    };
    updateProgress();
  }

  const onVerifyEmail = async () => {
    // console.warn("Clicked")
    try{
        loaderFunction();
        await sendEmailVerification(auth.currentUser)
        .then(()=>{
            navigation.navigate("SignInForNewUser")
          })
          // else{
          //   alert("Please Verify your email, checkout inbox")
          //   // sendEmailVerification(auth.currentUser)
          // }
        // })
        // navigation.navigate("SignInEmptyState")
        // alert("Please verify your email, checkout link in your inbox")
    }

    catch(error){
      console.log(error)
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} style={{flex: 1}} onContentSizeChange={scrollToBottom}>
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1}}>
        <View style={styles.bckbtnView}>
          <TouchableOpacity style={styles.back_icon} onPress={() => navigation.goBack()}>
            <Feather name='arrow-left' size={25} color='white' />
          </TouchableOpacity>
        </View>
        <View style={[styles.imgView]}>
          <Image source={require('../assets/maharaj-hand-img.png')} />
        </View>
      </SafeAreaView>
      <View style={styles.loginView}>
        <View style={styles.loginForm}>
          {
            progressBarVisible ? 
                  <View>
                  <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
                  <ProgressBar {...progressProps} progress={progress}/>
                  </View>
                :null
          }

          <Text style={{ color: 'grey', fontWeight: 'bold', marginTop: 10, fontSize: 18 }}>We would send you logic link on entered E-mail</Text>
        
          <View style={styles.emailInboxImg}>
              <Image source={require('../assets/mail_img.png')} style={{width: 200, height: 200}}/>
            </View>
          <TouchableOpacity style={{ paddingVertical: 15, backgroundColor: '#910E10', borderRadius: 10, marginVertical: 20 }}
          onPress={()=>onVerifyEmail()}
          >
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center'}}>Verify Email</Text>
          </TouchableOpacity>

          
        </View>
      </View>
      </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 100,
    alignSelf: 'center',
    color: '#910E10',
  },
  otpView: {
    // width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 100,
  },
  inputView: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    marginLeft: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  verifyOTPButton: {
    width: 320,
    height: 55,
    backgroundColor: 'grey',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  resendView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  pressableSpaceBlock: {
    paddingVertical: Padding.p_5xs,
    borderRadius: Border.br_xs,
  },
  textTypo1: {
    fontWeight: '500',
    color: Color.textBlack,
  },
  topBarPosition: {
    left: 0,
    position: 'absolute',
  },
  textLayout: {
    lineHeight: 22,
    fontSize: FontSize.bodyLargeBold_size,
    letterSpacing: 0,
  },
  iconPosition: {
    top: '50%',
    position: 'absolute',
  },
  columnFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textTypo: {
    textAlign: 'center',
    fontFamily: FontFamily.bodyLargeBold,
  },
  numberitemFlexBox: {
    padding: Padding.p_5xs,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: Border.br_xs,
    flex: 1,
    backgroundColor: Color.background,
  },
  titlePhone: {
    lineHeight: 29,
    color: '#9E0E10',
    letterSpacing: 0,
    textAlign: 'left',
    fontWeight: '700',
    fontSize: 25,
    alignSelf: 'stretch',
  },
  wereGoingTo: {
    marginBottom: 20,
  },
  body: {
    color: '#9E0E10',
    fontSize: 18,
    textAlign: 'left',
  },
  titleBody: {
    width: 334,
  },
  inputFieldsChild: {
    width: 16,
    height: 16,
    zIndex: 0,
  },
  text: {
    zIndex: 1,
    marginLeft: 12,
    lineHeight: 20,
    fontSize: FontSize.bodyMediumRegular_size,
    textAlign: 'left',
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
  },
  inputFieldsItem: {
    top: 20,
    left: 214,
    borderColor: Color.textBlack,
    borderRightWidth: 1,
    width: 1,
    height: 17,
    zIndex: 2,
    borderStyle: 'solid',
    position: 'absolute',
  },
  inputFields: {
    borderColor: '#1DAC92',
    borderWidth: 2,
    // width: 334,
    marginTop: 40,
    // flexDirection: 'row',
    // alignItems: 'center',
    height: 56,
    borderStyle: 'solid',
    borderRadius: Border.br_xs,
    color: 'black'
  },
  content: {
    marginTop: "30%",
    marginLeft: 20,
    position: 'absolute',
    flex: 1,
  },
  text1: {
    marginTop: -11,
    left: 23,
    top: '50%',
    position: 'absolute',
    fontWeight: '500',
    color: Color.textBlack,
    textAlign: 'left',
    fontFamily: FontFamily.bodyLargeBold,
    lineHeight: 22,
    fontSize: FontSize.bodyLargeBold_size,
  },
  mobileSignalIcon: {
    marginTop: -1.5,
    right: 76,
    width: 18,
    height: 10,
  },
  wifiIcon: {
    marginTop: -3,
    right: 56,
    width: 15,
    height: 11,
  },
  batteryIcon: {
    marginTop: -4,
    right: 23,
    width: 27,
    height: 13,
  },
  topBar1: {
    height: 44,
    width: 375,
  },
  appbarIcon: {
    width: 375,
    height: 56,
    overflow: 'hidden',
  },
  topBar: {
    top: 0,
  },
  buttonText: {
    color: Color.background,
    lineHeight: 22,
    fontSize: FontSize.bodyLargeBold_size,
    letterSpacing: 0,
    fontWeight: '700',
    textAlign: 'center',
  },
  pressable: {
    height: 60,
    backgroundColor: '#910E10',
    borderRadius: Border.br_xs,
    justifyContent: 'center',
    width: '100%',
    marginLeft: -7,
  },
  buttons: {
    height: 60,
    width: 334,
    borderRadius: 12,
  },
  bottomButton: {
    padding: Padding.p_5xl,
    width: 375,
  },
  text2: {
    fontWeight: '500',
    color: Color.textBlack,
    textAlign: 'center',
    fontSize: FontSize.h4Bold_size,
  },
  numberitem1: {
    marginLeft: 8,
  },
  column: {
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  column1: {
    marginTop: 8,
    alignSelf: 'stretch',
  },
  frameIcon: {
    width: 28,
    height: 28,
    overflow: 'hidden',
  },
  keyboardnumber: {
    padding: Padding.p_xs,
    width: 375,
    alignItems: 'center',
  },
  homeIndicatorChild: {
    marginLeft: -66.5,
    bottom: 9,
    left: '50%',
    borderRadius: Border.br_81xl,
    backgroundColor: Color.grayscale800,
    width: 134,
    height: 5,
    display: 'none',
    position: 'absolute',
  },
  homeIndicator: {
    height: 34,
    width: 375,
  },
  keyboard: {
    backgroundColor: Color.stroke,
  },
  buttonKeyboard: {
    top: 340,
    alignItems: 'center',
  },
  verifyPhoneNumber: {
    height: 812,
    overflow: 'hidden',
    width: '100%',
    flex: 1,
    backgroundColor: '#ff9f1a',

  },
  emailInboxImg:{
    flex: 1,
    marginVertical: 40,
    alignItems: 'center'

  },
  progressText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#ff9f1a',
    flexDirection: 'column'
  },
  bckbtnView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  back_icon: {
    backgroundColor: '#b33939',
    padding: 10,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    marginLeft: 20,
    marginTop: 20,
  },
  imgView: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 35,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 10,
  },
  loginForm: {
    marginHorizontal: 20,
  },
  emailInput: {
    padding: 10,
    backgroundColor: '#dfe4ea',
    borderRadius: 10,
    marginTop: 10,
  },
  passInput: {
    padding: 10,
    backgroundColor: '#dfe4ea',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginTop: 10,
    width: '90%',
    flex: 1,
  },
  eyeOffIcon: {
    width: 25,
    height: 25,
    alignItems: 'center',
  },
  centerView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90
    // zIndex: -1,
  },
  modalView: {
    backgroundColor: '#FFFEEE',
    padding: 40,
    borderRadius: 20,
    shadowColor: 'black',
    elevation: 5,
    alignItems: 'center',
  },
  progress: {
    // width: '90%',
    alignItems: 'center',
    // height: 20,

  },
  progressText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  phnInputBox:{
    marginVertical: 20,
    width: '96%',
    height: 100,

  },
});

export default VerifyEmailAddress;
