import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  Button,
  TouchableOpacityBase,
  ActivityIndicator,
  Alert,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { FontFamily, Padding, Border, Color, FontSize } from '../../GlobalStyles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PhoneInput from 'react-native-phone-number-input';
import auth from '@react-native-firebase/auth';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { OtpInput } from 'react-native-otp-entry';
import Loading from '../common/ProgressBar';
import * as Progress from 'react-native-progress';

const { width, height } = Dimensions.get('window')
const VerifyPhoneNumber = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = React.useState(false);
  const [showIndicator, setShowIndicatior] = React.useState(false)
  const phoneInput = useRef(null);
  const [formattedValue, setFormattedValue] = useState(0);
  const [progressBarVisible, setProgressBarVisible] = React.useState(false)
  const [progressBarVisibleForOTP, setProgressBarVisibleForOTP] = React.useState(false)
  const [progress, setProgress] = React.useState(0);
  const [progressForOtpInput, setProgressForOtpInput] = React.useState(0);
  const [disableVerifyPhnBtn, setDisableVerifyPhnBtn] = React.useState(false);
  const [otp, setOtp] = React.useState(0);


  const scrollViewRef = useRef(null);
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };
  const progressProps = {
    styleAttr: "Horizontal",
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
  const loaderFunctionForOtpInput = () => {
    function updateProgress() {
      setProgressForOtpInput((currentProgress) => {
        if (currentProgress < 0.8) {
          setTimeout(updateProgress, 1000)
        };
        return currentProgress + 0.1;
      })
    };
    updateProgress();
  }
  const signInWithPhoneNumber = async () => {
    if (formattedValue.length > 10) {
      console.log(formattedValue)
      // setDisableVerifyPhnBtn(true);
      // loaderFunction();
      setProgressBarVisible(true)
      try {
        const confirmation = await auth().signInWithPhoneNumber(formattedValue);
        setConfirm(confirmation);
      } catch (error) {
        if (error.code == "auth/too-many-requests") {
          Alert.alert("You have requested service for many times. Please try after some time")
          setProgressBarVisible(false)
          setProgress(null)
        }
        else if (error.code == "auth/captcha-check-failed") {
          Alert.alert("Please reCaptcha again")
          setProgressBarVisible(false)
          setProgress(null)
        }
        else {
          Alert.alert("An Unkwon Error occured! Please Try again later")
          setProgressBarVisible(false)
          setProgress(null)
          console.log(error)
        }
      }
    }
    else {
      Alert.alert("Enter a valid phone number")
    }



    // console.log(formattedValue)
  };
  const et1 = useRef();
  const et2 = useRef();
  const et3 = useRef();
  const et4 = useRef();
  const et5 = useRef();
  const et6 = useRef();
  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [f3, setF3] = useState('');
  const [f4, setF4] = useState('');
  const [f5, setF5] = useState('');
  const [f6, setF6] = useState('');
  const [count, setCount] = useState(60);
  useEffect(() => {
    const interval = setInterval(() => {
      if (count == 0) {
        clearInterval(interval);
      } else {
        setCount(count - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [count]);
  const onPressVerifyOTP = async () => {
    if (otp) {
      loaderFunctionForOtpInput();
      setProgressBarVisible(true)
      try {
        await confirm.confirm(otp).then(() => {
          AsyncStorage.removeItem('PRE-USR-EMAIL');
          navigation.dispatch(StackActions.replace('LoginScreen'));
          console.log(error.code)
        });
      } catch (error) {
        if (error.code == "auth/invalid-verification-code") {
          Alert.alert("You have entered an invalid otp")
          setProgressBarVisible(false)
          console.log(error.code)
          setProgress(0)
        }
        else if (error.code == "auth/session-expired") {
          Alert.alert("OTP Expired...Please Retry")
          setProgressBarVisible(false)
          console.log(error.code)
          setProgress(0)
        }
        else {
          console.log(error)
          setProgressBarVisible(false)

        }
      }
    }
    else {
      Alert.alert("Enter a valid 6-digit OTP")
    }
  };
  return (

    <KeyboardAvoidingView style={{ flex: 1 }} >

      {!confirm ? (
        <>
          {/* <KeyboardAvoidingView> */}
          <LinearGradient colors={['#f0ba2c', '#f9af0c', '#ffa901']} style={styles.linearGradient}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ marginVertical: 10 }}>
                <Image source={require('../../assets/phone_logo.jpg')} style={{ width: 70, height: 70 }} />
              </View>
              <Text style={{ color: 'black', fontSize: 22, fontFamily: 'Inter-Regular' }}>Enter your phone number</Text>

              <View style={styles.phnInputBox}>
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={phoneNumber}
                  defaultCode="IN"
                  layout="first"
                  onChangeText={(text) => {
                    setPhoneNumber(text);
                  }}
                  onChangeFormattedText={(text) => {
                    setFormattedValue(text);
                  }}
                  onPress={() => console.warn("Hii")}
                  containerStyle={{ width: "100%", height: 70, borderRadius: 5, elevation: 100, backgroundColor: '#910E10' }}
                  textContainerStyle={{ borderTopRightRadius: 5, borderBottomRightRadius: 5, paddingTop: 10, backgroundColor: '#fab92b', }}
                  autoFocus
                  placeholder='Phone Number'
                  withDarkTheme
                />

              </View>
              {

                // disableVerifyPhnBtn == false ?
                <View style={{ width: '90%', alignSelf: 'center' }}>
                  <TouchableOpacity style={{ backgroundColor: '#fefffe', justifyContent: 'center', alignItems: 'center', height: 45, width: '100%', borderRadius: 5 }} onPress={() => signInWithPhoneNumber()}>
                    <Text style={{ fontSize: 20, color: '#fa8526', fontWeight: 'bold' }}>Verify OTP</Text>
                  </TouchableOpacity>
                  {
                    progressBarVisible ? 
                    <View style={styles.loader}>
                      <Progress.CircleSnail thickness={5} size={100} color={'#1C8D5A'} />
                    </View>: null
                  }
                  
                </View>


                // :
                // <Pressable style={{ backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', height: 45, width: '100%', borderRadius: 5 }}
                // >
                //   <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Verify OTP</Text>
                // </Pressable>

              }
            </View>

          </LinearGradient>
        </>

      ) : (
        <>
          <LinearGradient colors={['#f0ba2c', '#f9af0c', '#ff9e01']} style={styles.linearGradient}>
            <ScrollView style={{ flex: 1, marginTop: height * 0.12 }} showsVerticalScrollIndicator={false}>
              <View style={{ width: '100%', marginBottom: '5%' }}>
                <Text style={{ color: 'black', fontFamily: 'Inter-SemiBold', fontSize: 22 }}>Verification code</Text>
                <Text style={{ color: 'black', fontFamily: 'Inter-Regular', fontSize: 15 }}>We have sent the code verification to <Text style={{ fontFamily: 'Inter-SemiBold' }}>{formattedValue}</Text>. </Text>
              </View>
              <Image source={require('../../assets/otp_img.png')} style={{ width: width * 0.9, height: height * 0.22 }} />
              <OtpInput
                numberOfDigits={6}
                focusColor="#000"
                focusStickBlinkingDuration={500}
                onFilled={(text) => setOtp(text)}
                theme={{
                  pinCodeTextStyle: styles.pincodeText,
                  containerStyle: styles.containerStyles,
                  inputsContainerStyle: styles.inputsContainer,
                  pinCodeContainerStyle: styles.pinCodeContainer,
                }}
              />
              {
                progressBarVisible ? <Loading /> : null
              }
              <TouchableOpacity
                onPress={() => onPressVerifyOTP()}
                style={{
                  width: '90%',
                  height: 60,
                  backgroundColor: '#fefffe',
                  borderRadius: 10,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontFamily: 'Inter-Bold', color: '#ff9e01', fontSize: 20 }}>Verify OTP</Text>
              </TouchableOpacity>
            </ScrollView>
          </LinearGradient>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loader: {
    // marginTop: '10%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 2,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
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
    width: '90%',
    height: 60,
    backgroundColor: 'grey',
    borderRadius: 20,
    alignSelf: 'center',
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
  phnInputBox: {
    marginVertical: 45,
    width: '96%',
    height: 100,

  },

  pincodeText: {
    color: '#000'
  },
  inputsContainer: {
    marginVertical: height * 0.1,
  },
  pinCodeContainer: {
    height: 60,
    width: 50,
    borderWidth: 2,
    borderColor: '#000'
  },
  containerStyles: {
    color: 'black',
  }

});


export default VerifyPhoneNumber;
