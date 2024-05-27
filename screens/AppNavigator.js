import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './common_screens/SplashScreen';
import VerifyEmailAddress from './common_screens/VerifyEmailAddress';
import ForgotPassword from './common_screens/ForgotPassword';
import LoginScreen from './common_screens/LoginScreen';
import SignUpScreen from './common_screens/SignUpScreen';
import TermsAndConditions from './common_screens/TermsAndConditions';
import VerifyAccount from './common_screens/VerifyAccount';
import VerifyPhoneNumber from './common_screens/VerifyPhoneNumber';
import SignInForNewUser from './common_screens/SignInForNewUser';
import HomeScreen from './common_screens/dashboard';
import Home from './ManrtaPlayer/Home';
import Music from './ManrtaPlayer/Music';
import Mala_Mantraplayer from './Mala Jaap/MantraAndMala';
import JaapCompleteScreen from './Mala Jaap/JaapCompleteScreen';
import Mala from './Mala Jaap/Mala';
import MokshHome from './common_screens/MokshHome';
import StartMantraScreen from './Mala Jaap/StartMantraScreen';
import MantraJaapScreen from './Mala Jaap/MantraJaapScreen';
import StartRegularMantraScreen from './Mala Jaap/Regular_MantraJaap/StartRegularMantraScreen';
import RegularMala from './Mala Jaap/Regular_MantraJaap/RegularMala';
import RegularJaapDone from './Mala Jaap/Regular_MantraJaap/RegularJaapDone';
import RoomScreen from './Event_Screens/CommunityScreen';
import Testing from './common_screens/testing';
import MantraCategoriesScreen from './Mala Jaap/Mantra_Categories/MantraCategoriesScreen';

const AppNavigator = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const Stack = createStackNavigator();
  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{headerShown: false}}
           >
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
                name='MokshHome'
                component={MokshHome}
                options={{headerShown: false}}
            />
            <Stack.Screen
              name="VerifyEmailAddress"
              component={VerifyEmailAddress}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="TermsAndConditions"
              component={TermsAndConditions}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="VerifyAccount"
              component={VerifyAccount}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="VerifyPhoneNumber"
              component={VerifyPhoneNumber}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignInForNewUser"
              component={SignInForNewUser}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MantraHome"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MantraPlayer"
              component={Music}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Mala_Mantraplayer"
              component={Mala_Mantraplayer}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="JaapDone"
              component={JaapCompleteScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Mala"
              component={Mala}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="StartMantra"
              component={StartMantraScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MantraJaapScreen"
              component={MantraJaapScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name='StartRegularMantraJaap'
              component={StartRegularMantraScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name='RegularMala'
              component={RegularMala}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name='RegularJaapDone'
              component={RegularJaapDone}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name='Community'
              component={RoomScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name = 'MantraCategories'
              component={MantraCategoriesScreen}
              options={{headerShown: false}}
            />
            {/* <Stack.Screen
              name='Testing'
              component={Testing}
              options={{headerShown: false}}
            /> */}
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default AppNavigator;
