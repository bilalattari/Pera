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
import NotifService from '../Constant/NotificationService';
import Modal from "react-native-modal";
import appConfig from '../app.json';
import moment from 'moment'
import { openDatabase } from 'react-native-sqlite-storage';
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
      search : '',
      isVisible :false,
      senderId: appConfig.senderID,
      popUp : {}
    }
    this.allClient = []
    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
 
  }
  onRegister(token) {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
    this.setState({ registerToken: token.token, gcmRegistered: true });
  }

  onNotif(notif) {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert("Permissions", JSON.stringify(perms));
  }

  openTestDatabase = async () => {
    this.loading = true
    try {
        db.transaction(function(txn) {
            txn.executeSql(
              "SELECT name FROM sqlite_master WHERE type='table' AND name='table_client'",
              [],
              function(tx, res) {
                console.log(res.rows.length , 'measurment_data db created')
                if (res.rows.length == 0) {
                  txn.executeSql(
                    'CREATE TABLE IF NOT EXISTS table_client(client_id INTEGER PRIMARY KEY AUTOINCREMENT, client_data VARCHAR(30))',
                    []
                  );
                }
              }
            );
          }) 
        } 
          catch (e) {
          this.loading = false
        }
}
getAllClients = async () => {
  this.loading = true
  try {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_client', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          let item = JSON.parse(results.rows.item(i).client_data)
          item.id = results.rows.item(i).client_id
          temp.push(item);
        }
        temp.sort((a , b)=> new Date(b.submitDate) - new Date(a.submitDate))
        this.setState({allClients  :temp})
      })
    }) 
      } 
        catch (e) {
        this.loading = false
      }
}

  componentDidMount = async()=>{
    this.openTestDatabase()
      this.props.navigation.addListener('didFocus' ,async ( )=> {
        this.getAllClients()
        let clients = await AsyncStorage.getItem('Clients')
        console.log(JSON.parse(clients) , 'clients')
        if(clients !== null){
          let allClient = JSON.parse(clients)
          allClient.sort((a , b)=> new Date(b.submitDate) - new Date(a.submitDate))
          this.allClient = allClient
          this.setInterval = setInterval(() => {
            this.checkTime()
          }, 60000)
          this.setState({allClients : allClient})
        }
      })
  }
  checkTime =async () =>{
    let clients = await AsyncStorage.getItem('Clients')
    if(clients !== null){
      this.allClient = JSON.parse(clients)
      JSON.parse(clients).filter((item)=> {
        let time = item.reminderTime
        let todaysDate = new Date(item.deliveryDate) === new Date() ? true : false
        let getCurrentTime = `${new Date().getHours()}:${new Date().getMinutes()}`
        if(todaysDate && time ===getCurrentTime ){
          this.notif.localNotif()
        }
      })
  }
}
deleteClient =async ()=>{
let {popUp } = this.state 
db.transaction(tx => {
  tx.executeSql(
    'DELETE FROM  table_client where client_id=?',
    [popUp],
    (tx, results) => {
      console.log('Results', results.rowsAffected);
      this.setState({isVisible : false} ,()=> this.getAllClients())
    })
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
              <Modal isVisible = {this.state.isVisible}
                onBackButtonPress = {()=> this.setState({isVisible : false})}
                onBackdropPress={() => this.setState({ isVisible: false })}
                >
                  <View style = {{height : 300 , width : '90%' , alignSelf : 'center',
                   backgroundColor : '#fff' , borderRadius : 25}}>

                     <View style = {{height : 80 , backgroundColor : themeColor , 
                      borderBottomLeftRadius : 41, justifyContent : "center" , alignItems : "center"}}>
                      <Text style = {{color : '#fff' , fontWeight : 'bold' , fontSize : 16}}>Measerment Book</Text>
                       </View>
                       <View style = {{flex : 1 ,justifyContent : "space-around" , alignItems : "center"}}>
                       <Text style = {{color : themeColor , fontWeight : 'bold' , fontSize : 20 , 
                       paddingHorizontal : "12%" , textAlign : "center" }}>You want to delete this client ?</Text>
                       <View style = {{width : "100%" , flexDirection : "row" , justifyContent : "space-around"}}>
                       <TouchableOpacity style = {{height : 45 , width : "40%" , backgroundColor : themeColor ,
                        borderRadius : 25 , justifyContent : "center" , alignItems : "center"}}
                        onPress = {()=> this.deleteClient()}
                        >
                      <Text style = {{color : '#fff' , fontWeight : 'bold' , fontSize : 16}}>Yes</Text>
                       </TouchableOpacity>
                       <TouchableOpacity
                       onPress = {()=> this.setState({isVisible : false})}
                       style = {{height : 45 , width : "40%" , backgroundColor : '#EBEBEB' ,
                        borderRadius : 25 , justifyContent : "center" , alignItems : "center"}}>
                      <Text style = {{color : '#000' , fontWeight : 'bold' , fontSize : 16}}>NO</Text>
                       </TouchableOpacity>
                         </View>
                         </View>
                       
                    </View>
                </Modal>
                <View style = {styles.homeTopContainer}>
                         <Text style = {{color : '#fff' , fontWeight : 'bold' , fontSize : 30}}>Clients</Text>
                         <SearchInput
                         onChangeText = {(text)=>this.setState({search : text} , ()=>{
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
                    onLongPress = {()=> this.setState({popUp : item.id , isVisible : true})}
                    style = {styles.listItem}>
                       <Image source = {item.image === '' ? require('../assets/avatar.jpg') : {uri : `data:image/png;base64, ${item.image}` }} 
                       style = {{height : 55 , width : 55 , borderRadius : 125 , 
                        marginHorizontal : 16 , borderColor : themeColor , borderWidth : 1.5 }} />
                        <View style = {{flex : 1}}>
                          <View style = {{flexDirection : 'row' ,
                           justifyContent : 'space-between' , paddingRight : 12}}>
                            <Text style = {{color : "#000"}}>Delivery date due </Text>
                       <Text style = {{color : themeColor , fontSize : 15 ,}}>{moment(new Date(item.deliveryDate)).fromNow()}</Text>
                            </View>
                       <Text style = {{color : "#000" , fontWeight : 'bold' , fontSize : 16}}>{item.name}</Text>
                          </View>
                       </TouchableOpacity>
                  }
                    />
                    <View style = {{position : 'absolute' , top : '45%' , zIndex : -1200 , width : '100%' ,
                     justifyContent : 'center' , alignItems : 'center'}}>
                      <Image source = {this.state.allClients.length === 0 ? require('../assets/noclients.png') : require('../assets/happy.png')} 
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
