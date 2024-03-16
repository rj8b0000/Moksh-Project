/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import { meditating_boy } from '../common/AllImages';

const JaapCompleteScreen = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF9A1',
      }}>
      <View>
        <Image
          source={meditating_boy}
          style={{width: 300, height: 300}}
        />
      </View>
      <View>
        <Text style={{color: 'black', fontSize: 30, fontWeight: 'bold'}}>
          Meditation Complete
        </Text>
      </View>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            color: 'indigo',
            fontSize: 20,
            textDecorationLine: 'underline',
          }}
          onPress={() => navigation.navigate('MantraHome')}>
          Jaap Again!
        </Text>
      </View>
    </View>
  );
};

export default JaapCompleteScreen;

const styles = StyleSheet.create({});
