import React, { Fragment } from 'react';
import {
    StyleSheet,
    View,TouchableOpacity,
    Text,ScrollView,ImageBackground,DatePickerAndroid,
    Image
} from 'react-native';
import {withNavigation} from 'react-navigation'
import { Dimensions,Platform , TimePickerAndroid, PermissionsAndroid} from 'react-native';
import {DatePicker} from 'native-base';
import {themeColor, pinkColor} from '../Constant/index'
import CustomInput from '../Component/Input'
import CustomButton from '../Component/Button'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Contacts from 'react-native-unified-contacts';
import { Icon } from 'react-native-elements';
import moment from 'moment'
import Modal from "react-native-modal";
var radio_props = [
  {label: '30 minutes', value: 0 },
  {label: '1 hour', value: 1 },
  {label: '24 hour', value: 2 },
  {label: '1 week', value: 3 },
  {label: '2 Days', value: 4 },
];
    const height = Dimensions.get('window').height
 class AddClient extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        entryDate : '',
        deliveryDate : '',
        name : '',
        time : '',
        accessContact : false,
        phoneNumber : '',
        reminderTime : undefined,
        isVisible : false
    }
    
  }
  static navigationOptions = {
    header: null
  }
  setDate(newDate) {
    this.setState({ entryDate: newDate });
  }
  setDeliveryDate(newDate) {
    this.setState({ deliveryDate: newDate });
  }
  
  getContact = ()=>{
    Contacts.selectContact( (error, contact) =>  {
      if (error) {
        console.error(error);
      }
      else {
        this.setState({ phoneNumber : contact.phoneNumbers[0].digits}) 
    }
    });
  }
  requestCameraPermission  = async()=> {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Measurment book neeeds accesss to your contacts',
          message:
            'Measurment book neeeds accesss to your contacts ' +
            'so you can take contacts.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({accessContact : true})
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  openTimePicker = async (type)=>{
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
      });
      console.log(hour , 'hourrrrrrrr')
      if (action !== DatePickerAndroid.dismissedAction) {
        console.log(hour ,minute , 'action')
        type === 'time' ? 
          this.setState({time : `${hour < 10 ? '0' + hour : hour}:${minute < 10 ?  '0' +  minute  :minute }`} , ()=> console.log(this.state.time , 'timeeee')) :
          this.setState({reminderTime : `${hour}:${minute == '0' ? '00' :minute}`} , ()=> console.log(this.state.reminderTime , ' reminderTime timeeee')) 

      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }
  goToMeasurment = ()=>{
    console.log(this.state  , 'this state')
    let {name , phoneNumber , entryDate , deliveryDate , time , reminderTime} = this.state
    if(name !== '' && phoneNumber !== '' && entryDate !== '' && deliveryDate !== '' && time !== '' && reminderTime !== ''){

      let data = this.state
      data.reminderTime = radio_props[data.reminderTime].label
      this.props.navigation.navigate('Measurment' , {data : this.state})
    }else{
      alert("Please fill all the fields")
    }
  }
    render() {
      let {index , state , time} = this.state
      const {navigation} = this.props
      
        return (
            <ScrollView style = {{flex : 1 , backgroundColor : '#F1F0F2'}}>
              <Modal isVisible = {this.state.isVisible}
                onBackButtonPress = {()=> this.setState({isVisible : false})}
                onBackdropPress={() => this.setState({ isVisible: false })}
                >
                   <View style = {{height : 350 , width : '95%' , alignSelf : 'center',
                   backgroundColor : '#fff' , borderRadius : 25}}>
                     <View style = {{height : 60 , backgroundColor : themeColor , 
                      borderBottomLeftRadius : 41, justifyContent : "center" , alignItems : "center"}}>
                      <Text style = {{color : '#fff' , fontWeight : 'bold' , fontSize : 16}}>
                        Reminder</Text>
                       </View>
                  <RadioForm
  animation={true}
>
  {
    radio_props.map((obj, i) => (
      <RadioButton labelHorizontal={true} key={i} 
      style = {{height : 35 , alignItems : 'center' , margin : 5}}  >
        {/*  You can set RadioButtonLabel before RadioButtonInput */}
        <RadioButtonInput
          obj={obj}
          index={i}
          isSelected={this.state.reminderTime === i}
          onPress={()=> this.setState({reminderTime : i })}
          borderWidth={1}
          buttonInnerColor={themeColor}
          buttonOuterColor={themeColor}
          buttonSize={15}
          buttonOuterSize={20}
          buttonWrapStyle={{marginLeft: 10}}
        />
        <RadioButtonLabel
          obj={obj}
          index={i}
          labelHorizontal={true}
          onPress={()=> this.setState({reminderTime : i })}
          labelStyle={{fontSize: 20, color: themeColor , marginTop : 5 }}
          labelWrapStyle={{height : 50}}
        />
      </RadioButton>
    ))
  }  
</RadioForm>
<TouchableOpacity
                       onPress = {()=> this.setState({isVisible : false})}
                       style = {{height : 45 , width : "80%" , backgroundColor : themeColor , alignSelf : 'center',
                        borderRadius : 25 , justifyContent : "center" , alignItems : "center" , marginTop : 8}}>
                      <Text style = {{color : '#fff' , fontWeight : 'bold' , fontSize : 16}}>Ok</Text>
                       </TouchableOpacity>
                   </View>
                </Modal>
                <View style = {styles.topHeader}>
                    <View style = {{height : 60 , flexDirection : 'row'}}>
                        <TouchableOpacity 
                        onPress = {()=>this.props.navigation.navigate("Home")}
                        style = {{flex : 1 , flexDirection : "row"  ,
                        alignItems: 'center' , paddingLeft : 12 }}>
                        <Icon type = {'antdesign'} color = {'#fff'} 
                  name = {'arrowleft'}  size = {20} containerStyle = {{marginRight : 4}}/>
                            <Text style = {{color : '#fff' , fontWeight : 'bold' , 
                            fontSize : 16}}>Client</Text>
                        </TouchableOpacity>
                        <View style = {{flex : 1 , justifyContent: 'center',alignItems : 'center' }}>
                            <Text style = {{color : '#fff' , fontWeight : 'bold' , fontSize : 16}}>Personal Data</Text>
                        </View>
                        <View style = {{flex : 1 }}>
                            <Text style = {{color : '#fff'}}></Text>
                        </View>
                        </View>
                </View>
                  <View style = {{width : '80%' , backgroundColor : '#fff' , marginTop : -63 , 
                  minHeight : 200 , alignSelf : "center" , borderRadius : 25 , paddingVertical : 26}}>
                      <CustomInput placeholder = {'Name'} textChange = {(text)=> this.setState({name : text})} />
                      <View >
                        <TouchableOpacity
                        onPress = {()=> {if(this.state.accessContact){
                          this.getContact()
                        } else{
                          this.requestCameraPermission()
                        }}}
                        style = {{position : "absolute" , right: '4%', bottom : 0 , height : 40, width : 40  ,zIndex : 1200}}>
                          <Image source = {require("../assets/phoneBook.png")} style = {{height : 20  , width : 20}} />
                          </TouchableOpacity>
                      <CustomInput 
                      value = {this.state.phoneNumber}
                      placeholder = {'Phone Number'}
                      keyboardType = {"number-pad"}
                      textChange = {(text)=> this.setState({phoneNumber : text})} />
                        </View>
                      <View style = {styles.datePicker}>
                      <DatePicker
            defaultDate={new Date(new Date().toLocaleDateString())}
            minimumDate={new Date(new Date().toLocaleDateString())}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Entry Date"
            textStyle={{ height : 45 ,
                width : 180 , }}
            placeHolderTextStyle={{ color: "#707070" , marginLeft : -5 }}
            onDateChange={(date)=>this.setDate(date)}
            disabled={false}
            />
            </View>
            <View style = {styles.datePicker}>
                      <DatePicker
            defaultDate={this.state.entryDate !== '' ? new Date(new Date(this.state.entryDate).toLocaleDateString()) :new Date(new Date().toLocaleDateString()) }
            minimumDate={this.state.entryDate !== '' ? new Date(new Date(this.state.entryDate).toLocaleDateString()) :new Date(new Date().toLocaleDateString()) }
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Delivery Date"
            textStyle={{ height : 45 ,
                width : 180 , }}
            placeHolderTextStyle={{ color: "#707070" , marginLeft : -5 }}
            onDateChange={(date)=>this.setDeliveryDate(date)}
            disabled={false}
            />
            </View>
            <TouchableOpacity
            onPress = {()=> this.openTimePicker('time')}
            style = {[styles.datePicker , {justifyContent : "flex-end" }]}>
                <Text style = {{fontSize : 17 , paddingBottom: 6, marginLeft: 5,}}>
                  {this.state.time !== '' ? this.state.time : "Time" }
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress = {()=> this.setState({isVisible : true})}
            style = {[styles.datePicker , {justifyContent : "flex-end" }]}>
                <Text style = {{fontSize : 17 , paddingBottom: 6, marginLeft: 5,}}>
                {this.state.reminderTime !== undefined ? radio_props[this.state.reminderTime].label  : "Set Reminder" }
                </Text>
            </TouchableOpacity>
                      </View> 
                      <CustomButton title = {'CONTINUE'} 
                      onPress = {()=> this.goToMeasurment()}
                      containerStyle = {{width : '80%' ,marginVertical : 12}} /> 
                </ScrollView>
        );
      }   
    }   
    
    const styles = StyleSheet.create({
      container : {
        flex : 1,
      },
      modelTimeButton : {paddingLeft : 25 ,height : 41 ,margin : 2, 
        justifyContent : "center" , borderBottomColor : themeColor , borderBottomWidth : 0.5},
      datePicker : {height : 45 , borderBottomColor : '#E5E5E5' , borderBottomWidth : 1 , width : '86%' ,
      alignSelf  : 'center' , marginVertical : 6},
      topHeader : {height : 160 , backgroundColor : themeColor ,
        borderBottomLeftRadius : 72 }
    })
    export default withNavigation(AddClient)
