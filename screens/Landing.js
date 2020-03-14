/* eslint-disable */

import React, { Fragment } from 'react';
import {
    StyleSheet,
    View,TouchableOpacity,
    Text,ScrollView,
    Image
} from 'react-native';
import {withNavigation} from 'react-navigation'
import Carousel, { ParallaxImage  , Pagination} from 'react-native-snap-carousel';
import { Dimensions,Platform } from 'react-native';
const { width: screenWidth } = Dimensions.get('window')
import CustomButton from '../Component/Button'
// import Logo from '../Component/LogoImage'
import {themeColor, pinkColor} from '../Constant/index'
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'

// import  from '../Component/Slogan'
export const ENTRIES1 = [
  {
      title: 'Beautiful and dramatic Antelope Canyon',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://i.imgur.com/UYiroysl.jpg',
      thumbnail: require('../assets/landingScreen/1.jpeg')
  },
  {
      title: 'Earlier this morning, NYC',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
      thumbnail: require('../assets/landingScreen/2.jpeg')
  },
  {
      title: 'White Pocket Sunset',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
      illustration: 'https://i.imgur.com/MABUbpDl.jpg',
      thumbnail: require('../assets/landingScreen/3.jpeg')
  },
  {
      title: 'Acrocorinth, Greece',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
      thumbnail: require('../assets/landingScreen/4.jpeg')
  },
  {
      title: 'The lone tree, majestic landscape of New Zealand',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
      thumbnail: require('../assets/landingScreen/5.jpeg')
  },
  {
      title: 'Middle Earth, Germany',
      subtitle: 'Lorem ipsum dolor sit amet',
      thumbnail: require('../assets/landingScreen/6.jpg')
  }
];

 class LandingScreen extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
    header: null
  }
  componentDidMount() {
    if (this.props.userObj){
      this.props.navigation.navigate('App')
    } 
    
  }
  _renderItem ({item, index}, parallaxProps) {
    return (
        <View style={styles.item}>
            <ParallaxImage
                source={item.thumbnail}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.4}
                {...parallaxProps}
            />
            <Pagination
              dotsLength={ENTRIES1.length}
              activeDotIndex={index}
              containerStyle={{ backgroundColor: themeColor }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        </View>
    );
}
    render() {
      const {navigation} = this.props
        return (
          <View style={styles.container}>
            <ScrollView>
            <View style = {{alignItems : "center" , marginVertical : '12%'}}>
              <Text style={{color : '#fff' , fontSize : 28 , fontWeight : 'bold'}}>Welcome</Text>
              <Text style={{color : '#ccc'}}>It is never early to begin</Text>
              <Text style={{color : '#ccc'}}>exploring the world</Text>
              </View>
          <Carousel
              sliderWidth={screenWidth}
              sliderHeight={screenWidth + 120}
              itemWidth={screenWidth - 60}
              data={ENTRIES1}
              renderItem={this._renderItem}
              hasParallaxImages={true}
              />
              </ScrollView>
              <View style = {styles.bottomButtons}>
                <TouchableOpacity style = {styles.arrowButton} >
                    <Icon type = {'font-awesome'} name = {'arrow-left'}  color = {pinkColor} />
                  </TouchableOpacity>
                  <CustomButton
                  onPress = {()=> this.props.navigation.navigate('CreateAccount')}
                  title = {'Next'} backgroundColor = {pinkColor} 
                  containerStyle = {{width : 90 , height : 30}}  height = {45}/>
                </View>
      </View>

        );
      }   
    }   
    
    const styles = StyleSheet.create({
      container : {
        flex : 1,
        backgroundColor : themeColor
      },
      item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
      },
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
        resizeMode: 'contain',
      },
    })
    const mapDispatchToProps = (dispatch) => {
      return {}
    }
    const mapStateToProps = (state) => {
      return {
        userObj: state.auth.user
      }
    }
    export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(LandingScreen))
    
    