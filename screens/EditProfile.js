import React, { Fragment } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  ScrollView
} from 'react-native'
import { SearchBar, Icon , Input } from 'react-native-elements'
import CustomButton from '../Component/Button'
import CustomHeader from '../Component/header'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Picker } from 'native-base'
import { themeColor, pinkColor } from '../Constant'
class EditProfile extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          selected: 'key1'
        }
      }
      static navigationOptions = {
        header: null
      }
      onValueChange (value) {
        this.setState({
          selected: value
        })
      }
  render () {
    const { navigation } = this.props
    return (
      <ScrollView stickyHeaderIndices = {[0]} style={{ backgroundColor: '#323643', flex: 1 }}>
        <CustomHeader title={'Edit PROFILE'} />
        <View style={{ alignSelf: 'center', width: '100%', alignItems: 'center' ,
         paddingBottom : 25 ,borderBottomColor : "#444B60" , borderBottomWidth: 0.5, }} >
          <View style={styles.imageWrapper} >
            <Image
              source={require('../assets/avatar.png')}
              style={[styles.imageStyle]}/>
          </View>
          <TouchableOpacity>
          <Text style={{ color: pinkColor, fontSize: 15 , marginTop: -12, }}>  Change Profile Picture  </Text>
              </TouchableOpacity>

          </View>
              <Input 
                placeholder = {"Johndoe66"}
                containerStyle = {{width : "100%" , }}
                inputStyle = {styles.inputStyle}
                placeholderTextColor = {"#bbb"}
                inputContainerStyle = {styles.inputContainer} />
                <View  style={styles.picker} >
          <Picker
            note
            mode='dropdown'
            style={{ width: '50%', color: '#bbb'  , alignItems : "flex-end"}}
            selectedValue={this.state.selected}
            onValueChange={this.onValueChange.bind(this)}
          >
            <Picker.Item label='New Country' value='key0' />
            <Picker.Item label='ATM Card' value='key1' />
            <Picker.Item label='Debit Card' value='key2' />
            <Picker.Item label='Credit Card' value='key3' />
            <Picker.Item label='Net Banking' value='key4' />
          </Picker>
        </View>
                 <Input 
                placeholder = {"Toronto , Canada"}
                containerStyle = {{width : "100%" , }}
                inputStyle = {styles.inputStyle}
                placeholderTextColor = {"#bbb"}
                inputContainerStyle = {styles.inputContainer} />
                 <Input 
                placeholder = {"Johndoe66"}
                containerStyle = {{width : "100%" , }}
                inputStyle = {styles.inputStyle}
                placeholderTextColor = {"#bbb"}
                inputContainerStyle = {styles.inputContainer} />
                <View style = {{borderBottomColor  : "#444B60" , borderBottomWidth : 5 , height : 60 ,
                 justifyContent : "center" , alignItems : "center",borderTopColor  : "#444B60" , borderTopWidth : 5}}>
                    
                   <TouchableOpacity>
                        <Text style = {{color :'#A05669'}}>Delete Account</Text> 
                        </TouchableOpacity>
                    </View>
                    <View style = {{marginVertical : 15}}>
                        <CustomButton title = {"Save"} backgroundColor = {pinkColor}  containerStyle = {{width : "90%"}}/>
                    </View>
                
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageStyle: {
    height: 85,
    width: 85,
    borderRadius: 125,
    marginHorizontal: 12,
    resizeMode: 'contain'
  },
  picker :{
    width: '94%',
    alignSelf: 'center',
    paddingHorizontal: 4,
    backgroundColor: themeColor,
    height: 60,
    alignItems : "flex-end",

    borderBottomColor : "#444B60" , borderBottomWidth: 0.5,
    borderRadius: 7
  },
  imageWrapper : {
    height: 100,
    width: 100,
    borderRadius: 125,
    borderColor: pinkColor,
    marginVertical: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statsView : {flexDirection : "row" , justifyContent : "space-around" , 
  alignItems : 'center' , height : 100 ,
   borderTopColor : "#ccc" , borderBottomColor : "#BBB" , borderWidth : 0.5},
   heading : {color : "grey" , fontSize : 14 ,  fontWeight : "bold" , margin : 4},
   number : {color : "#fff" , fontSize : 16 , textAlign : "center"},
   inputStyle : {textAlign : "right" , color : "#ccc", fontSize : 15},
   inputContainer : {backgroundColor : themeColor ,height : 60,borderBottomColor : "#444B60" , borderBottomWidth: 0.5,
},
})
export default EditProfile
