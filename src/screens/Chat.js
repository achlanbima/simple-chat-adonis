import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet, TouchableHighlight, TouchableOpacity, AsyncStorage, Alert} from 'react-native'
import axios from 'axios'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {Item, Input} from 'native-base'
import {Navigation} from 'react-native-navigation'

const GLOBALS = require('../Globals')

const url = GLOBALS.API_URL

export default class Chat extends Component{

  constructor(props){
    super(props)
    this.state = {
      userId : this.props.userId,
      messages: [],
      inputMessage : "",
      groupId: "",
      markState: false,
      selectedItem: "",
      groupMember:{}
    }
    intervalId = 0
  }

  componentDidMount(){
    this.intervalId = setInterval(() => {
                        this.getMessage()
                      }, 2000);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId)
  }

  getMessage(){
    axios.get(`${url}/group/${this.props.groupId}`)
      .then((res) => {        
        this.setState({messages:res.data.message, groupId:res.data.id, groupMember:res.data.user})
      }).catch((err) => console.log(err))
  }

  async send(){
    if(this.state.inputMessage){
      const token = await AsyncStorage.getItem('@token')
      axios.post(`${url}/message`,{
        message:this.state.inputMessage,
        reciever_group_id: this.state.groupId
      } ,{
        headers:{
          Authorization:token
        }
      }).then((res) => {
        this.setState({inputMessage:""})
          
      }).catch((err)=> alert(err.response.data.msg))

    }
    
  }

  _mark(id){
    this.setState({markState:true, selectedItem:id})
  }

  _unmark(){
    this.setState({markState:false, selectedItem:""})
  }

  delete(){
    Alert.alert("Hapus data","Anda yakin?", [
      {text: 'tidak'},
      {text: 'ya', onPress: async () => {
        const token = await AsyncStorage.getItem('@token')
        axios.delete(`${url}/message/${this.state.selectedItem}`, {
          headers:{
            Authorization:token
          }
        }).then((res)=>{
          alert('Pesan Berhasil dihapus')
          this._unmark()
          
        }).catch((err)=>alert(err))
      }},
      
    ],)
  }

  goToMemberList(){
    Navigation.push(this.props.componentId, {
      component: {
        name: 'memberList',
        passProps:{
          groupMember:this.state.groupMember
        }
        
      }
    })
  }

  render(){
    return(
      <View style={{flex:1}}>
        {!this.state.markState ? (

        <View style={styles.header}>
          <Text style={styles.user}>{this.props.groupName}</Text>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity onPress={() => this.goToMemberList()}>
              <FontAwesome name="group" size={25} color="#FFF" style={{ marginLeft:20}} />
            </TouchableOpacity>
          </View>
        </View>
        ) : (
          <View style={styles.header}>
            <TouchableOpacity onPress={()=> this._unmark()}>
              <AntDesign name="arrowleft" size={25} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.delete()}>
              <AntDesign name="delete" size={25} color="#FFF" />
            </TouchableOpacity>
        </View>
        )}

        <View style={{flex:9, backgroundColor:"#FFF"}}>

        <FlatList
          style={{marginTop:5}}
          inverted
          extraData={this.state.selectedItem}
          data={this.state.messages}
          renderItem={({item}) => (
            <View style={{backgroundColor: this.state.selectedItem == item.id ? "#D9D9D9": "#FFF"}}>
              

              <TouchableHighlight onLongPress={()=>item.user_id==this.state.userId ? this._mark(item.id, item.message): null} style={ item.user_id!=this.state.userId ? styles.bubbleMsg : styles.ownBubbleMsg} key={item.id}>
                <View key={item.id} >
                  <Text style={ item.user_id!=this.state.userId ? styles.otherUser : styles.otherUser}>{item.user_id==this.state.userId ? "Me": item.user.username}</Text>
                  <Text style={ item.user_id!=this.state.userId ? styles.otherUserMsg : styles.ownUserMsg}>{item.message}</Text>
                  {/* <Text>{moment(item.created_at).format('LT')}</Text> */}
                </View>
              </TouchableHighlight>
            </View>
          )}
          />
          </View>

        <View>
        <Item style={styles.wrapper}>
              <Input placeholder="message..." value={this.state.inputMessage} onChangeText={(value) => this.setState({inputMessage:value})} multiline={true} />
              <TouchableOpacity onPress={()=> this.send()}>
              <View style={[styles.btnSend]}>
                <Text style={styles.btnText}>Send</Text>
              </View>
            </TouchableOpacity>
            </Item>
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

  bubbleMsg: {
    borderBottomLeftRadius: 0,
    justifyContent:"flex-start",
    backgroundColor:"#55F",
    marginVertical: 5,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    marginRight: 'auto',
    minWidth:100,
    
  },

  otherUser:{
    color:"#FFF",
    fontWeight:"bold",
    fontSize:17
  },

  otherUserMsg:{
    color:"#FFF",
    fontWeight:"normal"
  },

  ownUserMsg:{
    color:"#FFF",
    fontWeight:"normal"
  },

  ownBubbleMsg: {
    backgroundColor:"#AAA",
    marginVertical: 5,
    paddingVertical: 10,
    borderRadius: 20,
    borderBottomRightRadius: 0,
    marginHorizontal: 15,
    justifyContent:'flex-end',
    marginLeft: 'auto',
    paddingHorizontal: 10,
    minWidth:100
  },
  wrapper:{
    paddingHorizontal:10,
    borderTopWidth: 0.5,
    borderTopColor: "#CCC",
  },
  btnSend:{
    backgroundColor:"#55F",
    paddingVertical:10,
    paddingHorizontal:30,
    borderRadius:5
  },
  btnText:{
    color:"#FFF"
  }
})