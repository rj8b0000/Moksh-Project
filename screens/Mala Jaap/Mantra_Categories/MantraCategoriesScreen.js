import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation, useRoute } from '@react-navigation/native';
import Loading from '../../common/ProgressBar';

const MantraCategoriesScreen = () => {
    const { params: item } = useRoute();
    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState([])
    const navigation = useNavigation();
  const prefixUrl = "https://bugle.co.in/moksh/public/public/assets/images/mantra_thumbnail/"
    useEffect(()=>{
        setLoading(true)
        fetch(`https://bugle.co.in/moksh/public/api/mantra/get-mantra-by-category/${item.category_id}`)
                .then(response => response.json())
                .then(data => 
                  {
                    console.log('Categories data based on id : ',data)
                    setCards(data)
                    setLoading(false)
                  }
                )
                .catch(error => console.error(error));
    },[])
    return (
        <LinearGradient colors={['#f0bc2f', '#fdac0a', '#ffa800']} style={styles.linearGradient}>
            <View
                style={{
                    marginHorizontal: 20, marginVertical: 30,
                    alignContent: 'space-between',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
            <View>
          <Text style={{ color: 'white', fontFamily: 'Inter-Bold', fontSize: 20 }}>{item.category_name}</Text>
        </View>
            </View>
            {
                loading ? <Loading/> : 
                cards.length > 0 ? 
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '5%', flexWrap: 'wrap' }}>
                  {
                    cards.map((item, index) => {
                      return (
                        <TouchableOpacity style={{ width: '48%', height: 165, justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }} key={index}
                        onPress={() => navigation.push("StartMantra",item)}
                        >
                          <Image source={{ uri: `${prefixUrl}${item.artwork}` }} style={{ width: '92%', height: 145, borderRadius: 10 }} />
                          <Text style={{ color: '#fefdd8', fontSize: 15 }}>{item.title}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
            </ScrollView> : 
            <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('../../../assets/nodataimg.png')}/>
            </View>
            }
        </LinearGradient>
    )
}

export default MantraCategoriesScreen

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
})