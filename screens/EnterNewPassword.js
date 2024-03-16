import * as React from "react";
import { Text, StyleSheet, View, Pressable, TextInput, TouchableOpacity } from "react-native";
import { Image } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, Border, FontFamily, FontSize } from "../GlobalStyles";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const EnterNewPassword = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = React.useState(true)


  return (
    <View style={styles.enterNewPassword}>
      <View style={styles.content}>
        <View style={styles.titleBody}>
          <Text style={[styles.title, styles.titleClr]}>
            Create New Password
          </Text>
          <Text style={styles.body}>
            Your new password must be different from your previously used
            password.
          </Text>
        </View>
        <View style={styles.input}>
        <View style={[styles.inputFields1, styles.inputFlexBox]}>
            <GestureHandlerRootView
            style={[styles.password, styles.emailTypo]}>
            <TextInput style={[styles.password, styles.emailTypo]}
             placeholder="Password" secureTextEntry={passwordVisible} 
            //  onChangeText={txt => setPassword(txt)}
        autoCapitalize="none"/>
          </GestureHandlerRootView>
          <TouchableOpacity onPress={()=>setPasswordVisible(!passwordVisible)}>
          <Image
              style={styles.eyeOffIcon}
              contentFit="cover"
              source={passwordVisible?require("../assets/eyeoff.png"):require("../assets/eyeon.png")}
            />
            
          </TouchableOpacity>
            
          </View>
          <View style={[styles.inputFields1, styles.inputFlexBox]}>
            <GestureHandlerRootView
            style={[styles.password, styles.emailTypo]}>
            <TextInput style={[styles.password, styles.emailTypo]}
             placeholder="Password" secureTextEntry={passwordVisible} 
            //  onChangeText={txt => setPassword(txt)}
        autoCapitalize="none"/>
          </GestureHandlerRootView>
          <TouchableOpacity onPress={()=>setPasswordVisible(!passwordVisible)}>
          <Image
              style={styles.eyeOffIcon}
              contentFit="cover"
              source={passwordVisible?require("../assets/eyeoff.png"):require("../assets/eyeon.png")}
            />
            
          </TouchableOpacity>
            
          </View>
        </View>
      </View>
      <View style={[styles.bottomButton, styles.topBarPosition]}>
        {/* <LinearGradient
          style={styles.buttons}
          locations={[0, 0, 1]}
          colors={["#1dac92", "#1dac92", "#228e8e"]}
        > */}
          <Pressable
            style={[styles.pressable, styles.inputFlexBox]}
            onPress={() => navigation.navigate("SuccessMessage")}
          >
            <Text style={[styles.buttonText, styles.textTypo]}>
              Reset Password
            </Text>
          </Pressable>
        {/* </LinearGradient> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleClr: {
    color: Color.textBlack,
    textAlign: "left",
  },
  inputFlexBox: {
    paddingVertical: Padding.p_5xs,
    borderRadius: Border.br_xs,
    alignItems: "center",
    flexDirection: "row",
  },
  titleTypo: {
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
  },
  frameLayout: {
    height: 8,
    width: 8,
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
    textAlign: "left",
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
    fontWeight: "700",
    alignSelf: "stretch",
  },
  body: {
    fontSize: FontSize.bodyMediumRegular_size,
    lineHeight: 20,
    color: Color.textBody,
    marginTop: 8,
    textAlign: "left",
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
    alignSelf: "stretch",
  },
  titleBody: {
    paddingRight: Padding.p_5xl,
    width: 334,
  },
  password: {
    fontSize: FontSize.bodySmallRegular_size,
    color: Color.inputLabel,
    textAlign: "left",
  },
  frameItem: {
    marginLeft: 3,
  },
  ellipseParent: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 8,
  },
  eyeOffIcon: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  inputFields: {
    paddingHorizontal: Padding.p_lg,
    justifyContent: "space-between",
    backgroundColor: Color.inputField,
    paddingVertical: Padding.p_5xs,
    height: 56,
    borderRadius: Border.br_xs,
    alignSelf: "stretch",
  },
  inputFields1: {
    marginTop: 12,
    paddingHorizontal: Padding.p_lg,
    justifyContent: "space-between",
    backgroundColor: Color.inputField,
    paddingVertical: Padding.p_5xs,
    height: 56,
    borderRadius: Border.br_xs,
    alignSelf: "stretch",
  },
  input: {
    marginTop: 40,
    alignSelf: "stretch",
  },
  content: {
    top: 124,
    left: 21,
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
    backgroundColor: Color.primaryMainGradient,
    paddingVertical: Padding.p_5xs,
    borderRadius: Border.br_xs,
    width: "100%",
  },
  buttons: {
    height: 60,
    width: 334,
    borderRadius: 10,
    marginLeft: -10
  },
  bottomButton: {
    top: 656,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_29xl,
    width: 375,
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
    width: 375,
    height: 56,
    overflow: "hidden",
  },
  topBar: {
    top: 0,
  },
  enterNewPassword: {
    backgroundColor: Color.background,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default EnterNewPassword;
