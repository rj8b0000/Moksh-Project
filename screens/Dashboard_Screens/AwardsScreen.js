import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LineChart } from 'react-native-chart-kit'
import LinearGradient from 'react-native-linear-gradient'
import { award_images } from '../common/AllImages';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const AwardsScreen = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userCountData, setUserCountData] = useState();
  useEffect(async () => {
    const email = await AsyncStorage.getItem('EMAIL')
    fetch(`https://bugle.co.in/moksh/public/api/user-management/get_profile_data/${email}`)
    .then(response => response.json())
    .then(data => 
      {
        console.log('User data : ',data)
        setUserCountData(data)

      }
    )
    .catch(error => console.error(error));
  },[])

  return (
    <>
      <LinearGradient colors={['#f0bc2f', '#fdac0a', '#ffa800']} style={styles.linearGradient}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: 20, marginVertical: 30,
            alignContent: 'space-between',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Text style={{ color: 'white', fontFamily: 'Inter-Bold', fontSize: 25 }}>Your Statistics</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{
            backgroundColor: '#ED4C67', width: width * 0.43, height: height * 0.12, alignItems: 'center',
            alignContent: 'space-between', marginHorizontal: 5, borderRadius: 10
          }}>
            {
              userCountData ? (
                <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontSize: 30, color: '#fff', marginTop: 10 }}>{userCountData.mantra_total_count == null ? 0: userCountData.mantra_total_count}</Text>
              ): 
              <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontSize: 30, color: '#fff', marginTop: 10 }}>0</Text>
            }
            <Text style={{ alignItems: 'flex-end', fontSize: 20, color: '#fff', marginBottom: 10 }}>Total Counts</Text>
          </View>
          <View style={{
            backgroundColor: '#B53471', width: width * 0.43, height: height * 0.12, alignItems: 'center',
            alignContent: 'space-between', marginHorizontal: 5, borderRadius: 10
          }}>
            {
              userCountData ? (
                <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontSize: 30, color: '#fff', marginTop: 10 }}>{userCountData.mantra_duration}</Text>
              ): 
            <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontSize: 30, color: '#fff', marginTop: 10 }}>0</Text>
            }
            <Text style={{ alignItems: 'flex-end', fontSize: 20, color: '#fff', marginBottom: 10 }}>Minutes</Text>
          </View>
        </View>
        <View style={styles.container}>
          <LineChart
            data={{
              labels: ["15 May", "16 May", "17 May", "18 May", "19 May",],
              datasets: [
                {
                  data: [
                    11,
                    54,
                    108,
                    151,
                    20,
                    28
                  ]
                }
              ]
            }}
            width={Dimensions.get("window").width * 0.9} // from react-native
            height={Dimensions.get('window').height * 0.3}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#6ab04c",
              backgroundGradientFrom: "#EE5A24",
              backgroundGradientTo: "#EA2027",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            alignContent: 'space-between',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Text style={{ color: 'white', fontFamily: 'Inter-Bold', fontSize: 25, marginTop: 20, marginLeft: -10 }}>Your Awards</Text>
        </View>
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {
          award_images.map((item, index) => {
            // console.log(item.image)
            return (
              <TouchableWithoutFeedback key={index}>
                <View style={{flex: 1,marginVertical: 20, marginHorizontal: 10 }}>
                  <Image
                    source={item.source}
                    style={{ width: 120, height: 150, borderRadius: 10 }}
                  />
                </View>

              </TouchableWithoutFeedback>
            )
          })
        }
      </ScrollView>
        </ScrollView>
        
      </LinearGradient>
    </>

  )
}

export default AwardsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 20
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  }
})