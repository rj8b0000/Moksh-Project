import * as React from "react";
import { Text, StyleSheet, View, Pressable, TextInput, TouchableOpacity, Alert, Modal, Button, ScrollView, SafeAreaView } from "react-native";
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
import { ProgressBar } from "@react-native-community/progress-bar-android";
import Feather from 'react-native-vector-icons/Feather';




// import firebase from "expo-firebase-app/src/firebase";


const SignInForNewUser = () => {
  React.useEffect(()=>{
    Alert.alert("Go to your inbox to verify your email, please don't close this app")
  },[])
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
            if (currentProgress < 0.8) {
                setTimeout(updateProgress, 600)
            };
            return currentProgress + 0.1;
        })
    };
    updateProgress();
}
  const navigation = useNavigation();
  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [modalVisible, setModalVisible] = React.useState(true)
  const [emailVerified1, setEmailVerified1] = React.useState("false");
  const [progress, setProgress] = React.useState(0);
  const [progressBarVisible, setProgressBarVisible] = React.useState(false)
  const [disableVerifyPhnBtn, setDisableVerifyPhnBtn] = React.useState(false);


  const auth = getAuth();
  const emailVerifiedAndNavigateToHome =  async () => {
    await AsyncStorage.setItem('EMAIL_VERIFIED', emailVerified1) 
    navigation.navigate('Home')
  }
  const handleLogin =  async (email, password) => {
    const auth = getAuth(app);
        if (email.length > 0 && password.length > 0) {
            loaderFunction();
            setProgressBarVisible(true)
          setDisableVerifyPhnBtn(true);
            // const user = signInWithEmailAndPassword(auth, email, password)
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user; 
            console.log(user)
            try{
                  if(user.emailVerified){
                          await AsyncStorage.removeItem('PRE-USR-EMAIL');
                          await AsyncStorage.removeItem('PRE-USR-PASS');
                          await AsyncStorage.setItem('EMAIL', email);
                          await AsyncStorage.setItem('PASSWORD', password);
                          setEmailVerified1("true");
                  }
                  else{
                      Alert.alert("Please go to your inbox to verify email and try again")
                  }
                  user.emailVerified ? 
                  emailVerifiedAndNavigateToHome() &&
                  setEmailVerified1("true")
                   : 
                  Alert.alert("You are not verfied")
                  navigation.navigate("MokshHome");
                }
                catch(error){
                    if (error.code === 'auth/invalid-email') {
                        Alert.alert("Please Enter a Valid Email")
                        setProgressBarVisible(false)
                        setProgress(0)
                    }
                    else if (error.code === 'auth/wrong-password') {
                        Alert.alert('The password is invalid. Please try again.');
                        setProgressBarVisible(false)
                        setProgress(0)
                    }
                    else if (error.code === 'auth/invalid-credential') {
                        Alert.alert('In valid Credentials');
                        setProgressBarVisible(false)
                        setProgress(0)
                    }
                    else
                    {
                      Alert.alert('An Unknown Error Occured! Please try again later');
                        setProgressBarVisible(false)
                        setProgress(0)
                    }

                    console.error(error);
                }
        }
        else {
            Alert.alert("Please enter all data")
        }
    // const auth = getAuth(app);
    // try{
    //   if(email.length > 0 && password.length > 0)
    //   {
    //     const user = await signInWithEmailAndPassword(auth, email, password);
    //     console.log(user)
    //     if(user.user.emailVerified){
    //       await AsyncStorage.removeItem('PRE-USR-EMAIL');
    //       await AsyncStorage.removeItem('PRE-USR-PASS');
    //       await AsyncStorage.setItem('EMAIL', email);
    //       await AsyncStorage.setItem('PASSWORD', password);
    //       setEmailVerified("true");
    //     }
    //     else{
    //         Alert.alert("Please go to your inbox to verify email")
    //     }
    //   }
    //   else{
    //     Alert.alert("Please enter all data")
    //   }
    //   emailVerified == "true" ? 
    //   emailVerifiedAndNavigateToHome() : 
    //   Alert.alert("You are not verfied") &&
    //   navigation.navigate("MokshHome");
    // }
    // catch(error)
    // {
    //   console.log(error)
    // }
};

  const [passwordVisible, setPasswordVisible] = React.useState(true)
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
        <SafeAreaView style={{ display: 'flex' }}>
            <View style={styles.bckbtnView}>
                <TouchableOpacity style={styles.back_icon} onPress={() => navigation.goBack()}>
                    <Feather name='arrow-left' size={25} color='white' />
                </TouchableOpacity>
            </View>
            <View style={styles.imgView}>
                <Image source={require('../assets/maharaj-hand-img.png')} />
            </View>
        </SafeAreaView>
        <View style={styles.loginView}>
            <View style={styles.loginForm}>
                {
                    progressBarVisible ?
                        <View>
                            <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
                            <ProgressBar {...progressProps} progress={progress} />
                        </View>
                        : null
                }
                <Text style={{ color: 'grey', fontWeight: 'bold' }}>Email Address</Text>
                <TextInput
                    style={styles.emailInput}
                    placeholder='Enter Email'
                    placeholderTextColor={'grey'}
                    color='grey'
                    onChangeText={(email) => setEmail(email)}
                />
                <Text style={{ color: 'grey', fontWeight: 'bold', marginTop: 10 }}>Password</Text>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', }}>
                    <TextInput
                        style={styles.passInput}
                        placeholder='Enter Password'
                        placeholderTextColor={'grey'}
                        color='grey'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={passwordVisible}
                    />
                    <Pressable
                        onPress={() => setPasswordVisible(!passwordVisible)} style={{ backgroundColor: '#dfe4ea', marginTop: 10, padding: 1.5, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                        <View style={{ margin: 10 }}>
                            <Image
                                style={styles.eyeOffIcon}
                                contentFit="cover"
                                source={
                                    passwordVisible
                                        ? eye_off
                                        : eye_on
                                }
                            />
                        </View>
                    </Pressable>
                </View>
                {/* <TouchableOpacity style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 5, marginTop: 3 }}
                    onPress={() => navigation.navigate("ForgotPassword")}
                >
                    <Text style={{ color: 'black' }}>Forgot Password?</Text>
                </TouchableOpacity> */}
                {
                  disableVerifyPhnBtn == false
                  ?
                  <TouchableOpacity style={{ paddingVertical: 15, backgroundColor: '#b33939', borderRadius: 10, marginTop: 30 }}
                    onPress={() => handleLogin(email, password)}
                >
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Login</Text>
                </TouchableOpacity> :
                <Pressable style={{ paddingVertical: 15, backgroundColor: 'grey', borderRadius: 10, marginTop: 30 }}
            >
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Login</Text>
            </Pressable>

                }
                
            </View>
        </View>
    </View>
</ScrollView>
    // <View style={styles.signInEmptyState}>
    //   <View style={[styles.text, styles.textPosition]}>
    //     <Text style={[styles.tittle, styles.tittleClr]}>Sign In</Text>
    //     <Text style={styles.body}>
    //       <Text style={styles.useTheSame}>
    //         Use the same method that you created your
    //       </Text>
    //        account with.
    //     </Text>
    //   </View>
    //   <View style={[styles.container, styles.textPosition]}>
    //     <View style={styles.buttonSocial}>
    //       <View style={[styles.paymentComponents, styles.buttonsFlexBox]}>
    //         <Image
    //           style={styles.appleIcon}
    //           contentFit="cover"
    //           source={apple_logo}
    //         />
    //         <Text style={[styles.continueWithApple, styles.text3Typo]}>
    //           Continue with Apple
    //         </Text>
    //       </View>
    //       <Pressable 
    //       // onPress={() => navigation.navigate("dashboard")}
    //       >
    //       <View style={[styles.paymentComponents1, styles.paymentBorder]}>
    //         <Image
    //           style={styles.googleIcon}
    //           contentFit="cover"
    //           source={google_logo}
    //         />
    //         <Text style={[styles.continueWithApple, styles.text3Typo]}>
    //           Continue with Google
    //         </Text>
    //       </View>
    //       </Pressable>
    //     </View>
    //     <View style={[styles.orSignUpWithEmail, styles.inputFlexBox1]}>
    //       <View style={styles.signLayout} />
    //       <Text style={[styles.orSignUp, styles.emailTypo]}>
    //         Or sign up with email
    //       </Text>
    //       <View style={[styles.orSignUpWithEmailItem, styles.signLayout]} />
    //     </View>
    //     <View style={[styles.input, styles.inputFlexBox1]}>
    //       <View style={[styles.inputFields1,styles.inputFlexBox]}>
    //       <GestureHandlerRootView
    //         >
    //         <TextInput style={[styles.email, styles.emailTypo]} 
    //         onChangeText={(email)=>setEmail(email)}
    //          placeholder="Email" 
    //          autoCapitalize="none"
    //          placeholderTextColor = "grey"
    //          />
    //       </GestureHandlerRootView>
    //       </View>
          
    //       <View style={[styles.inputFields1, styles.inputFlexBox]}>
    //         <GestureHandlerRootView
    //         style={[styles.password, styles.emailTypo]}>
    //         <TextInput style={[styles.password, styles.emailTypo]}
    //         onChangeText={(password)=>setPassword(password)}
    //          placeholder="Password" secureTextEntry={passwordVisible} placeholderTextColor = "grey"
    //     autoCapitalize="none"/>
    //       </GestureHandlerRootView>
    //       <TouchableOpacity onPress={()=>setPasswordVisible(!passwordVisible)}>
    //       <Image
    //           style={styles.eyeOffIcon}
    //           contentFit="cover"
    //           source={passwordVisible?eye_off:eye_on}
    //         />
            
    //       </TouchableOpacity>
            
    //       </View>
    //       <TouchableOpacity onPress={()=>handleLogin(email,password)} style={[styles.buttons, styles.buttonsFlexBox]}>
    //         <Text 
    //         style={styles.buttonText}
    //          >Sign in</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff9f1a',
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
    marginHorizontal: 20
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
progressText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
}
});

export default SignInForNewUser;
