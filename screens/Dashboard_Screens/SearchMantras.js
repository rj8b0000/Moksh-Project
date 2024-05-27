import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Loading from '../common/ProgressBar';
import { Image } from 'react-native-animatable';

const {width, height} = Dimensions.get('window');
const SearchMantras = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState([])
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false);
  const prefixUrl = "https://bugle.co.in/moksh/public/public/assets/images/mantra_thumbnail/"

  useEffect(() => {
    setLoading(true)
    fetch('https://bugle.co.in/moksh/public/api/get-mantra')
            .then(response => response.json())
            .then(data => 
              {
                console.log(data)
                setCards(data)
                setLoading(false)
              }
            )
      .catch(error => console.error(error));
  },[])
  const handleSearch  = value => {
    if(value && value.length > 1)
    {
      setLoading(true);
      fetch(`https://bugle.co.in/moksh/public/api/mantra/search/${value}`)
      .then(response => response.json())
      .then(data => 
        {
          setLoading(false);
          if(data && data.length)
          setResults(data);
        }
        )
      .then(console.log(results))
      .catch(error => console.error(error));
    }
    else
    {
      setLoading(false)
      setResults([])
    }
  }

  return (
    <LinearGradient colors={['#f0bc2f', '#fdac0a', '#ffa800']} style={styles.linearGradient}>
      <View style={{
           marginTop: '5%',
          alignContent: 'space-between',
          flexDirection: 'row',
          width: '100%'
          // justifyContent: 'space-between',
      }}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name='close' size={22} color='#fff'/>
        </Pressable>
        <View style={{alignSelf: 'center', flex: 1, alignItems :'center', justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 17, color: '#fefefe'}}>Search</Text>
        </View>
      </View>
      <View style={styles.searchBarView}>
            <TextInput
                onChangeText={(text) => handleSearch(text)}
                placeholder='Search Mantra by Keyword'
                placeholderTextColor={'lightgray'}
                style={{flex: 1, color: '#000'}}
                // className = "pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
            />
        </View>
        {/* results  */}
        {
          loading ? <Loading/> : 
          results.length > 0 ?
          <ScrollView 
            showsHorizontalScrollIndicator = {false}
            contentContainerStyle = {{paddingHorizontal: 15}}
            style={{marginVertical: 3}}
        >
            <Text style={{color: 'white', fontSize: 20, marginLeft: 5}}>Results
             {/* ({results.length}) */}
             </Text>
            <View style={{justifyContent: 'space-between'}}>
                {
                    results.map((item,index) => {
                        return(
                            
                              <ScrollView showsVerticalScrollIndicator={false}>
                                      <TouchableOpacity
                                key={index}
                                onPress={() => navigation.push("StartMantra",item)}
                            >
                                <View style={{marginVertical: 5, marginBottom: 4, flexDirection: 'row', width: '100%', borderBottomWidth: 1, borderColor: '#fefdd8', paddingBottom: 10, flexWrap: 'wrap'}}>

                                    <Image
                                        // source={require('../assets/images/dunki.jpg')}
                                        source={{uri : `${prefixUrl}${item.artwork}`}}
                                        style = {{width : 80, height : 80, borderRadius: 5, marginRight: 10}}
                                    />
                                    <View style={{justifyContent: 'space-around'}}>
                                    <Text style={{color: '#fefdd8', marginLeft: 1, fontSize: 20, textAlign: 'left'}}>
                                     {item.title}
                                      </Text>
                                      <Text style={{color: '#fefdd8', marginLeft: 1, fontSize: 18, textAlign: 'left'}}>
                                      Aum Namah Shivaya
                                      {/* {item?.title.length>22 ? item?.title.slice(0,22) + '...' : item?.title } */}
                                      </Text>
                                      </View>
                                </View>
                                </TouchableOpacity>
                                  </ScrollView>
                                    
      
                        )
                    })
                }
            </View>
        </ScrollView>
            :
            // .then(console.log(cards))
            <ScrollView showsVerticalScrollIndicator={false}>
              {
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
              }

            </ScrollView>
            
        }
    </LinearGradient>
  )
}

export default SearchMantras

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  searchBarView : {
    marginHorizontal: 4,
    marginBottom: 3, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: '6%'
  },
  crossBtn : {
    height: 40,
    width: 40,
    padding: 3,
    margin: 5,
    backgroundColor: 'grey',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
})