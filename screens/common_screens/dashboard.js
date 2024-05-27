/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontFamily, Padding, Border, FontSize, Color } from '../../GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from '../common/SearchBar';
import { chant_mala, dashboard_mala_img } from '../common/AllImages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Dashboard_Screens/HomeScreen';
import SearchMantras from '../Dashboard_Screens/SearchMantras';
import JaapScreen from '../Dashboard_Screens/JaapScreen';
import AwardsScreen from '../Dashboard_Screens/AwardsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import EventScreen from '../Dashboard_Screens/EventScreen';
import RoomScreen from '../Event_Screens/CommunityScreen';

const Dashboard = () => {
  const Tab = createBottomTabNavigator();
  // const navigation = useNavigation();
  // const [email, getEmail] = useState('');
  // const [password, getPassword] = useState('');
  // const [name, getName] = useState('');
  // const [profilePhoto, setProfilePhoto] = useState('');
  // useEffect(() => {
  //   getData();
  //   console.log(profilePhoto)
  // }, []);
  // const getData = async () => {
  //   const email = await AsyncStorage.getItem('EMAIL');
  //   const password = await AsyncStorage.getItem('PASSWORD');
  //   const name = await AsyncStorage.getItem('NAME');
  //   const photo = await AsyncStorage.getItem('GGL_USER_PHOTO');
  //   getEmail(email);
  //   getPassword(password);
  //   getName(name);
  //   setProfilePhoto(photo)

    // if(photo != null)
    // {
    // }
    // else
    // {
    // const user_sign_in_photo = AsyncStorage.getItem('USER_PROFILE_IMG');
    //   setProfilePhoto(user_sign_in_photo)
    //   console.log(profilePhoto)
    //   // console.log("User sign in photo",user_sign_in_photo)
    // }
  // };
  // const renderMantra = ({ index, item }) => {
  //   return (
  //     <Animated.View
  //       style={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
  //       <View style={styles.artworkWrapper}>
  //         <Image
  //           source={require('../../assets/images/mala.jpg')}
  //           style={styles.artworkImg}
  //         />
  //       </View>
  //     </Animated.View>
  //   );
  // };
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size, focused }) => {
        let iconName;

        if (route.name === 'HomeMain') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Mantras') {
          iconName = focused ? 'search' : 'search';
        }
        else if(route.name === 'EventScreen')
        {
          iconName = focused ? 'globe' : 'globe-outline';
        }
        else if(route.name === 'Awards')
        {
          const iconColor = focused ? '#fefeee' : '#fcc89b';
          iconName = focused ? 'bar-graph' : 'bar-graph';
        return <Entypo name={iconName} color={iconColor} size={30} />;
        }

        // You can set different colors for focused and unfocused screens
        const iconColor = focused ? '#fefeee' : '#fcc89b';

        return <Ionicons name={iconName} color={iconColor} size={30} />;
      },
      tabBarStyle : {backgroundColor: '#ef8d45', height: 60},
      tabBarActiveTintColor: 'yellow',
      tabBarInactiveTintColor: '#fff',
      tabBarShowLabel: false
    })}
  >
        <Tab.Screen
          name = 'HomeMain'
          component={HomeScreen}
          options={{headerShown: false,
            tabBarLabel: 'Home',
            // tabBarIcon : ({color, size}) => (<Ionicons name='home-outline' color={'#fff'} size={30}/>)
          }}
        />
        <Tab.Screen
          name = 'Mantras'
          component={SearchMantras}
          options={{headerShown: false,
            tabBarLabel: 'Mantras',
            // tabBarIcon : ({color, size}) => (<AntDesign name='search1' color={'#fff'} size={30}/>)
          }}
        />
         <Tab.Screen
          name = 'JaapScreen'
          component={JaapScreen}
          options={{headerShown: false,
            tabBarLabel: '',
            tabBarIcon : () =>(<Image source={require('../../assets/mala.png')} style={{height: 110, width: 110}}/>),
          }}
        />
          <Tab.Screen
          name='EventScreen'
          component={RoomScreen}
          options={{headerShown: false,
            // tabBarIcon : ({color, size}) => (<Ionicons name='globe-outline' color={'#fff'} size={30}/>),
            tabBarLabel: 'Community'
          }}
        />
        <Tab.Screen
          name='Awards'
          component={AwardsScreen}
          options={{headerShown: false,
            // tabBarIcon: ({color, size}) => (<Foundation name='graph-horizontal' color={'#fff'} size={30}/>),
            tabBarLabel: 'Statistics'
          }}
        />
      </Tab.Navigator>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  username: {
    marginLeft: 10,
  },
  userdetails: {
    display: 'flex',
    flexDirection: 'row',
  },
  searchbar: {
    display: 'flex',
    // justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: 10
    // alignItems: 'center'
  },
  mantras: {
    marginTop: "5%",
  },
  mantraText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black'
  },
  artworkWrapper: {
    marginTop: '5%',
    width: 250,
    height: 150,
    shadowColor: '#fff',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
  },
  artworkImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
});
