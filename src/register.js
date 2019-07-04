import {Navigation} from 'react-native-navigation'

export function registerScreen(){
  Navigation.registerComponent(`login`, () => require('./screens/Login').default);
  Navigation.registerComponent(`main`, () => require('./screens/Main').default);
  Navigation.registerComponent(`group`, () => require('./screens/Group').default);
  Navigation.registerComponent(`chat`, () => require('./screens/Chat').default);
  Navigation.registerComponent(`memberList`, () => require('./screens/ChatMemberList').default);
  Navigation.registerComponent(`drawerLeft`, () => require('./components/DrawerLeft').default);
}