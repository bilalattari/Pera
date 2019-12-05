import React, { Fragment } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image , ScrollView } from 'react-native'
import CustomInput from '../Component/Input'
import CustomButton from '../Component/Button'
import CustomHeader from '../Component/header'
import { Picker } from 'native-base'
import { withNavigation } from 'react-navigation'
import { pinkColor } from '../Constant';
import LinearGradient from 'react-native-linear-gradient';

class ControlPanel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  static navigationOptions = {
    header: null
  }

  menuButtons = (name , route)=><TouchableOpacity style = {{height : 40 , borderBottomColor : '#bbb' ,
  borderBottomWidth : 0.5 , margin : 2 , justifyContent : 'center'}}
  onPress = {()=> this.props.navigation.navigate(route)}
  >
     <Text style = {{color : '#fff' , fontWeight : 'bold' , paddingLeft: 12,}}>{name}</Text>
 </TouchableOpacity>
  render () {
    let data = ['1', '2', '3']
    const state = this.state
    return (

        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}  colors={['#FF6B98', '#FE787E', '#FE8663']} 
        style={{flex : 1  , justifyContent : 'center'}}>
          <ScrollView>
            <Image source = {require('../assets/logo.jpeg')}
             style = {{height : 300 , width : 300 , resizeMode : "contain"}} />
            {this.menuButtons('PROFILE' , 'Profile')}
            {this.menuButtons('BLOG' , 'Blog')}
            {this.menuButtons('MESSAGES' , 'Messages')}
            {this.menuButtons('MY ADDRESSES' , 'MyAddress')}
            {this.menuButtons('ADD PHOTO' , 'AddPhoto')}
            {this.menuButtons('Post Blog' , 'PostBlog')}
            {this.menuButtons('MY Orders' , 'MyOrders')}
            {this.menuButtons('Detail' , 'Detail')}
            {this.menuButtons('Your Chart' , 'Yourchart')}
            {this.menuButtons('Select Blog' , 'SelectBlog')}
            {this.menuButtons('Blog Category' , 'BlogCategory')}
            {this.menuButtons('Privacy' , 'Privacy')}
            {this.menuButtons('Payment' , 'Payment')}
            {this.menuButtons('Support' , 'Support')}
            </ScrollView>
</LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : pinkColor
  },
  amountInput : {width : '92%' , borderColor : '#D8D8D8' ,borderRadius : 5,
  borderWidth : 0.5 , alignSelf: 'center' , marginLeft: 17, paddingLeft : 6},
  pickerHeading: { paddingLeft: '6%', fontWeight: '700' , marginTop : 6}
})
export default withNavigation(ControlPanel)
