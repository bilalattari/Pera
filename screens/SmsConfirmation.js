import React, { Fragment } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native'
import { Icon, Input, Button } from 'react-native-elements'
import CustomButton from '../Component/Button'
import { themeColor, pinkColor } from '../Constant/index'
import { Picker } from 'native-base'
class CodeConfirmation extends React.Component {
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
  keyboardButton = (number , letters)=><TouchableOpacity style = {{height : 45 , borderRadius : 7 , 
    backgroundColor : '#5A5B5E'  , width : '31%' , justifyContent : 'center' , alignItems : 'center'}}>
      <Text style = {{color : "#fff" , fontSize : letters !== '' ? 15 : 18}}>{number}</Text> 
      {
        letters !== '' ?
      <Text style = {{color : "#fff" , fontSize : 10 , fontWeight : 'bold'}}>{letters}</Text>  
      : null
      }
  </TouchableOpacity>


  render () {
    const { navigation } = this.props
    return (
        <View style={{ backgroundColor: '#323643', flex: 1 }}>
          <ScrollView>
        <View style={{ padding: 30, paddingLeft: 15 }}>
          <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>
            Confirmation
          </Text>
          <Text style={{ color: '#ccc', fontSize: 15 }}>
            Please enter the verification code from the sms we just sent you.
          </Text>
        </View>   
        <Input placeholder = {'Phone Number'}
         keyboardType = {'numeric'} placeholderTextColor = {'#fff'} 
         inputContainerStyle = {styles.inputContainer} inputStyle = {{fontWeight : 'bold' , fontSize :14}} />
         <View style = {{marginVertical  : 12}}>
             <CustomButton
                  onPress = {()=> this.props.navigation.navigate('CodeConfirmation')}
                  containerStyle = {{width : '90%'}}
                  title = {'Confirm'} backgroundColor = {pinkColor} 
                  />
         </View>
         <TouchableOpacity style = {{flexDirection : 'row'}}>
           <Text style = {{color : '#ccc' , paddingLeft : 25}}>Don't get it ?<Text style = {{color : pinkColor}}> Resend Code</Text></Text>
         </TouchableOpacity>
                  </ScrollView>
                  <View style = {{justifyContent : 'flex-end' , backgroundColor : '#000'}}>
                    <View style = {{flexDirection : 'row'  , marginTop : 5, justifyContent : 'space-around'}}>
                      {this.keyboardButton('1' , '')}
                      {this.keyboardButton('2' , 'ABC')}
                      {this.keyboardButton('3' , 'DEF')}
                       </View>
                       <View style = {{flexDirection : 'row'  , marginTop : 5, justifyContent : 'space-around'}}>
                      {this.keyboardButton('4' , 'GHI')}
                      {this.keyboardButton('5' , 'KHL')}
                      {this.keyboardButton('6' , 'MNO')}
                       </View>
                       <View style = {{flexDirection : 'row'  , marginTop : 5, justifyContent : 'space-around'}}>
                      {this.keyboardButton('7' , 'PQRS')}
                      {this.keyboardButton('8' , 'TUV')}
                      {this.keyboardButton('9' , 'WXYZ')}
                       </View>
                       <View style = {{flexDirection : 'row'  , marginTop : 5, justifyContent : 'space-around'}}>
                      {/* {this.keyboardButton('' , '')} */}
                      <View style = {{width : '31%'}} />
                      {this.keyboardButton('0' , '')}
                      <TouchableOpacity style = {{height : 42 , borderRadius : 7 ,  width : '31%' , justifyContent : 'center' , alignItems : 'center'}}>
                       <Icon type = {"font-awesome5"} name = {'backspace'} color = {'#fff'} />
                      </TouchableOpacity>
                       </View>
                       <TouchableOpacity style = {{height : 42 ,  marginTop:   18, alignSelf : "flex-end" , marginRight : 25}}>
                       <Icon type = {"font-awesome"} name = {'microphone'} color = {'#fff'} size = {30} />
                      </TouchableOpacity>
                    </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    borderColor: '#323643',
    backgroundColor: '#454B61',
    borderRadius: 7,
    paddingLeft: 12,
    marginVertical: 6
  },

  picker :{
    width: '94%',
    alignSelf: 'center',
    paddingHorizontal: 4,
    backgroundColor: '#454B61',
    height: 50,
    borderRadius: 7
  },
})
export default CodeConfirmation
