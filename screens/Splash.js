import React, { Fragment } from 'react';
import {
    StyleSheet,
    View,TouchableOpacity,
    Text,ScrollView,ImageBackground,
    Image
} from 'react-native';
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
  _onDone = () => {
    this.setState({ showRealApp: true });
  }
  componentDidMount = ()=>{
      setTimeout(()=>this.props.navigation.navigate('Landing') , 2000)
  }
    render() {
        return (
          <View style={styles.container}>
              <Image source = {logo} style = {styles.image} />
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
