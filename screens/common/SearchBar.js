/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, TextInput, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default function SearchBar() 
{
    return(
        <View style={styles.container}>
            <AntDesign name="search1" size={25} color="black"  style={{margin: 15}}/>
            <TextInput style={{width: "90%"}} placeholder='Enter mantra or search' placeholderTextColor={'grey'}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2,
        marginTop : 10,

    }
})