
import React, { Component } from 'react'
import { Text, StyleSheet, View , TouchableOpacity  } from 'react-native'
import {Icon , Input} from 'react-native-elements'
import {themeColor} from '../Constant/index'
export default class Tags  extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editTag : false
    }
  }
render() {
  let props = this.props
  let {editTag } = this.state
  let data = this.props.item
  let index = this.props.index
  return (

      <View style={styles.tagContainer} key = {index}>
        <TouchableOpacity onPress = {()=> props.onDelete(data, index)}>
          <Icon
            type={'font-awesome'}
            name={'times-circle'}
            color={themeColor}
            size={13}
            containerStyle={{ width: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity  onPress = {()=> this.setState({editTag : !editTag})}>
          <Icon
            type={'font-awesome'}
            name={editTag ?  'check' : "edit"}
            color={themeColor}
            size={13}
            containerStyle={{ width: 20 }}
          />
        </TouchableOpacity>
        {
          editTag  ? 
            <Input  value = {data} 
            onChangeText = {(text)=> props.update(data , index ,text )}
            containerStyle = {{height : 20 , width : 140 , padding : 3 , }}
            inputContainerStyle = {{borderBottomWidth : 0,   height : 20}}   />
          :
          <Text style={styles.tagText}>{data}</Text>
        }
      </View>
  )
};
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundVideo: {
    height: 200,
    width: '100%',
    backgroundColor: themeColor
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderWidth: 1,
    borderColor: themeColor,
    height: 25,
    margin: 2
  },
  tagText: { fontSize: 12, marginHorizontal: 4 },
  tagBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: themeColor,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 4
  },
  tagMainBox : {
    minHeight: 100,
    marginVertical: 25,
    marginHorizontal: '2.8%'
  },
  labelStyle :{ color: themeColor, fontSize: 14, paddingVertical: 2 }
})
