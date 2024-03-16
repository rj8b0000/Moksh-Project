import * as React from 'react';
import {Image} from 'react-native';
import {StyleSheet, Text, View, Pressable} from 'react-native';
// import { LinearGradient } from "expo-linear-gradient";
import {useNavigation} from '@react-navigation/native';
import {FontFamily, FontSize, Color, Border, Padding} from '../GlobalStyles';

const SuccessMessage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.successMessage}>
      <View style={styles.content}>
        <Image
          style={styles.illustrationIcon}
          contentFit="cover"
          source={require('../assets/illustration.png')}
        />
        <View style={styles.titleBody}>
          <Text style={[styles.tittle, styles.bodyTypo]}>Success!</Text>
          <Text style={[styles.body, styles.bodyTypo]}>
            <Text
              style={
                styles.yourPasswordHas
              }>{`Your password has been changed. `}</Text>
            From now on use your new password to log in.
          </Text>
        </View>
      </View>
      <View style={[styles.bottomButton, styles.topBarPosition]}>
        {/* <LinearGradient
          style={styles.buttons}
          locations={[0, 0, 1]}
          colors={["#1dac92", "#1dac92", "#228e8e"]}
        > */}
        <Pressable
          style={styles.pressable}
          onPress={() => navigation.navigate('MokshHome')}>
          <Text style={[styles.buttonText, styles.textTypo]}>OK</Text>
        </Pressable>
        {/* </LinearGradient> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyTypo: {
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  topBarPosition: {
    width: 375,
    left: 0,
    position: 'absolute',
  },
  textTypo: {
    lineHeight: 22,
    fontSize: FontSize.bodyLargeBold_size,
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
  },
  iconPosition: {
    top: '50%',
    position: 'absolute',
  },
  illustrationIcon: {
    width: 205,
    height: 187,
  },
  tittle: {
    fontSize: FontSize.h4Bold_size,
    lineHeight: 29,
    textAlign: 'center',
    color: Color.textBlack,
    fontWeight: '700',
  },
  yourPasswordHas: {
    marginBottom: 20,
  },
  body: {
    fontSize: FontSize.bodyMediumRegular_size,
    lineHeight: 20,
    color: Color.textBody,
    marginTop: 8,
    textAlign: 'center',
  },
  titleBody: {
    marginTop: 40,
    width: 334,
  },
  content: {
    top: 124,
    left: 21,
    height: 508,
    alignItems: 'center',
    position: 'absolute',
  },
  buttonText: {
    color: Color.background,
    textAlign: 'center',
    fontWeight: '700',
  },
  pressable: {
    borderRadius: Border.br_xs,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Padding.p_29xl,
    paddingVertical: Padding.p_5xs,
    backgroundColor: Color.primaryMainGradient,
    alignItems: 'center',
    width: '100%',
  },
  buttons: {
    height: 60,
    width: 334,
    borderRadius: 10,
    marginLeft: -10,
  },
  bottomButton: {
    top: 656,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_29xl,
  },
  text: {
    marginTop: -11,
    left: 23,
    fontWeight: '500',
    textAlign: 'left',
    lineHeight: 22,
    fontSize: FontSize.bodyLargeBold_size,
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
    color: Color.textBlack,
  },
  mobileSignalIcon: {
    marginTop: -1.5,
    right: 76,
    width: 18,
    height: 10,
  },
  wifiIcon: {
    marginTop: -3,
    right: 56,
    width: 15,
    height: 11,
  },
  batteryIcon: {
    marginTop: -4,
    right: 23,
    width: 27,
    height: 13,
  },
  topBar: {
    top: 0,
    height: 44,
  },
  successMessage: {
    backgroundColor: Color.background,
    flex: 1,
    height: 812,
    overflow: 'hidden',
    width: '100%',
  },
});

export default SuccessMessage;
