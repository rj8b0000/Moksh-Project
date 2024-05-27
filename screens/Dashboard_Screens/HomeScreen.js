import { Dimensions, ImageBackground, StyleSheet, Text, View, TouchableOpacity, Pressable, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Image } from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import mantra_category from '../../constants/mantra_category';
import { carousel_images } from '../common/AllImages';
import Carousel from 'react-native-snap-carousel';
import Loading from '../common/ProgressBar';


const { width, height } = Dimensions.get('window');
const prefixUrl = "https://bugle.co.in/moksh/public/public/assets/images/category_thumbnail/"
const HomeScreen = () => {
  const navigation = useNavigation();
  const date = new Date(); // get the current date
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([])
  useEffect(()=>{
    setLoading(true)
    fetch('https://bugle.co.in/moksh/public/api/mantra/get-mantra-category')
            .then(response => response.json())
            .then(data => 
              {
                // console.log('Categories data : ',data)
                setCards(data)
                setLoading(false)
              }
            )
            .catch(error => console.error(error));
  },[])
  const renderItem = ({ item }) => (
    <View style={{ width: width * 0.9, height: height * 0.3, alignSelf: 'center' }}>
      <Image source={item.source} style={{ flex: 1, width: width*1.35, alignSelf: 'center' }} />
    </View>
  );
  return (
    <View style={styles.main}>
      <View style={{
        // flex: 1,
        marginHorizontal: 20, marginVertical: 30,
        alignContent: 'space-between',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <View>
          <Text style={{ color: 'white', fontFamily: 'Inter-Bold', fontSize: 20 }}>{formattedDate}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Ionicons name='notifications-outline' color='#fff' size={30} />
          <Ionicons name='settings-outline' color='#fff' size={30} style={{ marginLeft: 20 }} />
        </View>
      </View>
      <View style={{width: width, height: height * 0.3,alignSelf: 'center'}}>
      <Carousel
        style={{ width: width * 0.9, height: height * 0.3, alignSelf: 'center', backgroundColor: 'green' }}
        data={carousel_images}
        renderItem={
          renderItem
        }
        firstItem={1}
        inactiveSlideOpactity = {0.52}
        sliderWidth={width}
        itemWidth={width * 0.85}
        loop = {true}
      />
      </View>
      <View style={{
        marginTop: 20,
        marginHorizontal: 20,
      }}>
        <View>
          <Text style={{ color: 'white', fontFamily: 'Inter-Bold', fontSize: 20 }}>Mantra Categories</Text>
        </View>
      </View>
      {
        loading ? <Loading/>:
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {
          cards.map((item, index) => {
            // console.log(item.image)
            return (
              <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('MantraCategories', item)}>
                <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
                  <Image
                    source={{ uri:  `${prefixUrl}${item.category_image}`}}
                    style={{ width: 145, height: 145, borderRadius: 10 }}
                  />
                  <Text style={{ color: '#fff', fontFamily: 'Inter-Medium', fontSize: 17 }}>
                    {item.category_name.length > 14 ? item.category_name.slice(0, 14) + '...' : item.category_name}
                  </Text>
                </View>

              </TouchableWithoutFeedback>
            )
          })
        }
      </ScrollView>
      }
      
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#eebf33'
  }
})