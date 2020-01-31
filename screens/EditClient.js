import React, { Fragment } from 'react';
import {
    StyleSheet,
    View,TouchableOpacity,TextInput,
    Text,ScrollView,
    Image,ActivityIndicator
} from 'react-native';
import {withNavigation} from 'react-navigation'
import { Dimensions,Platform } from 'react-native';
import CustomButton from '../Component/Button'
import {themeColor, pinkColor} from '../Constant/index'
import ImagePicker from 'react-native-image-picker';
import {DatePicker} from 'native-base';
import moment from 'moment'
import { Icon } from 'react-native-elements';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'Client.db' });
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
 class EditClient extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userInfo : {},
      index : 0,
    }
  }
  static navigationOptions = {
    header: null
  }
  showImagePicker = ()=>{
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let user = this.state.userInfo
        user.image = response.data
        this.setState({userInfo : user})
      }
    });
  }
  componentDidMount = ()=>{
    this.props.navigation.addListener('didFocus' ,async ( )=> {
      let userInfo = this.props.navigation.getParam("data")
      this.setState({userInfo :userInfo , index : this.props.navigation.getParam("index") })
    })
  }
  saveUpdates = async()=>{
    let {userInfo} = this.state
    let data = JSON.stringify(userInfo)
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_client set client_data=? where client_id=?',
        [data , userInfo.id],
        (tx, resultUpdate) => {
          console.log(resultUpdate , 'result update')
          this.props.navigation.navigate('Home')
        })
      })
  }
    render() {
      let {userInfo} = this.state
      const {navigation} = this.props
        return (
          userInfo.name === undefined ? 
          <ActivityIndicator size = {'large'}  /> :
            <View style = {{flex : 1}}>
                <View style = {{minHeight : 210 , backgroundColor : themeColor ,}}>
                <View style = {{width : "100%"}}>
                  <TouchableOpacity  
                  onPress = {()=> this.showImagePicker()}>
                    <Image  source = {userInfo.image === '' ? require('../assets/avatar.png') : {uri : `data:image/png;base64, ${userInfo.image}`}} 
                    style = {{height : 210 , resizeMode : 'contain' , 
                    width : '100%'}} />
                    </TouchableOpacity>
                    <View style = {styles.header}>
                       <TouchableOpacity style = {styles.leftArrowView}
                       onPress = {()=> this.props.navigation.navigate("ClienDetail")}>
                        <Icon type = {'antdesign'} color = {'#fff'} 
                         name = {'arrowleft'}  size = {20} containerStyle = {{marginRight : 4}}/>
                         <Text style = {styles.leftArrow}>Edit Client</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>

                <ScrollView>
                  <View style = {{minHeight : 190 ,backgroundColor : themeColor , 
                    borderBottomLeftRadius : 63 , paddingVertical : 25 , paddingTop : 41 , marginTop : -41 , 
                    zIndex : -1200}}>
                <View style = {styles.inputView}>
                    <Text style = {styles.inputText}>Name :</Text>
                    <TextInput placeholder = {'Name'}
                    value = {userInfo.name}
                    onChangeText = {(text)=>{
                      let user = userInfo
                      user.name = text
                      this.setState({userInfo : user})
                    }}
                    placeholderTextColor = {'#ccc'} 
                     style = {styles.input} />
                </View>
                <View style = {styles.inputView}>
                    <Text style = {styles.inputText}>Note :</Text>
                    <TextInput placeholder = {'Note'}
                    value = {userInfo.description}
                    onChangeText = {(text)=>{
                      let user = userInfo
                      user.description = text
                      this.setState({userInfo : user})
                    }}
                    placeholderTextColor = {'#ccc'} 
                     style = {styles.input} />
                </View>

                <View style = {styles.inputView}>
                    <Text style = {styles.inputText}>Phone Number :</Text>
                    <TextInput placeholder = {'Number'} 
                    value = {userInfo.phoneNumber}
                    onChangeText = {(text)=>{
                      let user = userInfo
                      user.phoneNumber = text
                      this.setState({userInfo : user})
                    }}
                    placeholderTextColor = {'#ccc'} 
                     style = {styles.input} />
                </View>
                
                <View style = {styles.inputView}>
                    <Text style = {styles.inputText}>Entry Date :</Text>
                    <View style = {styles.input}>
                      <DatePicker
            defaultDate={new Date(userInfo.entryDate)}
            minimumDate={new Date()}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText={moment(new Date(userInfo.entryDate)).format("DD-MM-YYYY")}
            textStyle={{ height : 45 ,
                width : 180 , color : '#fff' }}
            placeHolderTextStyle={{ color: "#fff" , fontSize : 16, marginLeft : -5 }}
            onDateChange={(date)=>{
              let user = userInfo
              user.entryDate = date
              this.setState({userInfo : user})
            }}
            disabled={false}
            />
            </View>
                </View>
                <View style = {styles.inputView}>
                    <Text style = {styles.inputText}>Delivery Date :</Text>
                    <View style = {styles.input}>
                      <DatePicker
            defaultDate={new Date(userInfo.deliveryDate)}
            minimumDate={new Date(2020 ,0 , 1 )}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText={moment(new Date(userInfo.deliveryDate)).format("DD-MM-YYYY")}
            textStyle={{ height : 45 ,
                width : 180 ,  color : '#fff'}}
            placeHolderTextStyle={{ color: "#fff" , fontSize : 16, marginLeft : -5 }}
            onDateChange={(date)=>{
              let user = userInfo
              user.deliveryDate = date
              this.setState({userInfo : user})
            }}
            disabled={false}

            />
            </View>
                </View>
                </View>


                       <View style = {styles.textStyle}>  
                       <Text style = {styles.style}>Style : </Text>
                       <TextInput placeholder = {'Style Name'} 
                    value = {userInfo.styleName}
                    onChangeText = {(text)=>{
                      let user = userInfo
                      user.styleName = text
                      this.setState({userInfo : user})
                    }}
                    placeholderTextColor = {'#ccc'} 
                     style = {[styles.input , {borderBottomWidth : 0 , color : '#000' , 
                     fontWeight : 'bold' , fontSize : 18}]} />
                         </View>
                         <View style = {styles.textStyle}>  
                       <Text style = {styles.style}>Gender : </Text>
                       <Text style = {{color : '#000' , fontWeight : 'bold' , fontSize : 18}}>Female Measurments</Text>
                         </View>
                         <View style = {{flexDirection : "row" , flexWrap : 'wrap' , justifyContent : 'center' }}>
                         { 
                      Object.keys(userInfo.measurment).map((name , index)=>
                          <View key = {index} style = {styles.inputViewMeasure}>
                            <TextInput 
                            keyboardType = {'number-pad'}
                            style = {styles.inputMeasure} 
                            placeholder = {'0'}
                            value = {userInfo.measurment[name]} 
                            onChangeText = {(text) => {
                              let userMeasurment = userInfo
                              userMeasurment.measurment[name] = text
                              this.setState({userInfo : userMeasurment})
                            }}
                            />
                            <Text style = {styles.inputTextMeasure}>{name}</Text>
                      </View>)
                          }
                              </View>

                         <CustomButton title = {'SAVE CHANGES'} 
                         onPress = {()=> this.saveUpdates()}
                         containerStyle = {{width : '80%' ,marginVertical : 12}} /> 
                        </ScrollView>
                </View>
        );
      }   
    }   
    
    const styles = StyleSheet.create({
      container : {
        flex : 1,
      },
      inputTextMeasure : {fontSize : 12 , fontWeight : "bold" , paddingHorizontal :4 ,
       paddingTop : 2, color : '#000' , textAlign : 'center' },
      inputMeasure : {height : 40 , width : 40 , backgroundColor : '#fff' , 
      alignItems : "center" , fontSize : 18 , paddingLeft : 5},
      inputViewMeasure : {minHeight : 95 , width : 95 , margin : 5, marginVertical : 6,
        backgroundColor : '#EBEBEB' , justifyContent : 'center' , alignItems : 'center'},
      input : {borderBottomColor : '#ccc' , borderBottomWidth : 1 , flex : 1 , color : '#fff' ,
       fontSize : 16},
      inputText : {color : '#ccc' , fontSize : 17 , paddingHorizontal : 5 ,},
      inputView : {paddingHorizontal : 12 , height : 41 , flexDirection : 'row' ,
      justifyContent : 'center' , alignItems : 'center' , marginVertical : 6},
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
    export default withNavigation(EditClient)
