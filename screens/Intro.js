import React, { Fragment } from 'react';
import {
    StyleSheet,
    View,TouchableOpacity,
    Text,
    Image
} from 'react-native';
import {withNavigation} from 'react-navigation'
import CustomButton from '../Component/Button'
import Logo from '../Component/LogoImage'
import {themeColor} from '../Constant/index'
import Slogan from '../Component/Slogan'
import {Icon} from 'react-native-elements'
 class IntroScreen extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
    header: null,
};
    render() {
      const {navigation} = this.props
        return (
            <View style={styles.container}>
               <Logo  height = {120}/>
                 <Slogan />
                 <View style = {{height : 200, backgroundColor : "skyblue" , justifyContent : "center" , alignItems : "center"}}>
                     <Icon type = {"font-awesome"} name = {"play-circle"} color = {"#fff"} size = {80} />
                  </View>
                 <View style = {{flexDirection : "row" , justifyContent : "space-around"}}>
                     <CustomButton 
                     containerStyle = {{width : 200}}
                     title = {'Welcome To Hopeup'} onPress = {()=> navigation.navigate("App")}/>
                     </View>
            </View>
        );
      }   
    }   
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent : 'space-around',
        flexDirection: 'column',
      },
    })
    export default withNavigation(IntroScreen)
