import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default class CharMemberList extends Component{

  constructor(props){
    super(props)
    this.state = {
      member:[]
    }
  }

  componentDidMount(){
    this.setState({member:this.props.groupMember});
    console.log(this.props.groupMember)
  }

  render(){
    return(
      <View>
        <View style={styles.header}>
          <Text style={styles.user}>Members</Text>
            <TouchableOpacity>
              <AntDesign name="adduser" size={25} color="#FFF" style={{ marginLeft:20}} />
            </TouchableOpacity>
        </View>
        <View style={styles.bodyWrapper}>

          <FlatList
            data={this.state.member}
            renderItem={({item}) => (
              <View style={styles.mainList}>
                
                <Text style={styles.itemList}>{item.username}</Text>
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
  bodyWrapper:{
    width:"90%",
    marginLeft:"auto",
    marginRight: "auto",
  },
  mainList:{
    borderWidth:0.5,
    borderColor: "#CCC",
    paddingHorizontal:20,
    paddingVertical:10,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#E9E9E9"
  },
  itemList:{
    fontSize:20
  }
})
