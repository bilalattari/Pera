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
import { Icon } from 'react-native-elements';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-community/async-storage';
const slides = [
  require("../assets/1.png"),
  require("../assets/2.png"),
  require("../assets/4.png"),
  require("../assets/3.png"),
];
const width = Dimensions.get('window').width
      const height = Dimensions.get('window').height
 class LandingScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      index : 0
    }
  }
  static navigationOptions = {
    header: null
  }
  _renderItem = ({ item , index }) => {
    return (
      <View style = {{ justifyContent : 'center' , 
      alignItems : 'center' , marginTop : '20%' }}>
        <Image  style = {{height : height/1.45, width : height/2.35 , 
          resizeMode : "stretch"  }} source = {slides[index]} />
        </View>
    );
  }
  _onDone = async () => {
    this.props.navigation.navigate('Home'),
    AsyncStorage.setItem('tutorial' , 'true')
  }
    render() {
      let {index} = this.state
      const {navigation} = this.props
        return (
          <ImageBackground 
          resizeMode = {"stretch"}
          style = {{flex : 1, justifyContent : 'center' , alignItems : "center"}}
          source = {require('../assets/bgg.png')}
          >
           <AppIntroSlider
           showDoneButton = {false}
           onSlideChange = {(index)=> this.setState({index})}
           paginationStyle = {{marginBottom : 41 }}
           showNextButton = {false}
           ref={(ref) => this.intro = ref}
           goToSlide = {index}
           activeDotStyle = {{backgroundColor : 'red'}}
           dotStyle = {{backgroundColor : '#ccc'}}
           renderItem={this._renderItem} slides={slides} onDone={this._onDone}/>
           <View style = {styles.nextView}>
              <TouchableOpacity 
              onPress = {()=>{this.setState({index : index + 1} ,
                 ()=> {
                   if(index === 3){
                     this._onDone()
                   }else{
                     this.intro.goToSlide(index + 1)
                   }
                 }) }}
              style = {[styles.nextButton , {backgroundColor : index === 1 ? '#000' : themeColor}]}> 
                <Text style = {[styles.nextText]}>{index === 3 ? "DONE" : "NEXT" }</Text>
                {
                  index !== 3 ? 
                  <Icon type = {'antdesign'} color = {'#fff'} 
                  name = {'arrowright'}  size = {14}/> : null
                }
                </TouchableOpacity>
             </View>
             </ImageBackground>
        );
      }   
    }   
    
    const styles = StyleSheet.create({
      container : {
        flex : 1,
      },
      nextText : {color : "#fff" , fontSize : height/34 , 
      fontWeight : 'bold' , paddingBottom : 3  },
      nextView : {height : height/10.5  ,width : "100%", position : 'absolute',
      bottom : 0,
      alignItems : 'flex-end' , justifyContent : "center"},
      imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
      },
      bottomButtons : {justifyContent : 'flex-end'  , height : 80 , flexDirection : 'row' , 
      justifyContent : 'space-between' , alignItems : 'center' , marginBottom : 12  , marginHorizontal : 12},
      arrowButton : {height : 50 , width : 50 , 
        borderRadius : 25 ,backgroundColor : '#fff' , justifyContent : 'center' , alignItems : 'center'},
      image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
      },
      nextButton : {height : height/14 , backgroundColor : themeColor , width : 95 , flexDirection : 'row' ,
      justifyContent : 'space-around' , alignItems : "center" , borderTopLeftRadius  : 125 ,
       borderBottomLeftRadius : 125 , paddingHorizontal : 6}
    })
    export default withNavigation(LandingScreen)
