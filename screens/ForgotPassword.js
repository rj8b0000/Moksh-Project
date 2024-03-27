import * as React from "react";
import { Text, StyleSheet, View, Pressable, TextInput, TouchableOpacity, Alert, Image } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, StackActions } from "@react-navigation/native";
import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";   
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from 'react-native-vector-icons/Feather';
import { ProgressBar } from "@react-native-community/progress-bar-android";

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
                {
                  disableVerifyPhnBtn == false
                  ?
                  <TouchableOpacity style={{ paddingVertical: 15, backgroundColor: '#b33939', borderRadius: 10, marginTop: 30 }}
                    onPress={() => handleForgotPassword()}
                >
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Send Link</Text>
                </TouchableOpacity> :
                <Pressable style={{ paddingVertical: 15, backgroundColor: 'grey', borderRadius: 10, marginTop: 30 }}
            >
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Send Link</Text>
            </Pressable>

                }
                
            </View>
        </View>
    </View>
</ScrollView>
    // <View style={styles.forgotPassword}>
    //   <View style={styles.content}>
    //     <View style={styles.titleBody}>
    //       <Text style={[styles.title, styles.titleTypo]}>
    //         Forgotten Password
    //       </Text>
    //       <Text style={styles.body}>
    //         Please enter an email address that you used to create account with
    //         so we can send you an email to reset your password.
    //       </Text>
    //     </View>
    //     <View style={[styles.inputFields1,styles.inputFlexBox]}>
    //       <GestureHandlerRootView
    //         >
    //         {/* <Text style={[styles.email, styles.emailTypo]}>Email</Text> */}
    //         <TextInput style={[styles.email, styles.emailTypo]} 
    //         placeholder="Email"
    //          autoCapitalize="none"
    //          onChangeText={(text)=>setEmail(text)}
    //          />
    //       </GestureHandlerRootView>
    //       </View>
    //   </View>
    //   <View style={[styles.buttonKeyboard, styles.topBarPosition]}>
    //     <View style={styles.bottomButton}>
    //         <TouchableOpacity
    //           style={[styles.pressable]}
    //           onPress={handleForgotPassword}
    //         >
    //           <Text style={styles.buttonText}>Send email</Text>
    //         </TouchableOpacity>
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

export default ForgotPassword;
