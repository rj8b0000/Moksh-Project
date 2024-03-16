import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get('window')
const MusicListItem = ({ item, index, data }) => {
    const navigation = useNavigation();
    const prefixUrl = "https://bugle.co.in/moksh/public/public/assets/images/mantra_thumbnail/"
    return (
        <TouchableOpacity style={
            [styles.container, { marginBottom: index == data.length - 1 ? 30 : 0 }]}
            onPress={() => navigation.navigate("MantraPlayer", { data: item, index: index})}
        >
            <Image source={{uri : `${prefixUrl}${item.artwork}`}} style={styles.songImage} />
            <View style={styles.nameView}>
                <Text style={[{ color: '#000' }, styles.nameView]}>{item.title}</Text>
                {/* <Text style={[{ color: '#000' }, styles.nameView]}>{item.artwork}</Text> */}
            </View>
            <TouchableOpacity>
                <AntDesign name="play" size={35} color="red" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default MusicListItem

const styles = StyleSheet.create({
    container: {
        width: width - 20,
        height: 100,
        elevation: 5,
        marginTop: 20,
        alignSelf: 'center',
        backgroundColor: "#fff",
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    songImage: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,

    },
    nameView: {
        paddingLeft: 15,
        width: "55%",
        // backgroundColor: 'green'
    }
})