import * as React from "react";
import { Text, StyleSheet, View, Pressable, TextInput, TouchableOpacity, Alert, Modal, Button } from "react-native";
import { Image } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Color, FontFamily, Padding, Border, FontSize } from "../GlobalStyles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { firebase } from "../firebaseConfig";
import HomeScreen from "./dashboard";
import {app} from "../firebaseConfig";
import { getAuth ,signInWithEmailAndPassword, emailVerified } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "@react-native-firebase/auth";
import { apple_logo, eye_off, eye_on, google_logo } from "./common/AllImages";



// import firebase from "expo-firebase-app/src/firebase";


const SignInForNewUser = () => {
  React.useEffect(()=>{
    Alert.alert("Go to your inbox to verify your email, please don't close this app")
  },[])
  const navigation = useNavigation();
  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [modalVisible, setModalVisible] = React.useState(true)
  const [emailVerified, setEmailVerified] = React.useState("false");
  const auth = getAuth();
  const emailVerifiedAndNavigateToHome =  async () => {
    await AsyncStorage.setItem('EMAIL_VERIFIED', emailVerified) 
    navigation.navigate('Home')
  }
  const handleLogin =  async (email, password) => {
    const auth = getAuth(app);

    // const db = getFirestore(app); 
    // console.log("Email =>", email)
    // console.log("Password => ", password)
    try{
      if(email.length > 0 && password.length > 0)
      {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(user)
        if(user.user.emailVerified){
          await AsyncStorage.removeItem('PRE-USR-EMAIL');
          await AsyncStorage.removeItem('PRE-USR-PASS');
          await AsyncStorage.setItem('EMAIL', email);
          await AsyncStorage.setItem('PASSWORD', password);
          setEmailVerified("true");
        }
        else{
            Alert.alert("Please go to your inbox to verify email")
        }
      }
      else{
        Alert.alert("Please enter all data")
      }
      emailVerified == "true" ? 
      emailVerifiedAndNavigateToHome() : 
      Alert.alert("You are not verfied") &&
      navigation.navigate("MokshHome");
    }
    catch(error)
    {
      console.log(error)
    }

    // const isUserLogin =  signInWithEmailAndPassword(auth,email, password)
    // .then(() => {
    //   console.log('signed in!');
    //   navigation.navigate("Home",{
    //     email : isUserLogin.user
    //   })
    // })
    // .catch(error => {
    //   if (error.code === 'auth/email-already-in-use') {
    //     console.log('That email address is already in use!');
    //   }
  
    //   if (error.code === 'auth/invalid-email') {
    //     console.log('That email address is invalid!');
    //   }
  
    //   console.error(error);
    // });
};

  const [passwordVisible, setPasswordVisible] = React.useState(true)
  return (
    <>
    <View style={styles.signInEmptyState}>
      <View style={[styles.text, styles.textPosition]}>
        <Text style={[styles.tittle, styles.tittleClr]}>Sign In</Text>
        <Text style={styles.body}>
          <Text style={styles.useTheSame}>
            Use the same method that you created your
          </Text>
           account with.
        </Text>
      </View>
      <View style={[styles.container, styles.textPosition]}>
        <View style={styles.buttonSocial}>
          <View style={[styles.paymentComponents, styles.buttonsFlexBox]}>
            <Image
              style={styles.appleIcon}
              contentFit="cover"
              source={apple_logo}
            />
            <Text style={[styles.continueWithApple, styles.text3Typo]}>
              Continue with Apple
            </Text>
          </View>
          <Pressable 
          // onPress={() => navigation.navigate("dashboard")}
          >
          <View style={[styles.paymentComponents1, styles.paymentBorder]}>
            <Image
              style={styles.googleIcon}
              contentFit="cover"
              source={google_logo}
            />
            <Text style={[styles.continueWithApple, styles.text3Typo]}>
              Continue with Google
            </Text>
          </View>
          </Pressable>
        </View>
        <View style={[styles.orSignUpWithEmail, styles.inputFlexBox1]}>
          <View style={styles.signLayout} />
          <Text style={[styles.orSignUp, styles.emailTypo]}>
            Or sign up with email
          </Text>
          <View style={[styles.orSignUpWithEmailItem, styles.signLayout]} />
        </View>
        <View style={[styles.input, styles.inputFlexBox1]}>
          <View style={[styles.inputFields1,styles.inputFlexBox]}>
          <GestureHandlerRootView
            >
            <TextInput style={[styles.email, styles.emailTypo]} 
            onChangeText={(email)=>setEmail(email)}
             placeholder="Email" 
             autoCapitalize="none"
             placeholderTextColor = "grey"
             />
          </GestureHandlerRootView>
          </View>
          
          <View style={[styles.inputFields1, styles.inputFlexBox]}>
            <GestureHandlerRootView
            style={[styles.password, styles.emailTypo]}>
            <TextInput style={[styles.password, styles.emailTypo]}
            onChangeText={(password)=>setPassword(password)}
             placeholder="Password" secureTextEntry={passwordVisible} placeholderTextColor = "grey"
        autoCapitalize="none"/>
          </GestureHandlerRootView>
          <TouchableOpacity onPress={()=>setPasswordVisible(!passwordVisible)}>
          <Image
              style={styles.eyeOffIcon}
              contentFit="cover"
              source={passwordVisible?eye_off:eye_on}
            />
            
          </TouchableOpacity>
            
          </View>
          <TouchableOpacity onPress={()=>handleLogin(email,password)} style={[styles.buttons, styles.buttonsFlexBox]}>
            <Text 
            style={styles.buttonText}
             >Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  textPosition: {
    left: 21,
    position: "absolute",
  },
  tittleClr: {
    color: Color.textBlack,
    fontFamily: FontFamily.bodyLargeBold,
  },
  buttonsFlexBox: {
    paddingVertical: Padding.p_5xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Border.br_xs,
    alignSelf: "stretch",
  },
  text3Typo: {
    fontWeight: "500",
    lineHeight: 22,
    fontSize: FontSize.bodyLargeBold_size,
    color: Color.textBlack,
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
  },
  paymentBorder: {
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: Color.stroke,
    borderStyle: "solid",
    backgroundColor: Color.background,
  },
  inputFlexBox1: {
    justifyContent: "center",
    alignItems: "center",
  },
  emailTypo: {
    color: Color.inputLabel,
    lineHeight: 20,
    fontSize: FontSize.bodyMediumRegular_size,
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
  
  },
  signLayout: {
    height: 1,
    backgroundColor: Color.inputField,
    borderRadius: Border.br_31xl,
    flex: 1,
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
  text2Typo: {
    color: Color.colorLightseagreen,
    fontFamily: FontFamily.bodyLargeBold,
    fontWeight: "700",
  },
  text1Typo: {
    lineHeight: 20,
    fontSize: FontSize.bodyMediumRegular_size,
    textAlign: "center",
    letterSpacing: 0,
  },
  iconPosition: {
    top: "50%",
    position: "absolute",
  },
  tittle: {
    fontSize: FontSize.h4Bold_size,
    lineHeight: 29,
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: 0,
    color: Color.textBlack,
    fontFamily: FontFamily.bodyLargeBold,
    alignSelf: "stretch",
    
  },
  useTheSame: {
    marginBottom: 20,
  },
  body: {
    color: Color.textBody,
    marginTop: 40,
    lineHeight: 20,
    fontSize: FontSize.bodyMediumRegular_size,
    textAlign: "left",
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
    alignSelf: "stretch",
  },
  text: {
    top: 80,
    width: 334,
  },
  appleIcon: {
    width: 40,
    height: 40,
    overflow: "hidden",
  },
  continueWithApple: {
    marginLeft: 8,
    textAlign: "center",
  },
  paymentComponents: {
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: Color.stroke,
    borderStyle: "solid",
    backgroundColor: Color.background,
  },
  googleIcon: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  paymentComponents1: {
    paddingVertical: Padding.p_base,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Border.br_xs,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: Color.stroke,
    borderStyle: "solid",
    marginTop: 8,
    alignSelf: "stretch",
  },
  buttonSocial: {
    width: 334,
  },
  orSignUp: {
    marginLeft: 12,
    textAlign: "center",
  },
  orSignUpWithEmailItem: {
    marginLeft: 12,
  },
  orSignUpWithEmail: {
    marginTop: 48,
    flexDirection: "row",
    alignItems: "center",
    width: 334,
  },
  email: {
    textAlign: "left",
    flex: 1,
  },
  arrowsIcon: {
    width: 9,
    height: 18,
    display: "none",
  },
  password: {
    textAlign: "left",
  },
  eyeOffIcon: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  inputFields1: {
    marginTop: 12,
  },
  buttonText: {
    color: Color.background,
    textAlign: "center",
    lineHeight: 22,
    fontSize: FontSize.bodyLargeBold_size,
    fontFamily: FontFamily.bodyLargeBold,
    fontWeight: "700",
    letterSpacing: 0,
  },
  buttons: {
    height: 60,
    paddingHorizontal: Padding.p_29xl,
    backgroundColor: "#1dac92",
    marginTop: 12,
  },
  forgotPassword: {
    width: 118,
    textAlign: "center",
    lineHeight: 20,
    fontSize: FontSize.bodyMediumRegular_size,
    letterSpacing: 0,
  },
  forgot: {
    marginTop: 12,
  },
  input: {
    marginTop: 20,
    width: 334,
  },
  signUp1: {
    textDecoration: "underline",
  },
  text1: {
    textAlign: "center",
    alignSelf: "stretch",
    fontSize: FontSize.bodyMediumRegular_size,
  },
  signIn: {
    marginTop: 48,
  },
  container: {
    top: 220,
  },
  // text3: {
  //   marginTop: -11,
  //   left: 23,
  //   fontWeight: "500",
  //   lineHeight: 22,
  //   fontSize: FontSize.bodyLargeBold_size,
  //   color: Color.textBlack,
  //   fontFamily: FontFamily.bodyLargeBold,
  //   letterSpacing: 0,
  //   textAlign: "left",
  // },
  signInEmptyState: {
    width: "100%",
    height: 812,
    overflow: "hidden",
    flex: 1,
    backgroundColor: Color.background,
    marginLeft: -5
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // alignItems: 'center'
  },
  modalView: {
    height: 300,
    width: '90%',
    backgroundColor: '#FFFEEE',
    padding: 40,
    borderRadius: 20,
    shadowColor: 'black',
    elevation: 5,
    alignItems: 'center',
  },
});

export default SignInForNewUser;
