import React, {useState, useEffect, useRef} from 'react';
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
  KeyboardAvoidingView
} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import {FontFamily, Padding, Border, Color, FontSize} from '../GlobalStyles';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PhoneInput from 'react-native-phone-number-input';
import auth from '@react-native-firebase/auth';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifyPhoneNumber = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = React.useState(null);
  const [showIndicator, setShowIndicatior] = React.useState(false)
  const phoneInput = useRef(null);
  const [formattedValue, setFormattedValue] = useState("");
  const [progressBarVisible, setProgressBarVisible] = React.useState(false)
  const [progressBarVisibleForOTP, setProgressBarVisibleForOTP] = React.useState(false)
  const [progress, setProgress] = React.useState(0);
  const [progressForOtpInput, setProgressForOtpInput] = React.useState(0);
  const [disableVerifyPhnBtn, setDisableVerifyPhnBtn] = React.useState(false);


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
      if(formattedValue.length > 10)
      {
        setDisableVerifyPhnBtn(true);
        loaderFunction();
        setProgressBarVisible(true)
        try {
          const confirmation = await auth().signInWithPhoneNumber(formattedValue);
          setConfirm(confirmation);
        } catch (error) {
          if(error.code == "auth/too-many-requests")
          {
            Alert.alert("You have requested service for many times. Please try after some time")
            setProgressBarVisible(false)
            setProgress(null)
          }
          else if(error.code == "auth/captcha-check-failed"){
            Alert.alert("Please reCaptcha again")
            setProgressBarVisible(false)
            setProgress(null)
          }
          else
          {
            Alert.alert("An Unkwon Error occured! Please Try again later")
            setProgressBarVisible(false)
            setProgress(null)
          }
        }
      }
      else
      {
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
    const otp = f1 + f2 + f3 + f4 + f5 + f6;
    if(otp.length == 6)
    {
      loaderFunctionForOtpInput();
      setProgressBarVisibleForOTP(true)
      try {
        await confirm.confirm(otp).then(() => {
         AsyncStorage.removeItem('PRE-USR-EMAIL');
          navigation.dispatch(StackActions.replace('LoginScreen'));
        });
      } catch (error) {
        if(error.code == "auth/invalid-verification-code")
        {
          Alert.alert("You have entered an invalid otp")
          setProgressBarVisible(false)
          setProgress(0)
        }
        else if(error.code == "auth/session-expired")
        {
          Alert.alert("OTP Expired...Please Retry")
          setProgressBarVisible(false)
          setProgress(0)
        }
        else if(error.code == "auth/unknown")
        {
          Alert.alert("An unknown error occured. Please try again later")
          setProgressBarVisible(false)
          setProgress(0)
        }
      }
    }
    else
    {
      Alert.alert("Enter a valid 6-digit OTP")
    }    
  };
  return (

    <KeyboardAvoidingView style={{flex: 1}} >
      
      {!confirm ? (
        <>
        {/* <KeyboardAvoidingView> */}
  <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} style={{flex: 1}}>
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
          <Text style={{ color: 'grey', fontWeight: 'bold', marginTop: 10, fontSize: 18 }}>Enter your phone number</Text>
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
                onPress={()=>console.warn("Hii")}
                containerStyle={{width: "100%", height: 70, borderRadius: 10,elevation: 100, backgroundColor: '#b33939'}}
                textContainerStyle={{borderRadius: 10, paddingTop: 10, backgroundColor: '#ff9f1a',}}
                autoFocus
                placeholder='Phone Number'
                withDarkTheme
              />
            </View>
            {
              disableVerifyPhnBtn == false ? 
          <TouchableOpacity style={{ paddingVertical: 15, backgroundColor: '#910E10', borderRadius: 10, marginVertical: 20 }}
          onPress={()=>signInWithPhoneNumber()}
          >
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center'}}>Verify OTP</Text>
          </TouchableOpacity>: 
          <Pressable style={{ paddingVertical: 15, backgroundColor: 'grey', borderRadius: 10, marginVertical: 20 }}
          >
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center'}}>Verify OTP</Text>
          </Pressable>

            }
          
        </View>
      </View>
      </View>
  </ScrollView>
  {/* </KeyboardAvoidingView> */}
        </>

      ) : (
        <>
          <View style={styles.container}>
            <Text style={styles.title}>OTP Verification</Text>
            <GestureHandlerRootView style={[styles.otpView]}>
              <View></View>
              <TextInput
                ref={et1}
                value={f1}
                style={[
                  styles.inputView,
                  {borderColor: f1.length >= 1 ? '#910E10' : '#000'},
                  {color: f1.length >= 1 ? '#910E10' : '#000'},
                ]}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={txt => {
                  setF1(txt);
                  if (txt.length >= 1) {
                    et2.current.focus();
                  } else if (txt.length < 1) {
                    et1.current.focus();
                  }
                }}
              />

              <TextInput
                ref={et2}
                style={[
                  styles.inputView,
                  {borderColor: f2.length >= 1 ? '#910E10' : '#000'},
                  {color: f1.length >= 1 ? '#910E10' : '#000'},
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={f2}
                onChangeText={txt => {
                  setF2(txt);
                  if (txt.length >= 1) {
                    et3.current.focus();
                  } else if (txt.length < 1) {
                    et1.current.focus();
                  }
                }}
              />

              <TextInput
                ref={et3}
                style={[
                  styles.inputView,
                  {borderColor: f3.length >= 1 ? '#910E10' : '#000'},
                  {color: f1.length >= 1 ? '#910E10' : '#000'},
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={f3}
                onChangeText={txt => {
                  setF3(txt);
                  if (txt.length >= 1) {
                    et4.current.focus();
                  } else if (txt.length < 1) {
                    et2.current.focus();
                  }
                }}
              />
              <TextInput
                ref={et4}
                style={[
                  styles.inputView,
                  {borderColor: f4.length >= 1 ? '#910E10' : '#000'},
                  {color: f1.length >= 1 ? '#910E10' : '#000'},
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={f4}
                onChangeText={txt => {
                  setF4(txt);
                  if (txt.length >= 1) {
                    et5.current.focus();
                  } else if (txt.length < 1) {
                    et3.current.focus();
                  }
                }}
              />
              <TextInput
                ref={et5}
                style={[
                  styles.inputView,
                  {borderColor: f5.length >= 1 ? '#910E10' : '#000'},
                  {color: f1.length >= 1 ? '#910E10' : '#000'},
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={f5}
                onChangeText={txt => {
                  setF5(txt);
                  if (txt.length >= 1) {
                    et6.current.focus();
                  } else if (txt.length < 1) {
                    et4.current.focus();
                  }
                }}
              />
              <TextInput
                ref={et6}
                style={[
                  styles.inputView,
                  {borderColor: f6.length >= 1 ? '#910E10' : '#000'},
                  {color: f1.length >= 1 ? '#910E10' : '#000'},
                ]}
                keyboardType="number-pad"
                value={f6}
                maxLength={1}
                onChangeText={txt => {
                  setF6(txt);
                  if (txt.length < 1) {
                    et5.current.focus();
                  }
                }}
              />
            </GestureHandlerRootView>
            <GestureHandlerRootView style={[styles.resendView]}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: count == 0 ? '#910E10' : 'black',
                }}
                onPress={() => {
                  setCount(60);
                }}>
                Resend
              </Text>
              {count !== 0 && (
                <Text style={{marginLeft: 20, fontSize: 20}}>
                  {' ' + count + ' seconds'}
                </Text>
              )}
            </GestureHandlerRootView>
            {
              progressBarVisibleForOTP ? 
                    <View>
                    <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
                    <ProgressBar {...progressProps} progress={progress}/>
                    </View>
                  :null
            }
            <TouchableOpacity
              onPress={()=>onPressVerifyOTP()}
              style={[
                styles.verifyOTPButton,
                {
                  backgroundColor:
                    f1 !== '' &&
                    f2 !== '' &&
                    f3 !== '' &&
                    f4 !== '' &&
                    f5 !== '' &&
                    f6 !== ''
                      ? '#910E10'
                      : 'grey',
                },
              ]}
              disabled={
                f1 !== '' &&
                f2 !== '' &&
                f3 !== '' &&
                f4 !== '' &&
                f5 !== '' &&
                f6 !== ''
                  ? false
                  : true
              }>
              <Text style={styles.btnText}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
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
  phnInputBox:{
    marginVertical: 20,
    width: '96%',
    height: 100,

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


export default VerifyPhoneNumber;
