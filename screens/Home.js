import React, { Fragment } from 'react';
import {
    StyleSheet,
    View,TouchableOpacity,
    Text,
    Image
} from 'react-native';
import CustomInput from '../Component/Input'
import CustomButton from '../Component/Button'
import CustomHeader from '../Component/header'
import {withNavigation , NavigationEvents}  from 'react-navigation'
import Drawer from 'react-native-drawer'
import ControlPanel from './ControlPanel'
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { themeColor } from '../Constant';
import DocumentPicker from 'react-native-document-picker';
import FIcon from 'react-native-vector-icons/Fontisto'

let HomePageTitle = (props)=> 
        <TouchableOpacity  {...props}
                 style  = {{alignSelf : 'center' ,flexDirection : 'row' , width : '70%' , height : 30 , alignItems : 'center'  , marginVertical : 3}}>
                  <Icon color = {themeColor} type = {props.type} name = {props.name} containerStyle = {{width : '20%'}}/>
                  <Text style = {{color :themeColor   , fontSize : 20 }}> {props.title} </Text>
                </TouchableOpacity>
 class Transactions extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      image : ''
    }
  }
  static navigationOptions = {
    header: null,
};
_openPicker = async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
    this.setState({image : res.uri})

    console.log(
      res.uri,
      res.type, // mime type
      res.name,
      res.size
    );
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
}
navigate = (route)=> this.props.navigation.navigate(route)
    render() {
      const {navigation} = this.props

        return (
          <View>
              <CustomHeader  home = {true}  title = {'HOME'} navigation = {this.props.navigation} />
              <View style = {{alignSelf : 'center' , marginVertical : 6}}>
                <TouchableOpacity>
                {
                  this.state.image !== '' ?
                  <Image source = {{uri : this.state.image }}  style = {[styles.userImage , {resizeMode : "contain" , backgroundColor : '#ccc'}]}/>
                  :
                <TouchableOpacity onPress = {this._openPicker} style = {styles.userImage}>
                 <Icon type = {"material-community"} name  = {"account"} color = {"#fff"} size  = {30} />
                 </TouchableOpacity>
                }
                  </TouchableOpacity>
               <Text style = {{textAlign : 'center' , fontSize : 18 , marginVertical : 6    }}>User name</Text>
                </View>
                <HomePageTitle onPress = {()=> this.navigate("ManageVideoScreen")} type = {'entypo'} name = {'video'}title  = {'Manage Videos'} />
                <HomePageTitle onPress = {()=> this.navigate("ManageProductScreen")} type = {'antdesign'} name = {'book'}title  = {'Manage Products'} />
                <HomePageTitle onPress = {()=> this.navigate("ManageClassified")} type = {'font-awesome'} name = {'newspaper-o'}title  = {'Manage Classifieds'} />
                <HomePageTitle onPress = {()=> this.navigate("Order")} type = {'font-awesome'} name = {'truck'}title  = {'Orders'} />
                <HomePageTitle onPress = {()=> this.navigate("Notifications")} type = {'font-awesome'} name = {'bell'}title  = {'Notifications'} />
                <HomePageTitle onPress = {()=> this.navigate("Conditions")} type = {'font-awesome'} name = {'file'}title  = {'Terms & Conditions'} />
            </View>
        );
      }   
    }   
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      userImage : {height : 130 , width : 130 , alignItems : "center" ,
      justifyContent : "center" ,alignSelf  : "center",  borderRadius : 5 , 
      backgroundColor : 'skyblue'},
    })
    export default withNavigation(Transactions)
