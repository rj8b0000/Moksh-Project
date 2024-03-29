/* eslint-disable prettier/prettier */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MokshHome from './screens/MokshHome';
import EnterNewPassword from './screens/EnterNewPassword';
import ForgotPassword from './screens/ForgotPassword';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import TermsAndConditions from './screens/TermsAndConditions';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/dashboard';
import VerifyAccount from './screens/VerifyAccount';
import VerifyPhoneNumber from './screens/VerifyPhoneNumber';
import VerifyEmailAddress from './screens/VerifyEmailAddress';
import SplashScreen from './screens/SplashScreen';
import SignInForNewUser from './screens/SignInForNewUser';
import Home from './screens/ManrtaPlayer/Home';
import Music from './screens/ManrtaPlayer/Music';
import Mala from './screens/Mala Jaap/Mala';
import JaapCompleteScreen from './screens/Mala Jaap/JaapCompleteScreen';
import Mala_Mantraplayer from './screens/Mala Jaap/MantraAndMala';

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const Stack = createStackNavigator();
  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MokshHome"
              component={MokshHome}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="VerifyEmailAddress"
              component={VerifyEmailAddress}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EnterNewPassword"
              component={EnterNewPassword}
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
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="Mala_Mantraplayer"
              component={Mala_Mantraplayer}
              options={{headerShown: true}}
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
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
