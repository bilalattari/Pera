import React, { Fragment } from 'react';
import {
    StyleSheet,FlatList,
    View,TouchableOpacity,
    Text,ScrollView,ImageBackground,
    Image,
    ActivityIndicator
} from 'react-native';
import moment from 'moment'
import {withNavigation} from 'react-navigation'
import { Dimensions,Platform } from 'react-native';
import { Icon } from 'react-native-elements';
const slides = [
  require("../assets/1.png"),
  require("../assets/2.png"),
  require("../assets/4.png"),
  require("../assets/3.png"),
];
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
 class ClienDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userInfo : {}
    }
  }
  static navigationOptions = {
    header: null
  }
  componentDidMount = ()=>{
    this.props.navigation.addListener('didFocus' ,async ( )=> {
      let userInfo = this.props.navigation.getParam("data")
      this.setState({userInfo :userInfo })
    })
  }

    render() {
      let {userInfo} = this.state
      const {navigation} = this.props
      // console.log()
        return (
          userInfo.name === undefined ? 
          <ActivityIndicator size = {'large'}  /> :
            <View style = {{flex : 1}}>
                <View style = {{width : "100%" , alignItems : "center" , backgroundColor : "#ccc"}}>
                    <Image  source = {{uri : userInfo.image}} 
                    style = {{height : height/2 ,  resizeMode : 'stretch' , 
                    width : height/1.5 }} />
                    <View style = {styles.header}>
                       <TouchableOpacity 
                       onPress = {()=> this.props.navigation.navigate("Home")}
                       style = {styles.leftArrowView}>
                        <Icon type = {'antdesign'} color = {'#fff'} 
                        name = {'arrowleft'}  size = {20} containerStyle = {{marginRight : 4}}/>
                          <Text style = {styles.leftArrow}>{userInfo.name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=> 
                          this.props.navigation.navigate('EditClient' , {data : userInfo , index : this.props.navigation.getParam("index")})}>
                        <Image source = {require('../assets/edit.png')} 
                        style = {{ marginTop : 5  , height : 35 , width : 35}} />
                        </TouchableOpacity>
                          </View>
                          <ImageBackground source = {require('../assets/imagebg.png')}  
                          style = {{position : 'absolute' , width : height/1.5 , bottom : -4 ,
                          justifyContent : 'center',  height : 80 ,}}>
                          <Text style = {{color : '#000' ,textAlign : 'center' ,
                          fontWeight : 'bold' , fontSize : 21 }}>{userInfo.name}</Text>
                          </ImageBackground> 
                    </View>
                    <View style = {{marginTop : -12}}>
                           <TouchableOpacity style = {styles.callButton}>
                                 <Icon type = {'ionicon'} name = {'ios-call'} color = {'red'} 
                                 containerStyle = {{marginRight : 12}} size = {20} />
    <Text style = {styles.callNumber}>{userInfo.phoneNumber}</Text>
                               </TouchableOpacity>
                           </View>
                             <ScrollView>
                               <View style = {styles.dateContainer}>
                                   <View style = {styles.dateView}>
                                       <Image source = {require('../assets/calendar2.png')} 
                                       style = {styles.image} />
    <Text style = {styles.date}>{moment(new Date(userInfo.entryDate)).format("DD-MM-YYYY")}</Text>
                                       <Text style = {styles.dateText}>Entry Date</Text>
                                       </View>
                                       <View style = {[styles.dateView , {backgroundColor : '#ED0C14'}]}>
                                       <Image source = {require('../assets/calendar2.png')} 
                                       style = {styles.image} />
    <Text style = {styles.date}>{moment(new Date(userInfo.deliveryDate)).format("DD-MM-YYYY")}</Text>
                                       <Text style = {styles.dateText}>Delivery Date</Text>
                                       </View>
                                       <View style = {styles.dateView}>
                                       <Image source = {require('../assets/Profile.png')} 
                                       style = {styles.image} />
                                       <Text style = {styles.date}>{userInfo.gender}</Text>
                                       <Text style = {styles.dateText}>Gender</Text>
                                       </View>
                                   </View>  
                      <View style = {styles.textStyle}>  
                       <Text style = {styles.style}>Style : </Text>
        <Text style = {{color : '#000' , fontWeight : 'bold' , fontSize : 18}}>{userInfo.styleName}</Text>
                         </View>
                         <View style = {{flexDirection : "row" , flexWrap : 'wrap' , justifyContent : 'center' }}>
                         {
                           Object.keys(userInfo.measurment).map((name , index)=>
                           <View key = {index} style = {styles.inputView}>
                             <View style = {{height : 40 , width : 40 , backgroundColor : "#fff" , justifyContent : "center" , alignItems : "center"}}>
                         <Text style = {{color : "#000" , fontSize : 18 , fontWeight : "bold"}}>{userInfo.measurment[name] === '' ? '0' :userInfo.measurment[name] }</Text>
                               </View>
                             <Text style = {styles.inputText}>{name}</Text>
                       </View>)
                         }
                         </View>
                        </ScrollView>
                </View>
        );
      }   
    }   
    
    const styles = StyleSheet.create({
      container : {
        flex : 1,
      },
      inputText : {fontSize : 12 , fontWeight : "bold" , paddingHorizontal :4 ,
       paddingTop : 2, color : '#000' , textAlign : 'center' },
      input : {height : 40 , width : 40 , backgroundColor : '#fff' , 
      alignItems : "center" , fontSize : 18 , paddingLeft : 5},
      inputView : {minHeight : 90 , width : 90 , margin : 5, marginVertical : 6,
        backgroundColor : '#EBEBEB' , justifyContent : 'center' , alignItems : 'center'},
      style : {color : '#B9B3BD' , paddingHorizontal : 8 , fontSize : 15 ,
      fontWeight : 'bold' , letterSpacing : 1},
      textStyle : {height : 41 , borderBottomColor : '#DDDDDD' , borderBottomWidth : 0.5 ,
      width : '90%' , alignSelf : 'center' , flexDirection : 'row' , 
      alignItems : 'center'},
      dateContainer : {flexDirection : 'row' , justifyContent : 'space-around' ,
      paddingVertical : 12 },
      image : {height : 17 , width : 17},
      callNumber : {color : '#fff' , fontSize : 16 , fontWeight : 'bold'},
      header : {flexDirection : "row" ,  width : '100%',paddingHorizontal: 12,
      height : 50 , alignItems : 'center' , justifyContent : 'space-between',
      position : "absolute" , top : 4},
      leftArrowView : { flexDirection : "row"  ,
      alignItems: 'center' , paddingLeft : 12 },
      callButton : {height : 50 , width : "83%" ,alignSelf : 'center',
      backgroundColor : '#000' , borderRadius : 41 ,justifyContent : 'center' ,
       alignItems : 'center' , flexDirection : 'row'},
      leftArrow : {color : '#fff' , fontWeight : 'bold' , 
      fontSize : 12},
      date : {color : '#fff' , fontSize : 16 ,marginVertical : 2, 
      fontWeight : 'bold'},
      dateText : {color : '#fff' , fontSize : 13   },
      dateView : {minHeight : 98 , width : '30%' ,backgroundColor : '#000' ,
      borderRadius : 15 , justifyContent : 'center' , paddingLeft : 8 ,},
      centerHeading : {color : '#fff' , fontWeight : 'bold' , fontSize : 16},
      centerView : {flex : 1.5 , justifyContent: 'center',alignItems : 'center' },
    })
    export default withNavigation(ClienDetail)
