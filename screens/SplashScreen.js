import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen() {
    const navigation = useNavigation();
    useEffect(()=>{
        setTimeout(()=>{    
            checkUserLogin();
        }, 3000)
    },[])
    const checkUserLogin = async () => {
        const email = await AsyncStorage.getItem('EMAIL');
        const password = await AsyncStorage.getItem('PASSWORD')
        const email_verified = await AsyncStorage.getItem('EMAIL_VERIFIED');
        const pre_usr_email = await AsyncStorage.getItem('PRE-USR-EMAIL');
        // console.warn(email + ' ' + password)
        if(email && password)
        {
            navigation.dispatch(StackActions.replace('Home'))
        }
        else if(pre_usr_email)
        {
            navigation.navigate('SignUpScreen');
        }
        else
        {
            navigation.dispatch(StackActions.replace('MokshHome'));
        }
    }
    return (
        <View style={styles.main}>
            <Image source={require('../assets/maharaj-hand-img.png')} style={{height: 300, width: 160}}/>
            <Text style={styles.moksh}>MOKSH</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    main : {
        backgroundColor :'#ff9f1a',
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    moksh: {
        fontSize: 25,
        letterSpacing: 10,
        fontWeight: '700',
        color: '#9E0E10'
    }
})