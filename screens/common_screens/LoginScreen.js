import * as React from "react";
import { Dimensions, Text, StyleSheet, View, Pressable, TextInput, TouchableOpacity, Alert } from "react-native";
import { Image } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import { CommonActions, StackActions, useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import HomeScreen from "./dashboard";
import { app } from "../../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { apple_logo, eye_off, eye_on, google_logo } from "./common/AllImages";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from 'react-native-vector-icons/Feather';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import LinearGradient from "react-native-linear-gradient";
import Loading from "../common/ProgressBar";

// import firebase from "expo-firebase-app/src/firebase";

const { width, height } = Dimensions.get('window')
const LoginScreen = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordVisible, setPasswordVisible] = React.useState(true)
  const [progressBarVisible, setProgressBarVisible] = React.useState(false)
  const [progress, setProgress] = React.useState(0);
  const navigation = useNavigation();
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
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '371575297728-9d6gulie57u58jpi00v0nteqi015sfio.apps.googleusercontent.com',
    });
  }, []);
  const signIn = async () => {
    const auth = getAuth(app);
    try {
      loaderFunctionForGoogleSignIn();
      setProgressBarVisible(true)
      setTimeout(() => {
        setProgressBarVisible(false)
        setProgress(0)
      }, 4000)
      setTimeout(async () => {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // setProgressBarVisible(false)
        const { idToken, user } = await GoogleSignin.signIn();
        let name = user.name;
        let email = user.email;
        let ggl_user_profile = user.photo;
        let uid = user.id;
        var last_login_date = getCurrentDate();
        fetch('https://bugle.co.in/moksh/public/api/user-management/store', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, last_login_date }),
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            AsyncStorage.setItem('NAME', name);
            AsyncStorage.setItem('GGL_USER_PHOTO', ggl_user_profile)
          })
          .catch(error => {
            console.error('Error:', error);
          });
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        auth().onAuthStateChanged(async(user) => {
          if(user)
          {
            await AsyncStorage.setItem('UID', user.uid);
          }
        })
        return auth()
          .signInWithCredential(googleCredential)
          .then(() => {
            AsyncStorage.setItem('GGL-LOGIN-USER', JSON.stringify(googleCredential));
            AsyncStorage.setItem('UID', auth?.currentUser?.uid)
            console.log("The user ggl id is", uid)
            navigation.dispatch(CommonActions.reset({
              index: 0,
              routes: [
                { name: 'Home' },
              ],
            }));
            console.log("Sign in Successfully")
          });
      }, 3000)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("Sign In Canceled By user")
        setProgressBarVisible(false)
        setProgress(0);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("Sign In Progress")
        setProgressBarVisible(false)
        setProgress(0);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Google Services not avaialable")
        setProgressBarVisible(false)
        setProgress(0);
      } else {
        Alert.alert("An Unkown Error occured! Please try again later")
        setProgressBarVisible(false)
        setProgress(0);
      }
    }
  };
  const getCurrentDate = () => {

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  const loaderFunctionForGoogleSignIn = () => {
    function updateProgress() {
      setProgress((currentProgress) => {
        if (currentProgress < 0.8) {
          setTimeout(updateProgress, 400)
        };
        return currentProgress + 0.01;
      })
    };
    updateProgress();
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
  const handleLogin = async (email, password) => {
    const auth = getAuth(app);
    if (email.length > 0 && password.length > 0) {
      loaderFunction();
      setProgressBarVisible(true)

      signInWithEmailAndPassword(auth, email, password)
        .then(async () => {

          await AsyncStorage.setItem('EMAIL', email);
          await AsyncStorage.setItem('PASSWORD', password);
          await AsyncStorage.setItem('UID', auth?.currentUser?.uid)
          navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Home' },
            ],
          }));
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            Alert.alert("Please Enter a Valid Email")
            setProgressBarVisible(false)
            setProgress(0)
          }
          if (error.code === 'auth/wrong-password') {
            Alert.alert('The password is invalid. Please try again.');
            setProgressBarVisible(false)
            setProgress(0)
          }
          if (error.code === 'auth/invalid-credential') {
            Alert.alert('In valid Credentials');
            setProgressBarVisible(false)
            setProgress(0)
          }

          console.error(error);
        });
    }
    else {
      Alert.alert("Please enter all data")
    }
  };
  return (
    <LinearGradient colors={['#ffa601', '#ff8f00', '#fe6d01']} style={styles.linearGradient}>

      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: height * 0.1 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: '10%' }}>
            {/* <FontAwesome name='camera' color='#fff1c9' size = {45}/> */}
            <Image source={require('../../assets/mala.png')} style={{ width: 100, height: 100 }} />
          </View>
        </View>
        <View style={{ width: '100%', backgroundColor: '#ffa11b', borderRadius: 5 }}>
          <TextInput
            placeholder='Email'
            placeholderTextColor={'#fff1c9'}
            style={{ paddingLeft: 10, borderBottomWidth: 2, borderColor: '#fed06f', fontSize: 16 }}
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            placeholder='Password'
            placeholderTextColor={'#fff1c9'}
            style={{ paddingLeft: 10, fontSize: 16 }}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={passwordVisible}
          />
        </View>
        {
          progressBarVisible ?
            <Loading />
            : null
        }
        <View style={{ marginTop: '7%', width: '90%', alignSelf: 'center' }}>
          <TouchableOpacity style={{ backgroundColor: '#fefffe', justifyContent: 'center', alignItems: 'center', height: 45, width: '100%', borderRadius: 5 }}
            onPress={() => handleLogin(email, password)}
          >
            <Text style={{ fontSize: 20, color: '#fa8526', fontWeight: 'bold' }}>Log In</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{ marginTop: '10%', width: '90%', alignSelf: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{ color: '#fefffe', fontSize: 15 }}>Forgot Password?</Text>
        </TouchableOpacity>
        {/* <View style={{ marginTop: '10%', width: '90%', alignSelf: 'center' }}>
          <Pressable style={{ backgroundColor: '#1979f3', alignItems: 'center', justifyContent: 'center', height: 55, width: '100%', borderRadius: 5 }}
            onPress={() => signIn()}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#fff', width: 40, height: 40, borderRadius: 5 }}>
                <Image source={require('../../assets/google-icon.png')} style={{ width: 40, height: 40 }} />
              </View>
              <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
                <Text style={{ fontSize: 20, color: '#fff' }}>Sign in with Google</Text>
              </View>
            </View>

          </Pressable>
        </View> */}
        <TouchableOpacity style={{ width: '90%', alignSelf: 'center', alignItems: 'center', marginTop: '15%', bottom: 10 }} onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={{ color: '#fefffe', fontSize: 15 }}>Don't have an account?<Text style={{ fontWeight: 'bold' }}>Sign Up</Text></Text>
        </TouchableOpacity>
      </ScrollView>

    </LinearGradient>
    // <ScrollView showsVerticalScrollIndicator={false}>
    //     <View style={styles.container}>
    //         <SafeAreaView style={{ display: 'flex' }}>
    //             <View style={styles.bckbtnView}>
    //                 <TouchableOpacity style={styles.back_icon} onPress={() => navigation.goBack()}>
    //                     <Feather name='arrow-left' size={25} color='white' />
    //                 </TouchableOpacity>
    //             </View>
    //             <View style={styles.imgView}>
    //                 <Image source={require('../assets/maharaj-hand-img.png')} />
    //             </View>
    //         </SafeAreaView>
    //         <View style={styles.loginView}>
    //             <View style={styles.loginForm}>
    //                 {
    //                     progressBarVisible ?
    //                         <View>
    //                             <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
    //                             <ProgressBar {...progressProps} progress={progress} />
    //                         </View>
    //                         : null
    //                 }
    //                 <Text style={{ color: 'grey', fontWeight: 'bold' }}>Email Address</Text>
    //                 <TextInput
    //                     style={styles.emailInput}
    //                     placeholder='Enter Email'
    //                     placeholderTextColor={'grey'}
    //                     color='grey'
    //                     onChangeText={(email) => setEmail(email)}
    //                 />
    //                 <Text style={{ color: 'grey', fontWeight: 'bold', marginTop: 10 }}>Password</Text>
    //                 <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', }}>
    //                     <TextInput
    //                         style={styles.passInput}
    //                         placeholder='Enter Password'
    //                         placeholderTextColor={'grey'}
    //                         color='grey'
    //                         value={password}
    //                         onChangeText={text => setPassword(text)}
    //                         secureTextEntry={passwordVisible}
    //                     />
    //                     <Pressable
    //                         onPress={() => setPasswordVisible(!passwordVisible)} style={{ backgroundColor: '#dfe4ea', marginTop: 10, padding: 1.5, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
    //                         <View style={{ margin: 10 }}>
    //                             <Image
    //                                 style={styles.eyeOffIcon}
    //                                 contentFit="cover"
    //                                 source={
    //                                     passwordVisible
    //                                         ? eye_off
    //                                         : eye_on
    //                                 }
    //                             />
    //                         </View>
    //                     </Pressable>
    //                 </View>
    //                 <TouchableOpacity style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 5, marginTop: 3 }}
    //                     onPress={() => navigation.navigate("ForgotPassword")}
    //                 >
    //                     <Text style={{ color: 'black' }}>Forgot Password?</Text>
    //                 </TouchableOpacity>
    //                 <TouchableOpacity style={{ paddingVertical: 15, backgroundColor: '#b33939', borderRadius: 10, marginTop: 10 }}
    //                     onPress={() => handleLogin(email, password)}
    //                 >
    //                     <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Login</Text>
    //                 </TouchableOpacity>
    //             </View>
    //             <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'grey', paddingVertical: 5, fontSize: 25 }}>Or</Text>
    //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 45 }}>
    //                 <TouchableOpacity style={{ backgroundColor: '#dfe4ea', borderRadius: 15 }} onPress={() => signIn()}>
    //                     <Image source={require('../assets/google-icon.png')} style={{ width: 60, height: 60 }} />
    //                 </TouchableOpacity>
    //                 <TouchableOpacity style={{ backgroundColor: '#dfe4ea', borderRadius: 15 }}>
    //                     <Image source={require('../assets/apple-icon.png')} style={{ width: 60, height: 60 }} />
    //                 </TouchableOpacity>
    //                 <TouchableOpacity style={{ backgroundColor: '#dfe4ea', borderRadius: 15 }}>
    //                     <Image source={require('../assets/facebook-icon.png')} style={{ width: 60, height: 60 }} />
    //                 </TouchableOpacity>
    //             </View>
    //             <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 7 }}>
    //                 <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 15 }}>Don't have an account?</Text>
    //                 <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
    //                     <Text style={{ fontWeight: 'bold', color: '#ff9f1a', fontSize: 15 }}>SignUp</Text>
    //                 </TouchableOpacity>
    //             </View>
    //         </View>
    //     </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
})
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#ff9f1a',
//     },
//     bckbtnView: {
//         flexDirection: 'row',
//         justifyContent: 'flex-start',
//     },
//     back_icon: {
//         backgroundColor: '#b33939',
//         padding: 10,
//         borderTopRightRadius: 15,
//         borderBottomLeftRadius: 15,
//         marginLeft: 20,
//         marginTop: 20,
//     },
//     imgView: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//     },
//     loginView: {
//         flex: 1,
//         backgroundColor: '#fff',
//         paddingHorizontal: 15,
//         paddingTop: 35,
//         borderTopLeftRadius: 50,
//         borderTopRightRadius: 50,
//         elevation: 10,
//     },
//     loginForm: {
//         marginHorizontal: 20
//     },
//     emailInput: {
//         padding: 10,
//         backgroundColor: '#dfe4ea',
//         borderRadius: 10,
//         marginTop: 10,
//     },
//     passInput: {
//         padding: 10,
//         backgroundColor: '#dfe4ea',
//         borderTopLeftRadius: 10,
//         borderBottomLeftRadius: 10,
//         marginTop: 10,
//         width: '90%',
//         flex: 1,
//     },
//     eyeOffIcon: {
//         width: 25,
//         height: 25,
//         alignItems: 'center',
//     },
//     progressText: {
//         fontSize: 20,
//         textAlign: 'center',
//         color: 'black',
//     }

// })



export default LoginScreen;

