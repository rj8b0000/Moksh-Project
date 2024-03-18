import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.screenView}>
            <Text style={styles.textStyles}>Let's Get Started</Text>
        
        <View style={styles.imgView}>
            <Image source={require('../assets/maharaj-hand-img.png')} style={{height: 350, width: 180}}/>
        </View>
        <View style={styles.signUpView}>
            <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.navigate('TermsAndConditions')}>
                <Text style={styles.signUpText}>Get Started</Text>
            </TouchableOpacity>
        </View>
        </View>
        {/* <View style={styles.loginTextView}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}> Login</Text>
            </TouchableOpacity>
        </View> */}
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#ff9f1a'
    },
    screenView:{
        flex: 1,
        justifyContent: 'space-evenly',
        marginVertical: 4,
        // backgroundColor: 'red'
    },
    textStyles: {
        color: '#b33939',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 40,
        // backgroundColor: 'green'
    },
    imgView:{
        flexDirection: 'row',
        justifyContent: 'center',
        // backgroundColor: 'green'
    },
    signUpView:{
        marginTop: 40,
        marginBottom: 10,
    },
    signUpBtn:{
        paddingVertical: 15,
        backgroundColor: '#b33939',
        marginHorizontal: 35,
        borderRadius: 10,
    },
    signUpText : {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        color: '#fff'
    },
    loginTextView:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40,
    },
    loginTextStyles : {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
    },
    loginText: {
        color: '#b33939',
        fontSize: 18,
        fontWeight: 'bold',
    }
})























































// import * as React from "react";
// import { Image } from "react-native";
// import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import { FontFamily, Color } from "../GlobalStyles";
// import { useNavigation, StackActions } from "@react-navigation/core";


// const MokshHome = () => {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.mokshHome}>
//       <View style={[styles.ellipseParent, styles.groupChildLayout]}>
//         <Image
//           style={[styles.groupChild, styles.groupPosition]}
//           contentFit="cover"
//           source={require("../assets/ellipse-1.png")}
//         />
//         <Text style={styles.moksh}>MOKSH</Text>
//       </View>
//       <Text style={[styles.loremIpsumIs, styles.getStartedFlexBox]}>
//         Lorem Ipsum is simply dummy text of the printing and typesetting
//         industry. Lorem Ipsum has been the industry's standard dummy text ever
//         since the 1500s, when an unknown printer took a galley of type and
//         scrambled it to make a type specimen book. It has survived not only five
//         centuries, but also the leap into electronic typesetting, remaining
//         essentially unchanged. It was popularised in the 1960s with the release
//         of Letraset sheets containing Lorem Ipsum passages, and more recently
//         with desktop publishing software like Aldus PageMaker including versions
//         of Lorem Ipsum
//       </Text>
//       <TouchableOpacity style={[styles.rectangleParent, styles.groupItemLayout]}  onPress={()=>{navigation.dispatch(StackActions.replace("TermsAndConditions"))}}>
//         <View style={[styles.groupItem, styles.groupItemLayout]} />
//         <Text style={[styles.getStarted, styles.getStartedFlexBox]}>
//           Get Started
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   groupChildLayout: {
//     height: 163,
//     width: 163,
//     position: "absolute",
//   },
//   groupPosition: {
//     left: 0,
//     top: 0,
//   },
//   getStartedFlexBox: {
//     textAlign: "center",
//     position: "absolute",
//   },
//   groupItemLayout: {
//     height: 56,
//     width: 297,
//     position: "absolute",
//   },
//   groupChild: {
//     height: 163,
//     width: 163,
//     position: "absolute",
//   },
//   moksh: {
//     top: 67,
//     left: 25,
//     fontSize: 23,
//     fontFamily: FontFamily.kronaOneRegular,
//     color: Color.colorDarkorange,
//     textAlign: "left",
//     position: "absolute",
//   },
//   ellipseParent: {
//     top: 58,
//     left: 106,
//   },
//   loremIpsumIs: {
//     top: 274,
//     left: 22,
//     fontSize: 17,
//     fontFamily: FontFamily.montserratRegular,
//     color: "#5e5151",
//     width: 336,
//   },
//   groupItem: {
//     borderRadius: 16,
//     backgroundColor: Color.colorDarkorange,
//     left: 0,
//     top: 0,
//   },
//   getStarted: {
//     top: 11,
//     left: 66,
//     fontSize: 28,
//     fontWeight: "600",
//     fontFamily: FontFamily.montserratSemiBold,
//     color: Color.background,
//   },
//   rectangleParent: {
//     top: 693,
//     left: 39,
//   },
//   mokshHome: {
//     backgroundColor: "#fbd6b5",
//     flex: 1,
//     width: "100%",
//     height: 812,
//     overflow: "hidden",
//   },
// });

// export default MokshHome;
