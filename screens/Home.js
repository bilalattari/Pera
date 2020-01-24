import React, { Fragment } from 'react';
import {
    StyleSheet,FlatList,
    View,TouchableOpacity,
    Text,ScrollView,ImageBackground,
    Image,Alert
} from 'react-native';
import {withNavigation} from 'react-navigation'
import { Dimensions,Platform } from 'react-native';
import CustomButton from '../Component/Button'
import {themeColor, pinkColor} from '../Constant/index'
import SearchInput from '../Component/SearchBar'
import  AsyncStorage from '@react-native-community/async-storage'
import { openDatabase } from 'react-native-sqlite-storage';
// import {Notifications} from 'react-native-notifications';

import moment from 'moment'
var db = openDatabase({ name: 'Client.db' });
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
      allClients : [],
      search : ''
    }
    this.allClient = []
  }

  componentDidMount = async()=>{
    // Notifications.registerRemoteNotifications();
    // console.log(Notifications)
    // const notification = await Notifications.getInitialNotification();
    // console.log(notification , 'notification')
    // notification.postLocalNotification({
    //   body: 'Local notificiation!',
    //   title: 'Local Notification Title',
    //   sound: 'chime.aiff',
    //   category: 'SOME_CATEGORY',
    //   link: 'localNotificationLink',
    //   fireDate: new Date()
    // }, id);
      this.props.navigation.addListener('didFocus' ,async ( )=> {
        let clients = await AsyncStorage.getItem('Clients')
        console.log(JSON.parse(clients) , 'clients')
        if(clients !== null){
          this.allClient = JSON.parse(clients)
          this.setState({allClients : JSON.parse(clients)})
        }
      })
  }
  static navigationOptions = {
    header: null
  }
    render() {
      let {index} = this.state
      const {navigation} = this.props
        return (
            <View style = {{flex : 1}}>
                <View style = {styles.homeTopContainer}>
                         <Text style = {{color : '#fff' , fontWeight : 'bold' , fontSize : 30}}>Cllents</Text>
                         <SearchInput
                         onChangeText = {(text)=>this.setState({search : text} , ()=>{
                           console.log(this.state.search , 'searchhhhhhhhhhhhhh')
                           if(this.state.search.length !== 0){
                             let client = this.state.allClients
                             let filter = client.filter((data)=> data.name.indexOf(this.state.search) != -1)
                             console.log(filter , 'filterfilterfilter')
                             this.setState({allClients : filter})
                           }
                           else{
                            this.setState({allClients : this.allClient})
                           }
                         })}
                         value = {this.state.search}
                         />
                    </View>
                    <FlatList
                    data = {this.state.allClients}
                    extraData = {this.state.allClients}
                    keyExtractor = {(item , index)=> `${index}` }
                    renderItem = {({item , index})=>
                    <TouchableOpacity
                    onPress = {()=> this.props.navigation.navigate('ClienDetail' , {data : item , index : index})}
                    style = {styles.listItem}>
                       <Image source = {{uri : item.image}} 
                       style = {{height : 55 , width : 55 , borderRadius : 125 ,
                        marginHorizontal : 16 , borderColor : themeColor , borderWidth : 1.5 }} />
                        <View style = {{flex : 1}}>
                          <View style = {{flexDirection : 'row' ,
                           justifyContent : 'space-between' , paddingRight : 12}}>
                            <Text style = {{color : "#000"}}>Deleivery </Text>
                       <Text style = {{color : themeColor , fontSize : 15 ,}}>{moment(new Date(item.deliveryDate)).fromNow()}</Text>
                            </View>
                       <Text style = {{color : "#000" , fontWeight : 'bold' , fontSize : 16}}>{item.name}</Text>
                          </View>
                       </TouchableOpacity>
                  }
                    />
                    <View style = {{position : 'absolute' , top : '45%' , zIndex : -1200 , width : '100%' ,
                     justifyContent : 'center' , alignItems : 'center'}}>
                      <Image source = {require('../assets/noclients.png')} 
                      style = {{height : height/6 , width : height/6 , resizeMode : 'stretch'}} />
                      {
                        this.state.allClients.length == 0 ?
                        <Text style = {{padding: 12,}}>You have no clients</Text>
                       : null}
                      </View>
                      <TouchableOpacity
                      onPress = {()=> 
                        this.props.navigation.navigate('AddClient')
                      }
                      style = {styles.fabButton}>
                          <Icon type = {"font-awesome"} name = {"plus"} color = {"#fff"} size = {17} />
                        </TouchableOpacity>
                </View>
        );
      }   
    }   
    
    const styles = StyleSheet.create({
      container : {
        flex : 1,
      },
      listItem : {height : 80 , alignItems : "center" , borderWidth : 0.5,
      borderTopWidth : 0,borderColor : '#ccc', flexDirection : "row",
       backgroundColor : '#fff' , borderBottomLeftRadius :41 },
      homeTopContainer : {height : 120 , backgroundColor : themeColor ,
        borderBottomLeftRadius : 72 , paddingLeft : '20%' , justifyContent : 'flex-end'},
      fabButton : {height : height/13 , width : height/13 , borderRadius : 25 , 
        backgroundColor : themeColor , justifyContent : 'center' , alignItems :"center" , position : "absolute" , 
        right : 15 , bottom : 25},
      nextText : {color : "#fff" , fontSize : height/34 , 
      fontWeight : 'bold' , paddingBottom : 3  },
    })
    export default withNavigation(Home)
