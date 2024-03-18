import * as React from 'react';
import {Alert, Image} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ScrollView
} from 'react-native';
// import { LinearGradient } from "expo-linear-gradient";
import {useNavigation, StackActions} from '@react-navigation/native';
import {Padding, Border, Color, FontSize, FontFamily} from '../GlobalStyles';
import {GestureHandlerRootView, TextInput} from 'react-native-gesture-handler';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {app} from '../firebaseConfig';
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


const SignUpScreen = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = React.useState(true);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userInfo, setUserInfo] = React.useState(null);
  const [error, setError] = React.useState();

  // const [initializing,setInitializing] = React.useState(true)
  // const [user,setUser] = React.useState()
  const displayUserInfo = info => {
    return (
      <Text style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
  // const auth = getAuth(app
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log(googleCredential);
      return auth()
        .signInWithCredential(googleCredential)
        .then(() => {
          navigation.dispatch(StackActions.replace('Home'));
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const handleSignUp = async (email, password, name) => {
    const auth = getAuth(app);
    // const db = getFirestore(app);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        if (email.length > 0 && password.length > 0) {
          await AsyncStorage.setItem('NAME', name);
          await AsyncStorage.setItem('PRE-USR-EMAIL',email);
          navigation.dispatch(StackActions.replace('VerifyAccount'));
        } else {
          Alert.alert('Please enter all data');
        }
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
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
                <Text style={{ color: 'grey', fontWeight: 'bold' }}>Full Name</Text>
                <TextInput
                    style={styles.emailInput}
                    placeholder='John Doe'
                    placeholderTextColor={'grey'}
                    color='grey'
                />
                <Text style={{ color: 'grey', fontWeight: 'bold', marginTop: 10 }}>Email Address</Text>
                <TextInput
                    style={styles.emailInput}
                    placeholder='Enter Email'
                    placeholderTextColor={'grey'}
                    color='grey'
                />
                <Text style={{ color: 'grey', fontWeight: 'bold', marginTop: 10 }}>Password</Text>
                <TextInput
                    style={styles.emailInput}
                    placeholder='Enter Password'
                    placeholderTextColor={'grey'}
                    color='grey'
                />
                <TouchableOpacity style={{ paddingVertical: 15, backgroundColor: '#b33939', borderRadius: 10, marginTop: 20 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'grey', paddingVertical: 5, fontSize: 25 }}>Or</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 45 }}>
                <TouchableOpacity style={{ backgroundColor: '#dfe4ea', borderRadius: 15 }}>
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
                <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 15 }}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={{ fontWeight: 'bold', color: '#ff9f1a', fontSize: 15 }}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
</ScrollView>
    // <View style={[styles.SignUpScreen, styles.iconLayout]}>
    //   <View style={[styles.text, styles.textPosition]}>
    //     <Text style={[styles.tittle, styles.tittleClr]}>Sign Up</Text>
    //   </View>
    //   <View style={styles.container}>
    //     <View style={styles.buttonSocial}>
    //       <View style={[styles.paymentComponents, styles.inputFieldsFlexBox]}>
    //         <Image
    //           style={styles.appleIcon}
    //           contentFit="cover"
    //           source={apple_logo}
    //         />
    //         <Text style={[styles.continueWithApple, styles.headerFlexBox]}>
    //           Continue with Apple
    //         </Text>
    //       </View>
    //       <TouchableOpacity onPress={signIn}>
    //         <View style={[styles.paymentComponents1, styles.paymentBorder]}>
    //           <Image
    //             style={[styles.googleIcon, styles.googleIconLayout]}
    //             contentFit="cover"
    //             source={google_logo}
    //           />
    //           <Text style={[styles.continueWithApple, styles.headerFlexBox]}>
    //             Continue with Google
    //           </Text>
    //         </View>
    //       </TouchableOpacity>
    //     </View>
    //     <View
    //       style={[styles.orSignUpWithEmail, styles.orSignUpWithEmailFlexBox]}>
    //       <View style={styles.signLayout} />
    //       <Text style={[styles.orSignUp, styles.nameClr]}>
    //         Or sign up with email
    //       </Text>
    //       <View style={[styles.orSignUpWithEmailItem, styles.signLayout]} />
    //     </View>
    //     <View style={styles.input}>
    //       <View style={[styles.inputFields, styles.inputSpaceBlock]}>
    //         <GestureHandlerRootView>
    //           <TextInput
    //             placeholder="Name"
    //             style={[styles.name, styles.nameTypo]}
    //             value={name}
    //             placeholderTextColor={'grey'}
    //             onChangeText={txt => setName(txt)}
    //           />
    //         </GestureHandlerRootView>
    //       </View>
    //       <View style={[styles.inputFields1, styles.inputFlexBox]}>
    //         <GestureHandlerRootView>
    //           <TextInput
    //             style={[styles.email, styles.emailTypo]}
    //             placeholder="Email"
    //             autoCapitalize="none"
    //             value={email}
    //             placeholderTextColor={'grey'}
    //             onChangeText={txt => setEmail(txt)}
    //             color = "grey"
    //           />
    //         </GestureHandlerRootView>
    //       </View>
    //       <View style={[styles.inputFields1, styles.inputFlexBox]}>
    //         <GestureHandlerRootView>
    //           <TextInput
    //             placeholder="Password"
    //             secureTextEntry={passwordVisible}
    //             value={password}
    //             placeholderTextColor={'grey'}
    //             onChangeText={txt => setPassword(txt)}
    //             autoCapitalize="none"
    //             color = "grey"
    //           />
    //         </GestureHandlerRootView>
    //         <TouchableOpacity
    //           onPress={() => setPasswordVisible(!passwordVisible)}>
    //           <Image
    //             style={styles.eyeOffIcon}
    //             contentFit="cover"
    //             source={
    //               passwordVisible
    //                 ? eye_off
    //                 : eye_on
    //             }
    //           />
    //         </TouchableOpacity>
    //       </View>
    //       <TouchableOpacity
    //         style={[styles.buttons, styles.buttonsFlexBox]}
    //         onPress={() => {
    //           handleSignUp(email, password, name);
    //         }}
    //         // onPress={()=>getUserData()}
    //       >
    //         <Text style={styles.buttonText}>Create account</Text>
    //       </TouchableOpacity>
    //     </View>
    //     <Pressable
    //       style={styles.signIn}
    //       onPress={() =>
    //         navigation.dispatch(StackActions.replace('SignInEmptyState'))
    //       }>
    //       <Text style={styles.text}>
    //         <Text style={styles.alreadyHaveAn}>Already have an account?</Text>
    //         <Text style={[styles.text1, styles.textTypo]}> </Text>
    //         <Text style={[styles.text1, styles.textTypo]}>
    //           <Text style={styles.signIn2}>Sign In</Text>
    //         </Text>
    //       </Text>
    //     </Pressable>
    //   </View>
    // </View>
  );
};

// const styles = StyleSheet.create({
//   iconLayout: {
//     width: '100%',
//     overflow: 'hidden',
//   },
//   inputFlexBox: {
//     paddingHorizontal: Padding.p_lg,
//     justifyContent: 'space-between',
//     height: 56,
//     backgroundColor: Color.inputField,
//     paddingVertical: Padding.p_5xs,
//     alignItems: 'center',
//     flexDirection: 'row',
//     borderRadius: Border.br_xs,
//     alignSelf: 'stretch',
//     marginTop: 10,
//   },
//   inputFieldsFlexBox: {
//     paddingVertical: Padding.p_5xs,
//     alignItems: 'center',
//     flexDirection: 'row',
//     borderRadius: Border.br_xs,
//     alignSelf: 'stretch',
//   },
//   headerFlexBox: {
//     textAlign: 'center',
//     letterSpacing: 0,
//   },
//   paymentBorder: {
//     paddingHorizontal: 0,
//     borderWidth: 1,
//     borderColor: Color.stroke,
//     borderStyle: 'solid',
//     justifyContent: 'center',
//     backgroundColor: Color.background,
//   },
//   googleIconLayout: {
//     height: 24,
//     width: 24,
//   },
//   orSignUpWithEmailFlexBox: {
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   nameClr: {
//     color: Color.inputLabel,
//     lineHeight: 20,
//     fontSize: FontSize.bodyMediumRegular_size,
//   },
//   signLayout: {
//     height: 1,
//     backgroundColor: Color.inputField,
//     borderRadius: Border.br_31xl,
//     flex: 1,
//   },
//   inputSpaceBlock: {
//     paddingHorizontal: Padding.p_lg,
//     height: 56,
//     backgroundColor: Color.inputField,
//   },
//   nameTypo: {
//     textAlign: 'left',
//     fontFamily: FontFamily.bodyLargeBold,
//     letterSpacing: 0,
//   },
//   buttonsFlexBox: {
//     marginTop: 12,
//     paddingVertical: Padding.p_5xs,
//     alignItems: 'center',
//     flexDirection: 'row',
//     borderRadius: Border.br_xs,
//     alignSelf: 'stretch',
//   },
//   textTypo: {
//     fontWeight: '700',
//     fontFamily: FontFamily.bodyLargeBold,
//   },
//   iconPosition: {
//     top: '50%',
//     position: 'absolute',
//   },
//   headerPosition: {
//     top: 16,
//     position: 'absolute',
//   },
//   appleIcon: {
//     width: 40,
//     height: 40,
//     overflow: 'hidden',
//   },
//   continueWithApple: {
//     marginLeft: 8,
//     color: Color.textBlack,
//     fontFamily: FontFamily.bodyLargeBold,
//     fontWeight: '500',
//     lineHeight: 22,
//     fontSize: FontSize.bodyLargeBold_size,
//     letterSpacing: 0,
//     textAlign: 'center',
//   },
//   paymentComponents: {
//     paddingHorizontal: 0,
//     borderWidth: 1,
//     borderColor: Color.stroke,
//     borderStyle: 'solid',
//     justifyContent: 'center',
//     backgroundColor: Color.background,
//   },
//   googleIcon: {
//     overflow: 'hidden',
//   },
//   paymentComponents1: {
//     paddingVertical: Padding.p_base,
//     marginTop: 8,
//     alignItems: 'center',
//     flexDirection: 'row',
//     borderRadius: Border.br_xs,
//     alignSelf: 'stretch',
//     paddingHorizontal: 0,
//     borderWidth: 1,
//     borderColor: Color.stroke,
//     borderStyle: 'solid',
//   },
//   buttonSocial: {
//     width: 334,
//   },
//   orSignUp: {
//     marginLeft: 12,
//     textAlign: 'center',
//     letterSpacing: 0,
//     fontFamily: FontFamily.bodyLargeBold,
//   },
//   orSignUpWithEmailItem: {
//     marginLeft: 12,
//   },
//   orSignUpWithEmail: {
//     marginTop: 48,
//     justifyContent: 'center',
//     width: 334,
//   },
//   name: {
//     color: Color.inputLabel,
//     lineHeight: 20,
//     fontSize: FontSize.bodyMediumRegular_size,
//   },
//   inputFields: {
//     paddingVertical: Padding.p_5xs,
//     alignItems: 'center',
//     flexDirection: 'row',
//     borderRadius: Border.br_xs,
//     alignSelf: 'stretch',
//   },
//   email: {
//     // color: Color.inputLabel,
//     lineHeight: 20,
//     fontSize: FontSize.bodyMediumRegular_size,
//     flex: 1,
//   },
//   arrowsIcon: {
//     width: 9,
//     height: 18,
//     display: 'none',
//   },
//   inputFields1: {
//     justifyContent: 'space-between',
//     paddingHorizontal: Padding.p_lg,
//     height: 56,
//     backgroundColor: Color.inputField,
//   },
//   eyeOffIcon: {
//     width: 20,
//     height: 20,
//     overflow: 'hidden',
//   },
//   buttonText: {
//     color: Color.background,
//     textAlign: 'center',
//     letterSpacing: 0,
//     lineHeight: 22,
//     fontSize: FontSize.bodyLargeBold_size,
//     fontWeight: '700',
//   },
//   buttons: {
//     height: 60,
//     paddingHorizontal: Padding.p_29xl,
//     backgroundColor: '#1dac92',
//     justifyContent: 'center',
//   },
//   input: {
//     marginTop: 48,
//     width: 334,
//   },
//   alreadyHaveAn: {
//     color: Color.textBlack,
//     fontFamily: FontFamily.bodyLargeBold,
//   },
//   text1: {
//     color: Color.colorLightseagreen,
//   },
//   signIn2: {
//     textDecoration: 'underline',
//   },
//   text: {
//     lineHeight: 20,
//     fontSize: FontSize.bodyMediumRegular_size,
//     textAlign: 'center',
//     letterSpacing: 0,
//     alignSelf: 'stretch',
//   },
//   signIn: {
//     marginTop: 48,
//   },
//   container: {
//     top: 160,
//     left: 15,
//     position: 'absolute',
//   },
//   text2: {
//     marginTop: -11,
//     left: 23,
//     textAlign: 'left',
//     fontFamily: FontFamily.bodyLargeBold,
//     letterSpacing: 0,
//     color: Color.textBlack,
//     fontWeight: '500',
//     lineHeight: 22,
//     fontSize: FontSize.bodyLargeBold_size,
//   },
//   mobileSignalIcon: {
//     marginTop: -1.5,
//     right: 76,
//     width: 18,
//     height: 10,
//   },
//   wifiIcon: {
//     marginTop: -3,
//     right: 56,
//     width: 15,
//     height: 11,
//   },
//   batteryIcon: {
//     marginTop: -4,
//     right: 23,
//     width: 27,
//     height: 13,
//   },
//   topBar1: {
//     height: 44,
//     width: 375,
//   },
//   icon: {
//     height: '100%',
//     overflow: 'hidden',
//   },
//   chevronLeft: {
//     left: 18,
//     height: 24,
//     width: 24,
//   },
//   header: {
//     left: 155,
//     fontSize: FontSize.bodyXlargeBold_size,
//     lineHeight: 25,
//     fontWeight: '700',
//     fontFamily: FontFamily.bodyLargeBold,
//     textAlign: 'center',
//     letterSpacing: 0,
//     color: Color.textBlack,
//   },
//   appbar: {
//     width: 375,
//     height: 56,
//     overflow: 'hidden',
//   },
//   progressBarIcon: {
//     height: 5,
//     width: 375,
//     display: 'none',
//   },
//   topBar: {
//     top: 0,
//     left: 0,
//     position: 'absolute',
//   },
//   SignUpScreen: {
//     height: 812,
//     overflow: 'hidden',
//     flex: 1,
//     backgroundColor: Color.background,
//     width: '100%',
//   },
//   tittle: {
//     fontSize: FontSize.h4Bold_size,
//     lineHeight: 29,
//     textAlign: 'center',
//     fontWeight: '700',
//     letterSpacing: 0,
//     color: Color.textBlack,
//     fontFamily: FontFamily.bodyLargeBold,
//     alignSelf: 'stretch',
//     marginTop: 80,
//   },
//   tittleClr: {
//     color: Color.textBlack,
//     fontFamily: FontFamily.bodyLargeBold,
//   },
// });
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
  }

})

export default SignUpScreen;
