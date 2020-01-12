import React, { Fragment } from 'react';
import {
    StyleSheet,
    View,TouchableOpacity,
    Text,ScrollView,ImageBackground,
    Image
} from 'react-native';
import {withNavigation} from 'react-navigation'
import { Dimensions,Platform } from 'react-native';
import CustomButton from '../Component/Button'
import {themeColor, pinkColor} from '../Constant/index'
import Searchbar from '../Component/SearchBar'
import { Icon } from 'react-native-elements';
const slides = [
  require("../assets/1.png"),
  require("../assets/2.png"),
  require("../assets/4.png"),
  require("../assets/3.png"),
];
const width = Dimensions.get('window').width
      const height = Dimensions.get('window').height
 class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  static navigationOptions = {
    header: null
  }

    render() {
      let {index} = this.state
      const {navigation} = this.props
        return (
            <View>
                <View style = {{height : 120 , backgroundColor : themeColor ,
                     borderBottomLeftRadius : 72 , paddingLeft : '20%' , justifyContent : 'flex-end'}}>
                         <Text style = {{color : '#fff' , fontWeight : 'bold' , fontSize : 30}}>Cllents</Text>
                         <Searchbar />
                    </View>
                </View>
        );
      }   
    }   
    
    const styles = StyleSheet.create({
      container : {
        flex : 1,
      },
      nextText : {color : "#fff" , fontSize : height/34 , 
      fontWeight : 'bold' , paddingBottom : 3  },
    })
    export default withNavigation(Home)
