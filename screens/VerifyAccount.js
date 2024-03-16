import * as React from "react";
import { Text, StyleSheet, View, Pressable, TouchableOpacity } from "react-native";
import { Image } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import { useNavigation,StackActions } from "@react-navigation/native";
import { Color, FontFamily, Padding, Border, FontSize } from "../GlobalStyles";
import { email_icon, phone_icon } from "./common/AllImages";

const VerifyAccount = () => {
  const navigation = useNavigation();
  const [borderWidth, setBorderWidthForEmailVeri] = React.useState(1)
  const [borderWidth2, setBorderWithForPhone] = React.useState(1)
  const [isEmailVerificationPressed, setIsEmailVerificationPressed] = React.useState(false)
  const handleOnPressPhone = () => { 
    setBorderWidthForEmailVeri(1)
    setBorderWithForPhone(3)
    // console.warn("Pressed")
  }
  const handleBorderWidth = () =>{
    // if(isEmailVerificationPressed == false)
    // {
      // setIsEmailVerificationPressed(true)
      // console.warn(isEmailVerificationPressed)
    setBorderWithForPhone(1)
      setBorderWidthForEmailVeri(3)
    // }
  }
  const continueUserChoicedVerification = () =>{
    if(borderWidth==3)
    {
      navigation.navigate("VerifyEmailAddress")
    }
    else
    {
      navigation.dispatch(StackActions.replace("VerifyPhoneNumber"))
    }
  }
  return (
    <View style={styles.verifyAccount}>
      <View style={styles.content}>
        <View style={styles.titleBody}>
          <Text style={[styles.title, styles.titleFlexBox]}>
            Verify your account
          </Text>
          <Text style={[styles.body, styles.bodyTypo]}>
            Choose a method of verification.
          </Text>
        </View>
        <View style={styles.verificationMethods}>
          <Pressable
            style={[styles.verificationMethods1, styles.verificationFlexBox, {borderWidth} ,{borderColor: "#1DAC92"}]}
            onPress={
              handleBorderWidth
            }
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={email_icon}
            />
            <View style={styles.text}>
              <Text style={[styles.myEmailAddress, styles.bodyTypo]}>
                My email address
              </Text>
              <Text style={[styles.verifyWithYour, styles.bodyTypo]}>
                Verify with your email
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={[styles.verificationMethods2, styles.verificationFlexBox, {borderWidth : borderWidth2}, {borderColor: "#1DAC92"}]}
            onPress={handleOnPressPhone}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={phone_icon}
            />
            <View style={styles.text}>
              <Text style={[styles.phoneNumber, styles.bodyLayout]}>
                Phone Number
              </Text>
              <Text style={[styles.verifyWithYour, styles.bodyTypo]}>
                Verify with your phone number
              </Text>
            </View>
          </Pressable>
        </View>
   
      </View>
      {
        borderWidth==3 || borderWidth2==3?
        <View style={[styles.bottomButton, styles.topBarPosition]}>
        {/* <LinearGradient
          style={styles.buttons}
          locations={[0, 0, 1]}
          colors={["#1dac92", "#1dac92", "#228e8e"]}
        > */}
          <Pressable
            style={[styles.pressable, styles.buttons]}
            // style={styles.buttons}
            onPress={continueUserChoicedVerification}
          >
            <Text 
            style={[styles.buttonText, styles.textTypo]}
            >Continue</Text>
          </Pressable>
        {/* </LinearGradient> */}
      </View>:null
      }

       
      
      

      
      <View style={[styles.topBar, styles.topBarPosition]}>
        <Image
          style={styles.appbarIcon}
          contentFit="cover"
          source={require("../assets/appbar.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleFlexBox: {
    textAlign: "left",
    color: Color.textBlack,
  },
  bodyTypo: {
    color: Color.textBlack,
    textAlign: "left",
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
  },
  verificationFlexBox: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_base,
    height: 72,
    borderStyle: "solid",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Border.br_xs,
    alignSelf: "stretch",
    backgroundColor: Color.background,
  },
  bodyLayout: {
    lineHeight: 20,
    fontSize: FontSize.bodyMediumRegular_size,
  },
  topBarPosition: {
    left: 0,
    position: "absolute",
  },
  textTypo: {
    lineHeight: 22,
    fontSize: FontSize.bodyLargeBold_size,
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
  },
  iconPosition: {
    top: "50%",
    position: "absolute",
  },
  title: {
    fontSize: FontSize.h4Bold_size,
    lineHeight: 29,
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
    color: Color.textBlack,
    fontWeight: "700",
    alignSelf: "stretch",
  },
  body: {
    height: 40,
    marginTop: 8,
    lineHeight: 20,
    fontSize: FontSize.bodyMediumRegular_size,
    alignSelf: "stretch",
  },
  titleBody: {
    width: 334,
  },
  icon: {
    borderRadius: Border.br_981xl,
    width: 48,
    height: 48,
    overflow: "hidden",
  },
  myEmailAddress: {
    lineHeight: 20,
    fontSize: FontSize.bodyMediumRegular_size,
    fontWeight: "700",
  },
  verifyWithYour: {
    fontSize: FontSize.bodySmallRegular_size,
  },
  text: {
    marginLeft: 16,
  },
  verificationMethods1: {
    borderColor: "black",
  },
  phoneNumber: {
    textAlign: "left",
    color: Color.textBlack,
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
    fontWeight: "700",
  },
  verificationMethods2: {
    borderColor: "green",
    borderWidth: 1,
    marginTop: 16,
  },
  verificationMethods: {
    marginTop: 40,
    width: 334,
  },
  content: {
    top: 124,
    left: 15,
    height: 508,
    position: "absolute",
  },
  buttonText: {
    color: Color.background,
    textAlign: "center",
    fontWeight: "700",
  },
  pressable: {
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: Padding.p_29xl,
    paddingVertical: Padding.p_5xs,
    backgroundColor: "#1dac92",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  buttons: {
    height: 60,
    width: 334,
    marginLeft: -10,
    borderRadius: 12
  },
  bottomButton: {
    top: 656,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_29xl,
    width: 375,
    // borderRadius: 12
  },
  text2: {
    marginTop: -11,
    left: 23,
    fontWeight: "500",
    lineHeight: 22,
    fontSize: FontSize.bodyLargeBold_size,
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
    textAlign: "left",
    color: Color.textBlack,
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
    height: 56,
    width: 375,
    overflow: "hidden",
  },
  topBar: {
    top: 0,
  },
  verifyAccount: {
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.background,
  },
});

export default VerifyAccount;
