import * as React from "react";
import { Text, StyleSheet, View, Pressable, TouchableOpacity } from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Padding, Border, Color } from "../GlobalStyles";
import CheckBox from "react-native-check-box";
// import { LinearGradient } from 'expo-linear-gradient'
// import RadioForm from "react-native-simple-radio-button";

const TermsAndConditions = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = React.useState({
    stmt1 : false,
    stmt2 : false,
    stmt3 : false
  });

  return (
    <View style={styles.termsAndConditions}>
      <View style={styles.content}>
        <Text style={styles.tittle}>Let's  you started!</Text>
        <View style={styles.terms}>
          <View style={styles.checkParent}>
            <CheckBox isChecked={isChecked.stmt1} onClick={()=>setIsChecked({...isChecked, stmt1: !isChecked.stmt1})} checkBoxColor="#1DAC92" style={{borderRadius: 20}}/>
            <Text style={[styles.body, styles.bodyTypo]}>
              <Text style={styles.iAgreeTo}>{`I agree to `}</Text>
              <Text style={styles.privacyPolicy}>{`Privacy Policy `}</Text>
              <Text style={styles.iAgreeTo}>{`and `}</Text>
              <Text style={styles.privacyPolicy}>Terms of Use.</Text>
            </Text>
          </View>
          <View style={styles.checkGroup}>
            {/* <CheckBox isChecked={isChecked} onClick={!isChecked} rightText=""/> */}
            <CheckBox isChecked={isChecked.stmt2} onClick={()=>setIsChecked({...isChecked, stmt2: !isChecked.stmt2})} checkBoxColor="#1DAC92" style={{borderRadius: 20}}/>
            <Text style={[styles.body1, styles.bodyLayout]}>
              <Text
                style={styles.iAgreeTo}
              >{`I agree to processing of my personal  data for providing me  app functions. See more in  `}</Text>
              <Text style={styles.privacyPolicy}>Privacy Policy.</Text>
            </Text>
          </View>
          <View style={styles.checkGroup}>
            {/* <RadioForm/> */}
            <CheckBox isChecked={isChecked.stmt3} onClick={()=>setIsChecked({...isChecked, stmt3: !isChecked.stmt3})} checkBoxColor="#1DAC92" style={{borderRadius: 20}}/>
            <Text style={[styles.body2, styles.bodyTypo]}>
              I agree that may use my personal data to send me product or
              service offerings via app or email.*
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonsInfo}>
        <View style={styles.buttons}>
          <Pressable onPress={()=>setIsChecked({stmt1: true,stmt2: true, stmt3: true})}
            style={[styles.buttons1, styles.buttonsFlexBox]}
            // locations={[0, 0, 1]}
            colors={["#1dac92", "#1dac92", "#228e8e"]}
          >
            <Text 
            style={[styles.buttonText, styles.buttonTypo]}
            >
              Accept all
            </Text>
      
          </Pressable>
           
          
         
          {
            isChecked.stmt1&&isChecked.stmt2&&isChecked.stmt3 == true?<Pressable
            style={[styles.buttons2, styles.buttonsFlexBox]}
            onPress={() => navigation.dispatch(StackActions.replace("SignInEmptyState"))}
          >
            <Text style={[styles.buttonText1, styles.buttonTypo]}>Next</Text>
          </Pressable>:null
          }
          
        </View>
        <Text style={[styles.body3, styles.buttonTypo]}>
          <Text
            style={styles.iAgreeTo}
          >{`*You can withdraw your consent anytime by contacting us at `}</Text>
          <Text style={styles.supportsupportcom}>support@support.com</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyTypo: {
    marginLeft: 18,
    textAlign: "left",
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
  },
  bodyLayout: {
    width: 269,
    lineHeight: 20,
    fontSize: FontSize.bodyMediumRegular_size,
  },
  buttonsFlexBox: {
    paddingHorizontal: Padding.p_29xl,
    justifyContent: "center",
    borderRadius: Border.br_xs,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  buttonTypo: {
    textAlign: "center",
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
  },
  tittle: {
    fontSize: FontSize.h4Bold_size,
    lineHeight: 29,
    textAlign: "left",
    fontFamily: FontFamily.bodyLargeBold,
    fontWeight: "700",
    letterSpacing: 0,
    color: Color.textBlack,
  },
  checkIcon: {
    width: 24,
    height: 24,
  },
  iAgreeTo: {
    color: Color.textBody,
  },
  privacyPolicy: {
    textDecoration: "underline",
    color: Color.colorLightseagreen,
  },
  body: {
    lineHeight: 20,
    fontSize: FontSize.bodyMediumRegular_size,
    marginLeft: 18,
  },
  checkParent: {
    flexDirection: "row",
  },
  body1: {
    marginLeft: 18,
    textAlign: "left",
    fontFamily: FontFamily.bodyLargeBold,
    letterSpacing: 0,
  },
  checkGroup: {
    marginTop: 27,
    flexDirection: "row",
  },
  body2: {
    width: 260,
    color: Color.textBody,
    lineHeight: 20,
    fontSize: FontSize.bodyMediumRegular_size,
    marginLeft: 18,
  },
  terms: {
    marginTop: 68,
    alignSelf: "stretch",
  },
  content: {
    top: 116,
    paddingVertical: 0,
    paddingHorizontal: Padding.p_5xl,
    width: 375,
    left: 0,
    position: "absolute",
  },
  buttonText: {
    color: Color.background,
    lineHeight: 22,
    fontSize: FontSize.bodyLargeBold_size,
    textAlign: "center",
    fontWeight: "700",
  },
  buttons1: {
    height: 60,
    paddingVertical: Padding.p_5xs,
    backgroundColor: "#1dac92",
  },
  buttonText1: {
    lineHeight: 22,
    fontSize: FontSize.bodyLargeBold_size,
    textAlign: "center",
    fontWeight: "700",
    color: Color.textBlack,
  },
  buttons2: {
    borderStyle: "solid",
    borderColor: Color.secondaryBase,
    borderWidth: 1,
    paddingVertical: Padding.p_xl,
    marginTop: 12,
    backgroundColor: Color.background,
  },
  buttons: {
    alignSelf: "stretch",
  },
  supportsupportcom: {
    color: Color.colorLightseagreen,
  },
  body3: {
    marginTop: 28,
    width: 269,
    lineHeight: 20,
    fontSize: FontSize.bodyMediumRegular_size,
  },
  buttonsInfo: {
    top: 483,
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: Padding.p_5xl,
    width: 375,
    left: 0,
    position: "absolute",
  },
  termsAndConditions: {
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
    backgroundColor: Color.background,
  },
});

export default TermsAndConditions;
