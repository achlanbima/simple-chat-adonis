/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import App from './App';
import {registerScreen} from './src/register'
import {AsyncStorage} from 'react-native'
import {goToHome, goToLogin} from './src/Navigation'

registerScreen();
Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App);

getStore = async () => {
  const token = await AsyncStorage.getItem('@token')
  if(token==null){
    goToLogin()
  }else{
    goToHome()
  }
}
Navigation.events().registerAppLaunchedListener(() => {
  getStore();
});