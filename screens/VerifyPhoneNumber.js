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
} from 'react-native';
// import { LinearGradient } from "expo-linear-gradient";
import {StackActions, useNavigation} from '@react-navigation/native';
import {FontFamily, Padding, Border, Color, FontSize} from '../GlobalStyles';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import PhoneInput from 'react-native-phone-number-input';
// import PhoneNumber from "react-native-phone-number";
import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
const VerifyPhoneNumber = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = React.useState(null);
  const [showIndicator, setShowIndicatior] = React.useState(false)
  const phoneInput = useRef(null);
  const [formattedValue, setFormattedValue] = useState("");
  const setPhoneNum = num => {
    setPhoneNumber(num);
  };
  const signInWithPhoneNumber = async () => {
    try {
      setShowIndicatior(false)
      const confirmation = await auth().signInWithPhoneNumber(formattedValue);
      setConfirm(confirmation);
    } catch (error) {
      console.log('Error sending code', error);
    }
    // console.log(formattedValue)
  };
  const confirmCode = async () => {
    try {
      const userCredential = await confirm.confirm(code);
      const user = userCredential.user;

      const userDocument = await firestore()
        .collection('users')
        .doc(user.uid)
        .get();

      if (userDocument.exists) {
        navigation.navigate('dashboard');
      } else {
        navigation.navigate('dashboard', {uid: user.uid});
      }
    } catch (error) {
      console.log('Invalid Code', error);
    }
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
    try {
      await confirm.confirm(otp).then(() => {
        navigation.dispatch(StackActions.replace('SignInEmptyState'));
      });
    } catch (error) {
      console.log('Invalid Code', error);
    }
  };
  return (
    <View style={styles.verifyPhoneNumber}>
      {!confirm ? (
        <>
          <View style={styles.content}>
            <View style={styles.titleBody}>
              <Text style={[styles.titlePhone, styles.titleTypo]}>
                Phone Number
              </Text>
              <Text style={[styles.body, styles.bodySpaceBlock]}>
                We're going to send you a verification code.
              </Text>
            </View>
            <View>
              {/* <Text style={[styles.text, styles.textTypo1]}>+1 8888 8888 8888</Text> */}
              {/* <View style={styles.inputFieldsItem} /> */}
              {/* <TextInput
                // defaultCode="US"
                // layout="first"
                // keyboardType="neumaric"
                placeholder="Enter mobile Number"
                onChangeText={text => setPhoneNum(text)}
                value={phoneNumber}
                placeholderTextColor={"grey"}
                color = "grey"
              /> */}
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
                withDarkTheme
                // withShadow
                // autoFocus
              />
            </View>
          </View>
          <View style={[styles.buttonKeyboard, styles.topBarPosition]}>
            {
              showIndicator && (
                <ActivityIndicator size={70} color={'green'}/>
              )
            }
            <View style={styles.bottomButton}>
              {/* <LinearGradient
            style={styles.buttons}
            locations={[0, 0, 1]}
            colors={["#1dac92", "#1dac92", "#228e8e"]}
          > */}
              <TouchableOpacity
                style={[styles.pressable, styles.columnFlexBox]}
                onPress={signInWithPhoneNumber}>
                <Text style={[styles.buttonText, styles.textTypo]}>Verify</Text>
              </TouchableOpacity>

              {/* </LinearGradient> */}
            </View>
          </View>
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
                  {borderColor: f1.length >= 1 ? '#1dac92' : '#000'},
                  {color: f1.length >= 1 ? '#1dac92' : '#000'},
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
                  {borderColor: f2.length >= 1 ? '#1dac92' : '#000'},
                  {color: f1.length >= 1 ? '#1dac92' : '#000'},
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
                  {borderColor: f3.length >= 1 ? '#1dac92' : '#000'},
                  {color: f1.length >= 1 ? '#1dac92' : '#000'},
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
                  {borderColor: f4.length >= 1 ? '#1dac92' : '#000'},
                  {color: f1.length >= 1 ? '#1dac92' : '#000'},
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
                  {borderColor: f5.length >= 1 ? '#1dac92' : '#000'},
                  {color: f1.length >= 1 ? '#1dac92' : '#000'},
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
                  {borderColor: f6.length >= 1 ? '#1dac92' : '#000'},
                  {color: f1.length >= 1 ? '#1dac92' : '#000'},
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
                  color: count == 0 ? '#1dac92' : 'grey',
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
            <TouchableOpacity
              onPress={onPressVerifyOTP}
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
                      ? '#1dac92'
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
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 100,
    alignSelf: 'center',
    color: '#000',
  },
  otpView: {
    // width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 100,
  },
  inputView: {
    width: 35,
    height: 35,
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
  titleTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.bodyLargeBold,
  },
  bodySpaceBlock: {
    marginTop: 8,
    alignSelf: 'stretch',
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
    color: Color.textBlack,
    letterSpacing: 0,
    textAlign: 'left',
    fontFamily: FontFamily.bodyLargeBold,
    fontWeight: '700',
    fontSize: FontSize.h4Bold_size,
    alignSelf: 'stretch',
  },
  wereGoingTo: {
    marginBottom: 20,
  },
  body: {
    color: Color.textBody,
    lineHeight: 20,
    fontSize: FontSize.bodyMediumRegular_size,
    textAlign: 'left',
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
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
    top: 124,
    left: 15,
    height: 250,
    position: 'absolute',
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
    backgroundColor: '#1dac92',
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
    backgroundColor: Color.background,
  },
});

export default VerifyPhoneNumber;
