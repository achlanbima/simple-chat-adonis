import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {goToLogin} from '../Navigation'


export default class DrawerLeft extends Component{
  render(){
    return(
      <View style={{backgroundColor:"#FFF", flex:1, justifyContent:"flex-end"}}>
        <TouchableOpacity onPress={() => goToLogin()}>
          <View style={{borderTopColor:"#CCC", borderTopWidth:0.5, padding:20, flexDirection:"row", alignItems:"center"}}>
            <AntDesign name="logout" size={25} color="#000" style={{ marginRight:20, transform:[{ rotate: '180deg' }]}}/>
            <Text style={{color:"#000", fontSize:20}}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}