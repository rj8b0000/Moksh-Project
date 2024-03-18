import * as React from "react";
import { Dimensions, Text, StyleSheet, View, Pressable, TextInput, TouchableOpacity, Alert } from "react-native";
import { Image } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Color, FontFamily, Padding, Border, FontSize } from "../GlobalStyles";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import HomeScreen from "./dashboard";
import { app } from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apple_logo, eye_off, eye_on, google_logo } from "./common/AllImages";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from 'react-native-vector-icons/Feather';




// import firebase from "expo-firebase-app/src/firebase";

const { width, height } = Dimensions.get('window')
const LoginScreen = () => {
  const navigation = useNavigation();
  return(
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
            <SafeAreaView style={{display: 'flex'}}>
                <View style={styles.bckbtnView}>
                    <TouchableOpacity style={styles.back_icon} onPress={() => navigation.goBack()}>
                        <Feather name='arrow-left' size={25} color = 'white'/>
                    </TouchableOpacity>
                </View>
                <View style={styles.imgView}>
                    <Image source={require('../assets/maharaj-hand-img.png')}/>
                </View>
            </SafeAreaView>
            <View style={styles.loginView}>
                <View style={styles.loginForm}>
                    <Text style={{color: 'grey',fontWeight: 'bold'}}>Email Address</Text>
                    <TextInput
                        style={styles.emailInput}
                        placeholder='Enter Email'
                        placeholderTextColor={'grey'}
                        color = 'grey'
                    />
                    <Text style={{color: 'grey',fontWeight: 'bold', marginTop: 10}}>Password</Text>
                    <TextInput
                        style={styles.emailInput}
                        secureTextEntry = {true}
                        placeholder='Enter Password'
                        placeholderTextColor={'grey'}
                        color = 'grey'
                    />
                    <TouchableOpacity style={{display: 'flex', alignItems: 'flex-end', marginBottom: 5, marginTop: 3}}>
                        <Text style={{color: 'black'}}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingVertical: 15, backgroundColor: '#b33939', borderRadius: 10, marginTop: 10}}>
                        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center'}}>Login</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{fontWeight: 'bold', textAlign: 'center', color: 'grey', paddingVertical: 5, fontSize: 25}}>Or</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',paddingHorizontal: 45}}>
                    <TouchableOpacity style={{backgroundColor: '#dfe4ea', borderRadius: 15}}>
                        <Image source={require('../assets/google-icon.png')} style={{width: 60, height: 60}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#dfe4ea', borderRadius: 15}}>
                        <Image source={require('../assets/apple-icon.png')} style={{width: 60, height: 60}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#dfe4ea', borderRadius: 15}}>
                        <Image source={require('../assets/facebook-icon.png')} style={{width: 60, height: 60}}/>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 7}}>
                    <Text style={{color: 'grey', fontWeight: 'bold', fontSize: 15}}>Don't have an account?</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                        <Text style={{fontWeight: 'bold', color: '#ff9f1a', fontSize: 15}}>SignUp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </ScrollView>
  );
  
  //   const navigation = useNavigation();
  //   const [email,setEmail] = React.useState('')
  //   const [password,setPassword] = React.useState('')

  //   function navigateToDashboard(){
  //     navigation.navigate("dashboard")
  //   }

  //   const handleLogin =  async (email, password) => {
  //     const auth = getAuth(app);
  //     // const db = getFirestore(app); 
  //     // console.log("Email =>", email)
  //     // console.log("Password => ", password)
  //     try{
  //       if(email.length > 0 && password.length > 0)
  //       {
  //         const user = await signInWithEmailAndPassword(auth, email, password);
  //         await AsyncStorage.setItem('EMAIL', email);
  //         await AsyncStorage.setItem('PASSWORD', password);
  //         // console.log(user)
  //         navigation.dispatch(StackActions.replace("Home"))

  //         // navigation.navigate("Home",{
  //         //   email: isUserLogin.user.email,
  //         //   uid: isUserLogin.user.uid
  //         // })
  //       }
  //       else{
  //         Alert.alert("Please enter all data")
  //       }
  //     }
  //     catch(error)
  //     {
  //       console.log(error)
  //     }
  // };

  //   const [passwordVisible, setPasswordVisible] = React.useState(true)
  //   return (

  //     <View style={styles.LoginScreen}>
  //       <View style={styles.main_container}>
  //       <View style={[styles.text, styles.textPosition]}>
  //         <Text style={[styles.tittle, styles.tittleClr]}>Sign In</Text>
  //         <Text style={styles.body}>
  //           <Text style={styles.useTheSame}>
  //             Use the same method that you created your
  //           </Text>
  //            account with.
  //         </Text>
  //       </View>
  //       <View style={[styles.container, styles.textPosition]}>
  //         <View style={styles.buttonSocial}>
  //           <View style={[styles.paymentComponents, styles.buttonsFlexBox]}>
  //             <Image
  //               style={styles.appleIcon}
  //               contentFit="cover"
  //               source={apple_logo}
  //             />
  //             <Text style={[styles.continueWithApple, styles.text3Typo]}>
  //               Continue with Apple
  //             </Text>
  //           </View>
  //           <Pressable 
  //           // onPress={() => navigation.navigate("dashboard")}
  //           >
  //           <View style={[styles.paymentComponents1, styles.paymentBorder]}>
  //             <Image
  //               style={styles.googleIcon}
  //               contentFit="cover"
  //               source={google_logo}
  //             />
  //             <Text style={[styles.continueWithApple, styles.text3Typo]}>
  //               Continue with Google
  //             </Text>
  //           </View>
  //           </Pressable>
  //         </View>
  //         <View style={[styles.orSignUpWithEmail, styles.inputFlexBox1]}>
  //           <View style={styles.signLayout} />
  //           <Text style={[styles.orSignUp, styles.emailTypo]}>
  //             Or sign up with email
  //           </Text>
  //           <View style={[styles.orSignUpWithEmailItem, styles.signLayout]} />
  //         </View>
  //         <View style={[styles.input, styles.inputFlexBox1]}>
  //           <View style={[styles.inputFields1,styles.inputFlexBox]}>
  //           <GestureHandlerRootView
  //             >
  //             {/* <Text style={[styles.email, styles.emailTypo]}>Email</Text> */}
  //             <TextInput style={[styles.email, styles.emailTypo]} 
  //             onChangeText={(email)=>setEmail(email)}
  //              placeholder="Email" 
  //              placeholderTextColor={"#94A3B8"}
  //              autoCapitalize="none"/>
  //           </GestureHandlerRootView>
  //           </View>

  //           <View style={[styles.inputFields1, styles.inputFlexBox]}>
  //             {/* <Text style={[styles.password, styles.emailTypo]}>Password</Text> */}
  //             <GestureHandlerRootView
  //             style={[styles.password, styles.emailTypo]}>
  //             <TextInput style={[styles.password, styles.emailTypo]}
  //             onChangeText={(password)=>setPassword(password)}
  //              placeholder="Password" secureTextEntry={passwordVisible}
  //              placeholderTextColor={"#94A3B8"}
  //         autoCapitalize="none"/>
  //           </GestureHandlerRootView>
  //           <TouchableOpacity onPress={()=>setPasswordVisible(!passwordVisible)}>
  //           <Image
  //               style={styles.eyeOffIcon}
  //               contentFit="cover"
  //               source={passwordVisible?eye_off:eye_on}
  //             />

  //           </TouchableOpacity>

  //           </View>
  //           <TouchableOpacity onPress={()=>handleLogin(email,password)} style={[styles.buttons, styles.buttonsFlexBox]}>
  //             <Text 
  //             style={styles.buttonText}
  //              >Sign in</Text>
  //           </TouchableOpacity>

  //           <Pressable
  //             style={styles.forgot}
  //             onPress={() => navigation.navigate("ForgotPassword")}
  //           >
  //             <Text style={[styles.forgotPassword, styles.text2Typo]}>
  //               Forgot password?
  //             </Text>
  //           </Pressable>
  //         </View>
  //         <Pressable
  //           style={styles.signIn}
  //           onPress={() =>navigation.dispatch(StackActions.replace("SignUpScreen"))
  //         }
  //         >
  //           <Text style={[styles.text1, styles.text1Typo]}>
  //             <Text style={styles.tittleClr}>Don't have an account?</Text>
  //             <Text style={styles.text2Typo}>{` `}</Text>
  //             <Text style={styles.text2Typo}>
  //               <Text style={styles.signUp1}>Sign Up</Text>
  //             </Text>
  //           </Text>
  //         </Pressable>
  //       </View>
  //       </View>
  //     </View>
  //   );
};


const styles = StyleSheet.create({
  container : {
      flex: 1,
      backgroundColor: '#ff9f1a',
  },
  bckbtnView : {
      flexDirection: 'row',
      justifyContent: 'flex-start',
  },
  back_icon:{
      backgroundColor:'#b33939',
      padding: 10,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      marginLeft: 20,
      marginTop: 20,
  },
  imgView : {
      flexDirection: 'row',
      justifyContent: 'center',
  },
  loginView : {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 15,
      paddingTop: 35,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      elevation: 10,
  },
  loginForm : {
      marginHorizontal: 20
  },
  emailInput : {
      padding: 10,
      backgroundColor: '#dfe4ea',
      borderRadius: 10,
      marginTop: 10,
  }

})

// const styles = StyleSheet.create({
//   textPosition: {
//     // left: 21,
//     // position: "absolute",
//     display: 'flex',
//     alignItems: 'center'
//   },
//   tittleClr: {
//     color: Color.textBlack,
//     fontFamily: FontFamily.bodyLargeBold,
//   },
//   buttonsFlexBox: {
//     paddingVertical: Padding.p_5xs,
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     borderRadius: Border.br_xs,
//     alignSelf: "stretch",
//   },
//   text3Typo: {
//     fontWeight: "500",
//     lineHeight: 22,
//     fontSize: FontSize.bodyLargeBold_size,
//     color: Color.textBlack,
//     fontFamily: FontFamily.bodyLargeBold,
//     letterSpacing: 0,
//   },
//   paymentBorder: {
//     paddingHorizontal: 0,
//     borderWidth: 1,
//     borderColor: Color.stroke,
//     borderStyle: "solid",
//     backgroundColor: Color.background,
//   },
//   inputFlexBox1: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   emailTypo: {
//     color: "#94A3B8",
//     lineHeight: 20,
//     fontSize: FontSize.bodyMediumRegular_size,
//     fontFamily: FontFamily.bodyLargeBold,
//     letterSpacing: 0,

//   },
//   signLayout: {
//     height: 1,
//     backgroundColor: Color.inputField,
//     borderRadius: Border.br_31xl,
//     flex: 1,
//   },
//   inputFlexBox: {
//     // color: 'black',
//     paddingHorizontal: Padding.p_lg,
//     justifyContent: "space-between",
//     height: 56,
//     backgroundColor: Color.inputField,
//     paddingVertical: Padding.p_5xs,
//     alignItems: "center",
//     flexDirection: "row",
//     borderRadius: Border.br_xs,
//     alignSelf: "stretch",
//   },
//   text2Typo: {
//     color: Color.colorLightseagreen,
//     fontFamily: FontFamily.bodyLargeBold,
//     fontWeight: "700",
//   },
//   text1Typo: {
//     lineHeight: 20,
//     fontSize: FontSize.bodyMediumRegular_size,
//     textAlign: "center",
//     letterSpacing: 0,
//   },
//   iconPosition: {
//     top: "50%",
//     position: "absolute",
//   },
//   tittle: {
//     fontSize: FontSize.h4Bold_size,
//     lineHeight: 29,
//     textAlign: "center",
//     fontWeight: "700",
//     letterSpacing: 0,
//     color: Color.textBlack,
//     fontFamily: FontFamily.bodyLargeBold,
//     alignSelf: "stretch",

//   },
//   useTheSame: {
//     marginBottom: 20,
//   },
//   body: {
//     flex: 1,
//     color: Color.textBody,
//     marginTop: 40,
//     lineHeight: 20,
//     fontSize: FontSize.bodyMediumRegular_size,
//     textAlign: "center",
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     fontFamily: FontFamily.bodyLargeBold,
//     letterSpacing: 0,
//     // alignSelf: "stretch",
//   },
//   text: {
//     display: 'flex',
//     flex: 1,
//     top: 80,
//     width: 334,
//     // justifyContent: 'center',
//     // backgroundColor: 'green',
//     alignItems: 'center'
//   },
//   appleIcon: {
//     width: 40,
//     height: 40,
//     overflow: "hidden",
//   },
//   continueWithApple: {
//     marginLeft: 8,
//     textAlign: "center",
//   },
//   paymentComponents: {
//     paddingHorizontal: 0,
//     borderWidth: 1,
//     borderColor: Color.stroke,
//     borderStyle: "solid",
//     backgroundColor: Color.background,
//     },
//   googleIcon: {
//     width: 24,
//     height: 24,
//     overflow: "hidden",
//   },
//   paymentComponents1: {
//     paddingVertical: Padding.p_base,
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     borderRadius: Border.br_xs,
//     paddingHorizontal: 0,
//     borderWidth: 1,
//     borderColor: Color.stroke,
//     borderStyle: "solid",
//     marginTop: 8,
//     alignSelf: "stretch",
//     marginBottom: 30,

//   },
//   buttonSocial: {
//     width: 334,
//     justifyContent: 'center',

//     // alignContent: 'center'
//     // alignItems: 'center'
//   },
//   orSignUp: {
//     marginLeft: 12,
//     textAlign: "center",
//   },
//   orSignUpWithEmailItem: {
//     marginLeft: 12,
//   },
//   orSignUpWithEmail: {
//     // marginTop: 48,
//     flexDirection: "row",
//     alignItems: "center",
//     width: 334,
//   },
//   email: {
//     textAlign: "left",
//     flex: 1,
//   },
//   arrowsIcon: {
//     width: 9,
//     height: 18,
//     display: "none",
//   },
//   password: {
//     textAlign: "left",
//   },
//   eyeOffIcon: {
//     width: 20,
//     height: 20,
//     overflow: "hidden",
//   },
//   inputFields1: {
//     marginTop: 12,
//   },
//   buttonText: {
//     color: Color.background,
//     textAlign: "center",
//     lineHeight: 22,
//     fontSize: FontSize.bodyLargeBold_size,
//     fontFamily: FontFamily.bodyLargeBold,
//     fontWeight: "700",
//     letterSpacing: 0,
//   },
//   buttons: {
//     height: 60,
//     paddingHorizontal: Padding.p_29xl,
//     backgroundColor: "#1dac92",
//     marginTop: 12,
//   },
//   forgotPassword: {
//     width: 118,
//     textAlign: "center",
//     lineHeight: 20,
//     fontSize: FontSize.bodyMediumRegular_size,
//     letterSpacing: 0,
//   },
//   forgot: {
//     marginTop: 12,
//   },
//   input: {
//     marginTop: 20,
//     width: 334,
//   },
//   signUp1: {
//     textDecoration: "underline",
//   },
//   text1: {
//     textAlign: "center",
//     alignSelf: "stretch",
//     fontSize: FontSize.bodyMediumRegular_size,
//   },
//   signIn: {
//     marginTop: 48,
//   },
//   main_container:{
//     flex: 1,
//     justifyContent: 'center'
//   },
//   container: {
//     // top: 220,
//     bottom: 50,
//     display: 'flex',
//     // flex: 1,
//     // alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   // text3: {
//   //   marginTop: -11,
//   //   left: 23,
//   //   fontWeight: "500",
//   //   lineHeight: 22,
//   //   fontSize: FontSize.bodyLargeBold_size,
//   //   color: Color.textBlack,
//   //   fontFamily: FontFamily.bodyLargeBold,
//   //   letterSpacing: 0,
//   //   textAlign: "left",
//   // },
//   LoginScreen: {
//     width: width,
//     height: height,
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     backgroundColor: Color.background,
//   },
// });

export default LoginScreen;

