/* eslint-disable prettier/prettier */
import React,{useContext, useState} from "react";
import { Text, StyleSheet, View, TextInput,Pressable, Alert } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, Padding, Border, FontSize, Color } from "../GlobalStyles";
import { getAuth, sendEmailVerification, emailVerified } from "firebase/auth";
import { useNavigation,StackActions } from "@react-navigation/native";

const VerifyEmailAddress = () => {
  const navigation = useNavigation()
  const [email,setEmail] = useState('')
  const auth = getAuth()
  // const {user, setUser} = useContext(auth.currentUser)

  const onVerifyEmail = async () => {
    // console.warn("Clicked")
    try{
      if(email.length > 0)
      {
        // console.warn(auth.currentUser.email)
        await sendEmailVerification(auth.currentUser)
        .then(()=>{
            navigation.navigate("SignInForNewUser")
          })
        //   else{
        //     alert("Please Verify your email, checkout inbox")
        //     // sendEmailVerification(auth.currentUser)
        //   }
        // })
        // navigation.navigate("SignInEmptyState")
        // alert("Please verify your email, checkout link in your inbox")
      }
    }

    catch(error){
      console.log(error)
    }
  }

  return (
    <View style={styles.verifyEmailAddress}>
      <View style={styles.content}>
        <View style={styles.titleBody}>
          <Text style={[styles.title]}>Email Address</Text>
          <Text style={styles.body}>
              We are going to send you an email with a login link
          </Text>
        </View>
        <View style={[styles.inputFields, styles.buttonsFlexBox]}>
          <View>
            <TextInput style={[styles.email]} placeholder="Enter your Email" onChangeText={(text)=>setEmail(text)}
            placeholderTextColor={"grey"}
            />
          </View>
        </View>
      </View>
      <View style={[styles.buttonKeyboard, styles.topBarPosition]}>
        <View style={styles.bottomButton}>
          <Pressable
            style={[styles.buttons, styles.buttonsFlexBox]}
            onPress={onVerifyEmail}
          >
            <Text style={styles.buttonText} >Verify</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleTypo: {
    textAlign: "left",
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
  },
  buttonsFlexBox: {
    paddingVertical: Padding.p_5xs,
    flexDirection: "row",
    borderRadius: 12,
    alignItems: "center",
  },
  topBarPosition: {
    left: 0,
    position: "absolute",
  },
  backgroundPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  keysPosition: {
    left: "50%",
    position: "absolute",
  },
  viewLayout1: {
    height: 42,
    left: "50%",
  },
  rectanglePosition: {
    borderRadius: Border.br_8xs_6,
    bottom: 0,
    right: 0,
    top: 0,
    left: 0,
    position: "absolute",
  },
  labelTypo: {
    lineHeight: 21,
    top: "26.19%",
    fontFamily: FontFamily.interRegular,
    textAlign: "center",
    fontSize: FontSize.bodyLargeBold_size,
    left: 0,
    letterSpacing: 0,
  },
  spaceLayout: {
    width: 182,
    position: "absolute",
  },
  viewLayout: {
    width: 87,
    position: "absolute",
  },
  labelPosition: {
    color: Color.grayscale50,
    lineHeight: 21,
    top: "26.19%",
    textAlign: "center",
    fontSize: FontSize.bodyLargeBold_size,
    left: 0,
    letterSpacing: 0,
  },
  shiftLayout: {
    width: 42,
    position: "absolute",
  },
  symbolPosition: {
    letterSpacing: -1,
    fontSize: FontSize.size_3xl_5,
    marginTop: -13,
    top: "50%",
    textAlign: "center",
    color: Color.textBlack,
    position: "absolute",
  },
  mLayout: {
    width: 32,
    height: 42,
    left: "50%",
    position: "absolute",
  },
  lPosition: {
    top: 54,
    width: 32,
    height: 42,
    left: "50%",
    position: "absolute",
  },
  iconPosition: {
    top: "50%",
    position: "absolute",
  },
  title: {
    fontSize: FontSize.h4Bold_size,
    lineHeight: 29,
    color: Color.textBlack,
    fontWeight: "700",
    alignSelf: "stretch",
    textAlign: "left",
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
  },
  wereGoingTo: {
    marginBottom: 20,
  },
  body: {
    color: Color.textBody,
    marginTop: 8,
    lineHeight: 20,
    fontSize: FontSize.bodyMediumRegular_size,
    textAlign: "left",
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
    alignSelf: "stretch",
  },
  titleBody: {
    width: 334,
  },
  email: {
    fontSize: 15,
    color: 'grey',
    textAlign: "left",
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
  },
  johnd: {
    marginTop: 4,
    fontWeight: "500",
    lineHeight: 20,
    fontSize: FontSize.bodyMediumRegular_size,
    textAlign: "left",
    color: Color.textBlack,
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
  },
  inputFields: {
    backgroundColor: Color.inputField,
    borderStyle: "solid",
    borderColor: "#1dac92",
    borderWidth: 2,
    width: 327,
    paddingHorizontal: Padding.p_lg,
    marginTop: 40,
    height: 56,
  },
  content: {
    top: 124,
    left: 21,
    height: 265,
    position: "absolute",
  },
  buttonText: {
    textAlign: "center",
    color: Color.background,
    lineHeight: 22,
    fontSize: FontSize.bodyLargeBold_size,
    fontFamily: FontFamily.bodyLargeBold,
    fontWeight: "700",
    letterSpacing: 0,
  },
  buttons: {
    height: 60,
    justifyContent: "center",
    paddingHorizontal: Padding.p_29xl,
    backgroundColor: "#1dac92",
    width: 334,
  },
  bottomButton: {
    padding: Padding.p_5xl,
    width: 375,
  },
  background1: {
    backgroundColor: Color.stroke,
    top: "0%",
    height: "100%",
    left: "0%",
    bottom: "0%",
    right: "0%",
  },
  background: {
    top: "0%",
    height: "100%",
    left: "0%",
    bottom: "0%",
    right: "0%",
  },
  homeIndicator1: {
    marginLeft: -66.5,
    bottom: 8,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.textBlack,
    width: 134,
    height: 5,
  },
  homeIndicator: {
    height: "11.68%",
    top: "88.32%",
  },
  dictationIcon: {
    height: 25,
    width: 15,
  },
  emojiIcon: {
    height: 27,
    width: 27,
  },
  rectangleIcon: {
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  label: {
    fontFamily: FontFamily.interRegular,
    width: 88,
    position: "absolute",
    color: Color.background,
    lineHeight: 21,
    top: "26.19%",
  },
  return: {
    display: "none",
    width: 88,
    position: "absolute",
    top: 162,
    height: 42,
    marginLeft: 96.5,
  },
  label1: {
    fontFamily: FontFamily.interRegular,
    lineHeight: 21,
    top: "26.19%",
    textAlign: "center",
    fontSize: FontSize.bodyLargeBold_size,
    left: 0,
    letterSpacing: 0,
    color: Color.textBlack,
  },
  space: {
    marginLeft: -91.5,
    height: 42,
    left: "50%",
    top: 162,
  },
  label2: {
    width: 87,
    position: "absolute",
    fontFamily: FontFamily.interRegular,
  },
  view: {
    height: 42,
    left: "50%",
    top: 162,
    marginLeft: -184.5,
  },
  label3: {
    fontFamily: FontFamily.sFProText,
    color: Color.grayscale50,
    lineHeight: 21,
    top: "26.19%",
    textAlign: "center",
    fontSize: FontSize.bodyLargeBold_size,
    left: 0,
    letterSpacing: 0,
  },
  keyLight: {
    marginLeft: -21,
    top: 0,
    height: 42,
    left: "50%",
  },
  deleteButtonIcon: {
    width: 7,
    height: 7,
  },
  delete: {
    marginLeft: 142.5,
    top: 108,
    height: 42,
    left: "50%",
  },
  rectangle: {
    backgroundColor: Color.background,
    bottom: 0,
    right: 0,
  },
  symbol: {
    left: "48.1%",
    fontFamily: FontFamily.sFProText,
  },
  shiftIcon: {
    marginLeft: -9.3,
    top: 12,
    width: 19,
    height: 16,
  },
  shift: {
    top: 108,
    height: 42,
    left: "50%",
    marginLeft: -184.5,
  },
  symbol1: {
    left: "18.75%",
    fontFamily: FontFamily.interRegular,
  },
  m: {
    marginLeft: 97.5,
    top: 108,
  },
  symbol2: {
    left: "25%",
    fontFamily: FontFamily.interRegular,
  },
  n: {
    marginLeft: 59.5,
    top: 108,
  },
  symbol3: {
    left: "28.13%",
    fontFamily: FontFamily.interRegular,
  },
  b: {
    marginLeft: 21.5,
    top: 108,
  },
  v: {
    marginLeft: -15.5,
    top: 108,
  },
  c: {
    marginLeft: -53.5,
    top: 108,
  },
  x: {
    marginLeft: -90.5,
    top: 108,
  },
  z: {
    marginLeft: -128.5,
    top: 108,
  },
  symbol8: {
    left: "31.25%",
    fontFamily: FontFamily.interRegular,
  },
  l: {
    marginLeft: 134.5,
  },
  k: {
    marginLeft: 96.5,
  },
  j: {
    marginLeft: 59.5,
  },
  h: {
    marginLeft: 21.5,
  },
  g: {
    marginLeft: -15.5,
  },
  f: {
    marginLeft: -53.5,
  },
  d: {
    marginLeft: -90.5,
  },
  s: {
    marginLeft: -128.5,
  },
  a: {
    marginLeft: -165.5,
  },
  p: {
    marginLeft: 152.5,
    top: 0,
  },
  symbol18: {
    left: "21.88%",
    fontFamily: FontFamily.interRegular,
  },
  o: {
    marginLeft: 115.5,
    top: 0,
  },
  symbol19: {
    left: "40.63%",
    fontFamily: FontFamily.interRegular,
  },
  i: {
    marginLeft: 77.5,
    top: 0,
  },
  u: {
    marginLeft: 40.5,
    top: 0,
  },
  y: {
    marginLeft: 2.5,
    top: 0,
  },
  t: {
    marginLeft: -34.5,
    top: 0,
  },
  r: {
    marginLeft: -72.5,
    top: 0,
  },
  e: {
    marginLeft: -109.5,
    top: 0,
  },
  symbol25: {
    left: "15.63%",
    fontFamily: FontFamily.interRegular,
  },
  w: {
    marginLeft: -147.5,
    top: 0,
  },
  q: {
    top: 0,
    marginLeft: -184.5,
  },
  keys: {
    top: 8,
    width: 369,
    height: 259,
    marginLeft: -184.5,
  },
  keyboard: {
    height: 291,
    width: 375,
  },
  buttonKeyboard: {
    top: 413,
    alignItems: "center",
    left: 0,
  },
  text1: {
    marginTop: -11,
    left: 23,
    lineHeight: 22,
    fontSize: FontSize.bodyLargeBold_size,
    top: "50%",
    fontWeight: "500",
    textAlign: "left",
    color: Color.textBlack,
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
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
    height: 11,
    width: 15,
  },
  batteryIcon: {
    marginTop: -4,
    right: 23,
    height: 13,
    width: 27,
  },
  topBar1: {
    height: 44,
    width: 375,
  },
  appbarIcon: {
    width: 375,
    height: 56,
    overflow: "hidden",
  },
  topBar: {
    top: 0,
  },
  verifyEmailAddress: {
    flex: 1,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.background,
  },
});

export default VerifyEmailAddress;
