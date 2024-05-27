import * as React from "react";
import { Text, StyleSheet, View, Pressable, TextInput, TouchableOpacity, Alert, Image, Dimensions } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, StackActions } from "@react-navigation/native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";   
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from 'react-native-vector-icons/Feather';
import { ProgressBar } from "@react-native-community/progress-bar-android";
import LinearGradient from "react-native-linear-gradient";
import Loading from "../common/ProgressBar";


const {width, height} = Dimensions.get('window');
const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const auth = getAuth(app);
  const [progress, setProgress] = React.useState(0);
  const [progressBarVisible, setProgressBarVisible] = React.useState(false)
  const [disableVerifyPhnBtn, setDisableVerifyPhnBtn] = React.useState(false);
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
        if (currentProgress < 1) {
          setTimeout(updateProgress, 500)
        };
        return currentProgress + 0.01;
      })
    };
    updateProgress();
  }
  const navigateToLogin = () =>
  {
    Alert.alert("Go to Your Inbox to Change Password and then login")
    navigation.dispatch(StackActions.replace('LoginScreen'))
  }

  const handleForgotPassword = () => {
    
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.length > 0)
    {
      if(mailformat.test(email))
      {
        loaderFunction();
        setProgressBarVisible(true)
        setTimeout(()=>{
          sendPasswordResetEmail(auth, email)
          .then(() => {
            // Password reset email sent!
            Alert.alert("Password Reset Link is Send Successfully")
            navigateToLogin();
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
        },1500)
      }
      else
      {
        Alert.alert("You have enter an invalid mail")
      }
    }
    else
    {
      Alert.alert("Please enter your mail")
    }
    

  
  }

  return (
    <LinearGradient colors={['#ffa601','#ff8f00','#fe6d01']} style={styles.linearGradient}>
  
    <ScrollView showsVerticalScrollIndicator = {false}> 

      <View style={{flexDirection: 'row',justifyContent: 'center', marginTop: height * 0.1}}>
      <View style={{alignItems: 'center', justifyContent: 'center', alignSelf: 'center',marginBottom: '10%'}}>
          {/* <FontAwesome name='camera' color='#fff1c9' size = {45}/> */}
          <Image source={require('../../assets/mala.png')} style={{width: 100, height: 100}}/>
      </View>
      </View>
      <View style={{width: '100%', marginBottom: '5%'}}>
                <Text style={{color: '#fefffe', fontFamily : 'Inter-SemiBold', fontSize: 22}}>Forgot Password?</Text>
                <Text style={{color : '#fefffe', fontFamily: 'Inter-Regular', fontSize: 15}}>We would send you logic link on your email. Please enter your email</Text>
              </View>
      <View style={{width: '100%', backgroundColor: '#ffa11b', borderRadius: 5, marginTop: '10%'}}>
        <TextInput
          placeholder='Email'
          placeholderTextColor={'#fff1c9'}
          style = {{paddingLeft: 10, borderColor: '#fed06f', fontSize: 16}}
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      {
        progressBarVisible ? <Loading/> : null
      }
      <View style={{marginTop: '15%', width: '90%', alignSelf: 'center'}}>
            <TouchableOpacity style={{ backgroundColor: '#fefffe', justifyContent: 'center', alignItems: 'center', height: 45, width: '100%', borderRadius: 5}}
                onPress={() => handleForgotPassword()}
            >
              <Text style={{fontSize: 20, color: '#fa8526', fontWeight: 'bold'}}>Send Link</Text>
            </TouchableOpacity>
          </View>
    </ScrollView>
   
    </LinearGradient>
//     <ScrollView showsVerticalScrollIndicator={false}>
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
//                 {
//                   disableVerifyPhnBtn == false
//                   ?
//                   <TouchableOpacity style={{ paddingVertical: 15, backgroundColor: '#b33939', borderRadius: 10, marginTop: 30 }}
//                     onPress={() => handleForgotPassword()}
//                 >
//                     <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Send Link</Text>
//                 </TouchableOpacity> :
//                 <Pressable style={{ paddingVertical: 15, backgroundColor: 'grey', borderRadius: 10, marginTop: 30 }}
//             >
//                 <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Send Link</Text>
//             </Pressable>

//                 }
                
//             </View>
//         </View>
//     </View>
// </ScrollView>
  );
};

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ff9f1a',
// },
// bckbtnView: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
// },
// back_icon: {
//     backgroundColor: '#b33939',
//     padding: 10,
//     borderTopRightRadius: 15,
//     borderBottomLeftRadius: 15,
//     marginLeft: 20,
//     marginTop: 20,
// },
// imgView: {
//     flexDirection: 'row',
//     justifyContent: 'center',
// },
// loginView: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 15,
//     paddingTop: 35,
//     borderTopLeftRadius: 50,
//     borderTopRightRadius: 50,
//     elevation: 10,
// },
// loginForm: {
//     marginHorizontal: 20
// },
// emailInput: {
//     padding: 10,
//     backgroundColor: '#dfe4ea',
//     borderRadius: 10,
//     marginTop: 10,
// },
// passInput: {
//     padding: 10,
//     backgroundColor: '#dfe4ea',
//     borderTopLeftRadius: 10,
//     borderBottomLeftRadius: 10,
//     marginTop: 10,
//     width: '90%',
//     flex: 1,
// },
// eyeOffIcon: {
//     width: 25,
//     height: 25,
//     alignItems: 'center',
// },
// progressText: {
//     fontSize: 20,
//     textAlign: 'center',
//     color: 'black',
// }
container : {
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
});

export default ForgotPassword;
