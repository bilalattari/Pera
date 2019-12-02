import React, { Fragment } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'
import CustomInput from '../Component/Input'
import CustomButton from '../Component/Button'
import CustomHeader from '../Component/header'
import { Picker } from 'native-base'
import { withNavigation } from 'react-navigation'
class ChangeAccountPassword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 'deposit'
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

  pickerHeading = text => <Text style={styles.pickerHeading}>{text}</Text>

  render () {
    let data = ['1', '2', '3']
    const state = this.state
    return (
      <View style={styles.container}>
        <CustomHeader
        navigation = {navigation}
          title={'Change Account Password'}
          openMenu={() => this.props.navigation.navigate('Homw')}
        />
        <View style = {{marginTop : '10%'}}>
        {this.pickerHeading('CURRENT PASSWORD')}
        <CustomInput
          inputContainerStyle = {styles.amountInput}
          secureTextEntry = {true}
          textChange={text => console.log(text)}
          placeholder={'Current Password'}
        />
        {this.pickerHeading('NEW PASSWORD')}
        <CustomInput
          inputContainerStyle = {styles.amountInput}
          secureTextEntry = {true}
          textChange={text => console.log(text)}
          placeholder={'Amount'}
        />
        {this.pickerHeading('NEW PASSWORD')}
        <CustomInput
          inputContainerStyle = {styles.amountInput}
          secureTextEntry = {true}
          textChange={text => console.log(text)}
          placeholder={'CONFIRM PASSWORD'}
        />
        <View style={{ marginTop: 24 }}>
          <CustomButton title={'Change Password'}  containerStyle = {{width : 180}} />
        </View>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  amountInput : {width : '92%' , borderColor : '#D8D8D8' ,borderRadius : 5,
  borderWidth : 0.5 , alignSelf: 'center' , marginLeft: 17, paddingLeft : 6},
  pickerHeading: { paddingLeft: '6%', fontWeight: '700' , marginTop : 6}
})
export default withNavigation(ChangeAccountPassword)
