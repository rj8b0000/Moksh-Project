import * as React from 'react';
import { Alert, Dimensions, Image, Modal } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { app } from '../../firebaseConfig';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
} from 'firebase/auth';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageCropPicker from 'react-native-image-crop-picker';
import Loading from '../common/ProgressBar';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';


const { width, height } = Dimensions.get('window');
const SignUpScreen = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = React.useState(true);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [conformPassword, setConformPassword] = React.useState('');
  const [userInfo, setUserInfo] = React.useState(null);
  const [error, setError] = React.useState();
  const [progress, setProgress] = React.useState(0);
  const [progressBarVisible, setProgressBarVisible] = React.useState(false)
  const [googleAccData, setGoogleAccData] = React.useState(null);
  const [isPasswordEnter, setIsPasswordEnter] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [width, setWidth] = React.useState(100);
  const [height, setHeight] = React.useState(100);
  const passwordValidationText = '* At least one lowercase letter\n* At least one uppercase letter\n* At least one number\n* Minimun 8 characters required\n* No spacing allowed'
  const progressProps = {
    styleAttr: "Horizontal",
    indeterminate: true,
    color: '#b33939',
    height: 50,
    width: '90%',
    marginHorizontal: 10,
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
  const handleImagePicker = () => {
    ImageCropPicker.openPicker({
      width,
      height,
      cropping: true,
    })
      .then((image) => {
        setModalVisible(false)
        setEditModalVisible(false)
        setHeight(height);
        setWidth(width);
        user_image = image.path;
        setSelectedImage(user_image)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleCameraPicker = () => {
    ImageCropPicker.openCamera({
      width,
      height,
      cropping: true,
    })
      .then((image) => {
        setModalVisible(false)
        setEditModalVisible(false)
        setHeight(height);
        setWidth(width);
        user_image = image.path;
        setSelectedImage(user_image)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleCropImage = () => {
    if (selectedImage) {
      ImageCropPicker.openCropper({
        path: selectedImage,
        width,
        height,
        cropping: true,
        cropperCircleOverlay: true, // Set to true if you want a circular crop
        freeStyleCropEnabled: true,
      })
        .then((image) => {
          setEditModalVisible(false)
          setHeight(100);
          setWidth(100);
          // console.log(image);
          user_image = image.path;
          setSelectedImage(user_image)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
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
  const signIn = async () => {
    try {
      loaderFunctionForGoogleSignIn();
      setProgressBarVisible(true)
      setTimeout(() => {
        setProgressBarVisible(false)
        setProgress(0)
      }, 4000)
      setTimeout(async () => {
        var last_login_date = getCurrentDate();
        var mantra_duration = 0;
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken, user } = await GoogleSignin.signIn();
        const formData = new FormData()
        formData.append('name', user.name)
        formData.append('email', user.email)
        formData.append('last_login_date', last_login_date)
        formData.append('profile_photo', {
          uri: user.photo,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
        formData.append('mantra_duration', mantra_duration)
        fetch('https://bugle.co.in/moksh/public/api/user-management/store', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            AsyncStorage.setItem('NAME', user.name);
            AsyncStorage.setItem('GGL_USER_PHOTO', user.photo)
            AsyncStorage.setItem('EMAIL', user.email);
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
            navigation.dispatch(StackActions.replace('Home'));
            console.log("Sign in Successfully")
          });
      }, 2000)
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
      }
      else if (error.code == "NETWORK_ERROR") {
        Alert.alert("Please check your network connection")
        setProgressBarVisible(false)
        setProgress(0);
      }
      else {
        Alert.alert("An Unkown Error occured! Please try again later")
        setProgressBarVisible(false)
        setProgress(0);
      }
    }
  };
  const getCurrentDate = () => {

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  const checkPasswordValidity = (password) => {
    const lowerCase = /[a-z]/.test(password);
    const upperCase = /[A-Z]/.test(password);
    const specialCharacter = /[#?!@$%^&*-]/.test(password);
    const number = /\d/.test(password);
    const length = password.length >= 8;
    const hasSpace = !/[\s]/.test(password);

    return lowerCase && upperCase && specialCharacter && number && length && hasSpace;
  }
  const handleStoreDataInApi = (name, email, last_login_date, mantra_duration) => {
    const formData = new FormData();
    formData.append('name', name)
    formData.append('email', email)
    formData.append('last_login_date', last_login_date)
    formData.append('profile_photo', {
      uri: selectedImage,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    formData.append('mantra_duration', mantra_duration)
    console.log("Form data 12: ",formData)
    fetch('https://bugle.co.in/moksh/public/api/user-management/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        AsyncStorage.setItem('PRE-USR-EMAIL', email);
        navigation.dispatch(StackActions.replace('VerifyAccount'));
      })
      .catch(error => {
        console.error('Error api: ', error);
      });
  }

  const handleSignUp = async (email, password, name) => {


    const auth = getAuth(app);
    var last_login_date = getCurrentDate();
    var mantra_duration = 0
    if (email.length > 0 && password.length > 0 && selectedImage != null) {
      if (checkPasswordValidity(password)) {
        loaderFunction();
        setProgressBarVisible(true)
        createUserWithEmailAndPassword(auth, email, password)
          .then(async () => { 
            if (email.length > 0 && password.length > 0) {
                await AsyncStorage.setItem('UID', auth?.currentUser?.uid)
                // .then(async()=>{
                //   console.log('ASync storage setted');
                //   const uid = await AsyncStorage.getItem('UID')
                //   console.log(uid)
                // })
              if (password === conformPassword) {
                await AsyncStorage.setItem('NAME', name);
                // console.log('selected img', selectedImage)
                const userId = uuid.v4();
                firestore()
                .collection('users')
                .doc(userId)
                .set({
                    name: name,
                    email: email,
                    password: password,
                    userId : userId
                })
                .then(res = async() => {
                    console.log("User Created");
                })
                handleStoreDataInApi(name, email, last_login_date, mantra_duration);
              }
              else {
                Alert.alert('Password and confirm password are not same');
              setProgressBarVisible(false)
              }
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
        Alert.alert("Please enter a strong password as suggested in tooltip")
      }
    }
    else {
      Alert.alert('Please enter all data')
    }
  };


  return (
    <LinearGradient colors={['#f0ba2c', '#f9af0c', '#ffa901']} style={styles.linearGradient}>
      {/* <View style={{alignSelf: 'flex-end', marginTop: '5%'}}>
  <MaterialIcons name='cancel' size = {30}/>
</View> */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: height * 0.6 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {
            selectedImage ? <Image source={{ uri: selectedImage }} style={{ width: width, height: height, marginBottom: '10%', borderRadius: 50 }} /> :
              <>
                <View style={{ width: 100, height: 100, backgroundColor: '#f5c54e', borderRadius: 50, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: '10%' }}>
                  <FontAwesome name='camera' color='#fff1c9' size={45} />
                </View>

              </>
          }
          {
            selectedImage ?
              <TouchableOpacity style={{ marginTop: 70, marginLeft: -25 }} onPress={() => setEditModalVisible(true)}>
                <View style={{ backgroundColor: '#287afc', width: 26, height: 26, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                  <MaterialCommunityIcons name='image-edit' color='white' size={15} />
                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity style={{ marginTop: 70, marginLeft: -25 }} onPress={() => setModalVisible(true)}>
                <AntDesign name='pluscircle' color='#287afc' size={23} />
              </TouchableOpacity>
          }
          <Modal visible={editModalVisible} transparent={true}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{ color: 'black', fontSize: 17 }}>Select image source</Text>
                <View style={{ flex: 1, marginTop: '10%', flexDirection: 'row' }}>
                  <TouchableOpacity style={{ marginHorizontal: '7%' }} onPress={() => handleImagePicker()}>
                    <Image source={require('../../assets/gallery_icon.png')} style={{ width: 70, height: 70 }} />
                    <Text style={{ color: 'black', textAlign: 'center' }}>Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginHorizontal: '7%' }} onPress={() => handleCameraPicker()}>
                    <Image source={require('../../assets/camera_icon.png')} style={{ width: 70, height: 70 }} />
                    <Text style={{ color: 'black', textAlign: 'center' }}>Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginHorizontal: '7%' }} onPress={() => handleCropImage()}>
                    <Image source={require('../../assets/camera_icon.png')} style={{ width: 70, height: 70 }} />
                    <Text style={{ color: 'black', textAlign: 'center' }}>Edit</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ borderWidth: 1, marginTop: '10%', height: 50, width: '90%', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => setEditModalVisible(false)}>
                  <Text style={{ color: 'black', fontSize: 17 }}>Cancel</Text>
                </TouchableOpacity>

              </View>
            </View>
          </Modal>
          <Modal visible={modalVisible} transparent={true}>
            {/* <Text
    style={{color: 'black', marginLeft: 25, marginTop: 30}}
    onPress={() => setModalVisible(false)}>
    Back
  </Text> */}
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{ color: 'black', fontSize: 17 }}>Select image source</Text>
                <View style={{ flex: 1, marginTop: '10%', flexDirection: 'row' }}>
                  <TouchableOpacity style={{ marginHorizontal: '10%' }} onPress={() => handleImagePicker()}>
                    <Image source={require('../../assets/gallery_icon.png')} style={{ width: 70, height: 70 }} />
                    <Text style={{ color: 'black', textAlign: 'center' }}>Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginHorizontal: '10%' }} onPress={() => handleCameraPicker()}>
                    <Image source={require('../../assets/camera_icon.png')} style={{ width: 70, height: 70 }} />
                    <Text style={{ color: 'black', textAlign: 'center' }}>Camera</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ borderWidth: 1, marginTop: '10%', height: 50, width: '90%', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => setModalVisible(false)}>
                  <Text style={{ color: 'black', fontSize: 17 }}>Cancel</Text>
                </TouchableOpacity>

              </View>
            </View>
          </Modal>

        </View>
        <View style={{ width: '100%', backgroundColor: '#fab92b', borderRadius: 5 }}>
          <TextInput
            placeholder='Name'
            placeholderTextColor={'#fff1c9'}
            style={{ paddingLeft: 10, borderBottomWidth: 2, borderColor: '#fed06f', fontSize: 16 }}
            value={name}
            onChangeText={text => setName(text)}

          />
          <TextInput
            placeholder='Email'
            placeholderTextColor={'#fff1c9'}
            style={{ paddingLeft: 10, borderBottomWidth: 2, borderColor: '#fed06f', fontSize: 16 }}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            placeholder='Password'
            placeholderTextColor={'#fff1c9'}
            style={{ paddingLeft: 10, borderBottomWidth: 2, borderColor: '#fed06f', fontSize: 16 }}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={passwordVisible}
            onFocus={() => setIsPasswordEnter(true)}
          />
          <TextInput
            placeholder='Confirm Password'
            placeholderTextColor={'#fff1c9'}
            style={{ paddingLeft: 10, fontSize: 16 }}
            value={conformPassword}
            onChangeText={text => setConformPassword(text)}
            secureTextEntry={passwordVisible}
            onFocus={() => setIsPasswordEnter(true)}
          />
        </View>
        {
          progressBarVisible ? 
        <Loading/>: 
        null
        }
        {/* <View style={{marginVertical : 10}}>
            {
                isPasswordEnter ? 
                <Text style = {{color: '#910E10'}}>
                      {passwordValidationText}
                </Text> : 
                null
            }    
            </View> */}
        {/* {
    progressBarVisible ?
      <View>
        <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
        <ProgressBar {...progressProps} progress={progress} />
      </View>
      : null
  } */}
        <View style={{ marginTop: '7%', width: '90%', alignSelf: 'center' }}>
          <Pressable style={{ backgroundColor: '#fefffe', justifyContent: 'center', alignItems: 'center', height: 45, width: '100%', borderRadius: 5 }}
            onPress={() => {
              handleSignUp(email, password, name);
            }}
          >
            <Text style={{ fontSize: 20, color: '#fa8526', fontWeight: 'bold' }}>Sign Up</Text>
          </Pressable>
        </View>
        <View style={{ marginTop: '10%', width: '90%', alignSelf: 'center' }}>
          <Pressable style={{ backgroundColor: '#1979f3', alignItems: 'center', justifyContent: 'center', height: 50, width: '100%', borderRadius: 5 }} onPress={() => signIn()}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#fff', width: 30, height: 30, borderRadius: 5 }}>
                <Image source={require('../../assets/google-icon.png')} style={{ width: 30, height: 30 }} />
              </View>
              <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
                <Text style={{ fontSize: 20, color: '#fff' }}>Sign Up with Google</Text>
              </View>
            </View>

          </Pressable>
        </View>
        <View style={{ marginTop: '10%', width: '90%', alignSelf: 'center' }}>
          <Text style={{ color: '#fefffe', fontSize: 15 }}>By signing up, you agree to Moksh's <Text style={{ fontWeight: '900', textDecorationLine: 'underline' }}>Terms of Service </Text><Text>and </Text><Text style={{ fontWeight: '900', textDecorationLine: 'underline' }}>Privacy Policy</Text>
          </Text>
        </View>
        <TouchableOpacity style={{ marginTop: '10%', width: '90%', alignSelf: 'center', alignItems: 'center' }}
         onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={{ color: '#fefffe', fontSize: 15 }}>Have a Moksh account?  
          <Text style={{ fontWeight: 'bold',color: '#fefffe', fontSize: 15 }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
    // <ScrollView showsVerticalScrollIndicator={false}>
    //   <View style={styles.container}>
    //     <SafeAreaView style={{ display: 'flex' }}>
    //       <View style={styles.bckbtnView}>
    //         <TouchableOpacity style={styles.back_icon} onPress={() => navigation.goBack()}>
    //           <Feather name='arrow-left' size={25} color='white' />
    //         </TouchableOpacity>
    //       </View>
    //       <View style={[styles.imgView, { height: "25%" }]}>
    //         <Image source={require('../assets/maharaj-hand-img.png')} />
    //       </View>
    //     </SafeAreaView>
    //     <View style={styles.loginView}>
    //       <View style={styles.loginForm}>
    //         {
    //           progressBarVisible ?
    //             <View>
    //               <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
    //               <ProgressBar {...progressProps} progress={progress} />
    //             </View>
    //             : null
    //         }
    //         <Text style={{ color: 'grey', fontWeight: 'bold' }}>Full Name</Text>
    //         <TextInput
    //           style={styles.emailInput}
    //           placeholder='John Doe'
    //           placeholderTextColor={'grey'}
    //           color='grey'
    //           value={name}
    //           onChangeText={text => setName(text)}
    //         />
    //         <Text style={{ color: 'grey', fontWeight: 'bold', marginTop: 10 }}>Email Address</Text>
    //         <TextInput
    //           style={styles.emailInput}
    //           placeholder='Enter Email'
    //           placeholderTextColor={'grey'}
    //           color='grey'
    //           value={email}
    //           onChangeText={text => setEmail(text)}
    //         />
    //         <Text style={{ color: 'grey', fontWeight: 'bold', marginTop: 10 }}>Password</Text>
    //         <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', }}>
    //           <TextInput
    //             style={styles.passInput}
    //             placeholder='Enter Password'
    //             placeholderTextColor={'grey'}
    //             color='grey'
    //             value={password}
    //             onChangeText={text => setPassword(text)}
    //             secureTextEntry={passwordVisible}
    //             onFocus={()=>setIsPasswordEnter(true)}
    //           />
    //           <Pressable
    //             onPress={() => setPasswordVisible(!passwordVisible)} style={{ backgroundColor: '#dfe4ea', marginTop: 10, padding: 1.5, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
    //             <View style={{ margin: 10 }}>
    //               <Image
    //                 style={styles.eyeOffIcon}
    //                 contentFit="cover"
    //                 source={
    //                   passwordVisible
    //                     ? eye_off
    //                     : eye_on
    //                 }
    //               />
    //             </View>
    //           </Pressable>
    //         </View>
    //         <View style={{marginVertical : 10}}>
    //         {
    //             isPasswordEnter ? 
    //             <Text style = {{color: '#910E10'}}>
    //                   {passwordValidationText}
    //             </Text> : 
    //             null
    //         }    
    //         </View>
    //         <TouchableOpacity style={{ paddingVertical: 15, backgroundColor: '#b33939', borderRadius: 10, marginTop: 20 }}
    //           onPress={() => {
    //             handleSignUp(email, password, name);
    //           }}
    //         >
    //           <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Sign Up</Text>
    //         </TouchableOpacity>
    //       </View>
    //       <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'grey', paddingVertical: 5, fontSize: 25 }}>Or</Text>
    //       <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 45 }}>
    //         <TouchableOpacity style={{ backgroundColor: '#dfe4ea', borderRadius: 15 }} onPress={() => signIn()}>
    //           <Image source={require('../assets/google-icon.png')} style={{ width: 60, height: 60 }} />
    //         </TouchableOpacity>
    //         <TouchableOpacity style={{ backgroundColor: '#dfe4ea', borderRadius: 15 }}>
    //           <Image source={require('../assets/apple-icon.png')} style={{ width: 60, height: 60 }} />
    //         </TouchableOpacity>
    //         <TouchableOpacity style={{ backgroundColor: '#dfe4ea', borderRadius: 15 }}>
    //           <Image source={require('../assets/facebook-icon.png')} style={{ width: 60, height: 60 }} />
    //         </TouchableOpacity>
    //       </View>
    //       <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 7 }}>
    //         <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 15 }}>Already have an account?</Text>
    //         <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
    //           <Text style={{ fontWeight: 'bold', color: '#ff9f1a', fontSize: 15 }}>Login</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   </View>
    // </ScrollView>
  );
};
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ff9f1a',
//   },
//   bckbtnView: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//   },
//   back_icon: {
//     backgroundColor: '#b33939',
//     padding: 10,
//     borderTopRightRadius: 15,
//     borderBottomLeftRadius: 15,
//     marginLeft: 20,
//     marginTop: 20,
//   },
//   imgView: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   loginView: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 15,
//     paddingTop: 35,
//     borderTopLeftRadius: 50,
//     borderTopRightRadius: 50,
//     elevation: 10,
//   },
//   loginForm: {
//     marginHorizontal: 20
//   },
//   emailInput: {
//     padding: 10,
//     backgroundColor: '#dfe4ea',
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   passInput: {
//     padding: 10,
//     backgroundColor: '#dfe4ea',
//     borderTopLeftRadius: 10,
//     borderBottomLeftRadius: 10,
//     marginTop: 10,
//     width: '90%',
//     flex: 1,
//   },
//   eyeOffIcon: {
//     width: 25,
//     height: 25,
//     alignItems: 'center',
//   },
//   centerView: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 90
//   },
//   modalView: {
//     backgroundColor: '#FFFEEE',
//     padding: 40,
//     borderRadius: 20,
//     shadowColor: 'black',
//     elevation: 5,
//     alignItems: 'center',
//   },
//   progress: {
//     alignItems: 'center',
//   },
//   progressText: {
//     fontSize: 20,
//     textAlign: 'center',
//     color: 'black',
//   }
// })
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // alignItems: 'center'
  },
  modalView: {
    height: height * 0.37,
    width: '90%',
    backgroundColor: '#FFFEEE',
    padding: 40,
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 500,
    alignItems: 'center',
  },
  loader : {
    height: height,
    width: width,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 2,
}
})

export default SignUpScreen;
