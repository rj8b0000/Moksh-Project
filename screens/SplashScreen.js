import React, { useEffect } from "react";
import { View, Text } from "react-native";
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
        // console.warn(email + ' ' + password)
        if(!email && !password && !email_verified)
        {
            navigation.dispatch(StackActions.replace('MokshHome'))
        }
        else
        {
            navigation.dispatch(StackActions.replace('Home'))

        }
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color: 'grey'}}>Moksh Logo</Text>
        </View>
    );
}