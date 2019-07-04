import React, {Component} from 'react'
import {View, Text, FlatList, AsyncStorage, TouchableOpacity,TouchableHighlight, StyleSheet} from 'react-native'
import axios from 'axios'
import {Navigation} from 'react-native-navigation'
import AntDesign from 'react-native-vector-icons/AntDesign'

const GLOBALS = require('../Globals')

const url = GLOBALS.API_URL

export default class Group extends Component{

  constructor(props){
    super(props)
    this.state = {
      user : []
    }
  }
  
  componentDidMount(){
    this.getUser();
  }

  async getUser(){
    const token = await AsyncStorage.getItem('@token')
    
    
    axios.get(`${url}/users/getUser`, {
      headers:{
        Authorization:token
      }
    }).then((res) => {
      this.setState({user: res.data})
        
    }).catch((err)=> alert(err.response.data.msg))
  }

  logout(){
    Navigation.setRoot({
      root: {
        component: {
          name: "login"
        }
      }
    });
  }

  goToChat(groupId, groupName){
    Navigation.push(this.props.componentId, {
      component: {
        name: 'chat',
        passProps:{
          groupId,
          groupName,
          userId: this.state.user.id
        },
        
      }
    })
  }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {
          Navigation.mergeOptions('left-drawer', {
            sideMenu:{
               left:{
                  visible:true
               }
            }
         })
        }}>
            <Text style={styles.user}>{this.state.user.username}</Text>
          </TouchableOpacity>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity>
              <AntDesign name="message1" size={25} color="#FFF" style={{ marginLeft:20}} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="addusergroup" size={25} color="#FFF" style={{ marginLeft:20}} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={{flex:9}}>

        <FlatList
          
          data={this.state.user.groups}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity style={styles.groupItem} onPress={() => this.goToChat(item.id,item.name)}>
              <View>
                <Text style={styles.groupTitle}>{item.name}</Text>
                <Text style={styles.groupMember}>Member : {(item.user).length}</Text>
              </View>
              </TouchableOpacity>
            </View>
          )}
          />
        
          </View>
        
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor:"#55F",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#AAA",
    justifyContent:"space-between",
    flexDirection: 'row',
  },

  user:{
    fontSize:18,
    color:"#FFF",
    fontWeight: 'bold',
    
  },

  groupItem:{
    backgroundColor:"#efefef",
    width:"90%",
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
    borderColor: "#AAA",
    borderWidth: 0.3,
  },

  groupTitle:{
    fontSize:20,
    color:"#000"
  },

  groupMember:{
    fontSize:13,
    textAlign:"right"
  }
})
