import * as React from 'react';
import { Alert, Image, Modal } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ScrollView
} from 'react-native';
// import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, StackActions } from '@react-navigation/native';
import { Padding, Border, Color, FontSize, FontFamily } from '../GlobalStyles';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { app } from '../firebaseConfig';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
} from 'firebase/auth';
// import { collection, addDoc, getDocs } from 'firebase/firestore';
// import { getFirestore } from "@firebase/firestore";
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apple_logo, eye_off, eye_on, google_logo } from './common/AllImages';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Progress from './common/ProgressBar';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import axios from 'axios';



const SignUpScreen = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = React.useState(true);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userInfo, setUserInfo] = React.useState(null);
  const [error, setError] = React.useState();
  const [progress, setProgress] = React.useState(0);
  const [progressBarVisible, setProgressBarVisible] = React.useState(false)
  const [googleAccData, setGoogleAccData] = React.useState(null);


  // const [initializing,setInitializing] = React.useState(true)
  // const [user,setUser] = React.useState()
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
  const displayUserInfo = info => {
    return (
      <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {info}
      </Text>
    );
  };

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '371575297728-9d6gulie57u58jpi00v0nteqi015sfio.apps.googleusercontent.com',
    });
  }, []);
  const loaderFunction = () => {
    function updateProgress() {
      setProgress((currentProgress) => {
        if (currentProgress < 0.8) {
          setTimeout(updateProgress, 200)
        };
        return currentProgress + 0.01;
      })
    };
    updateProgress();
  }
  const loaderFunctionForGoogleSignIn = () => {
    function updateProgress() {
      setProgress((currentProgress) => {
        if (currentProgress < 0.8) {
          setTimeout(updateProgress, 1000)
        };
        return currentProgress + 0.1;
      })
    };
    updateProgress();
  }
  // const auth = getAuth(app
  const signIn = async () => {
    try {
      loaderFunctionForGoogleSignIn();
      setProgressBarVisible(true)
      setTimeout(async () => {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // setProgressBarVisible(false)
        const {idToken, user} = await GoogleSignin.signIn();
        let name = user.name;
        let email = user.email;
        let ggl_user_profile = user.photo;
        var last_login_date = getCurrentDate();
        fetch('https://bugle.co.in/moksh/public/api/user-management/store', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name , email, last_login_date }),
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
        return auth()
          .signInWithCredential(googleCredential)
          .then(() => {
            AsyncStorage.setItem('GGL-LOGIN-USER', JSON.stringify(googleCredential));
            navigation.dispatch(StackActions.replace('Home'));
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


  const handleSignUp = async (email, password, name) => {


    const auth = getAuth(app);
    var last_login_date = getCurrentDate();
    // const db = getFirestore(app);
    if (email.length > 0 && password.length > 0) {
      loaderFunction();
      setProgressBarVisible(true)
      createUserWithEmailAndPassword(auth, email, password)
        .then(async () => {
          if (email.length > 0 && password.length > 0) {
            await AsyncStorage.setItem('NAME', name);
            fetch('https://bugle.co.in/moksh/public/api/user-management/store', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, email, last_login_date }),
            })
              .then(response => response.json())
              .then(data => {
                console.log(data); // Handle response from backend
                 AsyncStorage.setItem('PRE-USR-EMAIL', email);
                navigation.dispatch(StackActions.replace('VerifyAccount'));
              })
              .catch(error => {
                console.error('Error:', error);
              });
          } else {
            Alert.alert('Please enter all data');
          }
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert("Email Already Exists")
            setProgressBarVisible(false)
            setProgress(0)
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert("Please Enter a Valid Email")
            setProgressBarVisible(false)
            setProgress(0)
          }
          if (error.code === 'auth/weak-password') {
            Alert.alert("Please select greater than 6 digits")
            setProgressBarVisible(false)
            setProgress(0)
          }
          console.error(error);
        });
    }
    else {
      Alert.alert('Please enter all data')
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <SafeAreaView style={{ display: 'flex' }}>
          <View style={styles.bckbtnView}>
            <TouchableOpacity style={styles.back_icon} onPress={() => navigation.goBack()}>
              <Feather name='arrow-left' size={25} color='white' />
            </TouchableOpacity>
          </View>
          <View style={[styles.imgView, { height: "25%" }]}>
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
            <Text style={{ color: 'grey', fontWeight: 'bold' }}>Full Name</Text>
            <TextInput
              style={styles.emailInput}
              placeholder='John Doe'
              placeholderTextColor={'grey'}
              color='grey'
              value={name}
              onChangeText={text => setName(text)}
            />
            <Text style={{ color: 'grey', fontWeight: 'bold', marginTop: 10 }}>Email Address</Text>
            <TextInput
              style={styles.emailInput}
              placeholder='Enter Email'
              placeholderTextColor={'grey'}
              color='grey'
              value={email}
              onChangeText={text => setEmail(text)}
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
            <TouchableOpacity style={{ paddingVertical: 15, backgroundColor: '#b33939', borderRadius: 10, marginTop: 20 }}
              onPress={() => {
                handleSignUp(email, password, name);
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'grey', paddingVertical: 5, fontSize: 25 }}>Or</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 45 }}>
            <TouchableOpacity style={{ backgroundColor: '#dfe4ea', borderRadius: 15 }} onPress={() => signIn()}>
              <Image source={require('../assets/google-icon.png')} style={{ width: 60, height: 60 }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#dfe4ea', borderRadius: 15 }}>
              <Image source={require('../assets/apple-icon.png')} style={{ width: 60, height: 60 }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#dfe4ea', borderRadius: 15 }}>
              <Image source={require('../assets/facebook-icon.png')} style={{ width: 60, height: 60 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 7 }}>
            <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 15 }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={{ fontWeight: 'bold', color: '#ff9f1a', fontSize: 15 }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
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
  }
})

export default SignUpScreen;
