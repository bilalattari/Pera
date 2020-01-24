import React, { Fragment } from 'react';
import {
    StyleSheet,
    View,TouchableOpacity,
    Text,ScrollView,ImageBackground,
    Image
} from 'react-native';
import  AsyncStorage from '@react-native-community/async-storage'
import {withNavigation} from 'react-navigation'
import { Dimensions,Platform } from 'react-native';
const logo =  require("../assets/logo.png")
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
 class Splash extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
    header: null
  }

  componentDidMount = async ()=>{
      setTimeout(async ()=>{
        var comingFirst = await AsyncStorage.getItem('tutorial')
        if(comingFirst !== null){
          this.props.navigation.navigate('Home')
        }
        else{
          this.props.navigation.navigate('Landing')
        }
      } , 3000)
  }
    render() {
        return (
          <View style={styles.container}>
              <Image source = {logo} style = {styles.image} />
              <Image source = {require("../assets/from.png")} style = {{height : height/10 , width : height/8 , resizeMode : "contain" , 
              position : "absolute" , bottom : 12}} />
            </View>
         );
      }   
    }   
    
    const styles = StyleSheet.create({
      container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
      },
      image : {height : height/3 ,
        width : height /2.5 ,
          resizeMode : "contain"}
    })
    export default withNavigation(Splash)
