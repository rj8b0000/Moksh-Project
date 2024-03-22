import * as React from "react";
import { Text, StyleSheet, View, Pressable, TextInput, TouchableOpacity, Alert } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
import { GestureHandlerRootView } from "react-native-gesture-handler";   
import { getAuth, sendPasswordResetEmail, StackActions } from "firebase/auth";
import { app } from "../firebaseConfig";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const auth = getAuth(app);

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    Alert.alert("Password Reset Link is Send Successfully")
    navigation.dispatch(StackActions.replace("LoginScreen"));
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }

  return (
    <View style={styles.forgotPassword}>
      <View style={styles.content}>
        <View style={styles.titleBody}>
          <Text style={[styles.title, styles.titleTypo]}>
            Forgotten Password
          </Text>
          <Text style={styles.body}>
            Please enter an email address that you used to create account with
            so we can send you an email to reset your password.
          </Text>
        </View>
        <View style={[styles.inputFields1,styles.inputFlexBox]}>
          <GestureHandlerRootView
            >
            {/* <Text style={[styles.email, styles.emailTypo]}>Email</Text> */}
            <TextInput style={[styles.email, styles.emailTypo]} 
            placeholder="Email"
             autoCapitalize="none"
             onChangeText={(text)=>setEmail(text)}
             />
          </GestureHandlerRootView>
          </View>
      </View>
      <View style={[styles.buttonKeyboard, styles.topBarPosition]}>
        <View style={styles.bottomButton}>
            <TouchableOpacity
              style={[styles.pressable]}
              onPress={handleForgotPassword}
            >
              <Text style={styles.buttonText}>Send email</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputFields1: {
    marginTop: 12,
  },
  inputFlexBox: {
    paddingHorizontal: Padding.p_lg,
    justifyContent: "space-between",
    height: 56,
    backgroundColor: Color.inputField,
    paddingVertical: Padding.p_5xs,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Border.br_xs,
    alignSelf: "stretch",
  },
  titleTypo: {
    textAlign: "left",
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
  },
  topBarPosition: {
    left: 0,
    position: "absolute",
  },
  iconPosition: {
    top: "50%",
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
    left: 0,
    top: 0,
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
    textAlign: "center",
    top: "50%",
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
    paddingRight: Padding.p_5xl,
    width: 334,
  },
  email: {
    fontSize: FontSize.bodySmallRegular_size,
    color: Color.inputLabel,
    textAlign: "left",
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
  },
  inputFields: {
    backgroundColor: Color.inputField,
    paddingHorizontal: Padding.p_lg,
    marginTop: 40,
    paddingVertical: Padding.p_5xs,
    flexDirection: "row",
    borderRadius: Border.br_xs,
    alignItems: "center",
    height: 56,
    alignSelf: "stretch",
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
  pressable: {
    justifyContent: "center",
    paddingHorizontal: Padding.p_29xl,
    backgroundColor:"#1dac92",
    height: "100%",
    paddingVertical: Padding.p_5xs,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 15,
    width: "100%",
    height: 60,
  },
  bottomButton: {
    padding: Padding.p_5xl,
    width: 375,
  },

  background: {
    top: "0%",
    left: "0%",
    bottom: "0%",
    right: "0%",
    height: "100%",
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
  buttonKeyboard: {
    top: 450,
    alignItems: "center",
    left: 0,
  },
  forgotPassword: {
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.background,
  },
});

export default ForgotPassword;
