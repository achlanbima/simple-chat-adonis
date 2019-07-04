import {Navigation} from 'react-native-navigation'
import axios from 'axios'

const GLOBALS = require('../src/Globals')

const url = GLOBALS.API_URL

export const goToLogin = async () => {
  
    Navigation.setRoot({
      root: {
        component: {
          name: "login"
        }
      }
    });
 
}

export const goToHome = () => {
  Navigation.setRoot({
    root: {
      sideMenu:{
        left:{
          component:{
            name: "drawerLeft",
            id: "left-drawer"
          }
        },
        center:{

          stack:{
            children:[{
    
              component: {
                name: "group"
              },
            }],
            options:{
              topBar:{
                visible: false,
                drawBehind: true
              },
              animations: {
                push: {
                  enabled: false,
                  
                },
                pop: {
                  enabled: false,
                  
                }
              }
            }
            
          }
        }
      }
    }
  })

}