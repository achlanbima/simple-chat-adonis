import React, {Component} from 'react'
import {View, Text, TouchableHighlight} from 'react-native'

export default class Bubble extends Component{

  constructor(props){
    super(props)
    this.state = {
      isSelected:false
    }
  }

  isSelected(){
    this.setState({isSelected:!this.state.isSelected})
  }

  render(){
    return(
      <View style={{backgroundColor: this.state.isSelected ? "red" : "#FFF"}}>
      <TouchableHighlight onLongPress={()=>{
        this.props.longPressAct()
        this.isSelected()
        }} style={this.props.bubbleStyles}>
        <View>
          <Text style={this.props.bubbleNameStyles}>{this.props.bubbleName}</Text>
          <Text style={this.props.bubbleMessageStyles}>{this.props.message}</Text>
          {/* <Text>{moment(item.created_at).format('LT')}</Text> */}
        </View>
      </TouchableHighlight>
      </View>
    )
  }
}