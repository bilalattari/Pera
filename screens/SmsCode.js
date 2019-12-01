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
class SmsCode extends React.Component {
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
      <View style={{ backgroundColor: '#323643', flex: 1 }}>
        <View style={{ padding: 30, paddingLeft: 15 }}>
          <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>
            Your Phone
          </Text>
          <Text style={{ color: '#ccc', fontSize: 15 }}>
            Enter your phone number and we will send you a conformation code
          </Text>
        </View>
        <View style = {{flex : 1 , justifyContent : "flex-end"}}>
        <View  style={styles.picker} >
          <Picker
            note
            mode='dropdown'
            style={{ width: '100%', color: '#fff' }}
            selectedValue={this.state.selected}
            onValueChange={this.onValueChange.bind(this)}
          >
            <Picker.Item label='Wallet' value='key0' />
            <Picker.Item label='ATM Card' value='key1' />
            <Picker.Item label='Debit Card' value='key2' />
            <Picker.Item label='Credit Card' value='key3' />
            <Picker.Item label='Net Banking' value='key4' />
          </Picker>
        </View>
        <Input placeholder = {'Phone Number'} keyboardType = {'numeric'} placeholderTextColor = {'#fff'} 
         inputContainerStyle = {styles.inputContainer} inputStyle = {{fontWeight : 'bold' , fontSize :14}} />
             <View style = {{marginVertical  : 12}}>
             <CustomButton
                  onPress ={()=> this.props.navigation.navigate('CodeConfirmation')}
                  containerStyle = {{width : '90%'}}
                  title = {'Next'} backgroundColor = {pinkColor} 
                  />
                 </View>
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
export default SmsCode
