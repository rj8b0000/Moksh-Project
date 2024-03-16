import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
// import { LinearGradient } from "expo-linear-gradient";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

 
const OTP = () =>{
    const navigation = useNavigation();
    const et1 = useRef();
    const et2 = useRef();
    const et3 = useRef();
    const et4 = useRef();
    const et5 = useRef();
    const et6 = useRef();
    const [f1, setF1] = useState('');
    const [f2, setF2] = useState('');
    const [f3, setF3] = useState('');
    const [f4, setF4] = useState('');
    const [f5, setF5] = useState('');
    const [f6, setF6] = useState('');
    const [count, setCount] = useState(60);
    useEffect(() => {
        const interval = setInterval(()=>{
            if(count == 0)
            {
                clearInterval(interval)
            }
            else
            {
                setCount(count - 1)
            }
        },1000);
        return () => {
            clearInterval(interval)
        }
    },[count])
    const onPressVerifyOTP = () => {
        const otp = f1 + f2 + f3 + f4 + f5 + f6
        console.warn(otp)
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>OTP Verification</Text>
            <GestureHandlerRootView style={[styles.otpView]}>
    <View ></View>
                 <TextInput 
                ref={et1} 
                value={f1}
                style={[styles.inputView,{borderColor: f1.length >=1 ? '#1dac92': '#000'},
                {color: f1.length >=1 ? '#1dac92': '#000'}
                    ]} 
                keyboardType='number-pad' 
                maxLength={1}
                onChangeText={txt => {
                    setF1(txt)
                    if(txt.length >= 1){
                        et2.current.focus()
                    }
                    else if(txt.length < 1)
                    {
                        et1.current.focus()
                    }
                }}
                />
        
    
                <TextInput
                 ref={et2} 
                 style={[styles.inputView,{borderColor: f2.length >=1 ? '#1dac92': '#000'},
                 {color: f1.length >=1 ? '#1dac92': '#000'}
                    ]}  
                 keyboardType='number-pad' 
                 maxLength={1}
                value={f2}
                 onChangeText={txt => {
                    setF2(txt)
                    if(txt.length >= 1){
                        et3.current.focus()
                    }
                    else if(txt.length < 1){
                        et1.current.focus()
                    }
                }}
                 />
            
                <TextInput
                 ref={et3} 
                 style={[styles.inputView,{borderColor: f3.length >=1 ? '#1dac92': '#000'},
                 {color: f1.length >=1 ? '#1dac92': '#000'}
                    ]} 
                  keyboardType='number-pad'
                   maxLength={1}
                value={f3}
                   onChangeText={txt => {
                    setF3(txt)
                    if(txt.length >= 1){
                        et4.current.focus()
                    }
                    else if(txt.length < 1){
                        et2.current.focus()
                    }
                }}
                   />
                   <TextInput
                 ref={et4} 
                 style={[styles.inputView,{borderColor: f4.length >=1 ? '#1dac92': '#000'},
                 {color: f1.length >=1 ? '#1dac92': '#000'}
                    ]} 
                  keyboardType='number-pad'
                   maxLength={1}
                value={f4}
                   onChangeText={txt => {
                    setF4(txt)
                    if(txt.length >= 1){
                        et5.current.focus()
                    }
                    else if(txt.length < 1){
                        et3.current.focus()
                    }
                }}
                   />
                   <TextInput
                 ref={et5} 
                 style={[styles.inputView,{borderColor: f5.length >=1 ? '#1dac92': '#000'},
                 {color: f1.length >=1 ? '#1dac92': '#000'}
                    ]} 
                  keyboardType='number-pad'
                   maxLength={1}
                value={f5}
                   onChangeText={txt => {
                    setF5(txt)
                    if(txt.length >= 1){
                        et6.current.focus()
                    }
                    else if(txt.length < 1){
                        et4.current.focus()
                    }
                }}
                   />
                <TextInput 
                ref={et6} 
                style={[styles.inputView,{borderColor: f6.length >=1 ? '#1dac92': '#000'},
                {color: f1.length >=1 ? '#1dac92': '#000'}
                    ]} 
                keyboardType='number-pad' 
                value={f6}
                maxLength={1}
                onChangeText={txt => {
                    setF6(txt)
                    if(txt.length < 1){
                        et5.current.focus()
                    }
                }}
                />
            </GestureHandlerRootView>
            <GestureHandlerRootView style={[styles.resendView]}>
                <Text style={{fontSize: 20, fontWeight: '700', 
                color: count == 0 ? '#1dac92': 'grey'}}
                onPress={()=>{setCount(60)}}
                >Resend</Text>
                {count !== 0 && (<Text style={{marginLeft: 20, fontSize: 20}}>{" "+count + ' seconds'}</Text>)}
            </GestureHandlerRootView>
            <TouchableOpacity 
            onPress={onPressVerifyOTP}
            style={[styles.verifyOTPButton, {backgroundColor: f1 !== '' && f2 !== ''&& f3!==''&&f4!=='' &&f5!=='' &&f6!==''?'#1dac92':'grey'}]}
            disabled={  f1 !== '' && f2 !== '' && f3!=='' &&f4!=='' &&f5!=='' &&f6!==''?false:true}>
                <Text style={styles.btnText}>Verify OTP</Text>
            </TouchableOpacity>
        </View>
    )
};
export default OTP;
const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    title:{
        fontSize: 22,
        fontWeight: '700',
        marginTop: 100,
        alignSelf: 'center',
        color: '#000'
    },
    otpView: {
        // width: 90,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 100
    } ,
    inputView : {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700'
    },
    verifyOTPButton: {
        width: 320,
        height: 55,
        backgroundColor: 'grey',
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 140,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText:{
        color: '#fff',
        fontSize: 18
    },
    resendView : {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 30
    }


})